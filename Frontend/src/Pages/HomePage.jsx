import React, { useMemo } from "react";
import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  BadgePercent,
  Flame,
  Star,
  Sparkles,
  ChevronRight,
  Quote,
  Zap,
  Heart,
  Package,
  MapPin,
  Users,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { products } from "../MockData/Product"

/* ── Animation variants ── */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.11 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Static data ── */
const features = [
  {
    icon: <Truck size={28} />,
    title: "Fast Delivery",
    desc: "Quick and secure delivery across India with real-time tracking.",
    num: "01",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Payments",
    desc: "100% safe and encrypted payment experience every time you shop.",
    num: "02",
  },
  {
    icon: <BadgePercent size={28} />,
    title: "Best Deals",
    desc: "Unbeatable prices with exciting daily offers just for you.",
    num: "03",
  },
  {
    icon: <Zap size={28} />,
    title: "24/7 Support",
    desc: "Our team is always ready to assist you anytime, anywhere.",
    num: "04",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "4.9★", label: "Average Rating" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Chennai",
    rating: 5,
    text: "Absolutely love the products! The quality is outstanding and delivery was super fast. Will definitely shop again.",
    avatar: "PS",
  },
  {
    name: "Arjun Mehta",
    location: "Bangalore",
    rating: 5,
    text: "Best online store for home appliances. Prices are unbeatable and the customer support is always helpful.",
    avatar: "AM",
  },
  {
    name: "Lakshmi R.",
    location: "Coimbatore",
    rating: 5,
    text: "Ordered multiple times and never disappointed. The packaging is excellent and products are exactly as described.",
    avatar: "LR",
  },
];

const marqueeItems = [
  "Free Shipping on orders ₹499+",
  "New Arrivals Every Week",
  "Exclusive Member Deals",
  "Trusted by 10,000+ Customers",
  "100% Secure Checkout",
  "Easy 7-Day Returns",
];

const aboutHighlights = [
  { icon: <MapPin size={20} />, title: "Physical Showroom", desc: "Visit us in Coimbatore" },
  { icon: <Users size={20} />, title: "10,000+ Customers", desc: "Across all of India" },
  { icon: <Award size={20} />, title: "Expo Trusted Brand", desc: "Years of live experience" },
  { icon: <Package size={20} />, title: "500+ Products", desc: "Curated for quality" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];
    return unique.map((cat) => {
      const sample = products.find((p) => p.category === cat);
      return { title: cat, image: sample?.image || assets.bannerOne };
    });
  }, []);

  const trendingProducts = useMemo(() => {
    const trending = products.filter((p) => p.trending).slice(0, 4);
    return trending.length >= 4 ? trending : products.slice(0, 4);
  }, []);

  return (
    <div className="bg-[#fafafa] text-gray-900 overflow-x-hidden">


      {/* section 1 */}
      <section className="relative overflow-hidden bg-[#fff] text-[#000]">
        {/* Dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#c90202]/20 rounded-full blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-[400px] h-[400px] bg-[#0505eb]/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pb-24 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-7"
          >
            {/* Badge */}
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff] border border-[#c90202]/30 text-[#0505eb] text-xs font-bold tracking-widest uppercase shadow-sm"
            >
              <Sparkles size={12} />
              Welcome to KRS Lifeline
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.06] tracking-tight text-[#000]"
            >
              Shop
              <span className="relative inline-block ml-3">
                <span className="text-[#c90202]">Smarter.</span>

                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute -bottom-1 left-0 w-full h-1 bg-[#c90202] origin-left rounded-full"
                />
              </span>

              <span className="block mt-2 text-[#000]">
                Live Better.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-[#000]/70 leading-relaxed text-base max-w-md"
            >
              Premium appliances, trending gadgets, and daily essentials —
              delivered fast with unbeatable prices and service that goes
              the extra mile.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 pt-1"
            >
              {/* Primary */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 bg-[#c90202] hover:bg-[#dc0d0d] text-[#fff] px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#0505eb]/20 transition-all text-sm"
              >
                Shop Now
                <ArrowRight size={15} />
              </motion.button>

              {/* Secondary */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 border-2 border-[#000]/10 hover:border-[#c90202] hover:text-[#c90202] text-[#000] px-8 py-4 rounded-2xl font-semibold transition-all text-sm bg-[#fff]"
              >
                Browse All
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-8 pt-6 border-t border-[#000]/10"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black text-[#000] tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-[#000]/50 text-[11px] font-medium mt-0.5 uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute -top-4 left-2 lg:-left-8 z-20 bg-[#fff] rounded-2xl shadow-xl border border-[#000]/10 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c90202]/10 flex items-center justify-center text-[#c90202]">
                  <ShoppingBag size={19} />
                </div>

                <div>
                  <p className="font-black text-sm text-[#000]">
                    500+ Products
                  </p>
                  <p className="text-[11px] text-[#000]/50">
                    Premium collections
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 right-2 lg:-right-4 z-20 bg-[#fff] rounded-2xl shadow-xl border border-[#000]/10 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-[#c90202]", "bg-[#0505eb]", "bg-[#000]"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 rounded-full ${c} border-2 border-[#fff]`}
                      />
                    )
                  )}
                </div>

                <div>
                  <p className="font-black text-sm text-[#000]">
                    10K+ Happy
                  </p>
                  <p className="text-[11px] text-[#000]/50">
                    Customers ⭐ 4.9
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <div className="relative w-full max-w-[520px]">
              <div className="absolute inset-8 bg-[#c90202]/20 rounded-full blur-3xl" />

              <img
                src={assets.bannerOne}
                alt="Hero Banner"
                className="relative z-10 w-full h-[480px] object-cover rounded-[2rem] shadow-2xl border border-[#000]/10"
              />

              {/* Decorations */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-[1.5rem] bg-[#0505eb] -z-10" />

              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl border-2 border-[#c90202] -z-10" />
            </div>
          </motion.div>
        </div>

        {/* MARQUEE */}
        <div className="relative z-10 border-t border-[#000]/10 bg-[#c90202] overflow-hidden py-3">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
              (item, i) => (
                <span
                  key={i}
                  className="text-[#fff] text-xs font-bold uppercase tracking-widest flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fff]/50 shrink-0" />
                  {item}
                </span>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* section 2 */}
      <section className="py-24 bg-[#fff] relative overflow-hidden">
        {/* Subtle dot bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#0505eb] text-xs font-bold uppercase tracking-[4px] mb-3"
            >
              Why Us
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-black leading-tight text-[#000]"
            >
              Built Around <span className="text-[#c90202]">You</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[#000]/60 mt-4 max-w-lg mx-auto text-sm leading-relaxed"
            >
              Every decision we make is centred on giving you a smoother, smarter, and more satisfying shopping experience.
            </motion.p>
          </motion.div>

          {/* Numbered feature cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative bg-[#fff] rounded-3xl p-7 border border-[#000]/10 hover:border-[#c90202]/30 hover:shadow-xl hover:shadow-[#c90202]/10 transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Big number watermark */}
                <span
                  className="absolute -top-3 -right-1 text-[80px] font-black text-[#000]/5 group-hover:text-[#c90202]/10 transition-colors leading-none select-none"
                  style={{ lineHeight: 1 }}
                >
                  {f.num}
                </span>

                {/* Top accent bar */}
                <div className="absolute top-0 left-6 w-10 h-[3px] rounded-b-full bg-[#0505eb] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#c90202]/10 text-[#c90202] flex items-center justify-center mb-5 group-hover:bg-[#0505eb] group-hover:text-[#fff] transition-all duration-300">
                    {f.icon}
                  </div>

                  <h3 className="text-[#000] font-black text-lg mb-2">
                    {f.title}
                  </h3>

                  <p className="text-[#000]/60 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* section 3 */}
      <section className="py-24 bg-[#fff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-[#0505eb] text-xs font-bold uppercase tracking-[4px] mb-2"
              >
                Collections
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-black leading-tight text-[#000]"
              >
                Shop by
                <span className="text-[#c90202]"> Category</span>
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUp}
              className="text-[#000]/50 text-sm max-w-xs leading-relaxed md:text-right"
            >
              Explore our curated collections, each handpicked for quality and value.
            </motion.p>
          </motion.div>

          {categories.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={container}
              className="grid grid-cols-2 lg:grid-cols-3 gap-4"
              style={{ gridAutoRows: "220px" }}
            >
              {categories.slice(0, 5).map((cat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  onClick={() =>
                    navigate(`/products?category=${cat.title}`)
                  }
                  className={`relative overflow-hidden rounded-3xl cursor-pointer group ${i === 0 ? "row-span-2" : ""
                    }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#000]/80 via-[#000]/20 to-transparent" />
                  <div className="absolute inset-0 bg-[#c90202]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="text-[#fff]/60 text-[10px] uppercase tracking-[3px] mb-1">
                        Collection
                      </p>

                      <h3 className="text-[#fff] font-black text-xl">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#fff] flex items-center justify-center group-hover:bg-[#0505eb] transition-colors shrink-0">
                      <ChevronRight
                        size={15}
                        className="text-[#000] group-hover:text-[#fff] transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 border-2 border-[#000]/10 hover:border-[#c90202] hover:text-[#c90202] text-[#000]/70 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all"
            >
              View All Categories <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* section 5 */}
      <section className="py-24 bg-[#fff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-2">
                <Flame size={18} className="text-[#0505eb]" />
                <p className="text-[#0505eb] text-xs font-bold uppercase tracking-[4px]">
                  Hot Right Now
                </p>
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-[#000]">
                Trending <span className="text-[#c90202]">Picks</span>
              </motion.h2>
            </div>

            <motion.button
              variants={fadeUp}
              onClick={() => navigate("/products")}
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-[#000]/50 hover:text-[#c90202] transition-colors"
            >
              View All <ArrowRight size={14} />
            </motion.button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {trendingProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="group bg-[#fff] rounded-3xl overflow-hidden border border-[#000]/10 shadow-sm hover:shadow-2xl hover:shadow-[#c90202]/10 transition-all duration-300 cursor-pointer"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-52 bg-[#f7f7f7]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {idx === 0 && (
                    <div className="absolute top-3 left-3 bg-[#c90202] text-[#fff] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                      #1 Trending
                    </div>
                  )}

                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#fff]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#fff]">
                    <Heart size={14} className="text-[#c90202]" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <span className="text-[10px] font-black text-[#c90202] uppercase tracking-widest">
                    {p.category}
                  </span>

                  <h3 className="font-bold text-[#000] text-base mt-1 line-clamp-1">
                    {p.name}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-2xl font-black text-[#000]">
                        ₹{p.price?.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-[#000]/40 mt-0.5">
                        Free delivery
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${p.id}`);
                      }}
                      className="w-10 h-10 rounded-2xl bg-[#c90202] hover:bg-[#0505eb] text-[#fff] flex items-center justify-center transition-colors"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* section 6 */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] bg-red-50 rounded-full blur-[120px] opacity-60" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[300px] bg-red-50 rounded-full blur-[100px] opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-[#0505eb] text-xs font-bold uppercase tracking-[4px] mb-3">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
              What Our <span className="text-[#c90202]">Customers</span> Say
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mt-4 text-sm max-w-md mx-auto">
              Real reviews from real shoppers who love what we do.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={container}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i} variants={fadeUp} whileHover={{ y: -5 }}
                className="relative bg-white p-7 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:shadow-red-50 transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-red-100"><Quote size={36} /></div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-[1.85] mb-6 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-black flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-[11px] text-gray-400">{t.location}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-lg">Verified ✓</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            {[
              { val: "10,000+", label: "Orders Delivered" },
              { val: "4.9 / 5", label: "Average Rating" },
              { val: "99%", label: "Satisfied Customers" },
            ].map((s) => (
              <div key={s.label} className="px-8 py-4 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-2xl font-black text-red-600">{s.val}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* section 7 */}
      <section className="py-24 bg-[#f7f7f7] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-100 rounded-full blur-[160px] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centre-aligned header */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <motion.p variants={fadeUp} className="text-[#0505eb] text-xs font-bold uppercase tracking-[4px] mb-4">Who We Are</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black leading-[1.08] mb-6">
              About <span className="text-[#c90202]">KRS Lifeline</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-base leading-[1.9]">
              Your exclusive shopping destination for innovative, trending, and everyday products at affordable prices.
              What started as a popular expo and stall-based experience has grown into a complete shopping brand
              with both a physical showroom and online store.
            </motion.p>
          </motion.div>

          {/* Full-width cinematic image with overlapping cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] overflow-hidden mb-12"
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop"
              alt="About KRS Lifeline"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Mission statement overlay — centred on image */}
            <div className="absolute inset-0 flex items-end justify-center pb-10 px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-5 text-center max-w-2xl"
              >
                <p className="text-white font-black text-lg md:text-2xl leading-snug">
                  "Making trending & useful products accessible to everyone — with the best shopping experience."
                </p>
                <p className="text-white/60 text-sm mt-2 font-medium">— KRS Lifeline Mission</p>
              </motion.div>
            </div>

            {/* Floating stat chips on image corners */}
            <div className="absolute top-6 left-6 bg-white rounded-2xl px-4 py-2.5 shadow-lg">
              <p className="font-black text-gray-900 text-sm">Est. in Coimbatore</p>
              <p className="text-gray-400 text-[11px]">Tamil Nadu, India 🇮🇳</p>
            </div>
            <div className="absolute top-6 right-6 bg-red-600 rounded-2xl px-4 py-2.5 shadow-lg">
              <p className="font-black text-white text-sm">⭐ 4.9 Rating</p>
              <p className="text-red-200 text-[11px]">10K+ customers</p>
            </div>
          </motion.div>

          {/* 4 highlight cards below image */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={container}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {aboutHighlights.map((h, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col items-center text-center gap-3 hover:border-red-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  {h.icon}
                </div>
                <div>
                  <p className="font-black text-gray-900 text-sm">{h.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tag pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {[
              "Trending Instagram Products",
              "Affordable Premium Quality",
              "Wholesale & Retail Available",
              "Live Product Experience",
              "Trusted Expo Brand",
              "Online + Offline Store",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-semibold hover:border-red-400 hover:text-red-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2rem] bg-[#c90202] p-10 md:p-14 text-center"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />

            <div className="relative z-10">
              <p className="text-red-200 text-xs font-bold uppercase tracking-[4px] mb-3">Start Today</p>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                Ready to Shop the Best Deals?
              </h2>
              <p className="text-red-100 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Join thousands of happy customers and explore 500+ premium products with unbeatable prices and fast delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-gray-100 px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-lg"
                >
                  Shop Now <ArrowRight size={15} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:border-white hover:bg-white/10 px-10 py-4 rounded-2xl font-semibold text-sm transition-all"
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>



    </div>
  );
};

export default HomePage;