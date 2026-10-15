import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gauge,
  Layers3,
  MessageCircle,
  Phone,
  Ruler,
  Tag,
} from "lucide-react";
import { products } from "../data/products";

type SpecEntry = {
  label: string;
  value: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductsDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [showNav, setShowNav] = useState(false);

  const { scrollY } = useScroll();
  const watermarkX = useTransform(scrollY, [0, 900], [0, -180]);
  const stageY = useTransform(scrollY, [0, 900], [0, 70]);
  const heroFade = useTransform(scrollY, [0, 700], [1, 0.25]);

  const product = products.find(
    (item) => item.slug === slug || String(item.id) === slug
  );

  const extendedProduct = product as
    | (NonNullable<typeof product> & {
        modelCode?: string;
        specifications?: Record<string, unknown>;
        specs?: Record<string, unknown>;
        fuelOptions?: string[];
      })
    | undefined;

  const images = useMemo(() => {
    if (!product) return [];

    return Array.from(
      new Set(
        [product.image, ...(product.gallery ?? [])].filter(
          (image): image is string =>
            typeof image === "string" && image.trim().length > 0
        )
      )
    );
  }, [product]);

  const specs: SpecEntry[] = useMemo(() => {
    if (!extendedProduct) return [];

    const source = extendedProduct.specifications ?? extendedProduct.specs ?? {};

    return Object.entries(source)
      .filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          value !== "" &&
          typeof value !== "object"
      )
      .map(([key, value]) => ({
        label: key
          .replace(/([A-Z])/g, " $1")
          .replace(/[_-]/g, " ")
          .replace(/^./, (character) => character.toUpperCase())
          .trim(),
        value: String(value),
      }));
  }, [extendedProduct]);

  const hasFeatures = (product?.features?.length ?? 0) > 0;

  useEffect(() => {
    setActiveImage(0);
    setImageFailed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    document.title = product
      ? `${product.name} | Our Ovens`
      : "Oven Not Found | Our Ovens";

    return () => {
      document.title = "Our Ovens";
    };
  }, [product]);

  // Keyboard navigation for the gallery
  useEffect(() => {
    if (images.length < 2) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      if (event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % images.length);
        setImageFailed(false);
      }
      if (event.key === "ArrowLeft") {
        setActiveImage(
          (current) => (current - 1 + images.length) % images.length
        );
        setImageFailed(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [images.length]);

  // Show the section nav after the hero
  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for the section nav
  useEffect(() => {
    if (!product) return;

    const ids = ["overview", "features", "specs", "enquire"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [product, slug]);

  if (!product || !extendedProduct) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0b0a] px-5 text-white">
        <div className="max-w-md text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Flame size={30} className="text-orange-400" />
          </span>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
            Product unavailable
          </p>
          <h1 className="mb-4 text-3xl font-semibold">
            We couldn't find this oven.
          </h1>
          <p className="mb-7 leading-7 text-white/55">
            Return to our collection to explore the available commercial oven
            models.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400"
          >
            <ArrowLeft size={17} />
            Explore all ovens
          </Link>
        </div>
      </main>
    );
  }

  const fuelType = product.fuelType || "Contact for details";
  const size = product.size || "Contact for details";
  const modelCode = extendedProduct.modelCode || product.compareCode || null;

  const whatsappUrl = `https://wa.me/919899593526?text=${encodeURIComponent(
    `Hello, I am interested in the ${product.name}${
      modelCode ? ` (${modelCode})` : ""
    }. Please share the technical specifications, available configurations, and delivery details.`
  )}`;

  const currentIndex = products.findIndex((item) => item.id === product.id);
  const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex >= 0 && currentIndex < products.length - 1
      ? products[currentIndex + 1]
      : null;

  const relatedProducts = (() => {
    const sameCategory = products.filter(
      (item) => item.id !== product.id && item.category === product.category
    );
    const others = products.filter(
      (item) => item.id !== product.id && item.category !== product.category
    );
    return [...sameCategory, ...others].slice(0, 6);
  })();

  const goTo = (index: number) => {
    setActiveImage(index);
    setImageFailed(false);
  };
  const nextImage = () => images.length > 1 && goTo((activeImage + 1) % images.length);
  const previousImage = () =>
    images.length > 1 && goTo((activeImage - 1 + images.length) % images.length);

  const pad = (n: number) => String(n).padStart(2, "0");

  const facts = [
    { icon: Tag, label: "Category", value: product.category },
    { icon: Flame, label: "Fuel type", value: fuelType },
    { icon: Ruler, label: "Size", value: size },
    ...(modelCode ? [{ icon: Layers3, label: "Model", value: modelCode }] : []),
  ];

  const navItems = [
    { id: "overview", label: "Overview" },
    ...(hasFeatures ? [{ id: "features", label: "Highlights" }] : []),
    { id: "specs", label: "Specifications" },
    { id: "enquire", label: "Enquire" },
  ];

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="min-h-screen bg-[#0b0b0a] pb-24 text-white selection:bg-orange-500 selection:text-black lg:pb-0">
      {/* Floating section navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease }}
            className="fixed left-1/2 top-4 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1.5 backdrop-blur-xl md:flex"
            aria-label="Page sections"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
                  activeSection === item.id
                    ? "bg-orange-500 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="overview" className="relative overflow-hidden">
        {/* Ember glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 70% 55%, rgba(255,122,47,0.20), transparent 70%), radial-gradient(40% 40% at 10% 0%, rgba(255,122,47,0.08), transparent 70%)",
          }}
        />

        {/* Giant outlined watermark */}
        <motion.p
          aria-hidden
          style={{
            x: watermarkX,
            WebkitTextStroke: "1px rgba(255,255,255,0.09)",
          }}
          className="pointer-events-none absolute left-0 top-[16%] select-none whitespace-nowrap text-[clamp(7rem,22vw,20rem)] font-black uppercase leading-none tracking-tighter text-transparent"
        >
          {modelCode || product.name}
        </motion.p>

        {/* Top bar */}
        <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-orange-400"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            All ovens
          </Link>

          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.3em] text-white/35 sm:block">
            {pad(currentIndex + 1)} / {pad(products.length)}
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-orange-400"
          >
            Get in touch
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-2 sm:px-8 lg:min-h-[78vh] lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:px-12 lg:pb-24"
        >
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                {product.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl xl:text-[4.6rem]"
            >
              {product.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
              className="mt-6 max-w-lg text-base leading-8 text-white/55"
            >
              {product.description ||
                "Contact our team for product information and available configurations."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-sm font-semibold text-black transition hover:bg-orange-400"
              >
                <MessageCircle size={18} />
                Enquire on WhatsApp
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("specs")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                View specifications
              </button>
            </motion.div>
          </div>

          {/* Stage */}
          <motion.div
            style={{ y: stageY }}
            className="order-1 lg:order-2"
          >
            <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-center">
              <div className="relative flex-1">
                {/* Decorative rings */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/20"
                />

                <div className="relative flex aspect-square items-center justify-center p-6 sm:p-12">
                  {images.length > 0 && !imageFailed ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={images[activeImage]}
                        initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.45, ease }}
                        className="h-full w-full"
                      >
                        <motion.img
                          src={images[activeImage]}
                          alt={`${product.name} product view`}
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          onError={() => setImageFailed(true)}
                          className="h-full w-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.7)]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-center text-white/40">
                      <Flame size={48} strokeWidth={1.2} />
                      <p className="text-sm">Product image unavailable</p>
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={previousImage}
                      aria-label="Previous image"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur transition hover:border-orange-400 hover:bg-orange-500 hover:text-black"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="min-w-[64px] text-center font-mono text-xs text-white/50">
                      {pad(activeImage + 1)} / {pad(images.length)}
                    </span>
                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next image"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur transition hover:border-orange-400 hover:bg-orange-500 hover:text-black"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails rail */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      aria-label={`Show image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      onClick={() => goTo(index)}
                      className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white/[0.03] p-1.5 transition sm:h-[72px] sm:w-[72px] ${
                        activeImage === index
                          ? "border-orange-500 shadow-[0_0_0_1px_rgba(255,122,47,0.6),0_8px_24px_-8px_rgba(255,122,47,0.5)]"
                          : "border-white/10 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SPEC RIBBON */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div
          className={`mx-auto grid max-w-[1440px] grid-cols-2 px-5 sm:px-8 lg:px-12 ${
            facts.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {facts.map(({ icon: Icon, label, value }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07, ease }}
              className="group border-white/10 px-1 py-7 even:border-l even:pl-6 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:even:pl-8"
            >
              <Icon
                size={18}
                className="mb-4 text-orange-400 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {label}
              </p>
              <p className="mt-1.5 break-words text-base font-semibold sm:text-lg">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS - editorial numbered list */}
      {hasFeatures && (
        <section id="features" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">
                Highlights
              </p>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Built to
                <br />
                <span className="text-white/35">perform.</span>
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-white/50">
                What makes the {product.name} stand out, at a glance.
              </p>
            </div>

            <ol className="border-t border-white/10">
              {product.features.map((feature, index) => (
                <motion.li
                  key={`${feature}-${index}`}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2), ease }}
                  className="group relative flex items-center gap-5 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.02] sm:gap-8 sm:py-7"
                >
                  <span className="w-12 shrink-0 font-mono text-sm text-white/30 transition-colors group-hover:text-orange-400 sm:w-16 sm:text-base">
                    {pad(index + 1)}
                  </span>
                  <p className="flex-1 text-lg font-medium leading-snug transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">
                    {feature}
                  </p>
                  <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* SPECIFICATIONS - blueprint style */}
      <section
        id="specs"
        className="relative overflow-hidden border-y border-white/10 bg-[#0e0e0c]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">
                Specifications
              </p>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                The numbers,
                <br />
                <span className="text-white/35">laid bare.</span>
              </h2>
              <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-5">
                <Gauge size={20} className="mt-1 shrink-0 text-orange-400" />
                <p className="text-sm leading-6 text-white/50">
                  Specifications can vary by model and configuration. Confirm
                  with our team before ordering.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
              {specs.length > 0 ? (
                <dl>
                  {specs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2) }}
                      className={`flex items-baseline gap-3 px-5 py-4 sm:px-7 sm:py-5 ${
                        index !== specs.length - 1 ? "border-b border-white/[0.07]" : ""
                      }`}
                    >
                      <dt className="shrink-0 text-sm text-white/50">{spec.label}</dt>
                      <span
                        aria-hidden
                        className="mb-1 min-w-[16px] flex-1 border-b border-dotted border-white/15"
                      />
                      <dd className="max-w-[55%] break-words text-right text-sm font-semibold">
                        {spec.value}
                      </dd>
                    </motion.div>
                  ))}
                </dl>
              ) : (
                <div className="p-7 sm:p-10">
                  <Layers3 size={28} className="mb-4 text-orange-400" />
                  <h3 className="text-xl font-semibold">
                    Specifications available on request
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-7 text-white/50">
                    Contact us for the dimensions, weight, cooking capacity,
                    temperature range, materials, and other technical details
                    applicable to this model.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange-500/40 px-5 py-2.5 text-sm font-semibold text-orange-300 transition hover:bg-orange-500 hover:text-black"
                  >
                    Request specifications
                    <ArrowRight size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRE */}
      <section id="enquire" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 80% at 50% 100%, rgba(255,122,47,0.22), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">
            Talk to our team
          </p>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            Ready to fire up
            <br />
            <span className="text-orange-400">{product.name}?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-white/55">
            Get specifications, configurations and delivery details directly
            from our experts, and we'll help you choose the right oven for your
            space and volume.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-black transition hover:bg-orange-400"
            >
              <MessageCircle size={18} />
              Enquire on WhatsApp
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold transition hover:border-white/60 hover:bg-white/5"
            >
              <Phone size={17} />
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIOUS / NEXT */}
      {(previousProduct || nextProduct) && (
        <section className="border-t border-white/10">
          <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2">
            {previousProduct ? (
              <Link
                to={`/products/${previousProduct.slug ?? previousProduct.id}`}
                className="group flex items-center gap-5 border-b border-white/10 px-5 py-8 transition hover:bg-white/[0.03] sm:border-b-0 sm:border-r sm:px-8 lg:px-12"
              >
                <ArrowLeft
                  size={22}
                  className="shrink-0 text-white/40 transition group-hover:-translate-x-1 group-hover:text-orange-400"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Previous oven
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold transition group-hover:text-orange-300">
                    {previousProduct.name}
                  </p>
                </div>
              </Link>
            ) : (
              <span />
            )}

            {nextProduct && (
              <Link
                to={`/products/${nextProduct.slug ?? nextProduct.id}`}
                className="group flex items-center justify-between gap-5 px-5 py-8 text-right transition hover:bg-white/[0.03] sm:px-8 lg:px-12"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Next oven
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold transition group-hover:text-orange-300">
                    {nextProduct.name}
                  </p>
                </div>
                <ArrowRight
                  size={22}
                  className="shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-orange-400"
                />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* MORE OVENS - horizontal scroller */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-white/10 bg-[#0e0e0c]">
          <div className="mx-auto max-w-[1440px] py-16 sm:py-24">
            <div className="mb-8 flex items-end justify-between gap-5 px-5 sm:px-8 lg:px-12">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">
                  Continue exploring
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  More from our collection
                </h2>
              </div>
              <Link
                to="/products"
                className="hidden items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-orange-400 sm:inline-flex"
              >
                All ovens
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.slug ?? item.id}`}
                  className="group relative aspect-square w-[72vw] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121210] transition duration-500 hover:-translate-y-1 hover:border-orange-500/40 sm:w-[340px]"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 45%, rgba(255,122,47,0.16), transparent 65%)",
                    }}
                  />
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="absolute inset-x-0 top-0 h-[68%] w-full object-contain p-8 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Flame
                      size={40}
                      strokeWidth={1.2}
                      className="absolute left-1/2 top-1/3 -translate-x-1/2 text-white/30"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/40 p-5 backdrop-blur-sm">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="line-clamp-1 text-lg font-semibold">
                        {item.name}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-white/60 transition group-hover:text-orange-400"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky enquiry bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0b0b0a]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          <MessageCircle size={18} />
          Enquire on WhatsApp
        </a>
      </div>
    </main>
  );
}