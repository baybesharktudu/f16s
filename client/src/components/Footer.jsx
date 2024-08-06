import { CodeXml, MailCheck, Soup, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <div className="text-[var(--sub-color)] leading-none flex gap-2 justify-between items-center flex-wrap">
            <ul className="flex gap-5 items-center">
                <Link to="https://www.youtube.com">
                    <li className="hover:text-[--text-color] duration-200 flex gap-1 items-center">
                        <Youtube className="w-[14px] h-[14px] leading-none" />
                        <div>youtube</div>
                    </li>
                </Link>
                <Link to="https://github.com/baybesharktudu">
                    <li className="hover:text-[--text-color] duration-200 flex gap-1 items-center">
                        <CodeXml className="w-[14px] h-[14px] leading-none" />
                        <div>github</div>
                    </li>
                </Link>
            </ul>
            <ul className="flex gap-5 items-center">
                <Link to="#">
                    <li className="hover:text-[--text-color] duration-200 flex items-center text-xs">
                        <span>&copy; 2024 F16S</span>
                    </li>
                </Link>
            </ul>
        </div>
    );
}
