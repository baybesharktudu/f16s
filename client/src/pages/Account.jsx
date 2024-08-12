import AccountUser from '../components/AccountUser';
import Posts from '../components/Posts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WrapperShow from '../components/WrapperShow';
import CheckCookie from '../components/CheckCookie';
import { PencilRuler } from 'lucide-react';
import LoadingData from '../components/LoadingData';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPostAccountFailure,
    getPostAccountStart,
    getPostAccountSuccess,
} from '../redux/post/postSlice';

export default function Account() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [cookie, setCookie] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { posts: data, loading } = useSelector((state) => state.post);

    useEffect(() => {
        const getAccount = async () => {
            try {
                const res = await fetch(`/api/user/account/${id}`);
                const data = await res.json();
                if (!res.ok) {
                    if (res.status === 401) {
                        setCookie(true);
                    }
                }

                if (res.ok) {
                    setAccount(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAccount();
    }, [id, data]);

    useEffect(() => {
        const getPostsAccount = async () => {
            dispatch(getPostAccountStart());
            setIsLoading(true);
            try {
                const res = await fetch(`/api/post/getposts/${id}`);
                const data = await res.json();

                if (res.ok) {
                    dispatch(getPostAccountSuccess(data));
                    setIsLoading(false);
                }
            } catch (error) {
                dispatch(getPostAccountFailure(error.message));
            }
        };
        getPostsAccount();
    }, [id, dispatch]);

    if (cookie) {
        return <CheckCookie />;
    }

    if (!account) {
        return (
            <>
                <WrapperShow />
            </>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-4">
            <AccountUser account={account} data={data} />
            {!isLoading && !loading && data.length === 0 && (
                <div className="flex-1 flex justify-center items-center gap-1">
                    <span>No posts yet, please write a new post</span>
                    <button type="button">
                        <PencilRuler className="w-5 h-5 text-[var(--main-color)]" />
                    </button>
                </div>
            )}
            {loading && <LoadingData />}
            {!loading && data && <Posts data={data} />}
        </div>
    );
}
