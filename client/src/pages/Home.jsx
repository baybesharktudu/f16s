import React from 'react';
import Posts from '../components/Posts';
import CreatePost from '../components/CreatePost';

export default function Home() {
    return (
        <div className="flex-1">
            <Posts />
            <CreatePost />
        </div>
    );
}
