// BillingModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
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
    X,
} from "lucide-react";

const BillingModal = ({ isOpen, onClose }) => {
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
            onClose();           // close modal
            navigate("/");       // redirect to home
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

    // Reset modal state when closed
    const handleClose = () => {
        if (!placed) {
            setPlaced(false);
            setForm({ name: "", email: "", phone: "", address: "" });
            setErrors({});
            setPaymentMethod("razorpay");
        }
        onClose();
    };

    if (!isOpen) return null;

    // Order placed view inside modal
    if (placed) {
        return (
            <AnimatePresence>
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-[92%] max-w-md rounded-3xl bg-white shadow-2xl p-8 z-10 text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={36} className="text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h2>
                        <p className="text-gray-500 text-sm mb-1">Thank you, {form.name}.</p>
                        <p className="text-gray-400 text-sm">Redirecting you to home...</p>
                    </motion.div>
                </div>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* BACKDROP */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                {/* MODAL CONTENT */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#fafaf9] shadow-2xl z-10"
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition"
                    >
                        <X size={18} />
                    </button>

                    <div className="p-6 md:p-8">
                        {/* HEADER */}
                        <div className="mb-6">
                            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C6181E] text-xs font-bold tracking-widest uppercase">
                                Final Step
                            </p>
                            <h1 className="text-3xl font-black tracking-tight text-[#073273] mt-3">
                                Billing & <span className="text-[#C6181E]">Checkout</span>
                            </h1>
                        </div>

                        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
                            {/* LEFT: FORM */}
                            <div className="space-y-5">
                                {/* Personal Details */}
                                <div className="bg-white border border-gray-100 rounded-3xl p-5">
                                    <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                                            <User size={14} className="text-red-600" />
                                        </span>
                                        Personal Details
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className={`w-full h-12 pl-10 pr-4 rounded-2xl border bg-gray-50 text-sm font-medium outline-none focus:bg-white transition ${errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"}`}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
                                        </div>
                                        <div className="relative">
                                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                className={`w-full h-12 pl-10 pr-4 rounded-2xl border bg-gray-50 text-sm font-medium outline-none focus:bg-white transition ${errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"}`}
                                            />
                                            {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                                        </div>
                                        <div className="relative">
                                            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Phone Number"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                className={`w-full h-12 pl-10 pr-4 rounded-2xl border bg-gray-50 text-sm font-medium outline-none focus:bg-white transition ${errors.phone ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"}`}
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="bg-white border border-gray-100 rounded-3xl p-5">
                                    <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
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
                                            className={`w-full pl-10 pr-4 py-3 rounded-2xl border bg-gray-50 text-sm font-medium outline-none resize-none focus:bg-white transition ${errors.address ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-red-400"}`}
                                        />
                                        {errors.address && <p className="text-xs text-red-500 mt-1 ml-1">{errors.address}</p>}
                                    </div>
                                </div>

                                {/* Feature badges */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3">
                                        <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                                            <Truck size={14} className="text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Fast Delivery</p>
                                            <p className="text-xs text-gray-400">Within 24 hrs</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3">
                                        <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                                            <ShieldCheck size={14} className="text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Secure Checkout</p>
                                            <p className="text-xs text-gray-400">Encrypted & safe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: PAYMENT + SUMMARY */}
                            <div className="space-y-5">
                                {/* Payment Method */}
                                <div className="bg-white border border-gray-100 rounded-3xl p-5">
                                    <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                                            <CreditCard size={14} className="text-red-600" />
                                        </span>
                                        Payment Method
                                    </h2>
                                    <div className="space-y-2.5">
                                        {paymentOptions.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setPaymentMethod(opt.id)}
                                                className={`w-full flex items-center gap-3 border rounded-xl px-3 py-2.5 text-left transition-all ${paymentMethod === opt.id
                                                    ? "border-red-400 bg-red-50"
                                                    : "border-gray-100 hover:border-gray-200 bg-gray-50"
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg ${opt.bg} flex items-center justify-center shrink-0`}>
                                                    {opt.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-sm text-gray-900">{opt.label}</p>
                                                    <p className="text-xs text-gray-400">{opt.sub}</p>
                                                </div>
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === opt.id ? "border-red-500 bg-red-500" : "border-gray-300"}`}>
                                                    {paymentMethod === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-white border border-gray-100 rounded-3xl p-5">
                                    <h2 className="text-base font-black text-gray-900 mb-3">Order Summary</h2>
                                    {cartItems.length > 0 && (
                                        <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
                                            {cartItems.slice(0, 3).map((item) => (
                                                <div key={item.id} className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover border" />
                                                        <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-700 shrink-0">×{item.qty}</span>
                                                </div>
                                            ))}
                                            {cartItems.length > 3 && (
                                                <p className="text-xs text-gray-400">+{cartItems.length - 3} more items</p>
                                            )}
                                        </div>
                                    )}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Subtotal</span>
                                            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Delivery</span>
                                            <span className={delivery === 0 ? "text-emerald-600 font-semibold" : "font-semibold"}>
                                                {delivery === 0 ? "Free" : `₹${delivery}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">GST (5%)</span>
                                            <span className="font-semibold">₹{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-2 flex justify-between items-baseline">
                                            <span className="font-black text-gray-900">Total</span>
                                            <span className="font-black text-[#C6181E] text-xl">₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleSubmit}
                                        className="w-full mt-4 h-12 rounded-xl bg-[#C6181E] hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md"
                                    >
                                        {paymentMethod === "cod" ? (
                                            <><Banknote size={16} /> Place Order</>
                                        ) : (
                                            <><ShieldCheck size={16} /> Pay ₹{total.toFixed(2)}</>
                                        )}
                                    </motion.button>
                                    <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                                        <Sparkles size={10} className="text-red-300" />
                                        Secure payments powered by KRS Lifeline
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BillingModal;