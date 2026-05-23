import React, { useMemo, useState, useEffect } from "react";
import { products, assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  Search,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";

const ProductPage = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState({});

  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";

  const { addToCart } = useCart();

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };


  const allCategories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // CATEGORY
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      );
    }

    // SEARCH
    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORT
    if (sort === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, search, sort]);

  const handleQty = (id, value) => {
    const product = products.find((p) => p.id === id);

    let newValue = parseInt(value) || 1;

    if (newValue < 1) newValue = 1;
    if (newValue > product.qty) newValue = product.qty;

    setQuantity((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const incrementQty = (id) => {
    const product = products.find((p) => p.id === id);

    const currentQty = quantity[id] || 1;

    if (currentQty < product.qty) {
      setQuantity((prev) => ({
        ...prev,
        [id]: currentQty + 1,
      }));
    }
  };

  const decrementQty = (id) => {
    const currentQty = quantity[id] || 1;

    if (currentQty > 1) {
      setQuantity((prev) => ({
        ...prev,
        [id]: currentQty - 1,
      }));
    }
  };

  const handleAddToCart = (product) => {
    const requestedQty = quantity[product.id] || 1;

    addToCart(product, requestedQty);
  };

  const navigate = useNavigate();




  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden py-16 border-b border-gray-100">
        {/* background glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold inline-block w-fit"
            >
              Premium Appliances
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900"
            >
              Shop Smarter with
              <span className="block text-red-600">
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
              className="relative z-10 w-[350px] h-[350px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] object-cover rounded-3xl shadow-2xl border border-white"
            />
          </motion.div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* TOP FILTERS */}

        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl py-6 font-extrabold leading-tight text-gray-900">
          ALL <span className="text-red-600">Products</span>
        </h1>

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-300 focus:border-red-600 outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* SORT */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-2xl px-4 h-12">
                <SlidersHorizontal
                  size={18}
                  className="text-red-600"
                />

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="outline-none bg-transparent text-sm"
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
            </div>
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-6">
            {allCategories.map((cat) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* "ALL PRODUCTS" HEADER + RESULT COUNT */}
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              Showing{" "}
              <span className="font-semibold text-red-600">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="bg-gray-50 rounded-3xl py-20 text-center border border-dashed border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with different keywords.
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Premium quality appliance for modern homes.
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>

                    <span className="text-sm text-green-600 font-medium">
                      In Stock
                    </span>
                  </div>

                  {/* QTY */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => decrementQty(product.id)}
                        className="w-10 h-10 text-lg hover:bg-gray-100"
                      >
                        -
                      </button>

                      <input
                        type="text"
                        value={quantity[product.id] || 1}
                        onChange={(e) =>
                          handleQty(product.id, e.target.value)
                        }
                        className="w-12 h-10 text-center outline-none border-x"
                      />

                      <button
                        onClick={() => incrementQty(product.id)}
                        className="w-10 h-10 text-lg hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm text-gray-500">
                      {product.qty} left
                    </span>
                  </div>

                  {/* BUTTON */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="mt-5 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;