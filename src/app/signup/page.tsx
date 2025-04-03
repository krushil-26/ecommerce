"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupUser } from "@/frontendApi/auth";

const SignUpPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await signupUser(formData);
            alert("Signup successful! Redirecting to login...");
            router.push("/login"); // Redirect to login page
          } catch (error: any) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

                {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter Name"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter Email"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter Password"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
