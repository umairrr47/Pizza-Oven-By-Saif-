// import React from "react";
// import { motion } from "framer-motion";
// import { Eye, ArrowRight, Star } from "lucide-react";
// import { Product } from "../../data/products";

// interface Props {
//   product: Product;
//   onQuickView: (p: Product) => void;
// }

// /** pick a single premium badge to avoid clutter */
// const primaryBadge = (badges?: Product["badges"]) => {
//   if (!badges?.length) return null;
//   const order = ["Bestseller", "Pro", "New", "Limited", "Chef Choice"] as const;
//   for (const b of order) if (badges.includes(b as any)) return b;
//   return badges[0];
// };

// const ProductCard: React.FC<Props> = ({ product, onQuickView }) => {
//   const rating = Math.round(product.rating || 0);
//   const badge = primaryBadge(product.badges);

//   return (
//     <motion.button
//       type="button"
//       onClick={() => onQuickView(product)}
//       className="group relative w-full overflow-hidden rounded-xl bg-white/80 ring-1 ring-black/5 backdrop-blur text-left"
//       initial={{ opacity: 0, y: 18 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -6, scale: 1.01 }}
//       transition={{ duration: 0.35 }}
//     >
//       {/* square = same width/height everywhere */}
//       <div className="relative aspect-square">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

//         {badge && (
//           <span className="absolute top-3 left-3 z-10 rounded-full bg-neutral-900/90 px-2.5 py-1 text-[11px] font-medium text-white shadow">
//             {badge}
//           </span>
//         )}
//         <span className="absolute top-3 right-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-900 ring-1 ring-black/5 shadow">
//           {product.price}
//         </span>

//         <motion.span
//           className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-white/90 p-2.5 text-neutral-800 shadow opacity-0 group-hover:opacity-100 transition"
//           whileHover={{ scale: 1.06 }}
//           whileTap={{ scale: 0.95 }}
//           aria-hidden="true"
//         >
//           <Eye size={18} />
//         </motion.span>
//       </div>

//       <div className="p-3">
//         <h3 className="font-semibold leading-tight text-neutral-900 line-clamp-2">
//           {product.name}
//         </h3>

//         <div className="mt-1 flex items-center gap-1">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star
//               key={i}
//               size={12}
//               className={i < rating ? "text-amber-400 fill-amber-400" : "text-neutral-300"}
//             />
//           ))}
//           {product.reviewsCount ? (
//             <span className="text-[11px] text-neutral-500">({product.reviewsCount})</span>
//           ) : null}
//         </div>

//         <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-amber-700">
//           View details <ArrowRight size={14} />
//         </div>
//       </div>
//     </motion.button>
//   );
// };

// export default ProductCard;


import React from "react";
import { motion } from "framer-motion";
import { Eye, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";               // ⬅️ add this
import { Product } from "../../data/products";

interface Props {
  product: Product;
}

/** pick a single premium badge to avoid clutter */
const primaryBadge = (badges?: Product["badges"]) => {
  if (!badges?.length) return null;
  const order = ["Bestseller", "Pro", "New", "Limited", "Chef Choice"] as const;
  for (const b of order) if (badges.includes(b as any)) return b;
  return badges[0];
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const rating = Math.round(product.rating || 0);
  const badge = primaryBadge(product.badges);

  return (
    <motion.div                                       // ⬅️ button → div
      className="group relative w-full overflow-hidden rounded-xl bg-white/80 ring-1 ring-black/5 backdrop-blur text-left"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35 }}
    >
      {/* square = same width/height everywhere */}
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-neutral-900/90 px-2.5 py-1 text-[11px] font-medium text-white shadow">
            {badge}
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-900 ring-1 ring-black/5 shadow">
          {product.price}
        </span>

        {/* decorative icon only */}
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-white/90 p-2.5 text-neutral-800 shadow opacity-0 group-hover:opacity-100 transition">
          <Eye size={18} />
        </span>
      </div>

      <div className="p-3">
        <h3 className="font-semibold leading-tight text-neutral-900 line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < rating ? "text-amber-400 fill-amber-400" : "text-neutral-300"}
            />
          ))}
          {product.reviewsCount ? (
            <span className="text-[11px] text-neutral-500">({product.reviewsCount})</span>
          ) : null}
        </div>

        <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-amber-700">
          View details <ArrowRight size={14} />
        </div>
      </div>

      {/* 🔗 Full-card clickable overlay */}
      <Link
        to={`/products/${product.slug || product.id}`}   // ⬅️ route target
        className="absolute inset-0 z-20"
        aria-label={`Open ${product.name} details`}
      />
    </motion.div>
  );
};

export default ProductCard;
