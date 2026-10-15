
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Flame, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/products";

interface Props {
  product: Product;
  index?: number;
  size?: "large" | "small";
  onQuickView?: (product: Product) => void;
}

const primaryBadge = (badges?: Product["badges"]) => {
  if (!badges?.length) return null;

  const priority = [
    "Bestseller",
    "Pro",
    "New",
    "Chef Choice",
    "Limited",
  ] as const;

  return priority.find((badge) => badges.includes(badge));
};

const ProductCard: React.FC<Props> = ({
  product,
  index = 0,
  size = "large",
  onQuickView,
}) => {
  const badge = primaryBadge(product.badges);
  const slug = product.slug || String(product.id);
  const isLarge = size === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.05, 0.3),
      }}
      whileHover={{ y: -6 }}
      className={`group relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121210] text-white transition-[border-color,box-shadow] duration-500 hover:border-orange-500/40 hover:shadow-[0_30px_60px_-25px_rgba(255,122,47,0.35)] ${
        isLarge ? "" : "rounded-[1.5rem]"
      }`}
    >
      {/* Whole card navigation */}
      <Link
        to={`/products/${slug}`}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 z-[1] rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      />

      {/* Oven image */}
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(255,122,47,0.16), transparent 65%)",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading={index < 6 ? "eager" : "lazy"}
          className="h-full w-full object-contain object-center p-2 transition-transform duration-700 ease-out group-hover:scale-[1.05] sm:p-3"
          onError={(event) => {
            console.error(
              `Failed to load image for ${product.name}:`,
              event.currentTarget.src
            );
          }}
        />

        {/* Product badge */}
        {badge && (
          <span
            className={`absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur ${
              isLarge
                ? "px-3 py-1.5 text-[10px]"
                : "px-2.5 py-1 text-[9px]"
            }`}
          >
            {badge}
          </span>
        )}

        {/* Quick View */}
        {onQuickView && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`Quick view ${product.name}`}
            className="absolute right-4 top-4 z-[3] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-100 backdrop-blur transition duration-300 hover:border-orange-400 hover:bg-orange-500 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          >
            <Eye size={17} />
          </button>
        )}
      </div>

      {/* Product details */}
      <div
        className={`relative z-[2] border-t border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent ${
          isLarge ? "px-5 py-5 sm:px-6" : "px-4 py-3.5"
        }`}
      >
        <p
          className={`flex items-center gap-1.5 font-semibold uppercase text-orange-400 ${
            isLarge
              ? "text-[10px] tracking-[0.2em]"
              : "text-[9px] tracking-[0.16em]"
          }`}
        >
          <Flame size={isLarge ? 13 : 11} />
          <span className="truncate">{product.category}</span>
        </p>

        <div className="mt-2 flex items-end justify-between gap-3">
          <h3
            className={`line-clamp-2 font-semibold tracking-tight transition-colors duration-300 group-hover:text-orange-300 ${
              isLarge
                ? "text-lg leading-6 sm:text-xl sm:leading-7"
                : "text-sm leading-5 sm:text-base"
            }`}
          >
            {product.name}
          </h3>

          <span
            className={`flex shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-black ${
              isLarge ? "h-10 w-10" : "h-8 w-8"
            }`}
          >
            <ArrowUpRight size={isLarge ? 17 : 14} />
          </span>
        </div>

        {/* Product specifications */}
        {isLarge && (
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/60">
            {product.fuelType && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1">
                <Flame size={12} className="text-orange-400" />
                {product.fuelType}
              </span>
            )}

            {product.size && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1">
                <Layers3 size={12} className="text-orange-400" />
                {product.size}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard;
