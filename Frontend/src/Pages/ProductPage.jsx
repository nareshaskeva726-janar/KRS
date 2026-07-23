import React, { useMemo, useState, useEffect, useRef } from "react";
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
  Filter,
  ChevronDown,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Stock tier helper
───────────────────────────────────────────── */
const getStockTier = (qty) => {
  if (qty <= 0) return "Out of Stock";
  if (qty <= 10) return "Low Stock";
  return "In Stock";
};

const STOCK_ORDER = ["In Stock", "Low Stock", "Out of Stock"];

const stockDotColor = {
  "In Stock": "bg-emerald-500",
  "Low Stock": "bg-amber-400",
  "Out of Stock": "bg-red-400",
};

/* ─────────────────────────────────────────────
   Fixed Dual-range Price Slider
   Uses a canvas-free approach: two overlapping
   range inputs with corrected z-index stacking
   and thumb collision detection.
───────────────────────────────────────────── */
const PriceRangeSlider = ({ min, max, low, high, onChange }) => {
  const GAP = Math.max(1, Math.round((max - min) * 0.01)); // 1% minimum gap
  const pct = (v) => ((v - min) / (max - min)) * 100;

  const handleLow = (e) => {
    const val = Math.min(Number(e.target.value), high - GAP);
    onChange(val, high);
  };

  const handleHigh = (e) => {
    const val = Math.max(Number(e.target.value), low + GAP);
    onChange(low, val);
  };

  // Dynamically bump z-index so whichever thumb is closer to
  // the edge gets priority — prevents getting "stuck"
  const lowPct = pct(low);
  const highPct = pct(high);
  const lowZ = lowPct > 50 ? 5 : 3;
  const highZ = highPct < 50 ? 5 : 4;

  return (
    <div className="space-y-3">
      <div className="relative h-5 flex items-center select-none">
        {/* Base track */}
        <div className="absolute w-full h-1 rounded-full bg-gray-200 pointer-events-none" />
        {/* Active fill */}
        <div
          className="absolute h-1 rounded-full bg-gradient-to-r from-[#E24B4A] to-[#A32D2D] pointer-events-none"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />

        {/* Low thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={low}
          onChange={handleLow}
          className="range-thumb absolute w-full h-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: lowZ }}
        />

        {/* High thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={high}
          onChange={handleHigh}
          className="range-thumb absolute w-full h-full appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: highZ }}
        />
      </div>

      {/* Value labels */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-gray-400 uppercase tracking-wide">Min</p>
          <p className="text-xs font-semibold text-gray-700">
            ₹{low.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-400 uppercase tracking-wide">Max</p>
          <p className="text-xs font-semibold text-gray-700">
            ₹{high.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Scoped CSS for thumb styling — avoids Tailwind arbitrary-value issues */}
      <style>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #E24B4A;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          pointer-events: all;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.15s;
        }
        .range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          border-color: #A32D2D;
        }
        .range-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #E24B4A;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          pointer-events: all;
          cursor: pointer;
        }
        /* hide the native track on all browsers */
        .range-thumb::-webkit-slider-runnable-track { background: transparent; }
        .range-thumb::-moz-range-track { background: transparent; }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Custom Checkbox Row
───────────────────────────────────────────── */
const CheckRow = ({ label, checked, onChange, count, dot }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <div className="relative flex items-center flex-shrink-0">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <div className="w-4 h-4 border-2 rounded border-gray-300 peer-checked:border-[#E24B4A] peer-checked:bg-[#E24B4A] transition-all duration-150 flex items-center justify-center">
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
    <div className="flex items-center gap-1.5 flex-1 min-w-0">
      {dot && <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />}
      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">{label}</span>
    </div>
    <span className="text-[11px] text-gray-400 flex-shrink-0 bg-gray-100 rounded-full px-1.5 py-0.5 font-medium tabular-nums">
      {count}
    </span>
  </label>
);

/* ─────────────────────────────────────────────
   Section Header
───────────────────────────────────────────── */
const SectionHeader = ({ title }) => (
  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
    <span className="w-1 h-3 bg-[#E24B4A] rounded-full" />
    {title}
  </h4>
);

/* ─────────────────────────────────────────────
   Chip
───────────────────────────────────────────── */
const Chip = ({ label, onRemove, dot }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FCEBEB] rounded-full text-xs text-[#A32D2D] font-medium">
    {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
    {label}
    <button onClick={onRemove} className="ml-0.5 hover:text-[#791F1F] transition-colors">
      <X size={11} />
    </button>
  </span>
);

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const ProductPage = () => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 9999999]);
  const [priceInited, setPriceInited] = useState(false);

  const [selectedStocks, setSelectedStocks] = useState([]);

  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { data: productsData = [], isLoading, isError } = useGetProductsQuery();

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.products || [];

  const categoryList = ["All", ...new Set(products.map((p) => p.category))];

  const { priceMin, priceMax } = useMemo(() => {
    if (!products.length) return { priceMin: 0, priceMax: 10000 };
    const prices = products.map((p) => Number(p.price) || 0);
    return { priceMin: Math.floor(Math.min(...prices)), priceMax: Math.ceil(Math.max(...prices)) };
  }, [products]);

  useEffect(() => {
    if (products.length && !priceInited) {
      setPriceRange([priceMin, priceMax]);
      setPriceInited(true);
    }
  }, [products.length, priceMin, priceMax, priceInited]);

  const stockCounts = useMemo(() => {
    const counts = { "In Stock": 0, "Low Stock": 0, "Out of Stock": 0 };
    products.forEach((p) => { counts[getStockTier(p.qty ?? p.stock ?? 0)]++; });
    return counts;
  }, [products]);

  useEffect(() => {
    setSelectedCategories(initialCategory !== "All" ? [initialCategory] : ["All"]);
  }, [initialCategory]);

  useEffect(() => { window.scrollTo(0, 0); }, [selectedCategories]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (!selectedCategories.includes("All"))
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    if (search.trim())
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (priceInited)
      filtered = filtered.filter((p) => {
        const price = Number(p.price) || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    if (selectedStocks.length > 0)
      filtered = filtered.filter((p) => selectedStocks.includes(getStockTier(p.qty ?? p.stock ?? 0)));
    if (sort === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
    else if (sort === "highToLow") filtered.sort((a, b) => b.price - a.price);
    else if (sort === "newest") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return filtered;
  }, [products, selectedCategories, search, sort, priceRange, priceInited, selectedStocks]);

  const clearFilters = () => {
    setSelectedCategories(["All"]);
    setSearch("");
    setSort("default");
    setPriceRange([priceMin, priceMax]);
    setSelectedStocks([]);
  };

  const isPriceRangeActive = priceInited && (priceRange[0] !== priceMin || priceRange[1] !== priceMax);
  const hasActiveFilters =
    !selectedCategories.includes("All") || search !== "" || sort !== "default" ||
    isPriceRangeActive || selectedStocks.length > 0;

  const handleCategoryChange = (category) => {
    if (category === "All") { setSelectedCategories(["All"]); return; }
    setSelectedCategories((prev) => {
      let next = prev.filter((c) => c !== "All");
      next = next.includes(category) ? next.filter((c) => c !== category) : [...next, category];
      return next.length === 0 ? ["All"] : next;
    });
  };

  const handleStockChange = (tier) =>
    setSelectedStocks((prev) => prev.includes(tier) ? prev.filter((s) => s !== tier) : [...prev, tier]);

  /* ── Animations ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-5 bg-gray-200 rounded-full w-1/4" />
      </div>
    </div>
  );

  /* ── Shared filter panel ── */
  const FilterPanelContent = () => (
    <div>
      {/* CATEGORY */}
      <div className="px-4 py-4 border-b border-gray-100">
        <SectionHeader title="Category" />
        <div className="space-y-2.5">
          {categoryList.map((cat) => (
            <CheckRow
              key={cat}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              count={cat === "All" ? products.length : products.filter((p) => p.category === cat).length}
            />
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="px-4 py-4 border-b border-gray-100">
        <SectionHeader title="Price Range" />
        {priceInited ? (
          <PriceRangeSlider
            min={priceMin}
            max={priceMax}
            low={priceRange[0]}
            high={priceRange[1]}
            onChange={(lo, hi) => setPriceRange([lo, hi])}
          />
        ) : (
          <div className="h-8 bg-gray-100 rounded-lg animate-pulse" />
        )}
        {priceInited && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {[
              { label: "Under ₹500", lo: priceMin, hi: Math.min(500, priceMax) },
              { label: "₹500–₹2k", lo: 500, hi: Math.min(2000, priceMax) },
              { label: "₹2k–₹5k", lo: 2000, hi: Math.min(5000, priceMax) },
              { label: "₹5k+", lo: 5000, hi: priceMax },
            ]
              .filter((p) => p.lo <= priceMax && p.hi >= priceMin && p.lo < p.hi)
              .map((preset) => {
                const active = priceRange[0] === preset.lo && priceRange[1] === preset.hi;
                return (
                  <button
                    key={preset.label}
                    onClick={() => setPriceRange([preset.lo, preset.hi])}
                    className={`text-[10px] font-medium px-2 py-1 rounded-full border transition-all duration-150 ${
                      active
                        ? "bg-[#E24B4A] border-[#E24B4A] text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:border-[#E24B4A] hover:text-[#E24B4A]"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {/* AVAILABILITY */}
      <div className="px-4 py-4">
        <SectionHeader title="Availability" />
        <div className="space-y-2.5">
          {STOCK_ORDER.map((tier) => (
            <CheckRow
              key={tier}
              label={tier}
              checked={selectedStocks.includes(tier)}
              onChange={() => handleStockChange(tier)}
              count={stockCounts[tier]}
              dot={stockDotColor[tier]}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-[#073273]">Shop</span>{" "}
            <span className="text-[#C6181E]">Our Products</span>
          </motion.h1>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
                {/* Sidebar header */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-[#FCEBEB] rounded-lg">
                      <Filter size={13} className="text-[#E24B4A]" />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Filters</span>
                  </div>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                      <X size={11} /> Clear all
                    </button>
                  )}
                </div>
                <FilterPanelContent />
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">

            {/* ── Toolbar ──
                Mobile : Row 1 = [Filter btn] [Search (flex-1)]
                         Row 2 = [Sort (flex-1)] [View toggle]
                Desktop: Single row = [Search (flex-1)] [Sort] [View toggle]
            ── */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 mb-5">

              {/* Row 1 on mobile / left side on desktop */}
              <div className="flex items-center gap-2.5 lg:flex-1">
                {/* Filter button — mobile only */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex-shrink-0 relative flex items-center justify-center px-3 py-2.5 bg-white rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-soft"
                >
                  <Filter size={15} />
                  {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E24B4A] rounded-full border-2 border-white" />
                  )}
                </button>

                {/* Search */}
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search products…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.trimStart())}
                    className="w-full pl-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E24B4A]/20 focus:border-[#E24B4A] transition-all shadow-soft"
                    style={{ paddingRight: search ? "5.5rem" : "6rem" }}
                  />
                  {/* Result count badge */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ right: search ? "2.25rem" : "0.625rem" }}
                  >
                    <span className="text-[11px] font-semibold text-[#E24B4A] bg-[#FCEBEB] px-2 py-0.5 rounded-full whitespace-nowrap tabular-nums">
                      {filteredProducts.length} results
                    </span>
                  </div>
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Row 2 on mobile / right side on desktop */}
              <div className="flex items-center gap-2.5">
                {/* Sort — stretches on mobile, fixed on desktop */}
                <div className="relative flex-1 lg:flex-none">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full lg:w-auto appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E24B4A]/20 focus:border-[#E24B4A] cursor-pointer shadow-soft transition-all"
                  >
                    <option value="default">Sort: Default</option>
                    <option value="lowToHigh">Price: Low → High</option>
                    <option value="highToLow">Price: High → Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="flex-shrink-0 flex items-center gap-0.5 bg-white rounded-xl border border-gray-100 p-1 shadow-soft">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                    className={`p-2 rounded-lg transition-all duration-150 ${
                      viewMode === "grid" ? "bg-[#E24B4A] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid3x3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    title="List view"
                    className={`p-2 rounded-lg transition-all duration-150 ${
                      viewMode === "list" ? "bg-[#E24B4A] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <LayoutList size={15} />
                  </button>
                </div>
              </div>

            </div>

            {/* Active filter chips — only rendered when filters are active */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {search && <Chip label={`"${search}"`} onRemove={() => setSearch("")} />}
                {!selectedCategories.includes("All") && selectedCategories.map((cat) => (
                  <Chip key={cat} label={cat} onRemove={() => handleCategoryChange(cat)} />
                ))}
                {isPriceRangeActive && (
                  <Chip
                    label={`₹${priceRange[0].toLocaleString("en-IN")} – ₹${priceRange[1].toLocaleString("en-IN")}`}
                    onRemove={() => setPriceRange([priceMin, priceMax])}
                  />
                )}
                {selectedStocks.map((tier) => (
                  <Chip key={tier} label={tier} onRemove={() => handleStockChange(tier)} dot={stockDotColor[tier]} />
                ))}
                {sort !== "default" && (
                  <Chip label={sort === "lowToHigh" ? "Price ↑" : sort === "highToLow" ? "Price ↓" : "Newest"} onRemove={() => setSort("default")} />
                )}
                <button onClick={clearFilters} className="text-[11px] text-gray-400 hover:text-[#E24B4A] transition-colors ml-1">
                  Clear all
                </button>
              </div>
            )}

            {/* ── Products ── */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : isError ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl py-20 text-center border border-gray-100 shadow-soft"
              >
                <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-3">
                  <X size={28} className="text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Failed to load products</h3>
                <p className="text-gray-400 text-sm mt-1">Please try again later</p>
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl py-20 text-center border border-gray-100 shadow-soft"
              >
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <Search size={28} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                <button onClick={clearFilters} className="mt-5 text-sm text-[#E24B4A] font-medium underline underline-offset-2">
                  Reset all filters
                </button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product._id || product.id}
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 320 }}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="cursor-pointer group"
                  >
                    <ProductCard product={product} index={idx} onAddToCart={(p, qty) => addToCart(p, qty)} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-3"
              >
                {filteredProducts.map((product) => {
                  const tier = getStockTier(product.qty ?? product.stock ?? 0);
                  return (
                    <motion.div
                      key={product._id || product.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.005 }}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-elevated transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-800 text-base group-hover:text-[#E24B4A] transition-colors truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                            <span className={`mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                              tier === "In Stock" ? "bg-emerald-50 text-emerald-700"
                              : tier === "Low Stock" ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-600"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${stockDotColor[tier]}`} />
                              {tier}
                            </span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl font-bold text-gray-800">₹{Number(product.price).toLocaleString("en-IN")}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{product.qty ?? product.stock ?? 0} units</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
                            className="px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-[#E24B4A] transition-all duration-200 shadow-sm"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl overflow-y-auto lg:hidden"
            >
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-[#FCEBEB] rounded-lg">
                    <Filter size={13} className="text-[#E24B4A]" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Filters</span>
                </div>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              <FilterPanelContent />

              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-2">
                <button
                  onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }}
                  className="flex-1 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2 text-sm text-white bg-[#E24B4A] rounded-xl font-medium shadow-sm hover:bg-[#A32D2D] transition-colors"
                >
                  Show {filteredProducts.length}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .shadow-soft {
          box-shadow: 0 4px 16px -2px rgba(0,0,0,0.06), 0 2px 6px -1px rgba(0,0,0,0.03);
        }
        .shadow-elevated {
          box-shadow: 0 16px 32px -8px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default ProductPage;