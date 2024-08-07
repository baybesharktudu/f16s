import { UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [data, setData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setData({});
                return setError(data.message);
            }

            setData(data);
            setError('');
            setFormData({
                username: '',
                email: '',
                password: '',
            });
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
                <input
                    className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                    placeholder="username"
                    type="text"
                    id="username"
                    onChange={(e) =>
                        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
                    }
                    value={formData.username}
                />

                <input
                    className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                    placeholder="email"
                    type="email"
                    id="email"
                    onChange={(e) =>
                        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
                    }
                    value={formData.email}
                />
                <input
                    className="w-full py-2 px-3 rounded-lg bg-[var(--sub-alt-color)] placeholder:text-[var(--sub-color)]  focus:outline-none focus:outline-[var(--text-color)]"
                    placeholder="password"
                    type="password"
                    id="password"
                    onChange={(e) =>
                        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
                    }
                    value={formData.password}
                />
                <button
                    type="submit"
                    className={`hover:bg-[var(--text-color)] duration-300 hover:text-[var(--sub-alt-color)] text-[var(--text-color)] bg-[var(--sub-alt-color)] w-full flex justify-center items-start gap-1 py-2 px-3 rounded-lg `}
                >
                    <UserPlus className="w-4 h-4" />
                    <span>sign up</span>
                </button>
            </form>
            <div className="h-4">
                {error && <span className="duration-300 text-[var(--error-color)]">{error}</span>}
                {data.message && (
                    <span className="duration-300 text-green-600">{data.message}</span>
                )}
            </div>
        </div>
    );
}
