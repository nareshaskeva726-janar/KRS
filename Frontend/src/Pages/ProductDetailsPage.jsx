import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

import {
  useGetProductQuery,
  useGetProductsQuery,
} from "../Store/APIS/krsApi";

import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Star,
  Heart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  // SINGLE PRODUCT API
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductQuery(id);

  // ALL PRODUCTS API (RELATED PRODUCTS)
  const { data: allProductsData = [] } = useGetProductsQuery();

  // SAFE PRODUCT
  const product = productData?.product || productData;

  // SAFE PRODUCTS ARRAY
  const allProducts = Array.isArray(allProductsData)
    ? allProductsData
    : allProductsData?.products || [];

  // PRODUCT IMAGES
  const productImages = useMemo(() => {
    if (!product) return [];

    if (product.images?.length) {
      return product.images;
    }

    if (product.image) {
      return [product.image];
    }

    return [];
  }, [product]);

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [added, setAdded] = useState(false);

  // RESET IMAGE WHEN PRODUCT CHANGES
  useEffect(() => {
    if (productImages.length > 0) {
      setSelectedImage(productImages[0]);
    }

    setQty(1);
  }, [productImages]);

  // RELATED PRODUCTS
  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.category === product?.category &&
        item._id !== product?._id
    )
    .slice(0, 4);

  // LOADING
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        <h1 className="text-2xl font-bold text-gray-800">
          Loading Product...
        </h1>
      </div>
    );
  }

  // ERROR
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        <h1 className="text-2xl font-bold text-gray-800">
          Product not found
        </h1>
      </div>
    );
  }

  const incrementQty = () => {
    if (qty < (product.stock || product.qty || 10)) {
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

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-14 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-red-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-orange-300/20 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-[40px] border border-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.10)] overflow-hidden">
              <div className="absolute top-5 left-5 z-20">
                <span className="bg-red-600 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
                  {product.category}
                </span>
              </div>

              <button className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300">
                <Heart
                  size={18}
                  className="text-gray-700"
                />
              </button>

              <div className="relative overflow-hidden">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[650px] object-cover hover:scale-105 transition duration-1000"
                  onError={(e) => {
                    if (
                      e.target.src !== assets.placeholder
                    ) {
                      e.target.src =
                        assets.placeholder ||
                        "https://via.placeholder.com/600";
                    }
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star
                    size={15}
                    fill="currentColor"
                  />

                  <span className="text-sm font-black text-gray-900">
                    4.9
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  2k+ Happy Reviews
                </p>
              </div>
            </div>

            {/* THUMBNAILS */}
            {productImages.length > 0 && (
              <div className="flex gap-4 mt-5">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-24 h-24 rounded-3xl overflow-hidden border transition-all duration-300 ${
                      selectedImage === img
                        ? "border-red-500 scale-105"
                        : "border-white/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumbnail-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
              </div>

              <span className="text-sm text-gray-500 font-medium">
                (4.9 Reviews)
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1] text-gray-900 mt-5">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <span className="px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                Best Seller
              </span>

              <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                In Stock
              </span>

              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                Premium Quality
              </span>
            </div>

            <div className="mt-8 p-7 rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm">
              <p className="text-gray-600 leading-8">
                {product.description ||
                  "Premium quality appliance designed for modern homes with durability, performance, and elegant finishing. Perfect for everyday use with advanced technology and trusted quality craftsmanship."}
              </p>
            </div>

            <div className="mt-10 flex items-end gap-5">
              <h2 className="text-6xl md:text-7xl font-black tracking-tight text-red-600">
                ₹{product.price?.toLocaleString()}
              </h2>

              <span className="mb-3 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
                Available
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mt-10">
              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-5 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
                <Truck
                  className="text-red-600"
                  size={28}
                />

                <p className="text-sm font-bold mt-4 text-gray-900">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Delivery within 24 hrs
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-5 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
                <ShieldCheck
                  className="text-red-600"
                  size={28}
                />

                <p className="text-sm font-bold mt-4 text-gray-900">
                  Secure Payment
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  100% protected checkout
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-5 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
                <BadgeCheck
                  className="text-red-600"
                  size={28}
                />

                <p className="text-sm font-bold mt-4 text-gray-900">
                  Premium Quality
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Trusted modern design
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-bold text-gray-900 mb-5 text-lg">
                Select Quantity
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={decrementQty}
                    className="w-14 h-14 text-2xl hover:bg-gray-100 transition"
                  >
                    −
                  </button>

                  <div className="w-16 text-center font-black text-lg">
                    {qty}
                  </div>

                  <button
                    onClick={incrementQty}
                    className="w-14 h-14 text-2xl hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                <span className="text-gray-500 font-medium">
                  {product.stock ||
                    product.qty ||
                    10}{" "}
                  items available
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mt-12">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 h-16 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(220,38,38,0.35)] text-white"
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle2 size={22} />
                    Added Successfully
                  </>
                ) : (
                  <>
                    <ShoppingCart size={22} />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <button className="flex-1 h-16 rounded-3xl bg-white border border-gray-200 hover:border-red-500 hover:text-red-600 font-bold transition-all duration-300 shadow-sm hover:shadow-lg">
                Buy Now
              </button>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-gray-500">
              <Sparkles
                size={16}
                className="text-red-500"
              />

              Free shipping available on premium
              orders.
            </div>
          </motion.div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-28">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-500 font-bold mb-2">
                  You may also like
                </p>

                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
                  Related{" "}
                  <span className="text-red-600">
                    Products
                  </span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  onClick={() =>
                    navigate(`/product/${item._id}`)
                  }
                  className="group cursor-pointer rounded-[30px] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500"
                >
                  <div className="relative overflow-hidden aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        if (
                          e.target.src !==
                          assets.placeholder
                        ) {
                          e.target.src =
                            assets.placeholder ||
                            "https://via.placeholder.com/400";
                        }
                      }}
                    />

                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-gray-700 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-2 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-black text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-black text-red-600">
                        ₹{item.price?.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-1 text-amber-500">
                        <Star
                          size={14}
                          fill="currentColor"
                        />

                        <span className="text-xs font-bold text-gray-700">
                          4.9
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1);
                      }}
                      className="mt-5 w-full h-12 rounded-2xl bg-gray-900 hover:bg-red-600 text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;