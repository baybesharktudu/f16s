import { Activity, LogOut, User, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <Link to="/">
                <div className="text-2xl flex gap-2 items-center text-[--main-color]">
                    <Activity />
                    <h1 className="text-[--text-color] leading-none">F16s</h1>
                </div>
            </Link>
            {/* <Link to={'/authentication'}>
                <User />
            </Link> */}
            <div className="flex items-end gap-8 text-[var(--sub-color)]">
                <Link
                    to={'/account'}
                    className="flex items-end gap-2 hover:text-[var(--text-color)] duration-200"
                >
                    <UserCheck className="w-5 h-5" />
                    <span className="leading-none">PhanBaNhat</span>
                </Link>

                <button className="hover:text-[var(--text-color)] duration-200">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
