import React from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Gem,
    Store,
    Video,
    Star,
    Smartphone,
} from "lucide-react";

import { assets } from "../assets/assets";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const AboutPage = () => {
    return (
        <div className="bg-[#0b0b0f] text-white min-h-screen">

            {/* HERO */}
            <div className="relative overflow-hidden">

                {/* Red Glow Background */}
                <div className="absolute inset-0">
                    <div className="absolute w-[500px] h-[500px] bg-red-600/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
                    <div className="absolute w-[400px] h-[400px] bg-white/10 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">

                    {/* LOGO */}
                    <motion.img
                        src={assets.logo}
                        alt="KRS Lifeline"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-40 mx-auto mb-6 drop-shadow-2xl"
                    />

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        About{" "}
                        <span className="text-red-500">KRS Lifeline</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 mt-4 max-w-2xl mx-auto"
                    >
                        Your trusted destination for trending, innovative & affordable lifestyle products.
                    </motion.p>
                </div>
            </div>

            {/* STORY */}
            <div className="max-w-7xl mx-auto px-6 py-14">

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="bg-[#14141a] border border-red-500/20 rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-red-500 mb-4">
                        Our Story
                    </h2>

                    <p className="text-gray-300 leading-7">
                        What started as an expo-based stall business has now grown into a
                        modern omnichannel brand. We bring viral Instagram products,
                        practical home essentials, and innovative gadgets directly to
                        customers at the best price.
                    </p>

                    <p className="text-gray-400 mt-4 leading-7">
                        KRS Lifeline focuses on quality, affordability, and trend-driven
                        products that actually improve everyday life.
                    </p>
                </motion.div>
            </div>

            {/* WHY CHOOSE US */}
            <div className="max-w-7xl mx-auto px-6 pb-16">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center text-3xl font-bold mb-10"
                >
                    Why Choose Us
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >

                    {[
                        { icon: TrendingUp, title: "Trending Products", desc: "Instagram & viral items" },
                        { icon: Gem, title: "Premium Quality", desc: "Best quality at fair pricing" },
                        { icon: Store, title: "Retail & Wholesale", desc: "Flexible buying options" },
                        { icon: Video, title: "Live Demos", desc: "Real product experience" },
                        { icon: Star, title: "Trusted Brand", desc: "Built through customer trust" },
                        { icon: Smartphone, title: "Online + Offline", desc: "Seamless shopping experience" },
                    ].map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-[#14141a] border border-white/10 rounded-2xl p-6 hover:border-red-500/40 transition"
                            >
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-4">
                                    <Icon />
                                </div>

                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* MISSION */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 py-14 mt-10">
                <div className="max-w-4xl mx-auto text-center px-6">

                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>

                    <p className="text-white/90">
                        To make trending, useful, and innovative products accessible to
                        everyone while delivering a premium shopping experience.
                    </p>

                    <p className="text-white/70 text-sm mt-4">
                        KRS Lifeline — Smarter Living Starts Here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;