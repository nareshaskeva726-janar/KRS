import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Star,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Home,
} from "lucide-react";

import { assets } from "../assets/assets";
import { useCart } from "../context/CartContext";
import {
  useGetProductQuery,
  useGetProductsQuery,
} from "../Store/APIS/krsApi";

const ProductDetailsPage = () => {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  // API Queries
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductQuery(id, { skip: !id || id === "undefined" });
  const { data: allProductsData = [] } = useGetProductsQuery();

  // Data Processing
  const product = productData?.product || productData;
  const allProducts = Array.isArray(allProductsData)
    ? allProductsData
    : allProductsData?.products || [];

  const productImages = useMemo(() => {
    if (!product) return [];
    if (product.images?.length) return product.images;
    if (product.image) return [product.image];
    return [];
  }, [product]);

  // State
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  // Effects
  useEffect(() => {
    if (!id || id === "undefined") {
      navigate("/products", { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (productImages.length > 0) {
      setSelectedImage(productImages[0]);
    }
    setQuantity(1);
  }, [productImages]);

  // Computed Values
  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.category === product?.category &&
        item._id !== product?._id
    )
    .slice(0, 4);

  const maxStock = product?.stock || product?.qty || 10;

  // Handlers
  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/products");
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "increment" && quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-red-600 mx-auto" />
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Product Not Found
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full bg-[#f7f7f5] py-4 sm:py-8 relative overflow-x-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-36 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-red-300/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-48 -right-36 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-orange-300/20 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleBack}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 backdrop-blur-xl border border-white/40 rounded-full shadow-lg hover:shadow-xl sm:hover:scale-105 transition-all duration-300 group cursor-pointer shrink-0"
              aria-label="Back to products"
            >
              <ArrowLeft
                size={16}
                className="text-gray-700 group-hover:text-red-600 transition-colors sm:w-[18px] sm:h-[18px]"
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">
                Back
              </span>
            </motion.button>

            {/* Breadcrumb - desktop/tablet only */}
            <nav className="hidden md:flex items-center gap-2 text-sm min-w-0" aria-label="Breadcrumb">
              <button
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Home size={14} />
                <span>Home</span>
              </button>
              <span className="text-gray-300">/</span>
              <button
                onClick={() => navigate("/products")}
                className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer font-medium shrink-0"
              >
                Products
              </button>
              {product?.category && (
                <>
                  <span className="text-gray-300">/</span>
                  <button
                    onClick={() => navigate(`/products?category=${product.category}`)}
                    className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer shrink-0"
                  >
                    {product.category}
                  </button>
                </>
              )}
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-semibold truncate max-w-[150px]">
                {product.name}
              </span>
            </nav>
          </div>

          {/* Category Badge - visible from smallest screens now */}
          {product?.category && (
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-red-50 text-red-600 rounded-full text-[11px] sm:text-xs font-bold border border-red-100 shrink-0 max-w-[40%] sm:max-w-none truncate">
              {product.category}
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-[30px] border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Category Tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                <span className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] shadow-lg">
                  {product.category}
                </span>
              </div>

              {/* Main Image */}
              <div className="relative overflow-hidden">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover hover:scale-105 transition duration-700"
                  onError={(e) => {
                    if (e.target.src !== assets.placeholder) {
                      e.target.src = assets.placeholder || "https://via.placeholder.com/600";
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-xl">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={12} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />
                  <span className="text-xs sm:text-sm font-black text-gray-900">4.9</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">2k+ Reviews</p>
              </div>
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2.5 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === img
                        ? "border-red-500 scale-105"
                        : "border-white/40 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-20"
          >
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                (4.9 Reviews)
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-gray-900 mt-3 sm:mt-4">
              {product.name}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold">
                Best Seller
              </span>
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold">
                In Stock
              </span>
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-bold">
                Premium
              </span>
            </div>

            {/* Description */}
            <div className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm">
              <p className="text-gray-600 leading-6 sm:leading-7 text-sm">
                {product.description ||
                  "Premium quality appliance designed for modern homes with durability, performance, and elegant finishing."}
              </p>
            </div>

            {/* Price */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-end gap-3 sm:gap-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-red-600">
                ₹{product.price?.toLocaleString()}
              </h2>
              <span className="mb-1 bg-emerald-100 text-emerald-700 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                Available
              </span>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-5 sm:mt-6">
              {[
                { icon: Truck, label: "Fast Delivery", sub: "24 hrs" },
                { icon: ShieldCheck, label: "Secure Payment", sub: "Protected" },
                { icon: BadgeCheck, label: "Premium Quality", sub: "Modern design" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl sm:rounded-2xl p-3 sm:hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center sm:flex-col sm:items-start sm:text-left gap-3 sm:gap-0"
                >
                  <div className="p-2 sm:p-0 bg-red-50 sm:bg-transparent rounded-lg shrink-0">
                    <feature.icon className="text-red-600" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm sm:text-xs font-bold sm:mt-2 text-gray-900 truncate">
                      {feature.label}
                    </p>
                    <p className="text-[11px] sm:text-[10px] text-gray-500">{feature.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mt-5 sm:mt-6">
              <p className="font-bold text-gray-900 mb-2.5 sm:mb-3 text-sm">Select Quantity</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden shrink-0">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                    className={`w-10 h-10 sm:w-11 sm:h-11 text-lg sm:text-xl transition ${
                      quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                    }`}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="w-10 sm:w-12 text-center font-black text-sm sm:text-base">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    disabled={quantity >= maxStock}
                    className={`w-10 h-10 sm:w-11 sm:h-11 text-lg sm:text-xl transition ${
                      quantity >= maxStock ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                    }`}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {maxStock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 py-3 sm:py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base ${
                  isAdded
                    ? "bg-emerald-500 text-white"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(220,38,38,0.3)] text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={18} />
                    Added Successfully
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <button className="flex-1 py-3 sm:py-3.5 px-4 rounded-xl bg-white border border-gray-200 hover:border-red-500 hover:text-red-600 font-bold transition-all duration-300 shadow-sm hover:shadow-lg text-sm sm:text-base">
                Buy Now
              </button>
            </div>

            {/* Free Shipping Note */}
            <div className="mt-5 sm:mt-6 flex items-center gap-2 text-[11px] sm:text-xs text-gray-500">
              <Sparkles size={14} className="text-red-500 shrink-0" />
              Free shipping available on premium orders.
            </div>
          </motion.div>
        </div>

        {/* Video Section */}
        {product.video && (
          <section className="mt-10 sm:mt-16">
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-red-500 font-bold mb-1">
                Product Showcase
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900">
                Watch Product <span className="text-red-600">Video</span>
              </h2>
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-xs sm:text-sm px-4">
                See the product in action and explore its features, quality, and performance.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl sm:rounded-[30px] overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-white/40"
            >
              <video
                src={product.video}
                controls
                muted
                playsInline
                className="w-full h-[180px] sm:h-[280px] md:h-[400px] object-cover"
              />
            </motion.div>

            {product.videoDescription && (
              <div className="mt-5 sm:mt-6 text-center max-w-4xl mx-auto px-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">
                  Why This Product Stands Out
                </h3>
                <p className="text-gray-600 mt-2 leading-6 sm:leading-7 text-sm">
                  {product.videoDescription}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-10 sm:mt-16">
            <div className="flex items-end justify-between mb-5 sm:mb-8">
              <div>
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-red-500 font-bold mb-1">
                  You may also like
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900">
                  Related <span className="text-red-600">Products</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-400"
                >
                  <div className="relative overflow-hidden aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        if (e.target.src !== assets.placeholder) {
                          e.target.src = assets.placeholder || "https://via.placeholder.com/400";
                        }
                      }}
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="bg-white/90 backdrop-blur-md text-gray-700 text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-black text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2 sm:mt-3">
                      <span className="text-base sm:text-xl font-black text-red-600">
                        ₹{item.price?.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={11} className="sm:w-3 sm:h-3" fill="currentColor" />
                        <span className="text-[11px] sm:text-xs font-bold text-gray-700">4.9</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1);
                      }}
                      className="mt-2.5 sm:mt-3 w-full h-9 sm:h-10 rounded-lg sm:rounded-xl bg-gray-900 hover:bg-red-600 text-white font-bold text-[11px] sm:text-xs transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2"
                    >
                      <ShoppingCart size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
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