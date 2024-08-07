import { LogIn } from 'lucide-react';
import OAuthGoogleButton from './OAuthGoogleButton';
import OAuthFacebookButton from './OAuthFacebookButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            dispatch(signInFailure(''));
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const { loading, error } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password)
            return dispatch(signInFailure('Fill in all fields'));

        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                return dispatch(signInFailure(data.message));
            }

            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="w-full sm:w-72 flex flex-col gap-3 text-[var(--sub-color)]">
            <div className="flex items-end gap-2">
                <LogIn />
                <h1>login</h1>
            </div>
            <div className="flex justify-between items-center gap-3">
                <OAuthGoogleButton />
                <OAuthFacebookButton />
            </div>
            <div className="flex justify-between items-center gap-4">
                <div className="h-1 rounded-lg w-full bg-[var(--sub-alt-color)]"></div>
                <span className="text-[var(--text-color)]">or</span>
                <div className="h-1 rounded-lg w-full bg-[var(--sub-alt-color)]"></div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[var(--text-color)]">
                <input
                    className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                    placeholder="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                    placeholder="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                    type="submit"
                    className="hover:bg-[var(--text-color)] duration-300 hover:text-[var(--sub-alt-color)] text-[var(--text-color)] w-full flex justify-center items-start gap-1 py-2 px-3 rounded-lg bg-[var(--sub-alt-color)]"
                >
                    {loading && <span>loading...</span>}
                    {!loading && (
                        <>
                            <LogIn className="w-4 h-4" />
                            <span>sign in</span>
                        </>
                    )}
                </button>
            </form>
            <div className="flex justify-between text-xs">
                <div className="flex-1">
                    {error && (
                        <span className="duration-300 text-[var(--error-color)]">{error}</span>
                    )}
                </div>
                <button
                    type="button"
                    className="duration-300 text-end text-xs hover:text-[var(--text-color)]"
                >
                    forgot password?
                </button>
            </div>
        </div>
    );
}
