import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Local assets (same as your file)
import Oven1 from "../assets/residential.png";
import Oven2 from "../assets/portable.png";
import Oven3 from "../assets/commercial.png";

export type OvenItem = {
  image: string;
  title: string;
  indexLabel: string;
  blurb?: string;
};

type Props = {
  headline?: string;
  subcopy?: string;
  items?: OvenItem[];
  autoPlayMs?: number | false;
  onExplore?: (item: OvenItem, index: number) => void;
};

const FALLBACK_ITEMS: OvenItem[] = [
  {
    image: Oven3,
    title: "Commercial Oven",
    indexLabel: "01",
    blurb:
      "Built for high-volume service with consistent heat and durable construction.",
  },
  {
    image: Oven2,
    title: "Portable Oven",
    indexLabel: "02",
    blurb: "Crafted to be sturdy and lightweight, ideal for events.",
  },
  {
    image: Oven1,
    title: "Residential Oven",
    indexLabel: "03",
    blurb:
      "Compact footprint with authentic stone-baked performance for home kitchens and patios.",
  },
];

const OvensShowcase: React.FC<Props> = ({
  headline = "Ovens range to choose from",
  subcopy = "At The Pizza Ovens, we specialize in crafting high-performance ovens engineered for excellence — delivering authentic Neapolitan pizzas in just 60–120 seconds. Our extensive range of models is designed to meet diverse needs, offering various capacities, outputs, and features to suit both home chefs and professional kitchens alike.",
  items = FALLBACK_ITEMS,
  autoPlayMs = 6500,
  onExplore,
}) => {
  const safeItems = items?.length ? items : FALLBACK_ITEMS;
  const [i, setI] = useState(0);
  const cur = safeItems[Math.min(i, safeItems.length - 1)];

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const mobileOutlineRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  // Reduced motion and pause controls
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const [paused, setPaused] = useState(false);

  // Swipe handling
  const pointerDownX = useRef<number | null>(null);
  const pointerActive = useRef(false);

  const [headMain, headLast] = useMemo(() => {
    const parts = headline.trim().split(" ");
    if (parts.length <= 1) return [headline, ""];
    const last = parts.pop() as string;
    return [parts.join(" "), last];
  }, [headline]);

  // Entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ov-head", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".ov-copy", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Slide transition animation (lighter: no blur, transform/opacity only)
  const animateSwap = useCallback((dir: 1 | -1) => {
    if (prefersReducedMotion) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    const imgWrap = imgWrapRef.current;
    const caption = captionRef.current;
    tl.to([imgWrap, caption], {
      opacity: 0,
      y: 16 * dir,
      duration: 0.45,
      stagger: 0.04,
    })
      .set([imgWrap, caption], { y: -16 * dir })
      .to([imgWrap, caption], {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.04,
      });
  }, [prefersReducedMotion]);

  const next = useCallback(() => {
    if (!safeItems.length) return;
    animateSwap(1);
    setI((p) => (p + 1) % safeItems.length);
  }, [animateSwap, safeItems.length]);

  const prev = useCallback(() => {
    if (!safeItems.length) return;
    animateSwap(-1);
    setI((p) => (p - 1 + safeItems.length) % safeItems.length);
  }, [animateSwap, safeItems.length]);

  // Autoplay with pause states and reduced motion
  useEffect(() => {
    if (prefersReducedMotion || !autoPlayMs || !safeItems.length || paused) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [next, autoPlayMs, safeItems.length, paused, prefersReducedMotion]);

  // Update outline text (desktop + mobile) and live region
  useLayoutEffect(() => {
    const el = outlineRef.current;
    const mobileEl = mobileOutlineRef.current;
    const live = liveRef.current;

    if (live) {
      live.textContent = `${cur?.indexLabel ?? ""} – ${cur?.title ?? ""}`;
    }

    if (prefersReducedMotion) {
      if (el) el.textContent = cur?.title?.toUpperCase?.() ?? "";
      if (mobileEl) mobileEl.textContent = cur?.title?.toUpperCase?.() ?? "";
      return;
    }

    if (el) {
      gsap.to(el, { opacity: 0, duration: 0.12, ease: "power2.out" });
      const t = setTimeout(() => {
        el.textContent = cur?.title?.toUpperCase?.() ?? "";
        gsap.to(el, { opacity: 1, duration: 0.2, ease: "power2.out" });
      }, 120);
      return () => clearTimeout(t);
    }
    if (mobileEl) {
      gsap.to(mobileEl, { opacity: 0, duration: 0.12, ease: "power2.out" });
      const t = setTimeout(() => {
        mobileEl.textContent = cur?.title?.toUpperCase?.() ?? "";
        gsap.to(mobileEl, { opacity: 1, duration: 0.2, ease: "power2.out" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [cur?.title, cur?.indexLabel, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Swipe gestures
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onPointerDown = (e: PointerEvent) => {
      pointerActive.current = true;
      pointerDownX.current = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointerActive.current || pointerDownX.current == null) return;
      const dx = e.clientX - pointerDownX.current;
      // threshold ~48px for intentional swipe
      if (Math.abs(dx) > 48) {
        pointerActive.current = false;
        pointerDownX.current = null;
        if (dx < 0) next();
        else prev();
      }
    };
    const onPointerUp = () => {
      pointerActive.current = false;
      pointerDownX.current = null;
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("pointerleave", onPointerUp);

    return () => {
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("pointerleave", onPointerUp);
    };
  }, [next, prev]);

  const aria = useMemo(
    () => ({
      prev:
        safeItems.length > 1
          ? `Previous: ${safeItems[(i - 1 + safeItems.length) % safeItems.length].title}`
          : "Previous",
      next:
        safeItems.length > 1
          ? `Next: ${safeItems[(i + 1) % safeItems.length].title}`
          : "Next",
    }),
    [i, safeItems]
  );

  if (!cur) return null;

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#0a0b0c] text-white min-h-screen flex flex-col justify-center py-8 sm:py-12 md:py-16 lg:py-20"
      aria-label="Ovens showcase carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Live region for screen readers */}
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Background outline text for desktop */}
      <div
        ref={outlineRef}
        className="
          pointer-events-none absolute inset-0 z-0 hidden md:flex items-start justify-center
          overflow-hidden whitespace-nowrap
          text-[clamp(28px,7.5vw,96px)]
          font-extrabold tracking-tighter select-none
          sm:items-center
        "
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          color: "transparent",
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
        }}
        aria-hidden="true"
      >
        {cur.title?.toUpperCase?.() || ""}
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full">
        {/* Top section: Headline + Subcopy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-start mb-8 md:mb-12 lg:mb-16">
          {/* Left: Headline */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h2 className="ov-head font-normal leading-[1.08] tracking-[-0.025em] text-[clamp(30px,5.5vw,68px)]">
              {headMain}
              {headLast && (
                <>
                  <br />
                  <span className="block text-[clamp(32px,6.5vw,76px)] mt-1">
                    {headLast}
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* Right: Subcopy */}
          <div className="lg:pl-4">
            <p className="ov-copy text-white/75 leading-relaxed text-[clamp(14px,1.5vw,18px)] max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              {subcopy}
            </p>
          </div>
        </div>

        {/* Center stage: Image + navigation */}
        <div className="relative mt-6 md:mt-10 lg:mt-12">
          {/* Soft glow effect */}
          <div
            className="absolute inset-0 top-1/4 blur-[80px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_65%)] -z-10 h-[50%]"
            aria-hidden="true"
          />

          {/* Outline text above oven on mobile */}
          <div
            ref={mobileOutlineRef}
            className="
              text-center
              text-[clamp(28px,7.5vw,96px)]
              font-extrabold tracking-tighter select-none
              mb-4 md:hidden
            "
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.06)",
              color: "transparent",
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
            }}
            aria-hidden="true"
          >
            {cur.title?.toUpperCase?.() || ""}
          </div>

          {/* Image stage with aspect ratio to avoid CLS */}
          <div
            ref={stageRef}
            className="mx-auto w-full grid place-items-center px-2 xs:px-4 sm:px-8 md:px-12 lg:px-20"
          >
            <div
              ref={imgWrapRef}
              className="
                w-full max-w-[980px]
                aspect-[4/3]
                grid place-items-center
                will-change-transform will-change-opacity
              "
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                ref={imgRef}
                key={cur.image}
                src={cur.image}
                alt={cur.title}
                className="
                  w-full h-full object-contain
                  drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                  max-h-[65vh]
                "
                loading="eager"
                decoding="async"
                sizes="(min-width:1280px) 980px, (min-width:1024px) 720px, (min-width:768px) 560px, (min-width:640px) 420px, 320px"
              />
            </div>
          </div>

          {/* Left arrow */}
          <button
            aria-label={aria.prev}
            onClick={prev}
            className="
              absolute left-0 sm:left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2
              inline-flex items-center justify-center
              w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
              rounded-full
              bg-white/[0.08] hover:bg-white/[0.14]
              backdrop-blur-sm border border-white/10
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-white/30
              group
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            aria-label={aria.next}
            onClick={next}
            className="
              absolute right-0 sm:right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2
              inline-flex items-center justify-center
              w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
              rounded-full
              bg-white/[0.08] hover:bg-white/[0.14]
              backdrop-blur-sm border border-white/10
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-white/30
              group
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M9 5l7 7-7 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Bottom caption section */}
        <div
          ref={captionRef}
          className="mt-8 md:mt-10 lg:mt-12 flex flex-col gap-5 md:gap-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 lg:gap-6">
            {/* Index number */}
            <span
              className="text-[clamp(44px,7.5vw,92px)] font-extrabold select-none leading-none mx-auto sm:mx-0"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
                color: "transparent",
              }}
              aria-hidden="true"
            >
              {cur.indexLabel}
            </span>

            {/* Title and blurb */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="text-[clamp(22px,3.25vw,40px)] font-semibold leading-tight tracking-[-0.015em] mb-1">
                {cur.title}
              </h3>
              <p
                id="slide-blurb"
                className="text-white/70 text-[clamp(14px,1.5vw,18px)] leading-relaxed max-w-3xl mx-auto sm:mx-0"
              >
                {cur.blurb || "Crafted to be sturdy and lightweight, ideal for events."}
              </p>
            </div>

            {/* Explore button */}
            <button
              type="button"
              onClick={() => onExplore?.(cur, i)}
              aria-describedby="slide-blurb"
              className="
                inline-flex items-center gap-2.5
                rounded-full
                bg-[#E20A17] hover:bg-[#ff1a2a]
                px-5 py-2.5 sm:px-6 sm:py-3
                text-sm sm:text-base font-medium
                transition-all duration-200
                whitespace-nowrap
                focus:outline-none focus:ring-2 focus:ring-red-400/50
                group
                mx-auto sm:mx-0
              "
            >
              <span>Explore</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Progress indicator */}
          <div className="relative mt-2 h-[2.5px] w-full bg-white/10 overflow-hidden rounded-full">
            <span
              className="absolute left-0 top-0 h-full bg-white/60 transition-[width] duration-300 ease-out rounded-full"
              style={{ width: `${((i + 1) / safeItems.length) * 100}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Pagination dots */}
        <div
          className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Slides"
        >
          {safeItems.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                animateSwap(idx > i ? 1 : -1);
                setI(idx);
              }}
              role="tab"
              aria-selected={idx === i ? "true" : "false"}
              aria-label={`Go to slide ${idx + 1}`}
              className={`
                h-1.5 rounded-full transition-all duration-250 ease-out
                ${idx === i ? "w-8 sm:w-9 bg-white" : "w-2.5 sm:w-3 bg-white/30 hover:bg-white/50"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OvensShowcase;
