import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
    CreditCard,
    Banknote,
    Wallet,
    ShieldCheck,
    Truck,
    ArrowLeft,
    CheckCircle2,
    MapPin,
    User,
    Mail,
    Phone,
    Sparkles,
} from "lucide-react";

const BillingPage = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [errors, setErrors] = useState({});
    const [placed, setPlaced] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const delivery = subtotal > 999 ? 0 : 49;
    const tax = subtotal * 0.05;
    const total = subtotal + delivery + tax;

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        if (!form.phone.trim()) e.phone = "Phone is required";
        if (!form.address.trim()) e.address = "Address is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        setPlaced(true);
        toast.success("Order placed successfully!");
        setTimeout(() => {
            clearCart?.();
            navigate("/");
        }, 2800);
    };

    const paymentOptions = [
        {
            id: "razorpay",
            label: "Razorpay",
            sub: "UPI · Cards · Netbanking",
            icon: <CreditCard size={18} className="text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            id: "stripe",
            label: "Stripe",
            sub: "International card payments",
            icon: <Wallet size={18} className="text-purple-600" />,
            bg: "bg-purple-50",
        },
        {
            id: "cod",
            label: "Cash on Delivery",
            sub: "Pay when you receive",
            icon: <Banknote size={18} className="text-emerald-600" />,
            bg: "bg-emerald-50",
        },
    ];

    if (placed) {
        return (
            <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-sm"
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={36} className="text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h2>
                    <p className="text-gray-500 text-sm mb-1">Thank you, {form.name}.</p>
                    <p className="text-gray-400 text-sm">Redirecting you to home...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafaf9] py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* back */}
                <button
                    onClick={() => navigate("/products")}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-600 bg-white border border-gray-200 hover:border-red-200 px-4 py-2 rounded-xl transition-all duration-200"
                >
                    <ArrowLeft size={15} />
                    Back to Products
                </button>

                {/* page heading */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C6181E] text-xs font-bold tracking-widest uppercase">
                        Final Step
                    </p>
                    <h1 className="text-4xl font-black tracking-tight text-[#073273] mt-4">
                        Billing & <span className="text-[#C6181E]">Checkout</span>
                    </h1>
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* ── LEFT: billing form ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="space-y-5"
                    >
                        {/* personal details card */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6">
                            <h2 className="text-base font-black text-gray-900 mb-5 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                                    <User size={14} className="text-red-600" />
                                </span>
                                Personal Details
                            </h2>

                            <div className="space-y-3">
                                {/* name */}
                                <div className="relative">
                                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className={`w-full h-12 pl-10 pr-4 rounded-2xl border bg-gray-50 text-sm font-medium placeholder-gray-400 outline-none focus:bg-white transition-colors ${errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"
                                            }`}
                                    />
                                    {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
                                </div>

                                {/* email */}
                                <div className="relative">
                                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={`w-full h-12 pl-10 pr-4 rounded-2xl border bg-gray-50 text-sm font-medium placeholder-gray-400 outline-none focus:bg-white transition-colors ${errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"
                                            }`}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                                </div>

                                {/* phone */}
                                <div className="relative">
                                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className={`w-full h-12 pl-10 pr-4 rounded-2xl border bg-gray-50 text-sm font-medium placeholder-gray-400 outline-none focus:bg-white transition-colors ${errors.phone ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"
                                            }`}
                                    />
                                    {errors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* delivery address card */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6">
                            <h2 className="text-base font-black text-gray-900 mb-5 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                                    <MapPin size={14} className="text-red-600" />
                                </span>
                                Delivery Address
                            </h2>
                            <div className="relative">
                                <MapPin size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                                <textarea
                                    placeholder="House / Street / Area / City / Pincode"
                                    rows={4}
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border bg-gray-50 text-sm font-medium placeholder-gray-400 outline-none focus:bg-white transition-colors resize-none ${errors.address ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"
                                        }`}
                                />
                                {errors.address && <p className="text-xs text-red-500 mt-1 ml-1">{errors.address}</p>}
                            </div>
                        </div>

                        {/* feature badges */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4">
                                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                    <Truck size={16} className="text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Fast Delivery</p>
                                    <p className="text-xs text-gray-400">Within 24 hrs</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4">
                                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={16} className="text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Secure Checkout</p>
                                    <p className="text-xs text-gray-400">Encrypted &amp; safe</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: payment + summary ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5 lg:sticky lg:top-8"
                    >
                        {/* payment method */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6">
                            <h2 className="text-base font-black text-gray-900 mb-5 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                                    <CreditCard size={14} className="text-red-600" />
                                </span>
                                Payment Method
                            </h2>

                            <div className="space-y-3">
                                {paymentOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setPaymentMethod(opt.id)}
                                        className={`w-full flex items-center gap-4 border rounded-2xl px-4 py-3.5 text-left transition-all duration-200 ${paymentMethod === opt.id
                                            ? "border-red-400 bg-red-50"
                                            : "border-gray-100 hover:border-gray-200 bg-gray-50"
                                            }`}
                                    >
                                        <div className={`w-9 h-9 rounded-xl ${opt.bg} flex items-center justify-center shrink-0`}>
                                            {opt.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-gray-900">{opt.label}</p>
                                            <p className="text-xs text-gray-400">{opt.sub}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${paymentMethod === opt.id ? "border-red-500 bg-red-500" : "border-gray-300"
                                            }`}>
                                            {paymentMethod === opt.id && (
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* order summary */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6">
                            <h2 className="text-base font-black text-gray-900 mb-4">Order Summary</h2>

                            {/* cart item previews */}
                            {cartItems.length > 0 && (
                                <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                                    {cartItems.slice(0, 3).map((item) => (
                                        <div key={item.id} className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-9 h-9 rounded-lg object-cover border border-gray-100 shrink-0"
                                                />
                                                <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
                                            </div>
                                            <span className="text-xs font-bold text-gray-700 shrink-0">
                                                ×{item.qty}
                                            </span>
                                        </div>
                                    ))}
                                    {cartItems.length > 3 && (
                                        <p className="text-xs text-gray-400">+{cartItems.length - 3} more items</p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Delivery</span>
                                    <span className={`font-semibold ${delivery === 0 ? "text-emerald-600" : "text-gray-800"}`}>
                                        {delivery === 0 ? "Free" : `₹${delivery}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">GST (5%)</span>
                                    <span className="font-semibold text-gray-800">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                                    <span className="font-black text-gray-900">Total</span>
                                    <span className="font-black text-[#C6181E] text-2xl tracking-tight">
                                        ₹{total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                className="w-full mt-5 h-14 rounded-2xl bg-[#C6181E] hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_8px_24px_rgba(220,38,38,0.25)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.35)]"
                            >
                                {paymentMethod === "cod" ? (
                                    <><Banknote size={17} /> Place Order</>
                                ) : (
                                    <><ShieldCheck size={17} /> Pay ₹{total.toFixed(2)}</>
                                )}
                            </motion.button>

                            <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                                <Sparkles size={11} className="text-red-300" />
                                Secure payments powered by KRS Lifeline
                            </p>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;