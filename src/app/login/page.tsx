 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/frontendApi/auth";
import Link from "next/link";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error
        try {
            const data = await loginUser(form.email, form.password);
            localStorage.setItem("token", data.token);
            router.push("/");
          } catch (err: any) {
            setError(err.message);
          }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="block mb-2">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                            placeholder="Enter Email"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-gray-700">Password</span>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                            placeholder="Enter Password"
                        />
                    </label>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
   