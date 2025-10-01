import React from "react";
import { motion } from "framer-motion";
import { Eye, ArrowRight, Flame, Package, Star } from "lucide-react";
import { Product } from "../../data/products";

interface Props {
  product: Product;
  onQuickView: (p: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onQuickView }) => {
  const rating = Math.round(product.rating || 0);

  return (
    <motion.div
      className="group relative aspect-square rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 overflow-hidden hover:shadow-2xl transition"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Soft top gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

      {/* Badges */}
      {product.badges?.length ? (
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {product.badges.map((b, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-600 text-white shadow"
            >
              {b}
            </span>
          ))}
        </div>
      ) : null}

      {/* Quick View */}
      <motion.button
        onClick={() => onQuickView(product)}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur p-2.5 rounded-full shadow opacity-0 group-hover:opacity-100 hover:bg-amber-600 hover:text-white transition"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Quick view"
      >
        <Eye size={18} />
      </motion.button>

      {/* Bottom Info */}
      <div className="absolute inset-x-3 bottom-3 z-10">
        <div className="rounded-xl backdrop-blur bg-black/35 text-white p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-semibold text-sm md:text-base leading-tight line-clamp-2">
              {product.name}
            </h3>
            <span className="text-amber-300 font-semibold text-xs md:text-sm whitespace-nowrap">
              {product.price}
            </span>
          </div>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < rating ? "text-amber-400 fill-amber-400" : "text-white/40"}
              />
            ))}
            {product.reviewsCount ? (
              <span className="text-[11px] text-white/80">({product.reviewsCount})</span>
            ) : null}
          </div>

          {/* Micro details on hover (not too obvious) */}
          <div className="mt-2 hidden group-hover:flex flex-wrap gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
              <Flame size={12} />
              {product.fuelType}
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
              <Package size={12} />
              {product.size}
            </span>
          </div>

          {/* CTA (kept subtle; opens QuickView) */}
          <motion.button
            onClick={() => onQuickView(product)}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 text-white py-2 text-sm font-medium hover:bg-amber-700"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Get Quote <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
