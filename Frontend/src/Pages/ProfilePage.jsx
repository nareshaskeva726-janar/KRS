import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { User, Mail, Lock } from "lucide-react";

const ProfilePage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleMode = () => setIsLogin((prev) => !prev);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">

            {/* BACKGROUND ANIMATION */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute w-[500px] h-[500px] bg-red-200 blur-3xl rounded-full opacity-30 top-10 left-10"
            />

            {/* CARD */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative z-10"
            >

                {/* LOGO */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center mb-6"
                >
                    <img
                        src={assets.logo}
                        alt="Logo"
                        className="w-20 h-20 object-contain rounded-xl"
                    />

                    <h2 className="text-2xl font-extrabold mt-3">
                        KRS Lifeline
                    </h2>
                </motion.div>

                {/* TITLE */}
                <motion.h3
                    key={isLogin}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-xl font-bold text-center mb-6"
                >
                    {isLogin ? "Welcome Back !" : "Create Account !"}
                </motion.h3>

                {/* FORM */}
                <form className="space-y-4">

                    {/* NAME (Signup only) */}
                    <AnimatePresence>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative"
                            >
                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-red-500"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* EMAIL */}
                    <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                    >
                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-red-500"
                        />
                    </motion.div>

                    {/* PASSWORD */}
                    <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-red-500"
                        />
                    </motion.div>

                    {/* BUTTON */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </motion.button>
                </form>

                {/* SWITCH */}
                <motion.p
                    className="text-center text-sm mt-6 text-gray-600"
                >
                    {isLogin ? "Don't have an account?" : "Already have an account?"}

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMode}
                        className="text-red-600 font-semibold ml-2 hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </motion.button>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default ProfilePage;