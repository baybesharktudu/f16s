import React from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function Authentication() {
    return (
        <div className="h-full flex-1 flex sm:items-center justify-around flex-wrap sm:gap-2 gap-3">
            <SignUp />
            <SignIn />
        </div>
    );
}
