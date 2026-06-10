import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../Components/UI/ProductCard";
import { assets } from "../assets/assets";
import { useGetProductsQuery } from "../Store/APIS/krsApi";

import {
  Search,
  SlidersHorizontal,
  X,
  ChevronRight,
  Filter,
  Grid3x3,
  LayoutList,
} from "lucide-react";

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { addToCart } = useCart();



  const navigate = useNavigate();




  // API CALL
  const {
    data: productsData = [],
    isLoading,
    isError,
  } = useGetProductsQuery();

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  // SAFE PRODUCTS ARRAY
  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.products || [];

  // DYNAMIC CATEGORIES
  const allCategories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, selectedCategory, search, sort]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearch("");
    setSort("default");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    search !== "" ||
    sort !== "default";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen  bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden py-16 border-b border-gray-100">
        {/* background glow */}
        {/* <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-80" /> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C6181E] text-xs font-bold tracking-widest uppercase"
            >
              Premium Appliances
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#003B93]"
            >
              Shop Smarter with
              <span className="block text-[#C6181E]">
                Premium Products
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-gray-600 leading-7 max-w-xl"
            >
              We offer a unique collection of home appliances, kitchen essentials,
              lifestyle products, gadgets, and social media trending items for everyday use. Customers can directly visit our showroom and explore products in person before purchasing.
            </motion.p>

          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* glow behind image */}
            <div className="absolute w-[360px] h-[360px] bg-red-200 blur-3xl opacity-40 rounded-full" />

            {/* floating animation */}
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              src={assets.productImage}
              alt="Hero Product"
              className="relative z-10 w-[350px] h-[350px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] object-cover rounded-3xl  border border-white"
            />
          </motion.div>

        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center px-4 py-5 font-extrabold text-[#003B93] leading-tight">
          All <span className="text-[#C6181E]">Products</span>
        </h1>        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* SEARCH */}
              <div className="relative group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-1 focus:ring-gray-200 outline-none transition-all text-sm"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* CATEGORY */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <Filter size={14} /> Categories
                </h3>

                <div className="space-y-1.5">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-4 rounded-lg text-sm transition-all ${selectedCategory === cat
                        ? "bg-[#c90202] text-white font-medium font-bold"
                        : "text-gray-600 hover:bg-gray-100 font-bold"
                        }`}
                    >
                      <span className="flex items-center justify-between">
                        {cat}

                        {selectedCategory === cat && (
                          <ChevronRight
                            size={14}
                            className="opacity-70"
                          />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SORT */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <SlidersHorizontal size={14} /> Sort by
                </h3>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-400 transition-colors cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="lowToHigh">
                    Price: Low to High
                  </option>
                  <option value="highToLow">
                    Price: High to Low
                  </option>
                </select>
              </div>

              {hasActiveFilters && (
                <div className="pt-2">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                  >
                    <X size={14} /> Clear all filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid"
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <Grid3x3 size={16} />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list"
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>

            {/* LOADING */}
            {isLoading ? (
              <div className="bg-white rounded-2xl py-20 text-center border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-gray-800">
                  Loading products...
                </h3>
              </div>
            ) : isError ? (
              <div className="bg-white rounded-2xl py-20 text-center border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-red-500">
                  Failed to load products
                </h3>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl py-20 text-center border border-gray-100 shadow-sm">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search
                    size={28}
                    className="text-gray-300"
                  />
                </div>

                <h3 className="text-lg font-medium text-gray-800">
                  No products found
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Try adjusting your filters
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#0505eb] underline underline-offset-2 text-sm"
                >
                  Reset all filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product._id || product.id}
                    variants={itemVariants}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="cursor-pointer"
                  >
                    <ProductCard
                      product={product}
                      index={idx}
                      onAddToCart={(product, qty) =>
                        addToCart(product, qty)
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id || product.id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-0.5">
                            {product.category}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{product.price}
                          </p>

                          <p className="text-xs text-gray-400">
                            In stock: {product.qty}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;