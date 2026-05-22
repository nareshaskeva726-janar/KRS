import React from "react";
import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  BadgePercent,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const features = [
  {
    icon: <Truck size={26} />,
    title: "Fast Delivery",
    desc: "Quick delivery across India with tracking support.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Secure Payments",
    desc: "100% safe & encrypted checkout experience.",
  },
  {
    icon: <BadgePercent size={26} />,
    title: "Best Deals",
    desc: "Daily offers & lowest price guarantee.",
  },
];

const categories = [
  {
    title: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Fashion",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Home Essentials",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000&auto=format&fit=crop",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-sm text-red-600"
            >
              <ShoppingBag size={16} />
              Welcome to KRS Lifeline
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 leading-tight"
            >
              Shop Smarter with
              <span className="block text-red-600">Premium Deals</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 mt-6 leading-7 max-w-xl"
            >
              Discover trending products, daily essentials, and premium gadgets
              at unbeatable prices.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex gap-4 mt-8 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/shop")}
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl font-semibold flex items-center gap-2"
              >
                Shop Now <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/categories")}
                className="border border-gray-300 hover:bg-gray-100 px-7 py-3 rounded-xl"
              >
                Explore Categories
              </motion.button>
            </motion.div>

            {/* STATS */}
            <motion.div
              variants={fadeUp}
              className="flex gap-10 mt-10"
            >
              {[
                { label: "Customers", value: "10K+" },
                { label: "Products", value: "500+" },
                { label: "Support", value: "24/7" },
              ].map((s, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold">{s.value}</h2>
                  <p className="text-gray-500 text-sm">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 bg-red-200 blur-3xl opacity-40 rounded-full"
            />

            <img
              src={assets.bannerOne}
              className="rounded-3xl shadow-xl w-full h-[500px] object-cover relative z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white border p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-red-600">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mt-4">{f.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Explore your favorite collections</p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="grid md:grid-cols-3 gap-6"
        >
          {categories.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={c.image}
                className="h-[320px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="text-sm flex items-center gap-1 mt-2">
                  Explore <ArrowRight size={14} />
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="text-red-600" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>

        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <p className="text-gray-500">
            Add your API products or featured items here 🔥
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;