import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200",
  },
  {
    id: 2,
    name: "Cleaning Products",
    image:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Bedroom Essentials",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
  },
  {
    id: 4,
    name: "Living Room Decor",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
  },
  {
    id: 5,
    name: "Bathroom Essentials",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
  },
  {
    id: 6,
    name: "Home Appliances",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Storage & Organization",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200",
  },
  {
    id: 8,
    name: "Home Decoration",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200",
  },
  {
    id: 9,
    name: "Smart Home Devices",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200",
  },
];

// 🔥 container animation (stagger grid)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// 🔥 item animation
const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Categories = () => {
  return (
    <motion.div
      className="bg-gray-50 min-h-screen py-12 px-4 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <motion.div
        className="max-w-7xl mx-auto mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Home Essentials Categories
        </h1>
        <p className="text-gray-500 mt-2">
          Everything you need to make your home better
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            variants={item}
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition cursor-pointer bg-white"
          >
            {/* IMAGE */}
            <motion.img
              src={cat.image}
              alt={cat.name}
              className="w-full h-72 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition" />

            {/* CONTENT */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 text-xs bg-white/20 backdrop-blur-md rounded-full mb-2"
              >
                Home Category
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold"
              >
                {cat.name}
              </motion.h2>

              <motion.button
                whileHover={{ x: 5 }}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition"
              >
                Explore <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Categories;