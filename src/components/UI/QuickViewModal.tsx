import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../../data/products";

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const [active, setActive] = useState(0);

  const images = useMemo(() => {
    if (!product) return [];
    const list = [product.image, ...(product.gallery || [])].filter(Boolean);
    return Array.from(new Set(list));
  }, [product]);

  useEffect(() => setActive(0), [product?.id]);

  // Lock page scroll + keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!images.length) return;
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !product) return null;
  const rating = Math.round(product.rating || 0);

  const panel = (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Centering layer: NO translate hacks, pure grid center */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1001] grid place-items-center p-3 sm:p-5"
        onClick={onClose}
      >
        {/* Modal panel */}
        <motion.div
          role="dialog" aria-modal="true"
          initial={{ y: 28, scale: 0.985 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.985 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="
            w-full max-w-6xl overflow-hidden
            bg-white/95 backdrop-blur ring-1 ring-black/10 shadow-2xl
            rounded-none md:rounded-2xl
            max-h-[92vh] grid grid-cols-1 md:grid-cols-5
          "
        >
          {/* Mobile sticky header */}
          <div className="md:hidden sticky top-0 z-10 flex items-center justify-between bg-white/90 backdrop-blur px-4 py-3 border-b">
            <div className="font-semibold line-clamp-1">{product.name}</div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/90 p-2 text-neutral-700 ring-1 ring-black/10 hover:bg-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* GALLERY */}
          <div className="relative md:col-span-3">
            <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-[65vh] md:max-h-[92vh] overflow-hidden bg-neutral-100">
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-black/10 hover:bg-white z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() => setActive((i) => (i + 1) % images.length)}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-black/10 hover:bg-white z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              <motion.img
                key={images[active]}
                src={images[active]}
                alt={product.name}
                initial={{ opacity: 0.35, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-3 pl-4 md:p-4 md:pl-6 bg-white">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`relative h-16 w-20 overflow-hidden rounded-md ring-1 transition ${i === active ? "ring-amber-500" : "ring-black/10"}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="relative md:col-span-2 p-4 md:p-6 bg-white/90 overflow-y-auto">
            <button
              onClick={onClose}
              className="hidden md:inline-flex absolute right-3 top-3 rounded-full bg-white/90 p-2 text-neutral-700 ring-1 ring-black/10 hover:bg-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <h3 className="hidden md:block text-2xl font-semibold text-neutral-900 pr-10">{product.name}</h3>
            <div className="mt-1 text-sm text-neutral-500">
              {product.category} &middot; {product.fuelType} &middot; {product.size}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="inline-flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-neutral-300"} />
                ))}
              </div>
              {product.reviewsCount ? <span className="text-xs text-neutral-500">({product.reviewsCount})</span> : null}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-3 py-1.5 text-sm">
              {product.price}
              {product.mrp && <span className="ml-1 text-white/70 line-through">{product.mrp}</span>}
            </div>

            {product.features?.length ? (
              <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-neutral-800">
                {product.features.slice(0, 6).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
                    {f}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{product.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/918880889216"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2.5 text-white hover:bg-amber-700"
              >
                Get Custom Quote
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-800 hover:bg-neutral-50"
              >
                Talk to Expert <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(panel, document.body);
};

export default QuickViewModal;
