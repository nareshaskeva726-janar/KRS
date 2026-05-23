import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../assets/assets";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Star,
} from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const incrementQty = () => {
    if (qty < product.stock) {
      setQty((prev) => prev + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-gray-50 rounded-[32px] overflow-hidden border border-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[550px] object-cover hover:scale-105 transition duration-700"
              />
            </div>

            <div className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {product.category}
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-yellow-500">
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />

              <span className="text-gray-500 text-sm ml-2">
                (4.9 Reviews)
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
              {product.name}
            </h1>

            <p className="text-gray-600 leading-8 mt-6">
              Premium quality appliance designed for modern homes
              with durability, performance, and elegant finishing.
              Perfect for everyday use with advanced technology
              and trusted quality.
            </p>

            {/* PRICE */}
            <div className="mt-8 flex items-center gap-4">
              <h2 className="text-5xl font-extrabold text-red-600">
                ₹{product.price.toLocaleString()}
              </h2>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                In Stock
              </span>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              <div className="border border-gray-200 rounded-2xl p-4">
                <Truck className="text-red-600" />
                <p className="text-sm font-medium mt-3">
                  Fast Delivery
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-4">
                <ShieldCheck className="text-red-600" />
                <p className="text-sm font-medium mt-3">
                  Secure Payment
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-4">
                <BadgeCheck className="text-red-600" />
                <p className="text-sm font-medium mt-3">
                  Premium Quality
                </p>
              </div>
            </div>

            {/* QTY */}
            <div className="mt-10">
              <p className="font-semibold text-gray-900 mb-4">
                Quantity
              </p>

              <div className="flex items-center gap-5">
                <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden">
                  <button
                    onClick={decrementQty}
                    className="w-14 h-14 text-2xl hover:bg-gray-100"
                  >
                    -
                  </button>

                  <div className="w-16 text-center font-semibold">
                    {qty}
                  </div>

                  <button
                    onClick={incrementQty}
                    className="w-14 h-14 text-2xl hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <span className="text-gray-500">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </motion.button>

              <button className="flex-1 h-14 rounded-2xl border border-gray-300 hover:border-red-600 hover:text-red-600 font-semibold transition">
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;