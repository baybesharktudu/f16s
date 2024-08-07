import { Check, LoaderCircle, UserPlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SignUp() {
    const [formData, setFormData] = useState({});

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [mesUsername, setMesUsername] = useState({});

    const [isLoadingEmail, setIsLoadingEmail] = useState(false);
    const [mesEmail, setMesEmail] = useState({});

    useEffect(() => {
        const fetchUsername = async () => {
            if (formData.username && formData.username !== '') {
                setLoading(true);
                try {
                    const res = await fetch(
                        `/api/auth/signup/check-username?username=${formData.username}`,
                    );
                    const data = await res.json();

                    setLoading(false);
                    setMesUsername(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchUsername();
        if (formData.username === '') setMesUsername({});
    }, [formData.username]);

    useEffect(() => {
        const fetchEmail = async () => {
            if (formData.email && formData.email !== '') {
                setIsLoadingEmail(true);
                try {
                    const res = await fetch(`/api/auth/signup/check-email?email=${formData.email}`);
                    const data = await res.json();

                    setIsLoadingEmail(false);
                    setMesEmail(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchEmail();
        if (formData.email === '') setMesEmail({});
    }, [formData.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.verify_password
        ) {
            return setError('Fill in all fields');
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) return setError(data.message);
            setMessage(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full sm:w-72 flex flex-col gap-3 text-[var(--sub-color)]">
            <div className="flex items-end gap-2">
                <UserPlus />
                <h1>register</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[var(--text-color)]">
                <div className="relative">
                    <input
                        className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                        placeholder="username"
                        type="text"
                        id="username"
                        onChange={(e) =>
                            setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
                        }
                    />
                    {isLoading === true ? (
                        <div className="absolute right-2 top-[50%] translate-y-[-50%]">
                            <LoaderCircle className="animate-spin w-4 h-4 text-[var(--main-color)]" />
                        </div>
                    ) : (
                        <>
                            {mesUsername.success === true && formData.username !== '' && (
                                <Check className="absolute top-[50%] translate-y-[-50%] w-4 h-4 text-[var(--main-color)] right-2" />
                            )}
                            {mesUsername.success === false && (
                                <X className="absolute top-[50%] translate-y-[-50%] w-4 h-4 text-[var(--error-color)] right-2" />
                            )}
                        </>
                    )}
                </div>
                <div className="relative">
                    <input
                        className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                        placeholder="email"
                        type="email"
                        id="email"
                        onChange={(e) =>
                            setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
                        }
                    />
                    {isLoadingEmail === true ? (
                        <div className="absolute right-2 top-[50%] translate-y-[-50%]">
                            <LoaderCircle className="animate-spin w-4 h-4 text-[var(--main-color)]" />
                        </div>
                    ) : (
                        <>
                            {mesEmail.success === true && formData.email !== '' && (
                                <Check className="absolute top-[50%] translate-y-[-50%] w-4 h-4 text-[var(--main-color)] right-2" />
                            )}
                            {mesEmail.success === false && (
                                <X className="absolute top-[50%] translate-y-[-50%] w-4 h-4 text-[var(--error-color)] right-2" />
                            )}
                        </>
                    )}
                </div>

                <input
                    className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                    placeholder="password"
                    type="password"
                    id="password"
                    onChange={(e) =>
                        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
                    }
                />
                <input
                    className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                    placeholder="verify password"
                    type="password"
                    id="verify_password"
                    onChange={(e) =>
                        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
                    }
                />
                <button
                    type="submit"
                    className={`hover:bg-[var(--text-color)] duration-300 hover:text-[var(--sub-alt-color)] text-[var(--text-color)] bg-[var(--sub-alt-color)] w-full flex justify-center items-start gap-1 py-2 px-3 rounded-lg `}
                >
                    <UserPlus className="w-4 h-4" />
                    <span>sign up</span>
                </button>
            </form>
            {error && <span className="duration-300 text-[var(--error-color)]">{error}</span>}
            {message && <span className="duration-300 text-green-600">{message}</span>}
        </div>
    );
}
