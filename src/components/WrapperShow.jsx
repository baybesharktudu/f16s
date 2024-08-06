import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function WrapperShow({ children }) {
    const location = useLocation();
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShow(true);
        }, 500);

        return () => {
            clearTimeout(timer);
            setIsShow(false);
        };
    }, [location.pathname]);

    return (
        <>
            {isShow ? (
                <>{children}</>
            ) : (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <RefreshCw className="h-10 w-10 text-[var(--main-color)] animate-spin" />
                </div>
            )}
        </>
    );
}
