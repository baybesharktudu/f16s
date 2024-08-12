import { FilePlus2, Minimize2, PencilRuler, X, PenLine } from 'lucide-react';
import { useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { createPostFailure, createPostStart, createPostSucces } from '../redux/post/postSlice.js';

export default function CreatePost() {
    const dispatch = useDispatch();
    const fileRef = useRef();

    const [onModal, setOnModal] = useState(false);
    const [picCreate, setPicCreate] = useState(null);
    const [imageDown, setImageDown] = useState(null);

    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicCreate(file);
            setImageUploadError(null);
        }
    };

    const change = async (downloadURL) => {
        try {
            dispatch(createPostStart());
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, picturePost: downloadURL }),
            });

            const data = await res.json();

            if (!res.ok) {
                dispatch(createPostFailure(error.message));
            }

            if (res.ok) {
                setOnModal(false);
                setImageDown(null);
                setPicCreate(null);
                dispatch(createPostSucces(data));
            }
        } catch (error) {
            dispatch(createPostFailure(error.message));
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
                        setImageDown(downloadURL);
                        change(downloadURL);
                    });
                },
            );
        } catch (error) {
            setImageUploadError('Image upload failed < 2MB');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setOnModal(false);
        setPicCreate(null);
        setImageDown(null);
        setImageUploadError(null);
    };

    return (
        <div className="fixed right-10 bottom-10">
            {onModal && (
                <div
                    onClick={handleCloseModal}
                    className="duration-300 flex flex-col justify-center items-center backdrop-blur-[1px] ease-in-out transition-all fixed top-0 right-0 left-0 bottom-0 bg-black/10  "
                >
                    <form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleSubmit}
                        className={`relative flex duration-1000 transition-all ease-linear flex-col gap-4 rounded-lg p-4 w-10/12 border-2 border-[var(--text-color)] sm:w-96 lg:w-[500px] bg-[var(--bg-color)]`}
                    >
                        <h1 className="text-[var(--main-color)] text-lg">
                            <PenLine />
                        </h1>
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
                                    <button
                                        className="flex gap-2 items-end"
                                        type="button"
                                        onClick={() => setPicCreate(null)}
                                    >
                                        <X className="w-4 h-4 hover:scale-125 duration-300 text-[var(--error-color)]" />
                                        {imageUploadProgress && (
                                            <span className="leading-none text-[--main-color]">
                                                {imageUploadProgress}%
                                            </span>
                                        )}
                                        {imageUploadError && (
                                            <span className="text-[--error-color] leading-none">
                                                {imageUploadError} {'(< 2MB)'}
                                            </span>
                                        )}{' '}
                                        {imageDown && (
                                            <span className="text-green-600 leading-none">
                                                upload successfully
                                            </span>
                                        )}
                                    </button>
                                </div>
                            )}
                            {!picCreate && (
                                <span className="text-[var(--error-color)]">
                                    {imageUploadError}
                                </span>
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
                            onClick={handleCloseModal}
                        >
                            <Minimize2 className="w-5 h-5 text-[var(--error-color)]" />
                        </button>
                    </form>
                </div>
            )}
            <button
                type="button"
                onClick={() => setOnModal(true)}
                className="duration-300 p-2 rounded-lg bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)] text-[var(--main-color)] hover:text-[var(--sub-alt-color)]"
            >
                <PencilRuler />
            </button>
        </div>
    );
}
