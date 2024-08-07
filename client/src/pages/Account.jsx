import AccountUser from '../components/AccountUser';
import Posts from '../components/Posts';
import CreatePost from '../components/CreatePost';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WrapperShow from '../components/WrapperShow';

export default function Account() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const getAccount = async () => {
            try {
                const res = await fetch(`/api/user/account/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setAccount(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getAccount();
    }, [id]);

    if (!account) {
        return (
            <>
                <WrapperShow />
            </>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-4">
            <AccountUser account={account} />
            <Posts posts={account.posts} />
            <CreatePost />
        </div>
    );
}
