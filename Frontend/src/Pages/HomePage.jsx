// import React from "react";
// import {
//   ArrowRight,
//   ShoppingBag,
//   ShieldCheck,
//   Truck,
//   BadgePercent,
//   Flame,
//   Star,
//   Sparkles,
// } from "lucide-react";

// import { useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { assets, products } from "../assets/assets";

// const features = [
//   {
//     icon: <Truck size={28} />,
//     title: "Fast Delivery",
//     desc: "Quick and secure delivery across India with tracking support.",
//   },
//   {
//     icon: <ShieldCheck size={28} />,
//     title: "Secure Payments",
//     desc: "100% safe and encrypted payment experience.",
//   },
//   {
//     icon: <BadgePercent size={28} />,
//     title: "Best Deals",
//     desc: "Unbeatable prices with exciting daily offers.",
//   },
// ];


// const trendingProducts = [
//   {
//     title: "Oil Items and Seeds",
//     price: "₹5,999",
//     image:
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     title: "Premium Cookware",
//     price: "₹2,499",
//     image:
//       "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     title: "Wireless Headphones",
//     price: "₹3,999",
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//     },
//   },
// };



// const HomePage = () => {
//   const navigate = useNavigate();


//   /* ---------------- DERIVED DATA ---------------- */

//   const categories = useMemo(() => {
//     const unique = [...new Set(products.map((p) => p.category))];

//     return unique.map((cat, index) => {
//       const sample = products.find((p) => p.category === cat);

//       return {
//         title: cat,
//         image: sample?.image || assets.bannerOne,
//       };
//     });
//   }, []);

//   const trendingProducts = useMemo(() => {
//     return products
//       .filter((p) => p.trending) // if you added flag
//       .slice(0, 3);
//   }, []);

//   // fallback if no trending flag exists
//   const fallbackTrending = products.slice(0, 3);

//   const finalTrending =
//     trendingProducts.length > 0 ? trendingProducts : fallbackTrending;



//   const handleCategoryClick = (category) => {
//     navigate(`/products?category=${category}`);
//   };

//   return (
//     <div className="bg-white text-gray-900 overflow-hidden">
//       {/* HERO SECTION */}
//       <section className="relative overflow-hidden">
//         {/* BACKGROUND GLOW */}
//         <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-100 rounded-full blur-3xl opacity-70" />
//         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl opacity-80" />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
//           {/* LEFT */}
//           <motion.div
//             initial="hidden"
//             animate="show"
//             variants={container}
//           >
//             <motion.div
//               variants={fadeUp}
//               className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-semibold"
//             >
//               <Sparkles size={16} />
//               Welcome to KRS Lifeline
//             </motion.div>

//             <motion.h1
//               variants={fadeUp}
//               className="text-4xl md:text-5xl lg:text-7xl font-extrabold mt-7 leading-tight"
//             >
//               Shop Smarter
//               <span className="block text-red-600">
//                 Premium Deals
//               </span>
//             </motion.h1>

//             <motion.p
//               variants={fadeUp}
//               className="text-gray-600 mt-7 leading-8 text-lg max-w-xl"
//             >
//               we are committed to providing a complete shopping experience through quality products, affordable pricing, and customer-friendly service. From trending gadgets to essential home products
//             </motion.p>

//             {/* BUTTONS */}
//             <motion.div
//               variants={fadeUp}
//               className="flex flex-wrap gap-4 mt-10"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/products")}
//                 className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-red-200"
//               >
//                 Shop Now
//                 <ArrowRight size={18} />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/products")}
//                 className="border border-gray-300 hover:border-red-600 hover:text-red-600 px-8 py-4 rounded-2xl font-medium transition-all"
//               >
//                 Explore Categories
//               </motion.button>
//             </motion.div>

//             {/* STATS */}
//             <motion.div
//               variants={fadeUp}
//               className="grid grid-cols-3 gap-6 mt-14 max-w-lg"
//             >
//               {[
//                 { value: "10K+", label: "Happy Customers" },
//                 { value: "500+", label: "Premium Products" },
//                 { value: "24/7", label: "Customer Support" },
//               ].map((item, index) => (
//                 <div key={index}>
//                   <h2 className="text-3xl font-extrabold text-gray-900">
//                     {item.value}
//                   </h2>

//                   <p className="text-gray-500 text-sm mt-1">
//                     {item.label}
//                   </p>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* RIGHT IMAGE */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7 }}
//             className="relative"
//           >
//             {/* FLOATING CARDS */}
//             <motion.div
//               animate={{ y: [0, -12, 0] }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 4,
//               }}
//               className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 z-20 border border-gray-100"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
//                   <ShoppingBag size={22} />
//                 </div>

//                 <div>
//                   <h4 className="font-bold text-sm">
//                     500+ Products
//                   </h4>

//                   <p className="text-xs text-gray-500">
//                     Premium collections
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 5,
//               }}
//               className="absolute bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-5 py-4 z-20 border border-gray-100"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
//                   <Star size={20} />
//                 </div>

//                 <div>
//                   <h4 className="font-bold text-sm">
//                     Trusted Store
//                   </h4>

//                   <p className="text-xs text-gray-500">
//                     4.9 Customer Rating
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* IMAGE */}
//             <div className="relative">
//               <div className="absolute inset-0 bg-red-200 blur-3xl opacity-40 rounded-full" />

//               <img
//                 src={assets.bannerOne}
//                 alt="Banner"
//                 className="relative z-10 rounded-[32px] shadow-2xl w-full h-[550px] object-cover border border-white"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <motion.div
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           variants={container}
//           className="grid md:grid-cols-3 gap-8"
//         >
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               whileHover={{ y: -8 }}
//               className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300"
//             >
//               <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
//                 {feature.icon}
//               </div>

//               <h3 className="text-2xl font-bold mt-6">
//                 {feature.title}
//               </h3>

//               <p className="text-gray-500 mt-3 leading-7">
//                 {feature.desc}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* CATEGORIES */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         <div className="text-center mb-14">
//           <h2 className="text-4xl font-extrabold">
//             Shop by Category
//           </h2>

//           <p className="text-gray-500 mt-4 text-lg">
//             Explore premium collections crafted for your needs
//           </p>
//         </div>

//         <motion.div
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           variants={container}
//           className="grid md:grid-cols-3 gap-8"
//         >
//           {categories.map((category, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               onClick={() => handleCategoryClick(category.title)}
//               whileHover={{ scale: 1.03 }}
//               className="relative overflow-hidden rounded-[30px] group cursor-pointer"
//             >
//               <img
//                 src={category.image}
//                 alt={category.title}
//                 className="h-[380px] w-full object-cover group-hover:scale-110 transition duration-700"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//               <div className="absolute bottom-7 left-7 text-white">
//                 <h3 className="text-3xl font-bold">
//                   {category.title}
//                 </h3>

//                 <button className="mt-4 flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-medium hover:bg-red-600 hover:text-white transition">
//                   Explore
//                   <ArrowRight size={16} />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* ================= TRENDING ================= */}
//       <section className="bg-gray-50 py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center gap-3 mb-10">
//             <Flame className="text-red-600" />
//             <h2 className="text-3xl font-bold">Trending Products</h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {finalTrending.map((p) => (
//               <motion.div
//                 key={p.id}
//                 whileHover={{ y: -6 }}
//                 className="bg-white rounded-2xl overflow-hidden shadow"
//               >
//                 <img src={p.image} className="h-64 w-full object-cover" />

//                 <div className="p-5">
//                   <h3 className="font-bold text-lg">{p.name}</h3>
//                   <p className="text-red-600 font-bold mt-2">
//                     ₹{p.price}
//                   </p>

//                   <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-xl">
//                     Buy Now
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ABOUT US */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* LEFT CONTENT */}
//           <div>
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//               About <span className="text-red-600">KRS Lifeline</span>
//             </h2>

//             <p className="text-gray-600 mt-6 leading-8 text-lg">
//               Welcome to <span className="font-semibold text-gray-900">KRS Lifeline</span> — your exclusive shopping destination for
//               innovative, trending, and everyday useful products at affordable prices.
//             </p>

//             <p className="text-gray-600 mt-4 leading-8">
//               What started as a popular expo and stall-based shopping experience has now grown into a complete shopping brand with both a physical showroom and online store.
//               We bring the latest Instagram-famous and social media trending products directly to customers who love smart and useful finds.
//             </p>

//             <p className="text-gray-600 mt-4 leading-8">
//               We carefully select products that combine quality, functionality, and affordability — from home appliances and kitchen essentials to viral gadgets and lifestyle products.
//             </p>

//             {/* HIGHLIGHTS */}
//             <div className="grid sm:grid-cols-2 gap-4 mt-8">
//               {[
//                 "Trending Instagram Products",
//                 "Affordable Premium Quality",
//                 "Wholesale & Retail Available",
//                 "Live Product Experience",
//                 "Trusted Expo Brand",
//                 "Online + Offline Store",
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex items-start gap-2 text-gray-700 text-sm"
//                 >
//                   <span className="w-2 h-2 mt-2 rounded-full bg-red-600"></span>
//                   {item}
//                 </div>
//               ))}
//             </div>

//             <p className="text-gray-700 mt-8 font-medium">
//               Our mission is simple — to make trending and useful products easily accessible to everyone with the best shopping experience.
//             </p>

//             <p className="text-gray-900 mt-4 font-semibold">
//               Visit KRS Lifeline today and discover products that make everyday life smarter and easier.
//             </p>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative">
//             <div className="absolute -inset-4 bg-red-100 blur-3xl opacity-50 rounded-full" />

//             <img
//               src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop"
//               alt="About KRS Lifeline"
//               className="relative w-full h-[520px] object-cover rounded-3xl shadow-2xl border border-white"
//             />
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets, products } from "../assets/assets";

const features = [
  {
    icon: <Truck size={26} />,
    title: "Fast Delivery",
    desc: "Quick and secure delivery across India with real-time tracking.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Secure Payments",
    desc: "100% safe and encrypted payment experience every time.",
  },
  {
    icon: <BadgePercent size={26} />,
    title: "Best Deals",
    desc: "Unbeatable prices with exciting daily offers just for you.",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "24/7", label: "Customer Support" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

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
    const trending = products.filter((p) => p.trending).slice(0, 3);
    return trending.length > 0 ? trending : products.slice(0, 3);
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] bg-red-100 rounded-full blur-[120px] opacity-60" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[480px] h-[480px] bg-red-50 rounded-full blur-[100px] opacity-70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold tracking-wide uppercase"
            >
              <Sparkles size={13} />
              Welcome to KRS Lifeline
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
            >
              Shop Smarter
              <span className="block text-red-600 mt-1">Premium Deals</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed text-base max-w-lg">
              Committed to a complete shopping experience — quality products, affordable pricing,
              and friendly service. From trending gadgets to essential home products.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-md shadow-red-200 transition-colors"
              >
                Shop Now <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-red-500 hover:text-red-600 text-gray-700 px-7 py-3.5 rounded-xl font-medium transition-colors"
              >
                Explore Categories
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 mt-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="relative flex justify-center"
          >
            {/* Floating badge – top-left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-5 -left-4 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">500+ Products</p>
                  <p className="text-xs text-gray-400">Premium collections</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge – bottom-right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                  <Star size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Trusted Store</p>
                  <p className="text-xs text-gray-400">4.9 ★ Rating</p>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <div className="relative w-full max-w-[540px]">
              <div className="absolute inset-6 bg-red-200 rounded-full blur-3xl opacity-30" />
              <img
                src={assets.bannerOne}
                alt="Hero Banner"
                className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-2xl border border-white/80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group flex gap-5 items-start bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-600 flex items-center justify-center text-red-600 group-hover:text-white transition-colors duration-300">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <p className="text-red-600 text-xs font-semibold uppercase tracking-widest">Collections</p>
          <h2 className="text-4xl font-extrabold mt-2">Shop by Category</h2>
          <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm">Explore premium collections crafted for your needs</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="grid md:grid-cols-3 gap-6"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/products?category=${cat.title}`)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group h-[360px]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Collection</p>
                  <h3 className="text-white text-2xl font-extrabold">{cat.title}</h3>
                </div>
                <button className="flex items-center gap-1.5 bg-white text-gray-900 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 hover:text-white transition-colors shrink-0">
                  Explore <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── TRENDING ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Flame size={22} className="text-red-600" />
              <h2 className="text-2xl font-extrabold text-gray-900">Trending Products</h2>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="text-red-600 text-sm font-medium flex items-center gap-1 hover:underline"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="grid md:grid-cols-3 gap-6"
          >
            {trendingProducts.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="overflow-hidden h-56">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-bold text-gray-900 text-lg mt-1 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-2xl font-extrabold text-gray-900">₹{p.price?.toLocaleString()}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${p.id}`); }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-red-600 text-xs font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              About <span className="text-red-600">KRS Lifeline</span>
            </h2>
            <p className="text-gray-500 mt-5 leading-relaxed">
              Your exclusive shopping destination for innovative, trending, and everyday products at affordable prices.
              What started as a popular expo and stall-based experience has grown into a complete shopping brand
              with both a physical showroom and online store.
            </p>
            <p className="text-gray-500 mt-3 leading-relaxed">
              We carefully select products combining quality, functionality, and affordability — from home appliances
              and kitchen essentials to viral gadgets and lifestyle products.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {[
                "Trending Instagram Products",
                "Affordable Premium Quality",
                "Wholesale & Retail Available",
                "Live Product Experience",
                "Trusted Expo Brand",
                "Online + Offline Store",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-gray-500 leading-relaxed border-l-4 border-red-600 pl-4">
              Our mission — to make trending and useful products accessible to everyone with the best shopping experience.
            </p>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute -inset-6 bg-red-100 blur-3xl opacity-40 rounded-full" />
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop"
              alt="About KRS Lifeline"
              className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl border border-white"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;