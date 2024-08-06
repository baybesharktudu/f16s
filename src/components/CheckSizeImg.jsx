import { useState } from 'react';

export default function CheckSizeImg({ img }) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleImageLoad = (event) => {
        setWidth(parseInt(event.target.naturalWidth) + 200);
        setHeight(event.target.naturalHeight);
    };

    return (
        <div className="h-72 sm:h-96">
            <img
                onLoad={handleImageLoad}
                className={`${
                    height > width ? 'object-contain bg-[var(--bg-color)]' : 'object-cover'
                } w-full h-full rounded-lg`}
                src={img.image}
                alt=""
            />
        </div>
    );
}
