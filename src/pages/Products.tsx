import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListFilter as Filter,
  Search,
  SlidersHorizontal,
  SortDesc,
  Sparkles,
  MessageCircleMore,
  ShieldCheck,
  Timer,
  Flame as FlameIcon,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import {
  products as allProducts,
  categories,
  Product,
} from "../data/products";
import ProductCard from "../components/UI/ProductCard";
import QuickViewModal from "../components/UI/QuickViewModal";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent @keyframes shimmer{100%{transform:translateX(100%);}}";

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  // SINGLE FILTER ONLY: Category (defaults to All Products)
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const [sortBy, setSortBy] = useState<"featured" | "price_low" | "price_high" | "rating">(
    "featured"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = useMemo(() => {
    const base = allProducts.filter((p) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.join(" ").toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All Products" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    const priceToNum = (price: string) => {
      const m = price.match(/₹\s*([\d,]+)/);
      return m ? parseInt(m[1].replace(/,/g, ""), 10) : Number.MAX_SAFE_INTEGER;
    };

    switch (sortBy) {
      case "price_low":
        return base.sort((a, b) => priceToNum(a.price) - priceToNum(b.price));
      case "price_high":
        return base.sort((a, b) => priceToNum(b.price) - priceToNum(a.price));
      case "rating":
        return base.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
      {/* Split Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900"
          >
            Our Premium Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 max-w-3xl text-lg md:text-xl text-neutral-600"
          >
            Discover professional pizza ovens engineered for performance—crafted
            for homes, cloud-kitchens and high-volume restaurants.
          </motion.p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* Multi-Fuel banner */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative rounded-2xl overflow-hidden ring-1 ring-black/5"
            >
              <img
                src="https://images.unsplash.com/photo-1606756790138-261d82aa74fd?q=80&w=1400&auto=format&fit=crop"
                alt="Multi-Fuel Ovens"
                className="h-44 md:h-56 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm uppercase tracking-widest opacity-90">
                  Multi-Fuel Pizza Ovens
                </p>
                <h3 className="text-2xl font-bold">Wood • Charcoal • Gas</h3>
              </div>
            </motion.div>

            {/* Gas banner */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative rounded-2xl overflow-hidden ring-1 ring-black/5"
            >
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1400&auto=format&fit=crop"
                alt="Gas Ovens"
                className="h-44 md:h-56 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm uppercase tracking-widest opacity-90">
                  Gas Pizza Ovens
                </p>
                <h3 className="text-2xl font-bold">Precision & Speed</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Controls (SINGLE FILTER) */}
      <section className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/95 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ovens, size, features…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Only ONE filter: Category (with 'All Products' option) */}
            <div className="hidden lg:flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-amber-500"
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
                  className="px-3 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="ml-2 px-3 py-2.5 rounded-xl border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition"
              >
                Clear
              </button>
            </div>

            {/* Mobile filter toggle (kept for category & sort) */}
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-neutral-50"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          {/* Mobile: Category + Sort */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden grid grid-cols-2 gap-3 mt-3"
              >
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-amber-500 col-span-2"
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-amber-500 col-span-2"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <div className="col-span-2 flex gap-3">
                  <button
                    onClick={() => setSortBy("featured")}
                    className="flex-1 px-3 py-2.5 rounded-xl border"
                  >
                    Featured
                  </button>
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-amber-600 text-amber-700"
                  >
                    Clear All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Result count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <p>
            Showing <strong>{filteredProducts.length}</strong> of{" "}
            <strong>{allProducts.length}</strong> products
          </p>
          {(searchTerm || selectedCategory !== "All Products") && (
            <span className="inline-flex items-center gap-1 text-amber-700">
              <Sparkles size={16} /> Filters active
            </span>
          )}
        </div>
      </div>

      {/* Products grid / skeletons (SQUARE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-neutral-100 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length ? (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
              className="mt-6 px-6 py-3 rounded-xl bg-amber-600 text-white hover:bg-amber-700"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* ===== Extra Content Sections (as per your reference video) ===== */}

        {/* Feature Highlights */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center">
            Why Chefs Choose Our Ovens
          </h2>
          <p className="mt-2 text-neutral-600 text-center max-w-2xl mx-auto">
            Engineered for speed, consistency and authentic flavour—built with materials that last.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl ring-1 ring-black/5 p-6 bg-white">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <ShieldCheck className="text-amber-700" size={20} />
              </div>
              <h3 className="mt-4 font-heading font-semibold text-neutral-900">Pro-Grade Build</h3>
              <p className="mt-1 text-neutral-600 text-sm">
                Refractory core, SS hardware and serviceable design for long life.
              </p>
            </div>
            <div className="rounded-2xl ring-1 ring-black/5 p-6 bg-white">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Timer className="text-amber-700" size={20} />
              </div>
              <h3 className="mt-4 font-heading font-semibold text-neutral-900">Fast Heat-Up</h3>
              <p className="mt-1 text-neutral-600 text-sm">
                Reach 450–500°C quickly; keep output high during rush hours.
              </p>
            </div>
            <div className="rounded-2xl ring-1 ring-black/5 p-6 bg-white">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <FlameIcon className="text-amber-700" size={20} />
              </div>
              <h3 className="mt-4 font-heading font-semibold text-neutral-900">Authentic Flavour</h3>
              <p className="mt-1 text-neutral-600 text-sm">
                Wood/Gas options with chef-tuned deck for leopard spotting.
              </p>
            </div>
          </div>
        </section>

        {/* Process / How it works */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center">Your Path to Perfect Pizza</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {[
              ["Consult", "Pick capacity, fuel & size"],
              ["Configure", "Accessories & finish options"],
              ["Install", "Site-ready delivery & setup"],
              ["Support", "Training & after-sales care"],
            ].map(([title, sub], i) => (
              <div key={i} className="rounded-2xl ring-1 ring-black/5 p-5 bg-white text-center">
                <div className="mx-auto w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                  {i + 1}
                </div>
                <h4 className="mt-3 font-heading font-semibold">{title}</h4>
                <p className="text-sm text-neutral-600">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Showcase (put your mp4 in /public/media/showcase.mp4) */}
        <section className="mt-16">
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/5 bg-neutral-900">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">See It In Action</h2>
              <p className="mt-2 text-neutral-300 max-w-3xl">
                Watch how our ovens perform under real kitchen conditions—speed, consistency and that perfect crust.
              </p>
            </div>
            <div className="aspect-video bg-black">
              <video
                src="/media/showcase.mp4"
                controls
                playsInline
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1546549039-49d84b0dbb8a?q=80&w=1600&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center">FAQs</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              ["What’s the difference between Wood and Gas?", "Wood gives classic aroma; Gas offers convenience and consistent control. Hybrid models let you switch."],
              ["How much space do I need?", "Most pro units need clearances; check each product’s dimensions and safety margins."],
              ["Do you provide installation?", "Yes—site survey, delivery and professional installation available in most cities."],
              ["Is after-sales support available?", "We offer training, spare parts and priority support for commercial clients."],
            ].map(([q, a], i) => (
              <details key={i} className="rounded-xl ring-1 ring-black/5 bg-white p-4 open:shadow">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <HelpCircle className="text-amber-700" size={18} /> {q}
                </summary>
                <p className="mt-2 text-sm text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white p-8 text-center ring-1 ring-black/5"
        >
          <h2 className="text-2xl md:text-3xl font-bold">Need a custom build?</h2>
          <p className="mt-2 text-neutral-300">
            We tailor ovens for your space, capacity & fuel preferences.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/918880889216"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl hover:bg-neutral-100"
            >
              <MessageCircleMore size={18} /> WhatsApp: +91 888 888 9216
            </a>
            <button className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white hover:text-neutral-900">
              Get Custom Quote
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating WhatsApp pill */}
      <a
        href="https://wa.me/918880889216"
        target="_blank"
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-amber-600 text-white px-5 py-3 shadow-xl hover:bg-amber-700"
      >
        <MessageCircleMore size={18} />
        Chat
      </a>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Products;
