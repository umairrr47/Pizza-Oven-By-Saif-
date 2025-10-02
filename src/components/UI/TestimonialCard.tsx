// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Star, Quote, MapPin } from "lucide-react";
// import type { Testimonial } from "../../data/testimonials";

// /** initials fallback if no image */
// const initials = (name: string) =>
//   name.split(" ").map(n => n[0]?.toUpperCase()).slice(0,2).join("");

// const Stars: React.FC<{ rating: number }> = ({ rating }) => (
//   <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} of 5`}>
//     {Array.from({ length: 5 }).map((_, i) => (
//       <Star
//         key={i}
//         size={16}
//         className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//         aria-hidden="true"
//       />
//     ))}
//   </div>
// );

// type Props = { t: Testimonial; clamp?: number };

// const TestimonialCard: React.FC<Props> = ({ t, clamp = 5 }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <motion.article
//       variants={{
//         hidden: { opacity: 0, y: 18 },
//         show: { opacity: 1, y: 0 },
//       }}
//       className="relative group rounded-2xl"
//     >
//       {/* Luxury ring */}
//       <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ffedd5] via-transparent to-[#ffe4d6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//       {/* Card */}
//       <div className="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 md:p-7 shadow-[0_10px_30px_rgba(16,24,40,.06)] group-hover:shadow-[0_18px_40px_rgba(16,24,40,.10)] transition-shadow duration-300 h-full">
//         <Quote className="absolute -top-4 -left-4 text-[#d43804]/15" size={60} />

//         {/* header */}
//         <div className="flex items-center gap-4 mb-4">
//           {t.image ? (
//             <img
//               src={t.image}
//               alt={`${t.name} avatar`}
//               className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-[#d43804]/20"
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 text-[#d43804] flex items-center justify-center font-semibold ring-2 ring-[#d43804]/20">
//               {initials(t.name)}
//             </div>
//           )}

//           <div className="min-w-0">
//             <h3 className="font-semibold text-gray-900 truncate">{t.name}</h3>
//             <p className="text-sm text-[#d43804] font-medium truncate">{t.company}</p>
//             <p className="text-xs text-gray-500 flex items-center gap-1">
//               <MapPin size={14} /> {t.location}
//             </p>
//           </div>
//         </div>

//         {/* rating */}
//         <div className="mb-3"><Stars rating={t.rating} /></div>

//         {/* review */}
//         <p className={`text-gray-700 leading-relaxed ${open ? "" : "line-clamp-5"}`}>
//           “{t.review}”
//         </p>

//         {t.review.length > 160 && (
//           <button
//             onClick={() => setOpen(v => !v)}
//             className="mt-3 text-sm font-medium text-[#d43804] hover:text-[#b13003] transition-colors"
//             aria-expanded={open}
//           >
//             {open ? "Show less" : "Read full story"}
//           </button>
//         )}
//       </div>
//     </motion.article>
//   );
// };

// export default TestimonialCard;
