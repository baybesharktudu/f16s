import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function CheckCookie() {
    const dispatch = useDispatch();

    return (
        <div className="flex-1 flex flex-col justify-center items-center rounded-lg text-sm">
            <div className="flex flex-col gap-5">
                <h1 className="text-[var(--error-color)]">Please sign in again.</h1>
                <button
                    onClick={() => dispatch(signoutSuccess())}
                    type="button"
                    className="p-2 w-full rounded-lg text-[var(--text-color)]  bg-[var(--sub-alt-color)] hover:text-[var(--sub-alt-color)] hover:bg-[var(--text-color)] duration-300"
                >ok
                </button>
            </div>
        </div>
    );
}
