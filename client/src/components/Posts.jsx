import { ThumbsUp, Trash, User } from 'lucide-react';
import CheckSizeImg from './CheckSizeImg';
import moment from 'moment';

export default function Posts({ data, loading }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading && (
                <div className="animate-pulse flex flex-col gap-4 w-full p-4 bg-[var(--sub-alt-color)] rounded-lg relative">
                    <div className="flex items-center gap-4 pr-4">
                        <div className="flex gap-4">
                            <User className="p-1 text-[var(--sub-alt-color)] bg-[var(--sub-color)] sm:w-10 sm:h-10 rounded-full" />
                            <div className="flex flex-col gap-2 justify-center items-start">
                                <h1 className="text-xs w-40 h-4 bg-[var(--sub-color)] rounded-lg"></h1>
                                <span className="text-[10px] w-32 h-2 bg-[var(--sub-color)] rounded-lg"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs"></span>
                    </div>
                    <div className="h-72 sm:h-80 md:h-96 bg-[var(--sub-color)] rounded-lg"></div>
                    <div className="flex gap-4 items-center justify-between">
                        <button className="flex items-end gap-2 text-[var(--sub-color)] hover:text-[var(--text-color)]">
                            <ThumbsUp className="hover:origin-bottom hover:-rotate-12 active: duration-300" />
                            <span className="text-xs duration-300"></span>
                        </button>
                    </div>
                    <button className="absolute top-4 right-4">
                        <Trash className="w-5 h-5 hover:scale-110 duration-300 text-[var(--sub-color)]" />
                    </button>
                </div>
            )}
            {data.map((post) => (
                <div
                    key={post._id}
                    className="flex flex-col gap-4 w-full p-4 bg-[var(--sub-alt-color)] rounded-lg relative"
                >
                    <div className="flex items-center gap-4 pr-4">
                        <div className="flex gap-4">
                            <User className="p-1 text-[var(--sub-alt-color)] bg-[var(--sub-color)] sm:w-10 sm:h-10 rounded-full" />
                            <div className="flex flex-col justify-center items-start">
                                <h1 className="text-xs">{post.username}</h1>
                                <span className="text-[10px] text-[var(--sub-color)]">
                                    {moment(post.createdAt).format('DD-MM-YYYY')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs">{post.title}</span>
                    </div>
                    <CheckSizeImg img={post.picturePost} />
                    <div className="flex gap-4 items-center justify-between">
                        <button className="flex items-end gap-2 text-[var(--sub-color)] hover:text-[var(--text-color)]">
                            <ThumbsUp className="hover:origin-bottom hover:-rotate-12 active: duration-300" />
                            <span className="text-xs duration-300">{post.likes.length}</span>
                        </button>
                    </div>
                    <button className="absolute top-4 right-4">
                        <Trash className="w-5 h-5 hover:scale-110 duration-300 text-[var(--colorful-error-color)]" />
                    </button>
                </div>
            ))}
        </div>
    );
}
