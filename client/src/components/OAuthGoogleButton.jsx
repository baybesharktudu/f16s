import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

export default function OAuthGoogleButton() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type="button"
            className="hover:bg-[var(--text-color)] duration-300 hover:text-[var(--sub-alt-color)] text-[var(--text-color)] w-full flex justify-center items-start gap-1 py-2 px-3 rounded-lg bg-[var(--sub-alt-color)]"
        >
            <FaGoogle className="text-xl" />
        </button>
    );
}
