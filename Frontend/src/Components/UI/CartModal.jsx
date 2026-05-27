import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Tag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const delivery = subtotal > 999 ? 0 : 49;
  const tax = subtotal * 0.05;
  const total = subtotal + delivery + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">

          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* drawer */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-[#fafaf9] flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* ── header ── */}
            <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                  <ShoppingBag size={17} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-base font-black text-gray-900 leading-none">Your Cart</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:border-red-300 hover:text-red-600 transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* free delivery banner */}
            {cartItems.length > 0 && delivery !== 0 && (
              <div className="mx-4 mt-4 flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                <Tag size={14} className="text-amber-600 shrink-0" />
                <p className="text-xs text-amber-700 font-semibold">
                  Add ₹{(1000 - subtotal).toFixed(0)} more for free delivery!
                </p>
              </div>
            )}
            {cartItems.length > 0 && delivery === 0 && (
              <div className="mx-4 mt-4 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                <Sparkles size={14} className="text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-700 font-semibold">
                  You've unlocked free delivery!
                </p>
              </div>
            )}

            {/* ── items list ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <ShoppingBag size={28} className="text-gray-300" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-700 text-base">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-1">Add some products to get started</p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/products");
                    }}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-3 hover:border-gray-200 transition-colors"
                    >
                      {/* image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug truncate">
                          {item.name}
                        </h3>
                        <p className="text-red-600 font-black text-sm mt-0.5">
                          ₹{(item.price * item.qty).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">₹{item.price.toLocaleString()} each</p>
                      </div>

                      {/* qty controls */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center font-black text-sm text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center ml-1 transition-colors"
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* ── billing summary ── */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-t border-gray-100 px-6 py-5"
              >
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span className={`font-semibold ${delivery === 0 ? "text-emerald-600" : "text-gray-800"}`}>
                      {delivery === 0 ? "Free" : `₹${delivery}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">GST (5%)</span>
                    <span className="font-semibold text-gray-800">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                    <span className="font-black text-gray-900 text-base">Total</span>
                    <span className="font-black text-red-600 text-2xl tracking-tight">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => { onClose(); navigate("/billing"); }}
                  className="w-full h-13 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-sm transition-all duration-200 shadow-[0_8px_24px_rgba(220,38,38,0.25)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.35)]"
                >
                  Proceed to Checkout →
                </button>

                <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" />
                  Secure checkout powered by KRS Lifeline
                </p>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;