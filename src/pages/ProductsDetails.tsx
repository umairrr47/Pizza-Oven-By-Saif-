import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Star, ShieldCheck,
  Truck, Package, FileDown, MessageCircleMore, ArrowRight
} from "lucide-react";
import { products, type Product } from "../data/products";

const Stars: React.FC<{ rating?: number; size?: number }> = ({ rating = 0 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-neutral-300"}
      />
    ))}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl md:text-2xl font-bold text-neutral-900">{children}</h2>
);

const SpecRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <span className="text-neutral-500">{label}</span>
    <span className="font-medium text-neutral-900">{value || "—"}</span>
  </div>
);

const RelatedCard: React.FC<{ p: Product }> = ({ p }) => (
  <Link
    to={`/products/${p.slug || p.id}`}
    className="group min-w-[240px] rounded-xl overflow-hidden ring-1 ring-black/5 bg-white"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={p.image}
        alt={p.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-3">
      <div className="text-sm font-semibold line-clamp-2">{p.name}</div>
      <div className="mt-1 text-xs text-neutral-500">{p.category} · {p.fuelType}</div>
      <div className="mt-2 text-[13px] font-semibold">{p.price}</div>
    </div>
  </Link>
);

const ProductDetails: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => products.find(p => p.slug === params.slug || String(p.id) === params.slug),
    [params.slug]
  );

  // graceful 404
  if (!product) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-5">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-neutral-600 mt-2">Please check the link or browse our collection.</p>
          <Link to="/products" className="inline-flex mt-4 rounded-lg bg-amber-600 px-5 py-2.5 text-white">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = useMemo(() => {
    const list = [product.image, ...(product.gallery || [])].filter(Boolean);
    return Array.from(new Set(list));
  }, [product]);

  const [active, setActive] = useState(0);

  // shareable title
  useEffect(() => {
    document.title = `${product.name} – The Pizza Ovens`;
  }, [product.name]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Breadcrumbs / Back */}
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-3 pt-6 pb-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <Link
            to="/products"
            className="hidden sm:inline-flex text-sm text-neutral-700 hover:text-neutral-900"
          >
            All Products
          </Link>
        </div>
      </div>

      {/* HERO = Title / Rating / Price */}
      <section className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900"
            >
              {product.name}
            </motion.h1>
            <div className="mt-2 flex items-center gap-3">
              <Stars rating={product.rating} />
              {product.reviewsCount ? (
                <span className="text-sm text-neutral-500">({product.reviewsCount})</span>
              ) : null}
              <span className="text-sm text-neutral-500">· {product.category}</span>
              <span className="text-sm text-neutral-500">· {product.fuelType}</span>
              <span className="text-sm text-neutral-500">· {product.size}</span>
            </div>
          </div>

          <div className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-4 py-2 text-sm">
            {product.price}
            {product.mrp && <span className="ml-1 text-white/70 line-through">{product.mrp}</span>}
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 mt-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 bg-neutral-100">
              <div className="relative aspect-[5/4]">
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
                  initial={{ opacity: 0.35, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Thumbs */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`relative h-16 w-24 overflow-hidden rounded-md ring-1 transition ${i === active ? "ring-amber-500" : "ring-black/10"}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sticky summary / CTA */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-6 rounded-2xl ring-1 ring-black/5 bg-white p-5 md:p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-neutral-50 p-3">
                  <div className="text-xs text-neutral-500">Fuel</div>
                  <div className="font-semibold">{product.fuelType}</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-3">
                  <div className="text-xs text-neutral-500">Size</div>
                  <div className="font-semibold">{product.size}</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-3">
                  <div className="text-xs text-neutral-500">Shipping</div>
                  <div className="font-semibold">{product.shipping || "Standard"}</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-3">
                  <div className="text-xs text-neutral-500">Stock</div>
                  <div className="font-semibold">{product.stock || "In Stock"}</div>
                </div>
              </div>

              {/* Features bullets */}
              {product.features?.length ? (
                <>
                  <SectionTitle>Highlights</SectionTitle>
                  <ul className="mt-3 space-y-2">
                    {product.features.slice(0, 6).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-800">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {/* CTAs */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/918880889216"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-white hover:bg-amber-700"
                >
                  <MessageCircleMore size={18} /> Get Custom Quote
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 text-neutral-900 hover:bg-neutral-50"
                >
                  Talk to Expert <ArrowRight size={16} />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-neutral-50 p-3">
                  <ShieldCheck className="mx-auto text-amber-700" size={20} />
                  <div className="mt-1 text-xs text-neutral-600">2-Year Warranty</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-3">
                  <Truck className="mx-auto text-amber-700" size={20} />
                  <div className="mt-1 text-xs text-neutral-600">Pan-India Delivery</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-3">
                  <Package className="mx-auto text-amber-700" size={20} />
                  <div className="mt-1 text-xs text-neutral-600">Pro Install</div>
                </div>
              </div>

              {/* Downloads */}
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-amber-700 hover:text-amber-800"
                >
                  <FileDown size={16} /> Download spec sheet (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS SECTIONS */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specs table */}
          <div className="rounded-2xl ring-1 ring-black/5 bg-white p-5 md:p-6">
            <SectionTitle>Specifications</SectionTitle>
            <div className="mt-4 divide-y">
              <SpecRow label="Dimensions" value={product.specifications?.dimensions} />
              <SpecRow label="Weight" value={product.specifications?.weight} />
              <SpecRow label="Capacity" value={product.specifications?.capacity} />
              <SpecRow label="Max Temperature" value={product.specifications?.temperature} />
              <SpecRow label="Material" value={product.specifications?.material} />
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl ring-1 ring-black/5 bg-white p-5 md:p-6">
            <SectionTitle>About this oven</SectionTitle>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              {product.description}
            </p>
            <div className="mt-4 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
              <strong className="text-neutral-900">Pro Tip:</strong> Maintain deck temperature between
              420–480°C for leopard spotting. Rotate pies every 20–25 seconds under wood flame; use gas
              rail for even browning during rush hours.
            </div>
          </div>
        </div>

        {/* Shipping & Warranty */}
        <div className="mt-8 rounded-2xl ring-1 ring-black/5 bg-white p-5 md:p-6">
          <SectionTitle>Shipping & Warranty</SectionTitle>
          <div className="mt-3 grid md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-neutral-50 p-4">
              <Truck className="text-amber-700" />
              <div className="mt-2 font-semibold">Delivery</div>
              <p className="text-sm text-neutral-700">
                {product.shipping || "Standard"} shipping across India with optional inside-site placement.
              </p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4">
              <ShieldCheck className="text-amber-700" />
              <div className="mt-2 font-semibold">Warranty</div>
              <p className="text-sm text-neutral-700">
                24-month warranty on manufacturing defects. Service network available in major cities.
              </p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4">
              <Package className="text-amber-700" />
              <div className="mt-2 font-semibold">Installation</div>
              <p className="text-sm text-neutral-700">
                Professional installation & chef training available; includes first-bake calibration.
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-12">
          <SectionTitle>Related ovens</SectionTitle>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-1 hide-scrollbar">
            {products
              .filter(p => p.id !== product.id && (p.category === product.category || p.fuelType === product.fuelType))
              .slice(0, 8)
              .map(p => <RelatedCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <style>{`
        .hide-scrollbar{ scrollbar-width:none; -ms-overflow-style:none; }
        .hide-scrollbar::-webkit-scrollbar{ display:none; }
      `}</style>
    </div>
  );
};

export default ProductDetails;
