import { Activity, User } from 'lucide-react';
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
            <Link to={'/account'}>
                <User />
            </Link>
        </div>
    );
}
