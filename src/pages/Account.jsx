import AccountUser from '../components/AccountUser';
import Posts from '../components/Posts';

export default function Account() {
    return (
        <div className="flex-1 flex flex-col gap-4">
            <AccountUser />
            <Posts />
        </div>
    );
}
