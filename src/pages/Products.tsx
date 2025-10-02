import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, SortDesc, Sparkles, ListFilter as Filter } from "lucide-react";
import { products as allProducts, categories, Product } from "../data/products";
import ProductCard from "../components/UI/ProductCard";
import QuickViewModal from "../components/UI/QuickViewModal";

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState<"featured" | "price_low" | "price_high" | "rating">("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleQuickView = (p: Product) => {
    setSelectedProduct(p);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = useMemo(() => {
    const base = allProducts.filter((p) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.join(" ").toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const priceToNum = (price: string) => {
      const m = price.match(/₹\s*([\d,]+)/);
      return m ? parseInt(m[1].replace(/,/g, ""), 10) : Number.MAX_SAFE_INTEGER;
    };

    switch (sortBy) {
      case "price_low":
        return [...base].sort((a, b) => priceToNum(a.price) - priceToNum(b.price));
      case "price_high":
        return [...base].sort((a, b) => priceToNum(b.price) - priceToNum(a.price));
      case "rating":
        return [...base].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return base;
    }
  }, [searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Products");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900"
          >
            Our Premium Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="mt-4 max-w-3xl text-lg md:text-xl text-neutral-600"
          >
            Professional pizza ovens engineered for speed & consistency—built for homes and high-volume restaurants.
          </motion.p>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 py-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ovens, size, features…"
                className="w-full rounded-xl border border-neutral-300 pl-10 pr-4 py-2.5 focus:border-transparent focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Desktop filters */}
            <div className="hidden lg:flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-neutral-300 px-3 py-2.5 focus:ring-2 focus:ring-amber-500"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <div className="h-6 w-px bg-neutral-200" />
              <div className="flex items-center gap-2">
                <SortDesc size={18} className="text-neutral-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-neutral-300 px-3 py-2.5 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="ml-2 rounded-xl border border-amber-600 px-3 py-2.5 text-amber-700 transition hover:bg-amber-600 hover:text-white"
              >
                Clear
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="lg:hidden inline-flex items-center gap-2 rounded-xl border bg-neutral-50 px-3 py-2.5"
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>

          {/* Mobile dropdowns */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-3 grid grid-cols-2 gap-3"
              >
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="col-span-2 rounded-xl border border-neutral-300 px-3 py-2.5 focus:ring-2 focus:ring-amber-500"
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="col-span-2 rounded-xl border border-neutral-300 px-3 py-2.5 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <div className="col-span-2 flex gap-3">
                  <button onClick={() => setSortBy("featured")} className="flex-1 rounded-xl border px-3 py-2.5">
                    Featured
                  </button>
                  <button onClick={clearFilters} className="flex-1 rounded-xl border border-amber-600 px-3 py-2.5 text-amber-700">
                    Clear All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* COUNT */}
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 pt-6">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <p>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{allProducts.length}</strong> products
          </p>
          {(searchTerm || selectedCategory !== "All Products") && (
            <span className="inline-flex items-center gap-1 text-amber-700">
              <Sparkles size={16} /> Filters active
            </span>
          )}
        </div>
      </div>

      {/* GRID (1 / 2 / 3) with square cards */}
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-neutral-100 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={handleQuickView} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <Filter className="mx-auto text-neutral-400 mb-4" size={42} />
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-neutral-600 mt-1">Try different keywords.</p>
            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-amber-600 px-6 py-3 text-white hover:bg-amber-700"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Products;
