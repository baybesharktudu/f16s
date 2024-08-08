import { FilePlus2, Minimize2, PencilRuler, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';

export default function CreatePost() {
    const [onModal, setOnModal] = useState(false);
    const [picCreate, setPicCreate] = useState(null);
    const fileRef = useRef();

    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicCreate(file);
        }
    };

    const change = async (downloadURL) => {
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, picturePost: downloadURL }),
            });
            const data = await res.json();

            if (res.ok) {
                setOnModal(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!picCreate) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + picCreate.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, picCreate);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        change(downloadURL);
                    });
                },
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
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
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                className="p-2 bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)] text-[var(--main-color)] hover:text-[var(--sub-alt-color)] rounded-lg duration-300"
                            >
                                <FilePlus2 />
                            </button>
                            {picCreate && (
                                <div className="duration-300 flex items-end gap-2 text-xs text-[var(--sub-color)] ">
                                    <span className="leading-none">Add photo successfully</span>
                                    <button type="button" onClick={() => setPicCreate(null)}>
                                        <X className="w-4 h-4 hover:scale-125 duration-300 text-[var(--error-color)]" />
                                    </button>
                                </div>
                            )}
                            <div className="flex-1 flex justify-end">
                                <button
                                    type="submit"
                                    className="duration-300 bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)] text-[var(--main-color)] hover:text-[var(--sub-alt-color)] rounded-lg p-2"
                                >
                                    <PencilRuler />
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
                className="duration-300 p-2 rounded-lg bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)] text-[var(--main-color)] hover:text-[var(--sub-alt-color)]"
            >
                <PencilRuler />
            </button>
        </div>
    );
}
