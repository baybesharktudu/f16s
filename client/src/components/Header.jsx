import { Activity, LogOut, User, UserCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                if (res.status === 401) {
                    dispatch(signoutSuccess());
                }
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <Link to="/">
                <div className="text-2xl flex gap-2 items-center text-[--main-color]">
                    <Activity />
                    <h1 className="text-[--text-color] leading-none">F16s</h1>
                </div>
            </Link>
            {currentUser && (
                <div className="flex items-end gap-8 text-[var(--sub-color)]">
                    <Link
                        to={`/account/${currentUser._id}`}
                        className="flex items-end gap-2 hover:text-[var(--text-color)] duration-200"
                    >
                        <UserCheck className="w-5 h-5" />
                        <span className="leading-none">{currentUser.username}</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleSignout}
                        className="hover:text-[var(--text-color)] duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            )}
            {!currentUser && (
                <Link to={'/authentication'}>
                    <User />
                </Link>
            )}
        </div>
    );
}
