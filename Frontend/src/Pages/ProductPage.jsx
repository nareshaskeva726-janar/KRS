import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../Components/UI/ProductCard";
import { useGetProductsQuery } from "../Store/APIS/krsApi";

import {
  Search,
  SlidersHorizontal,
  X,
  Grid3x3,
  LayoutList,
  Sparkles,
  TrendingUp,
  Clock,
  Filter,
} from "lucide-react";

const ProductPage = () => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  // Initialize selected categories from URL param
  useEffect(() => {
    if (initialCategory !== "All") {
      setSelectedCategories([initialCategory]);
    } else {
      setSelectedCategories(["All"]);
    }
  }, [initialCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategories]);

  // SAFE PRODUCTS ARRAY
  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.products || [];

  // DYNAMIC CATEGORIES
  const categoryList = ["All", ...new Set(products.map((p) => p.category))];

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter (multiple)
    if (!selectedCategories.includes("All")) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Search filter
    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [products, selectedCategories, search, sort]);

  const clearFilters = () => {
    setSelectedCategories(["All"]);
    setSearch("");
    setSort("default");
  };

  const hasActiveFilters =
    !selectedCategories.includes("All") || search !== "" || sort !== "default";

  // Handle checkbox changes
  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) => {
        let newSelected = prev.filter((c) => c !== "All");
        if (newSelected.includes(category)) {
          newSelected = newSelected.filter((c) => c !== category);
        } else {
          newSelected.push(category);
        }
        if (newSelected.length === 0) newSelected = ["All"];
        return newSelected;
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded-full w-1/4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gray-900/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-gray-200/50">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-xs font-medium text-gray-600">CURATED COLLECTION</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="bg-[#073273] bg-clip-text text-transparent">
                Shop
              </span>{" "}
              <span className="bg-gradient-to-r from-[#C6181E] via-red-500 to-[#C6181E] bg-clip-text text-transparent">
                Our Products
              </span>
            </h1>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              We offer a unique collection of home appliances, kitchen essentials, lifestyle products, gadgets, and social media trending items for everyday use. Customers can directly visit our showroom and explore products in person before purchasing.            </p>
          </motion.div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Filters Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gradient-to-br from-[#003B93]/10 to-[#C6181E]/10 rounded-lg">
                        <Filter size={14} className="text-[#003B93]" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Filters
                      </h3>
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
                      >
                        <X size={12} /> Clear all
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Section */}
                <div className="px-5 py-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C6181E] rounded-full"></span>
                    CATEGORY
                  </h4>
                  <div className="space-y-3">
                    {categoryList.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        {/* Custom styled checkbox */}
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                          />
                          <div className="w-4 h-4 border-2 rounded border-gray-300 peer-checked:border-[#C6181E] peer-checked:bg-[#C6181E] transition-all duration-200 flex items-center justify-center">
                            {selectedCategories.includes(cat) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Optional: Additional filter sections can be added here with same spacing */}
                {/* Example: Price Range (commented) */}

                <div className="border-t border-gray-100 px-5 py-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C6181E] rounded-full"></span>
                    PRICE RANGE
                  </h4>
                  <div className="flex items-center gap-2">
                    <input type="range" className="w-full" />
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            {/* Search Bar - Prominent at top of main content */}
            <div className="mb-8">
              <div className="relative group max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003B93]/10 to-[#C6181E]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl transition-all duration-300">
                  <Search
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#003B93] transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-transparent rounded-2xl focus:outline-none text-gray-700 placeholder-gray-400 text-base"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Top Bar: Mobile filter button, product count, sort + view toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter size={16} />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-[#C6181E] rounded-full"></span>
                  )}
                </button>

                <p className="text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003B93]/20 focus:border-[#003B93] cursor-pointer"
                  >
                    <option value="default">Default</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                  <SlidersHorizontal
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-100 p-1 shadow-soft">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid"
                        ? "bg-gradient-to-r from-[#003B93] to-[#C6181E] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <Grid3x3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "list"
                        ? "bg-gradient-to-r from-[#003B93] to-[#C6181E] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <LayoutList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips (only if filters active) */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700">
                    Search: {search}
                    <button onClick={() => setSearch("")}>
                      <X size={12} className="hover:text-red-500" />
                    </button>
                  </span>
                )}
                {!selectedCategories.includes("All") &&
                  selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700"
                    >
                      {cat}
                      <button onClick={() => handleCategoryChange(cat)}>
                        <X size={12} className="hover:text-red-500" />
                      </button>
                    </span>
                  ))}
                {sort !== "default" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700">
                    Sort:{" "}
                    {sort === "lowToHigh"
                      ? "Price: Low to High"
                      : "Price: High to Low"}
                    <button onClick={() => setSort("default")}>
                      <X size={12} className="hover:text-red-500" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-gray-600 ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* LOADING, ERROR, EMPTY, PRODUCTS */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : isError ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl py-20 text-center border border-gray-100 shadow-soft"
              >
                <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <X size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Failed to load products
                </h3>
                <p className="text-gray-500 text-sm mt-1">Please try again later</p>
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl py-20 text-center border border-gray-100 shadow-soft"
              >
                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  No products found
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 text-[#003B93] font-medium underline underline-offset-2"
                >
                  Reset all filters
                </button>
              </motion.div>
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
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="cursor-pointer group"
                  >
                    <ProductCard
                      product={product}
                      index={idx}
                      onAddToCart={(product, qty) => addToCart(product, qty)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id || product.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-5 hover:shadow-elevated transition-all duration-300 cursor-pointer group"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg group-hover:text-[#003B93] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
                            <span className="inline-block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                            {product.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            ₹{product.price}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Stock: {product.qty} units
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="px-5 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-xl hover:from-[#003B93] hover:to-[#C6181E] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sidebar (slide-in) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">CATEGORY</h3>
                <div className="space-y-2">
                  {categoryList.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#C6181E]"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => {
                          handleCategoryChange(cat);
                          // keep sidebar open for multiple selections
                        }}
                      />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  clearFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-3 text-center text-sm text-gray-600 border-t border-gray-100 pt-4"
              >
                Clear all filters
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .shadow-soft {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
            0 8px 10px -6px rgba(0, 0, 0, 0.02);
        }
        .shadow-elevated {
          box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ProductPage;