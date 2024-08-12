import { User } from 'lucide-react';
import moment from 'moment';

export default function AccountUser({ account, data }) {
    const totalLikes = data.reduce((total, post) => total + post.likes.length, 0);

    return (
        <div className="w-full flex p-4 rounded-lg bg-[var(--sub-alt-color)]">
            <div className="flex items-center gap-4 pr-4">
                <User className="p-1 text-[var(--sub-alt-color)] bg-[var(--sub-color)] sm:w-14 sm:h-14 rounded-full" />
                <div>
                    <h1 className="sm:text-2xl">{account.username}</h1>
                    <span className="text-xs text-[var(--sub-color)]">
                        {moment(account.createdAt).format('DD-MM-YYYY')}
                    </span>
                </div>
            </div>
            <div className="border-2 rounded-lg border-[var(--bg-color)]"></div>
            <div className="pl-4 flex-1 flex justify-around">
                <div className="">
                    <h3 className="text-[var(--sub-color)]">total post</h3>
                    <span className="text-[var(--text-color)] sm:text-2xl">
                        {account.posts.length}
                    </span>
                </div>
                <div className="">
                    <h3 className="text-[var(--sub-color)]">total like</h3>
                    <span className="text-[var(--text-color)] sm:text-2xl">{totalLikes}</span>
                </div>
            </div>
        </div>
    );
}
