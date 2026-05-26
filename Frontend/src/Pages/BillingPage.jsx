import { useState } from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    Banknote,
    Wallet,
    ShieldCheck,
    Truck,
} from "lucide-react";
import { toast } from "react-hot-toast"

const BillingPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("razorpay");

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-white px-4 py-10">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Billing & Checkout
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Secure payment powered by trusted gateways
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* LEFT - BILLING FORM */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        className="bg-white border rounded-3xl p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-bold mb-5">
                            Billing Details
                        </h2>

                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
                            />

                            <textarea
                                placeholder="Full Address"
                                rows={3}
                                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        {/* FEATURES */}
                        <div className="grid grid-cols-2 gap-3 mt-6 text-center">
                            <div className="p-3 bg-red-50 rounded-xl">
                                <Truck className="mx-auto text-red-600" />
                                <p className="text-xs mt-1">Fast Delivery</p>
                            </div>

                            <div className="p-3 bg-red-50 rounded-xl">
                                <ShieldCheck className="mx-auto text-red-600" />
                                <p className="text-xs mt-1">Secure Checkout</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT - PAYMENT */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ duration: 0.6 }}
                        className="bg-white border rounded-3xl p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-bold mb-5">
                            Payment Method
                        </h2>

                        <div className="space-y-4">

                            {/* RAZORPAY */}
                            <div
                                onClick={() => setPaymentMethod("razorpay")}
                                className={`flex items-center gap-4 border p-4 rounded-2xl cursor-pointer transition ${paymentMethod === "razorpay"
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                    }`}
                            >
                                <img
                                    src="https://razorpay.com/favicon.png"
                                    className="w-8 h-8"
                                />
                                <div>
                                    <p className="font-semibold">Razorpay</p>
                                    <p className="text-xs text-gray-500">
                                        Pay using UPI / Cards / Netbanking
                                    </p>
                                </div>
                                <CreditCard className="ml-auto text-gray-500" />
                            </div>

                            {/* STRIPE */}
                            <div
                                onClick={() => setPaymentMethod("stripe")}
                                className={`flex items-center gap-4 border p-4 rounded-2xl cursor-pointer transition ${paymentMethod === "stripe"
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                    }`}
                            >
                                <img
                                    src="https://stripe.com/img/v3/home/twitter.png"
                                    className="w-8 h-8 rounded"
                                />
                                <div>
                                    <p className="font-semibold">Stripe</p>
                                    <p className="text-xs text-gray-500">
                                        International card payments
                                    </p>
                                </div>
                                <Wallet className="ml-auto text-gray-500" />
                            </div>

                            {/* CASH ON DELIVERY */}
                            <div
                                onClick={() => setPaymentMethod("cod")}
                                className={`flex items-center gap-4 border p-4 rounded-2xl cursor-pointer transition ${paymentMethod === "cod"
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                    }`}
                            >
                                <Banknote className="text-green-600" />
                                <div>
                                    <p className="font-semibold">
                                        Cash on Delivery
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Pay when you receive product
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ORDER SUMMARY */}
                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹2,999</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span className="text-green-600">Free</span>
                            </div>

                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-red-600">₹2,999</span>
                            </div>
                        </div>

                        {/* PAY BUTTON */}
                        <motion.button
                            onClick={() => toast.success("Order Placed successfully!")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-6 bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition"
                        >
                            {paymentMethod === "cod"
                                ? "Place Order"
                                : "Pay Now"}
                        </motion.button>

                        <p className="text-center text-xs text-gray-400 mt-3">
                            Secure payments powered by KRS Lifeline
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;