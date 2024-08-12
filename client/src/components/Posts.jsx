import { Ban, CircleCheckBig, ThumbsUp, Trash, User } from 'lucide-react';
import CheckSizeImg from './CheckSizeImg';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostFailure, deletePostSuccess, likeAddedSuccess } from '../redux/post/postSlice';
import AnimateLoading from './AnimateLoading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Posts({ data }) {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);

    const { loadingCreate: loading } = useSelector((state) => state.post);
    const handleDeletePost = async (post) => {
        try {
            const res = await fetch(`/api/post/deletepost/${post._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            if (!res.ok) {
                dispatch(deletePostFailure(data));
                toast.error(data.message, { icon: <Ban /> });
            }

            if (res.ok) {
                toast.success(data, { icon: <CircleCheckBig /> });
                dispatch(deletePostSuccess(post._id));
            }
        } catch (error) {
            dispatch(deletePostFailure(error.message));
        }
    };

    const handleLike = async (post) => {
        try {
            const res = await fetch(`/api/post/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUser._id, postId: post._id }),
            });

            const data = await res.json();
            dispatch(likeAddedSuccess({ postId: post._id, userId: currentUser._id }));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {loading && <AnimateLoading />}
                {data.map((post) => {
                    const isLiked = post.likes.includes(currentUser._id);
                    return (
                        <div
                            key={post._id}
                            className="flex flex-col gap-4 w-full p-4 bg-[var(--sub-alt-color)] rounded-lg relative"
                        >
                            <div className="flex items-center gap-4 pr-4">
                                <div className="flex gap-4">
                                    <User className="p-1 text-[var(--sub-alt-color)] bg-[var(--sub-color)] sm:w-10 sm:h-10 rounded-full" />
                                    <div className="flex flex-col justify-center items-start">
                                        <Link to={`/account/${post.userId}`}>
                                            <h1 className="text-xs hover:underline duration-200 hover:text-sky-500 cursor-pointer">
                                                {post.username}
                                            </h1>
                                        </Link>
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
                                <button
                                    type="button"
                                    onClick={() => handleLike(post)}
                                    className="flex items-end gap-2 text-[var(--sub-color)] hover:text-[var(--text-color)]"
                                >
                                    <ThumbsUp
                                        className={`${
                                            isLiked ? 'text-sky-500' : ''
                                        } hover:origin-bottom hover:-rotate-12 duration-300`}
                                    />
                                    <span className="text-xs duration-300">
                                        {post.likes.length}
                                    </span>
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleDeletePost(post)}
                                className="absolute top-4 right-4"
                            >
                                <Trash className="w-5 h-5 hover:scale-110 duration-300 text-[var(--colorful-error-color)]" />
                            </button>
                        </div>
                    );
                })}
            </div>
            <ToastContainer
                position="bottom-left" // Thay đổi vị trí của thông báo
                autoClose={1000} // Thời gian tự động đóng (5 giây)
                hideProgressBar={true}
                newestOnTop={true} // Thông báo mới nhất nằm trên cùng
            />
        </>
    );
}
