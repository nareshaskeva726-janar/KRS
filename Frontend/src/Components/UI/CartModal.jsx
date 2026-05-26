import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // ✅ SUBTOTAL
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // ✅ DELIVERY LOGIC
  const delivery = subtotal > 999 ? 0 : 49;

  // ✅ TAX (5% GST example)
  const tax = subtotal * 0.05;

  // ✅ FINAL TOTAL
  const total = subtotal + delivery + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">

          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart
              </h2>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* ITEMS */}
            <div className="space-y-4 flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  Your cart is empty
                </p>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex justify-between items-center border p-3 rounded-2xl"
                    layout
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-red-600 font-bold">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.qty - 1)
                        }
                      >
                        <Minus size={16} />
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.qty + 1)
                        }
                      >
                        <Plus size={16} />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 ml-3"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* BILLING SUMMARY */}
            {cartItems.length > 0 && (
              <motion.div
                className="mt-6 border-t pt-4 space-y-3 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >

                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className={delivery === 0 ? "text-green-600" : ""}>
                    {delivery === 0 ? "Free" : `₹${delivery}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">GST (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-red-600">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    navigate("/billing");
                  }}
                  className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                  Proceed to Checkout
                </button>

                <p className="text-center text-xs text-gray-400">
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