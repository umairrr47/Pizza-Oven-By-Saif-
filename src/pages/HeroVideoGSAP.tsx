// src/pages/HeroVideoGSAP.tsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BG from "../assets/video.mp4";
import USP1 from "../assets/intro-usp-1.webp"

gsap.registerPlugin(ScrollTrigger);

// Simple reusable type for icons
type IconProps = React.SVGProps<SVGSVGElement>;

export const ExactIconPerformance: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Circular arc with gap (rotated to match ref) */}
    <path d="M85 25 A 40 40 0 1 0 85 75" transform="rotate(-45 50 50)" />
    {/* Needle */}
    <line x1="50" y1="50" x2="85" y2="15" />
    {/* Center dot */}
    <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
  </svg>
);

export const ExactIconEfficiency: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Circular cycle with arrows */}
    <path d="M 50 10 A 40 40 0 0 1 90 50" />
    <path d="M 90 50 L 85 42 M 90 50 L 95 42" />
    <path d="M 50 90 A 40 40 0 0 1 10 50" />
    <path d="M 10 50 L 5 58 M 10 50 L 15 58" />
    {/* Lightning bolt */}
    <path d="M 55 25 L 40 50 L 60 50 L 45 75" />
  </svg>
);

export const ExactIconBuiltQuality: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Rosette / seal */}
    <path d="M50 10 
             Q 60 10 65 18 Q 75 20 78 28
             Q 88 32 88 40 Q 95 50 88 60
             Q 88 68 78 72 Q 75 80 65 82
             Q 60 90 50 90 Q 40 90 35 82
             Q 25 80 22 72 Q 12 68 12 60
             Q 5 50 12 40 Q 12 32 22 28
             Q 25 20 35 18 Q 40 10 50 10 Z" />
    <circle cx="50" cy="50" r="25" />
    <path d="M 40 50 L 48 58 L 65 40" />
  </svg>
);

export const ExactIconCustomFinish: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Back bookmark */}
    <path d="M 40 10 H 80 V 70 L 60 60 L 40 70 V 10" opacity="0.4" />
    {/* Front bookmark */}
    <path
      d="M 20 20 H 60 V 90 L 40 80 L 20 90 V 20"
      fill="currentColor"
      stroke="none"
      opacity="0.05"
    />
    <path d="M 20 20 H 60 V 90 L 40 80 L 20 90 V 20" />
    {/* Checkmark */}
    <path d="M 32 45 L 38 52 L 50 38" />
  </svg>
);

export const ExactIconGuidance: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Pole */}
    <line x1="50" y1="10" x2="50" y2="90" />
    <line x1="30" y1="90" x2="70" y2="90" />
    {/* Left sign */}
    <path
      d="M 50 25 L 20 25 L 10 35 L 20 45 L 50 45"
      fill="currentColor"
      stroke="none"
      opacity="0.05"
    />
    <path d="M 50 25 L 20 25 L 10 35 L 20 45 L 50 45" />
    {/* Right sign */}
    <path
      d="M 50 55 L 80 55 L 90 65 L 80 75 L 50 75"
      fill="currentColor"
      stroke="none"
      opacity="0.05"
    />
    <path d="M 50 55 L 80 55 L 90 65 L 80 75 L 50 75" />
  </svg>
);


type Stat = { label: string; value: number; suffix?: string };
type UspItem = { Icon: React.FC<IconProps>; t: string; d: string };

const stats: Stat[] = [
  { label: "Wood-Fired Installs", value: 500, suffix: "+" },
  { label: "Cities Served", value: 10 },
];

const uspItems: UspItem[] = [
  {
    Icon: ExactIconPerformance,
    t: "Performance",
    d: "Reaches 450°C in 40–60 minutes, retaining heat for hours of authentic, evenly baked pizzas.",
  },
  {
    Icon: ExactIconEfficiency,
    t: "Efficiency",
    d: "Dual-fuel ovens with ceramic insulation heat fast, save fuel, and suit both home and commercial use.",
  },
  {
    Icon: ExactIconBuiltQuality,
    t: "Built Quality",
    d: "Made with premium bricks, stainless steel, and ceramics for superior durability, strength, and low maintenance.",
  },
  {
    Icon: ExactIconCustomFinish,
    t: "Custom Finish",
    d: "Personalize with brick, tile, or stone finishes for a unique, premium, and aesthetic oven design.",
  },
  {
    Icon: ExactIconGuidance,
    t: "Guidance",
    d: "Our experienced team offers full support—from choosing your oven to setup and after-sales assistance.",
  },
];


const VIDEO_HEADING = "India’s best pizza ovens";

const HeroVideoGSAP: React.FC = () => {
  const root = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      console.log("GSAP context initialized");

     
      // Heading animation - keep the text intact
      const headline = root.current!.querySelector(
        ".js-headline"
      ) as HTMLElement | null;

      if (headline) {
        gsap.fromTo(
          headline,
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            clearProps: "visibility",
          }
        );
      }


      // Left column reveal - USP items now start visible, animation enhances
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: ".js-left", start: "top bottom", once: true, onEnter: () => console.log("Left column animation triggered") } });
      tl.from(".js-sub", { opacity: 0, y: 20, scale: 0.95, duration: 0.8 })
        .from(".js-usp", { y: 30, scale: 0.9, duration: 0.7, stagger: 0.1 }, "-=0.3") // Removed opacity: 0 to keep visible
        .from(".js-cta", { y: 20, scale: 0.9, duration: 0.6 }, "-=0.2") // Removed opacity: 0
        .from(".js-tag", { opacity: 0, y: 15, duration: 0.5 }, "-=0.1");

      // Floating animation for USP icons (only if visible)
      gsap.to(".js-usp-icon", { y: -5, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.2, duration: 1.5 });

      // Card parallax with multi-layer depth
      gsap.from(".js-card", { opacity: 0, scale: 0.95, y: 30, rotateY: 10, duration: 1, ease: "power3.out" });
      gsap.to(".js-card", { y: -50, rotateY: -5, ease: "none", scrollTrigger: { trigger: root.current!, start: "top top", end: "bottom top", scrub: 0.6 } });

      // Enhanced shine sweep with pulsing
      if (shineRef.current) {
        gsap.timeline({ repeat: -1, repeatDelay: 3 })
          .set(shineRef.current, { xPercent: -150, opacity: 0, scale: 0.8 })
          .to(shineRef.current, { xPercent: 150, opacity: 1, scale: 1.2, duration: 1.5, ease: "power2.inOut" })
          .to(shineRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });
      }

      // Stat counters with progress bar animation
      const counters = gsap.utils.toArray<HTMLElement>(".js-stat");
      counters.forEach((el) => {
        const target = parseInt(el.dataset.value || "0", 10);
        const suffix = el.dataset.suffix || "";
        const progressBar = el.nextElementSibling as HTMLElement;
        const obj = { n: 0 };
        ScrollTrigger.create({
          trigger: ".js-stats",
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              n: target,
              duration: 1.5,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.n).toString() + suffix;
                if (progressBar) gsap.set(progressBar, { width: `${(obj.n / target) * 100}%` });
              },
            }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white font-['Inter',sans-serif] min-h-screen">
      {/* Futuristic particle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,0,0.1),transparent_70%)] animate-pulse" />
        <div className="stars absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
          ))}
        </div>
      </div>

      {/* Enhanced background blobs with pulsing */}
      <div className="pointer-events-none absolute -top-48 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-[#ff6a00] to-[#ffd166] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-56 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-[#ffd166] to-[#00d4ff] animate-pulse" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left Column - Text and USPs */}
          <div className="js-left order-1 lg:order-1 flex-shrink-0">
            <p className="js-sub mt-1 text-white/90 max-w-prose text-lg leading-relaxed">
              Since 2016, <strong className="bg-gradient-to-r from-[#ff6a00] to-[#ffd166] bg-clip-text text-transparent">The Pizza Ovens by Saif</strong> has been India’s trusted name for handcrafted
              wood-fired and gas-fired pizza ovens. Designed in India with Italian inspiration, our ovens blend
              tradition, performance, and craftsmanship—bringing restaurant-grade flavor to every kitchen.
            </p>

            <ul className="mt-8 mb-8 space-y-6 min-h-[400px]"> {/* Added min-height to prevent collapse */}
              {uspItems.map((it) => (
                <li key={it.t} className="js-usp opacity-1 group relative p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ff6a00]/20 flex-shrink-0">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 flex-shrink-0 text-[#ff6a00] group-hover:text-[#ffd166] transition-colors">
                      <it.Icon
                        className="js-usp-icon w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="font-bold text-white text-lg group-hover:text-[#ffd166] transition-colors">{it.t}</div>
                      <p className="text-white/80 text-sm mt-2 leading-relaxed">{it.d}</p>
                    </div>
                  </div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </li>
              ))}
            </ul>

            <a
              href="#about"
              className="js-cta relative z-10 inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ffd166] text-black font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-[#ff6a00]/50 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Explore</span>
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl" />
            </a>
            <div className="js-tag mt-8 text-white/70 text-sm italic">Handcrafted • Reliable • Performance you can taste</div>
          </div>

          {/* Right Column - Image */}
          <div className="js-card relative will-change-transform order-2 lg:order-2">
            <h1
              className="js-headline mb-6 text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight bg-gradient-to-r from-white via-[#ffd166] to-[#00d4ff] bg-clip-text text-transparent drop-shadow-lg"
              data-text={VIDEO_HEADING}
            >
              {VIDEO_HEADING}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-4 tracking-wide">
              Crafted for Chefs, Loved by Every Pizza Lover
            </h2>

            <div className="relative mb-4 h-1 bg-gradient-to-r from-[#ff6a00] to-[#ffd166] rounded-full" />

            <div className="relative rounded-3xl overflow-hidden ring-2 ring-white/20 bg-black/50 backdrop-blur-lg mx-auto w-full max-w-[640px] shadow-2xl shadow-black/50 hover:shadow-[#00d4ff]/20 transition-shadow duration-500">
              <div ref={shineRef} className="pointer-events-none absolute inset-y-0 -left-[40%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
              <div className="w-full" style={{ height: 628 }}>
                <video
                  src={BG}
                  className="block h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/fallback.jpg" // optional fallback image
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10" />
              {/* Luxury overlay tag */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-gold-400/50">
                <span className="text-white/90 text-xs font-semibold">Premium Craftsmanship</span>
              </div>
            </div>

            <div className="absolute -left-6 -bottom-8 hidden md:block">
              <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 shadow-lg">
                <span className="text-white/85 text-sm">Live Oven • The Pizza Ovens by Saif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats with progress bars */}
        <div className="js-stats mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-[#ff6a00] to-[#ffd166] bg-clip-text text-transparent">
                <span className="js-stat" data-value={s.value} data-suffix={s.suffix || ""}>0</span>
              </div>
              <div className="text-xs mt-2 text-white/70 uppercase tracking-wide">{s.label}</div>
              <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ff6a00] to-[#ffd166] w-0 transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroVideoGSAP;
