import React, { useState } from "react";
import { products } from "../assets/assets";
import { motion } from "framer-motion";

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [quantity, setQuantity] = useState({});

  const allCategories = ["All", ...new Set(products.map((p) => p.category))];

  const applianceCategories = [
    "All",
    "Home Appliances",
    "Mixer",
    "Grinder",
    "Boxes",
    "Baskets",
    "Others",
  ].filter((cat) => cat === "All" || allCategories.includes(cat));

  let filtered = products.filter((p) =>
    selectedCategory === "All" ? true : p.category === selectedCategory
  );

  filtered = [...filtered].sort((a, b) => {
    if (sort === "lowToHigh") return a.price - b.price;
    if (sort === "highToLow") return b.price - a.price;
    return 0;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const handleQty = (id, value) => {
    const product = products.find((p) => p.id === id);
    let newValue = parseInt(value) || 1;
    if (newValue < 1) newValue = 1;
    if (newValue > product.qty) newValue = product.qty;
    setQuantity((prev) => ({ ...prev, [id]: newValue }));
  };

  const incrementQty = (id) => {
    const product = products.find((p) => p.id === id);
    const currentQty = quantity[id] || 1;
    if (currentQty < product.qty) {
      setQuantity((prev) => ({ ...prev, [id]: currentQty + 1 }));
    }
  };

  const decrementQty = (id) => {
    const currentQty = quantity[id] || 1;
    if (currentQty > 1) {
      setQuantity((prev) => ({ ...prev, [id]: currentQty - 1 }));
    }
  };

  const addToCart = (product) => {
    const requestedQty = quantity[product.id] || 1;
    if (requestedQty > product.qty) {
      alert(`Only ${product.qty} items in stock`);
      return;
    }
    alert(`Added ${requestedQty} x ${product.name} to cart`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          Appliances Store
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-8">

          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-4">

              <h2 className="font-semibold text-lg text-gray-800 mb-4">
                Categories
              </h2>

              <div className="space-y-2">
                {applianceCategories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left px-3 py-2 rounded-xl relative transition-all ${
                      selectedCategory === cat
                        ? "bg-black text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {selectedCategory === cat && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r-xl"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </motion.button>
                ))}
              </div>

              {/* SORT */}
              <div className="mt-6 pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>

                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-black focus:border-black"
                >
                  <option value="default">Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </motion.select>
              </div>
            </div>
          </motion.aside>

          {/* PRODUCTS */}
          <div className="flex-1">

            <p className="text-sm text-gray-500 mb-4">
              Showing {filtered.length} products
            </p>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                No products found
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={card}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100 flex flex-col"
                  >

                    {/* IMAGE */}
                    <div className="h-48 overflow-hidden">
                      <motion.img
                        src={product.image}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="p-4 flex flex-col flex-grow">

                      <h3 className="font-semibold text-lg">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 capitalize">
                        {product.category}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Stock: {product.qty}
                      </p>

                      {/* QTY */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-sm">Qty:</span>

                        <div className="flex items-center border rounded-lg">
                          <button onClick={() => decrementQty(product.id)} className="px-2">
                            -
                          </button>

                          <input
                            value={quantity[product.id] || 1}
                            onChange={(e) => handleQty(product.id, e.target.value)}
                            className="w-10 text-center border-x"
                          />

                          <button onClick={() => incrementQty(product.id)} className="px-2">
                            +
                          </button>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-lg">
                          ₹{product.price.toLocaleString()}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;