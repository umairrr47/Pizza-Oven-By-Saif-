
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/products";

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [active, setActive] = useState(0);

  const images = useMemo(() => {
    if (!product) return [];
    return Array.from(
      new Set([product.image, ...(product.gallery || [])].filter(Boolean))
    );
  }, [product]);

  const changeImage = useCallback(
    (direction: number) => {
      if (!images.length) return;

      setActive(
        (current) =>
          (current + direction + images.length) % images.length
      );
    },
    [images.length]
  );

  useEffect(() => {
    setActive(0);
  }, [product?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") changeImage(1);
      if (event.key === "ArrowLeft") changeImage(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, changeImage]);

  if (!isOpen || !product || typeof document === "undefined") {
    return null;
  }

  const slug = product.slug || String(product.id);
  const whatsappUrl = `https://wa.me/919899593526?text=${encodeURIComponent(
    `Hello, I would like to enquire about ${product.name}.`
  )}`;

  const panel = (
    <AnimatePresence>
      <motion.div
        key="quick-view-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        key="quick-view-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1001] grid place-items-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          initial={{ y: 24, scale: 0.985 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 16, scale: 0.985 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative grid max-h-[100dvh] w-full grid-cols-1 overflow-y-auto bg-[#111111] text-white shadow-2xl sm:max-h-[92vh] sm:max-w-6xl sm:overflow-hidden sm:rounded-2xl md:grid-cols-5"
        >
          {/* Mobile header */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-[#111111]/95 px-4 py-3 backdrop-blur sm:hidden">
            <h2 id="quick-view-title" className="line-clamp-1 text-sm font-semibold">
              {product.name}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="shrink-0 rounded-full border border-white/10 p-2 hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Gallery */}
          <div className="min-w-0 bg-[#171717] md:col-span-3">
            <div className="relative flex aspect-[4/3] max-h-[55vh] items-center justify-center overflow-hidden sm:max-h-[70vh] md:aspect-[5/4] md:max-h-[92vh]">
              <img
                key={images[active]}
                src={images[active]}
                alt={`${product.name} product view ${active + 1}`}
                className="h-full w-full object-contain p-3 sm:p-6"
                onError={(event) => {
                  console.error(
                    `Quick view image failed to load for ${product.name}:`,
                    event.currentTarget.src
                  );
                }}
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => changeImage(-1)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/65 hover:bg-orange-500 hover:text-black"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeImage(1)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/65 hover:bg-orange-500 hover:text-black"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1 text-xs text-white/75">
                {active + 1} / {images.length}
              </span>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto border-t border-white/10 p-3 sm:p-4">
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={index === active}
                    className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border bg-[#222222] transition ${
                      index === active
                        ? "border-orange-400"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="relative min-w-0 overflow-y-auto p-5 sm:p-6 md:col-span-2 md:p-7">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 hidden rounded-full border border-white/10 p-2 text-white/70 hover:bg-white/10 sm:inline-flex"
            >
              <X size={18} />
            </button>

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-400">
              {product.category}
            </p>

            <h2
              id="quick-view-title"
              className="mt-3 pr-8 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
            >
              {product.name}
            </h2>

            <p className="mt-3 text-sm text-white/45">
              {product.fuelType} · {product.size}
            </p>

            {product.rating != null && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className={
                        index < Math.round(product.rating ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-white/65">
                  {product.rating.toFixed(1)}
                </span>
                {product.reviewsCount != null && (
                  <span className="text-xs text-white/40">
                    ({product.reviewsCount} reviews)
                  </span>
                )}
              </div>
            )}

            <div className="mt-5 border-y border-white/10 py-5">
              <p className="text-[10px] uppercase tracking-widest text-white/40">
                Product price
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-semibold">{product.price}</span>
                {product.mrp && (
                  <span className="text-sm text-white/35 line-through">
                    {product.mrp}
                  </span>
                )}
              </div>
              {product.stock && (
                <p className="mt-2 text-xs text-white/50">
                  Availability: {product.stock}
                </p>
              )}
            </div>

            <p className="mt-5 text-sm leading-7 text-white/60">
              {product.description}
            </p>

            {product.features?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  Key features
                </h3>
                <ul className="mt-3 space-y-3">
                  {product.features.slice(0, 6).map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-white/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-7 grid grid-cols-1 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
              >
                Get a custom quote
              </a>

              <Link
                to={`/products/${slug}`}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-medium text-white transition hover:border-orange-400/60 hover:text-orange-300"
              >
                View full details
                <ArrowRight size={16} className="ml-2" />
              </Link>

              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm text-white/55 transition hover:text-white"
              >
                Talk to an expert
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(panel, document.body);
};

export default QuickViewModal;
