import { FaFacebook } from 'react-icons/fa';

export default function OAuthFacebookButton() {
    return (
        <button className="hover:bg-[var(--text-color)] duration-300 hover:text-[var(--sub-alt-color)] text-[var(--text-color)] w-full flex justify-center items-start gap-1 py-2 px-3 rounded-lg bg-[var(--sub-alt-color)]">
            <FaFacebook
                className="text-xl
            "
            />
        </button>
    );
}
