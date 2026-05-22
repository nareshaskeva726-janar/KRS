import { useState } from "react";
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Products", path: "/shop" },
    { name: "About", path: "/about-us" },
    { name: "Contact", path: "/contact" },
];

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const closeDrawer = () => setDrawerOpen(false);

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-red-600/30 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="h-16 flex items-center justify-between">

                        {/* LOGO */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src={assets.logoTwo}
                                    alt="KRS Lifeline"
                                    className="h-25 w-15 object-contain"
                                />
                                <div className="absolute -inset-1  blur-xl opacity-30 rounded-full"></div>
                            </div>

                            <div className="leading-tight">
                                <h1 className="text-white font-bold tracking-widest text-lg">
                                    KRS <span className="text-red-500">LIFELINE</span>
                                </h1>
                                <p className="text-[10px] text-gray-400 tracking-[3px]">
                                    PREMIUM ECOMMERCE
                                </p>
                            </div>
                        </Link>

                        {/* DESKTOP NAV */}
                        <nav className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-sm font-semibold transition ${isActive
                                            ? "text-red-500"
                                            : "text-gray-300 hover:text-white"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-3">

                            {/* SEARCH (desktop only) */}
                            <div className="hidden md:flex items-center bg-white/10 border border-white/10 rounded-full px-3 py-2">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    placeholder="Search..."
                                    className="bg-transparent outline-none px-2 text-sm text-white w-40 lg:w-56 placeholder-gray-500"
                                />
                            </div>

                            {/* ICONS */}
                            <button onClick={() => navigate("/wish-list")} className="relative p-2 text-white hover:text-red-500">
                                <Heart size={20} />
                                <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    2
                                </span>
                            </button>

                            <button onClick={() => navigate("/cart")} className="relative p-2 text-white hover:text-red-500">
                                <ShoppingCart size={20} />
                                <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    5
                                </span>
                            </button>

                            <button className="p-2 text-white hover:text-red-500 hidden md:block">
                                <User size={20} />
                            </button>

                            {/* MOBILE MENU BUTTON */}
                            <button
                                onClick={() => setDrawerOpen(true)}
                                className="lg:hidden text-white p-2"
                            >
                                <Menu size={26} />
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
                className={`fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-red-500/20 z-50 transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                    <h2 className="text-white font-bold tracking-widest">
                        MENU
                    </h2>
                    <button onClick={closeDrawer} className="text-white">
                        <X />
                    </button>
                </div>

                {/* LINKS */}
                <nav className="flex flex-col p-4 gap-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-lg text-sm font-semibold transition ${isActive
                                    ? "bg-red-600 text-white"
                                    : "text-gray-300 hover:bg-white/10"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* FOOTER ACTIONS */}
                <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
                    <button
                        onClick={() => {
                            navigate("/cart");
                            closeDrawer();
                        }}
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold"
                    >
                        Go to Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavBar;