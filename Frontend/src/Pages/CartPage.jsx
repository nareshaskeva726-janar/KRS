import React from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-semibold">
            <ShoppingBag size={16} />
            Your Shopping Cart
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 leading-tight text-gray-900">
            Review Your
            <span className="block text-red-600">
              Selected Products
            </span>
          </h1>

          <p className="text-gray-600 mt-6 leading-7 max-w-2xl">
            Manage your products, update quantities, and
            proceed to secure checkout experience.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Cart Items
              </h2>

              <span className="text-sm text-gray-500">
                {cartItems.length} Items
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl py-20 text-center">
                <ShoppingBag
                  className="mx-auto text-red-600"
                  size={50}
                />

                <h3 className="text-2xl font-bold mt-5 text-gray-900">
                  Your cart is empty
                </h3>

                <p className="text-gray-500 mt-2">
                  Add products to continue shopping.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-3xl p-5 flex flex-col md:flex-row gap-5 md:items-center justify-between hover:shadow-lg transition"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 rounded-2xl object-cover"
                      />

                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                          Premium product with elegant design.
                        </p>

                        <h4 className="text-2xl font-extrabold text-red-600 mt-4">
                          ₹{item.price}
                        </h4>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      {/* QTY */}
                      <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.qty - 1)
                          }
                          className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>

                        <div className="w-14 text-center font-semibold">
                          {item.qty}
                        </div>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.qty + 1)
                          }
                          className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white border border-gray-200 rounded-[32px] p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              {/* FEATURES */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-red-50 rounded-2xl p-4 text-center">
                  <Truck
                    className="mx-auto text-red-600"
                    size={22}
                  />

                  <p className="text-xs mt-2 font-medium">
                    Fast Delivery
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl p-4 text-center">
                  <ShieldCheck
                    className="mx-auto text-red-600"
                    size={22}
                  />

                  <p className="text-xs mt-2 font-medium">
                    Secure Payment
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl p-4 text-center">
                  <BadgeCheck
                    className="mx-auto text-red-600"
                    size={22}
                  />

                  <p className="text-xs mt-2 font-medium">
                    Premium Quality
                  </p>
                </div>
              </div>

              {/* PRICE DETAILS */}
              <div className="space-y-4 mt-8">
                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>

                  <span className="text-green-600 font-medium">
                    Free
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6" />

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  Total
                </span>

                <span className="text-3xl font-extrabold text-red-600">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <button className="w-full mt-8 h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold text-lg transition">
                Proceed to Checkout
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Safe & secure payments powered by KRS Lifeline
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;