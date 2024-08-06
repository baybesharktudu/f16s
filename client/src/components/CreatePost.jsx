import { FilePlus2, Minimize2, PencilRuler, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function CreatePost() {
    const [onModal, setOnModal] = useState(false);
    const [picCreate, setPicCreate] = useState(null);
    const fileRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicCreate(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="fixed right-10 bottom-10">
            {onModal && (
                <div
                    onClick={() => setOnModal(!onModal)}
                    className="duration-300 flex flex-col justify-center items-center backdrop-blur-[1px] ease-in-out transition-all fixed top-0 right-0 left-0 bottom-0 bg-black/10  "
                >
                    <form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleSubmit}
                        className={`relative flex duration-1000 transition-all ease-linear flex-col gap-4 rounded-lg p-4 w-10/12 border-2 border-[var(--text-color)] sm:w-96 lg:w-[500px] bg-[var(--bg-color)]`}
                    >
                        <h1 className="text-[var(--main-color)]">create a post</h1>
                        <textarea
                            spellCheck={false}
                            placeholder="Create something..."
                            className="resize-none scroll-post w-full h-32 placeholder:text-[var(--sub-color)] rounded-lg bg-[var(--sub-alt-color)] text-sm p-4 focus:outline-none"
                        ></textarea>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                            ref={fileRef}
                        />
                        <div className="flex justify-between items-center gap-4">
                            <button
                                type="button"
                                onClick={() => fileRef.current.click()}
                                className="p-2 bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)] rounded-lg duration-300"
                            >
                                <FilePlus2 className="text-[var(--main-color)] hover:text-[var(--sub-alt-color)]" />
                            </button>
                            {picCreate && (
                                <div className="duration-300 flex items-end gap-2 text-xs text-[var(--sub-color)] ">
                                    <span className="leading-none">Add photo successfully</span>
                                    <button type="button" onClick={() => setPicCreate(null)}>
                                        <X className="w-4 h-4 text-[var(--error-color)]" />
                                    </button>
                                </div>
                            )}
                            <div className="flex-1 flex justify-end">
                                <button
                                    type="submit"
                                    className="duration-300 bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)] rounded-lg p-2"
                                >
                                    <PencilRuler className="duration-300 text-[var(--main-color)] hover:text-[var(--sub-alt-color)]" />
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="duration-300 absolute transition-all ease-in-out hover:scale-125 top-4 right-4"
                            onClick={() => setOnModal(!onModal)}
                        >
                            <Minimize2 className="w-5 h-5 text-[var(--error-color)]" />
                        </button>
                    </form>
                </div>
            )}
            <button
                type="button"
                onClick={() => setOnModal(!onModal)}
                className="duration-300 ease-linear transition-all p-2 bg-[var(--sub-alt-color)] rounded-lg hover:text-[var(--sub-alt-color)] hover:bg-[var(--text-color)]"
            >
                <PencilRuler />
            </button>
        </div>
    );
}
