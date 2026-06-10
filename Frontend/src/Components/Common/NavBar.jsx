import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, X, Zap } from "lucide-react";
import { TbMenuDeep } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useCart } from "../../context/CartContext";
import CartModal from "../UI/CartModal";
import AuthModal from "../UI/AuthModal";
import { motion, AnimatePresence } from "framer-motion";

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
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

    const { cartItems, cartCount } = useCart();
    const navigate = useNavigate();

    const navRef = useRef(null);
    const activeRef = useRef(null);
    const hoverTimeout = useRef(null);

    const updatePill = (el) => {
        if (!navRef.current || !el) return;
        const navRect = navRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setPillStyle({ left: elRect.left - navRect.left, width: elRect.width });
    };

    useEffect(() => {
        if (activeRef.current) {
            setTimeout(() => updatePill(activeRef.current), 60);
        }
    }, []);

    const closeDrawer = () => setDrawerOpen(false);

    const handleCartEnter = () => {
        clearTimeout(hoverTimeout.current);
        setHoverCart(true);
    };
    const handleCartLeave = () => {
        hoverTimeout.current = setTimeout(() => setHoverCart(false), 180);
    };

    return (
        <>
            {/* ─── HEADER ─── */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="h-[72px] flex items-center justify-between gap-6">

                        {/* LOGO */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                src={assets.newKrs}
                                alt="KRS Lifeline"
                                className="h-14 w-auto object-contain"
                            />
                        </Link>

                        {/* NAV — desktop only */}
                        <nav
                            ref={navRef}
                            className="hidden lg:flex flex-1 justify-center items-center gap-1 relative"
                        >
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-[34px] rounded-full bg-[#FCEBEB] border border-[#F7C1C1] pointer-events-none z-0"
                                style={{
                                    left: pillStyle.left,
                                    width: pillStyle.width,
                                    transition: "left 220ms cubic-bezier(0.34,1.56,0.64,1), width 220ms cubic-bezier(0.34,1.56,0.64,1)",
                                }}
                            />
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    ref={(el) => {
                                        if (el && window.location.pathname === link.path) {
                                            activeRef.current = el;
                                        }
                                    }}
                                    className={({ isActive }) =>
                                        `relative z-10 text-[13px] font-medium tracking-[0.06em] uppercase px-[18px] py-[7px] rounded-full transition-colors duration-150 ${isActive ? "text-[#C6181E]" : "text-gray-500 hover:text-gray-900"
                                        }`
                                    }
                                    onMouseEnter={(e) => updatePill(e.currentTarget)}
                                    onMouseLeave={() => updatePill(activeRef.current)}
                                    onClick={(e) => {
                                        activeRef.current = e.currentTarget;
                                        updatePill(e.currentTarget);
                                    }}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-1">

                            {/* USER — desktop only */}
                            <button
                                onClick={() => setAuthOpen(true)}
                                className="hidden lg:flex w-[38px] h-[38px] rounded-lg items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                aria-label="Account"
                            >
                                <User size={20} />
                            </button>

                            {/* DIVIDER — desktop */}
                            <div className="hidden lg:block w-px h-6 bg-gray-200 mx-2" />

                            {/* CART */}
                            <div
                                className="relative"
                                onMouseEnter={handleCartEnter}
                                onMouseLeave={handleCartLeave}
                            >
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors relative"
                                    aria-label="Cart"
                                >
                                    <ShoppingCart size={20} />
                                    {cartCount > 0 && (
                                        <span className="absolute top-1 right-1 w-4 h-4 bg-[#C6181E] text-white text-[10px] font-medium rounded-full flex items-center justify-center leading-none">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>

                                {/* CART HOVER DROPDOWN — desktop */}
                                <AnimatePresence>
                                    {hoverCart && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                            transition={{ duration: 0.15 }}
                                            className="hidden lg:block absolute right-0 top-[calc(100%+10px)] w-[300px] bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                                            onMouseEnter={handleCartEnter}
                                            onMouseLeave={handleCartLeave}
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                                <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-gray-400">
                                                    Cart preview
                                                </span>
                                                <span className="text-[11px] font-medium bg-[#FCEBEB] text-[#A32D2D] border border-[#F7C1C1] rounded-full px-2 py-0.5">
                                                    {cartCount} items
                                                </span>
                                            </div>

                                            {cartCount === 0 ? (
                                                <p className="text-center text-sm text-gray-400 py-8">
                                                    Your cart is empty
                                                </p>
                                            ) : (
                                                <>
                                                    <div className="max-h-[200px] overflow-y-auto">
                                                        {cartItems.slice(0, 3).map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors"
                                                            >
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-11 h-11 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-[13px] font-medium text-gray-900 truncate">{item.name}</p>
                                                                    <p className="text-[12px] text-gray-400 mt-0.5">Qty: {item.qty}</p>
                                                                </div>
                                                                <p className="text-[13px] font-medium text-[#C6181E] flex-shrink-0">₹{item.price}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-2 p-3 bg-gray-50 border-t border-gray-100">
                                                        <button
                                                            onClick={() => { setIsCartOpen(true); setHoverCart(false); }}
                                                            className="flex-1 h-[34px] rounded-full border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                                        >
                                                            View cart
                                                        </button>
                                                        <button
                                                            onClick={() => navigate("/billing")}
                                                            className="flex-1 h-[34px] rounded-full bg-[#C6181E] text-white text-[13px] font-medium hover:bg-[#A32D2D] transition-colors"
                                                        >
                                                            Checkout
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* DIVIDER + QUICK ORDER — desktop only */}
                            <div className="hidden lg:block w-px h-6 bg-gray-200 mx-2" />
                            {/* <button
                                onClick={() => navigate("/products")}
                                className="hidden lg:flex items-center gap-2 bg-[#C6181E] hover:bg-[#A32D2D] text-white rounded-full px-5 h-[38px] text-[13px] font-medium transition-colors whitespace-nowrap"
                            >
                                <Zap size={14} />
                                Quick order
                            </button> */}

                            {/* MOBILE HAMBURGER */}
                            <button
                                onClick={() => setDrawerOpen(true)}
                                className="lg:hidden w-[38px] h-[38px] flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ml-1"
                                aria-label="Open menu"
                            >
                                <TbMenuDeep size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ─── MOBILE DRAWER ─── */}
            {/* Overlay */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeDrawer}
                        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Drawer panel */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 260 }}
                        className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 flex flex-col lg:hidden shadow-2xl"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <img src={assets.newKrs} alt="KRS Lifeline" className="h-10 w-auto object-contain" />
                            <button
                                onClick={closeDrawer}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Nav links */}
                        <nav className="flex flex-col gap-1 p-4 flex-1">
                            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-400 px-3 mb-1">
                                Navigation
                            </p>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                >
                                    <NavLink
                                        to={link.path}
                                        onClick={closeDrawer}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${isActive
                                                ? "bg-[#FCEBEB] text-[#C6181E] border border-[#F7C1C1]"
                                                : "text-gray-700 hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </motion.div>
                            ))}

                            {/* Divider */}
                            <div className="my-3 border-t border-gray-100" />

                            {/* Account in drawer */}
                            <motion.button
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 }}
                                onClick={() => { setAuthOpen(true); closeDrawer(); }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                            >
                                <User size={18} className="text-gray-400" />
                                My Account
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => { setIsCartOpen(true); closeDrawer(); }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                            >
                                <div className="relative">
                                    <ShoppingCart size={18} className="text-gray-400" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#C6181E] text-white text-[9px] font-medium rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                View Cart
                                {cartCount > 0 && (
                                    <span className="ml-auto text-[12px] text-gray-400">{cartCount} items</span>
                                )}
                            </motion.button>
                        </nav>

                        {/* Drawer footer CTA */}
                        <div className="p-4 border-t border-gray-100">
                            <button
                                onClick={() => { navigate("/products"); closeDrawer(); }}
                                className="w-full flex items-center justify-center gap-2 bg-[#C6181E] hover:bg-[#A32D2D] text-white rounded-xl py-3 text-[14px] font-medium transition-colors"
                            >
                                <Zap size={15} />
                                Quick Order
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODALS */}
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
};

export default NavBar;