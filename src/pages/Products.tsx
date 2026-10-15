
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { products as allProducts } from "../data/products";
import type { Product } from "../data/products";
import ProductCard from "../components/UI/ProductCard";
import QuickViewModal from "../components/UI/QuickViewModal";

const Skeleton: React.FC = () => (
  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-[#141412]">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
);

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0a] text-white">
      {/* Ambient orange glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,122,47,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        {loading ? (
          /* Loading skeletons: 3 columns on desktop */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          /* Product grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                size="large"
                onQuickView={handleQuickView}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Quick View modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Products;
