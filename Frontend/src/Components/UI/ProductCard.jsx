import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
    Search,
    ShoppingCart,
    SlidersHorizontal,
    CheckCircle2,
    X,
    Heart,
    Sparkles,
} from "lucide-react";


const ProductCard = ({ product, onAddToCart, index }) => {
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const decrement = (e) => {
        e.stopPropagation();
        setQty((q) => Math.max(1, q - 1));
    };

    const increment = (e) => {
        e.stopPropagation();
        setQty((q) => Math.min(product.qty, q + 1));
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        onAddToCart(product, qty);

        setAdded(true);

        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -10,
            }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group relative rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer"
        >
            {/* IMAGE */}
            <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* category */}
                <div className="absolute top-4 left-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-bold bg-white/90 backdrop-blur-md text-gray-700 px-4 py-2 rounded-full shadow-sm">
                        {product.category}
                    </span>
                </div>

                {/* wishlist */}
                {/* <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                    <Heart size={16} className="text-gray-700" />
                </button> */}

                {/* low stock */}
                {product.qty <= 5 && (
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-amber-400 text-amber-950 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                            Only {product.qty} left
                        </span>
                    </div>
                )}

                {/* hover actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <div className="flex items-center gap-3">
                        {/* qty */}
                        <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
                            <button
                                onClick={decrement}
                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors text-lg"
                            >
                                −
                            </button>

                            <span className="w-8 text-center text-sm font-bold text-gray-900">
                                {qty}
                            </span>

                            <button
                                onClick={increment}
                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors text-lg"
                            >
                                +
                            </button>
                        </div>

                        {/* add button */}
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={handleAdd}
                            className={`flex-1 h-11 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${added
                                ? "bg-emerald-500 text-white"
                                : "bg-[#c90202] hover:bg-red-600 hover:scale-[1.02] text-white"
                                }`}
                        >
                            {added ? (
                                <>
                                    <CheckCircle2 size={15} />
                                    Added!
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={15} />
                                    Add to cart
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="p-5">
                <p className="text-[13px] text-gray-400 mb-1">
                    {product.qty} available
                </p>

                <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-900 tracking-tight line-clamp-1">
                    {product.name}
                </h3>

                {/* badges */}
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                        Premium
                    </span>

                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                        Fast Delivery
                    </span>
                </div>

                {/* bottom */}
                <div className="flex items-center justify-between mt-5">
                    <span className="text-2xl font-black tracking-tight text-gray-900">
                        ₹{product.price.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-1 text-amber-500">
                        <Sparkles size={14} fill="currentColor" />
                        <span className="text-xs font-semibold text-gray-600">4.9</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard