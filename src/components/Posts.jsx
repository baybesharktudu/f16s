import { ThumbsUp, Trash, User } from 'lucide-react';
import CheckSizeImg from './CheckSizeImg';

export default function Posts() {
    const data = [
        {
            image: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/449064757_1199845957696191_1459502222011438260_n.jpg?stp=dst-jpg_s600x600&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFQTzaXxz9DMNBJgPd7dEo0CeUKUOrdlucJ5QpQ6t2W55EWO34RIpNVcIULiTkfRq2t6A5URxmYxXAhVvhiBDXJ&_nc_ohc=xvgIqdBamK8Q7kNvgEQr-3l&_nc_ht=scontent.fdad3-1.fna&oh=00_AYC2qHnwXmCnPj-2i3cqhePkmV3N3T0iov6n9tqneGLT2w&oe=66B8480E',
        },
        {
            image: 'https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp',
        },
        {
            image: 'https://images.unsplash.com/photo-1556379092-dca659792591?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            image: 'https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp',
        },
        {
            image: 'https://img.freepik.com/free-photo/snowy-mountain-peak-starry-galaxy-majesty-generative-ai_188544-9650.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722902400&semt=ais_hybrid',
        },
        {
            image: 'https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp',
        },
        {
            image: 'https://images3.alphacoders.com/135/1350069.jpeg',
        },
        {
            image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfnxak0-a0a19958-0048-4def-b585-a3c605c9ee85.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE4YWNkMzY5LWVhNDQtNDcxYi1hZWViLTllNmU4ZTNlZDlkNVwvZGZueGFrMC1hMGExOTk1OC0wMDQ4LTRkZWYtYjU4NS1hM2M2MDVjOWVlODUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.nPi0fe6A8EDILpB7k3RPUfWaNIxqQJi_NdkinPfQ1eM',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.map((img, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-4 w-full p-4 bg-[var(--sub-alt-color)] rounded-lg relative"
                >
                    <div className="flex items-center gap-4 pr-4">
                        <div className="flex gap-4">
                            <User className="p-1 text-[var(--sub-alt-color)] bg-[var(--sub-color)] sm:w-10 sm:h-10 rounded-full" />
                            <div className="flex flex-col justify-center items-start">
                                <h1 className="text-xs">PhanBaNhat</h1>
                                <span className="text-[10px] text-[var(--sub-color)]">
                                    05 -04 - 2024
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs">Post title</span>
                    </div>
                    <div className="h-72 sm:h-96">
                        <CheckSizeImg img={img} />
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                        <button className="flex items-center gap-2 text-[var(--sub-color)] hover:text-[var(--text-color)]">
                            <ThumbsUp className="hover:origin-bottom hover:-rotate-12 active: duration-300" />
                            <span className="text-xs duration-300">10</span>
                        </button>
                    </div>
                    <button className="absolute top-4 right-4">
                        <Trash className="w-4 h-4 text-[var(--colorful-error-color)]" />
                    </button>
                </div>
            ))}
        </div>
    );
}
