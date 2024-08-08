import React, { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import CreatePost from '../components/CreatePost';
import CheckCookie from '../components/CheckCookie';
import { useDispatch, useSelector } from 'react-redux';
import { getPostFailure, getPostStart, getPostSucces } from '../redux/post/postSlice';
import { PencilRuler } from 'lucide-react';
import LoadingData from '../components/LoadingData';

export default function Home() {
    const [cookie, setCookie] = useState(false);
    const { posts: data, loading } = useSelector((state) => state.post);
    const { loadingCreate } = useSelector((state) => state.post);

    const dispatch = useDispatch();
    useEffect(() => {
        const getPosts = async () => {
            try {
                dispatch(getPostStart());
                const res = await fetch(`/api/post/getposts`);
                const data = await res.json();

                if (!res.ok) {
                    dispatch(getPostFailure(data));
                    if (res.status === 401) {
                        setCookie(true);
                    }
                }

                if (res.ok) {
                    dispatch(getPostSucces(data));
                }
            } catch (error) {
                dispatch(getPostFailure(error.message));
            }
        };
        getPosts();
    }, [dispatch]);

    if (cookie) {
        return <CheckCookie />;
    }

    return (
        <div className="flex-1 flex flex-col">
            {data.length === 0 && (
                <div className="flex-1 flex justify-center items-center gap-1">
                    <span>No posts yet, please write a new post</span>
                    <button type="button">
                        <PencilRuler className="w-5 h-5 text-[var(--main-color)]" />
                    </button>
                </div>
            )}
            {loading && <LoadingData />}
            {data && !loading && <Posts data={data} loading={loadingCreate} />}
            <CreatePost />
        </div>
    );
}
