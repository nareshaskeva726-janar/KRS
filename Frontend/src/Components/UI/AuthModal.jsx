import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { assets } from "../../assets/assets";
import {
    useLoginMutation,
} from "../../Store/APIS/krsApi";

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loginUser, { isLoading: loginLoading }] =
        useLoginMutation();

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({
                email: formData.email,
                password: formData.password,
            }).unwrap();

            toast.success(res?.message || "Login successful");

            onClose();

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 300);

            setFormData({
                email: "",
                password: "",
            });
        } catch (error) {
            console.log("LOGIN ERROR FULL:", error);

            toast.error(
                error?.data?.message ||
                error?.error ||
                "Login failed"
            );
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">

                {/* BACKDROP */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                {/* MODAL */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-[92%] max-w-md rounded-3xl bg-white shadow-2xl p-8 z-10"
                >
                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                        <X size={18} />
                    </button>

                    {/* LOGO */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={assets.newKrs}
                            alt="Logo"
                            className="h-20 w-auto object-contain"
                        />
                    </div>

                    {/* TITLE */}
                    <h2 className="text-3xl font-extrabold text-center text-gray-900">
                        Welcome Back
                    </h2>

                    <p className="text-sm text-gray-500 text-center mt-2">
                        Login to continue shopping
                    </p>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">



                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
                            required
                        />

                        {/* PASSWORD */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}
                            </button>
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full py-3 mt-3  rounded-xl bg-[#C6181E] hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
                        >
                            {loginLoading
                                ? "Please wait..."
                                : "Login"
                            }
                        </button>
                    </form>

                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;