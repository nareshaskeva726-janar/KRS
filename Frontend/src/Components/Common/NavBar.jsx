import { useState, useRef } from "react";
import { ShoppingCart, User, X } from "lucide-react";
import { TbMenuDeep } from "react-icons/tb";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useCart } from "../../context/CartContext";
import CartModal from "../UI/CartModal";
import { motion } from "framer-motion";
import AuthModal from "../UI/AuthModal";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
];

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [hoverCart, setHoverCart] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    const { cartItems, cartCount } = useCart();
    const navigate = useNavigate();

    const hoverTimeout = useRef(null);

    const closeDrawer = () => setDrawerOpen(false);

    const handleMouseEnter = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        setHoverCart(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setHoverCart(false);
        }, 180);
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#f9fafc] border-gray-300 border-b-1 shadow-sm  p-2">

                

                <div className="max-w-7xl mx-auto px-2 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        {/* LOGO */}
                        <Link to="/" className="flex items-center gap-2">

                            {/* Logo Image */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-lg blur-md group-hover:blur-lg transition" />
                                <img
                                    src={assets.newKrs}
                                    alt="KRS Lifeline"
                                    className="relative w-30 h-30 object-contain rounded-2xl "
                                />
                            </div>

                            {/* Text */}

                        </Link>

                        {/* NAV */}
                        <nav className="hidden lg:flex items-center gap-15">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-sm font-bold transition uppercase ${isActive
                                            ? "text-[#c90202] border-[#c90202] border-b-3 "
                                            : "text-[#1e1919] hover:text-gray-500 "
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-3">

                            {/* USER ICON (VISIBLE ON ALL SCREENS) */}
                            <button
                                onClick={() => setAuthOpen(true)}
                                className="p-2 text-[#1e1919] "
                            >
                                <User size={20} />
                            </button>

                            {/* CART */}
                            <div
                                className="relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="relative p-2 text-[#1e1919] "
                                >
                                    <ShoppingCart size={20} />
                                    <span className="absolute -top-1 -right-1 bg-black  text-white bg-red-700 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                </button>

                                {/* DROPDOWN */}
                                {hoverCart && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-4 w-80 bg-white text-black rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="px-4 py-3 border-b bg-gray-50">
                                            <h3 className="font-semibold text-sm">
                                                Cart Preview
                                                <span className="text-gray-500 font-normal">
                                                    {" "}({cartCount} items)
                                                </span>
                                            </h3>
                                        </div>

                                        <div className="p-4">
                                            {cartCount === 0 ? (
                                                <p className="text-gray-500 text-sm text-center py-6">
                                                    Your cart is empty
                                                </p>
                                            ) : (
                                                <>
                                                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                                        {cartItems.slice(0, 3).map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition"
                                                            >
                                                                <img
                                                                    src={item.image}
                                                                    className="w-11 h-11 rounded-lg object-cover border"
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium truncate">
                                                                        {item.name}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        Qty: {item.qty}
                                                                    </p>
                                                                </div>
                                                                <p className="text-sm font-semibold text-red-600">
                                                                    ₹{item.price}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="mt-4 space-y-2">
                                                        <button
                                                            onClick={() => {
                                                                setIsCartOpen(true);
                                                                setHoverCart(false);
                                                            }}
                                                            className="w-full py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                                                        >
                                                            View Cart
                                                        </button>

                                                        <button
                                                            onClick={() => navigate("/billing")}
                                                            className="w-full py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                                                        >
                                                            Checkout
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* MOBILE MENU */}
                            <button
                                onClick={() => setDrawerOpen(true)}
                                className="lg:hidden text-[#1e1919] p-2"
                            >
                                <TbMenuDeep size={26} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* OVERLAY */}
            <div
                onClick={closeDrawer}
                className={`fixed inset-0 bg-black/60 z-50 transition-opacity ${drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* DRAWER */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-[#fff] border-l border-red-500/20 z-50 transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="mx-auto px-4 py-4 ">
                    <img className="w-34" src={assets.newKrs}/>
                    {/* <button onClick={closeDrawer} className="text-[#000]">
                        <X />
                    </button> */}
                </div>

                <nav className="flex flex-col p-4 gap-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-lg text-sm font-bold transition uppercase ${isActive
                                    ? "bg-red-600 text-white"
                                    : "text-[#1e1919] hover:bg-white/10"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
                    <button
                        onClick={() => {
                            setIsCartOpen(true);
                            closeDrawer();
                        }}
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold"
                    >
                        Go to Cart
                    </button>
                </div>
            </div>

            {/* CART MODAL */}
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            <AuthModal
                isOpen={authOpen}
                onClose={() => setAuthOpen(false)}
            />
        </>
    );
};

export default NavBar;