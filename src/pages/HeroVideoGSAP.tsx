// src/pages/HeroVideoGSAP.tsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BG from "../assets/bg.png";

gsap.registerPlugin(ScrollTrigger);

type Stat = { label: string; value: number; suffix?: string };
type UspItem = { icon: string; t: string; d: string };

const stats: Stat[] = [
  { label: "Wood-Fired Installs", value: 500, suffix: "+" },
  { label: "Cities Served", value: 10 },
];

const uspItems: UspItem[] = [
  { icon: "https://www.ilforno.in/wp-content/uploads/2025/09/intro-usp-1.webp", t: "Performance", d: "Reaches 450°C in 40–60 minutes, retaining heat for hours of authentic, evenly baked pizzas." },
  { icon: "https://www.ilforno.in/wp-content/uploads/2025/09/intro-usp-2.webp", t: "Efficiency", d: "Dual-fuel ovens with ceramic insulation heat fast, save fuel, and suit both home and commercial use." },
  { icon: "https://www.ilforno.in/wp-content/uploads/2025/09/intro-usp-3.webp", t: "Built Quality", d: "Made with premium bricks, stainless steel, and ceramics for superior durability, strength, and low maintenance." },
  { icon: "https://www.ilforno.in/wp-content/uploads/2025/09/intro-usp-4.webp", t: "Custom Finish", d: "Personalize with brick, tile, or stone finishes for a unique, premium, and aesthetic oven design." },
  { icon: "https://www.ilforno.in/wp-content/uploads/2025/09/intro-usp-5.webp", t: "Guidance", d: "Our experienced team offers full support—from choosing your oven to setup and after-sales assistance." },
];

const VIDEO_HEADING = "India’s best pizza ovens";

const HeroVideoGSAP: React.FC = () => {
  const root = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // headline split
      const headline = root.current!.querySelector(".js-headline") as HTMLElement | null;
      if (headline) {
        const raw = headline.dataset.text || headline.textContent || "";
        headline.textContent = raw;
        const words = raw.trim().split(/\s+/);
        headline.innerHTML = words
          .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block js-word-inner translate-y-full">${w}</span></span>`)
          .join(" ");
        gsap.set(".js-word-inner", { yPercent: 100, rotateX: -80, transformOrigin: "50% 100%" });
        gsap.to(".js-word-inner", { yPercent: 0, rotateX: 0, ease: "power3.out", stagger: 0.05, duration: 0.9, delay: 0.15 });
      }

      // left column reveal
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: ".js-left", start: "top bottom", once: true } });
      tl.from(".js-sub", { opacity: 0, y: 18, duration: 0.6 })
        .from(".js-usp", { opacity: 0, y: 22, duration: 0.55, stagger: 0.08 }, "-=0.2")
        .from(".js-cta", { y: 18, autoAlpha: 1, duration: 0.55 }, "-=0.1")
        .from(".js-tag", { opacity: 0, y: 14, duration: 0.5 }, "-=0.05");

      // card parallax
      gsap.from(".js-card", { opacity: 0, scale: 0.98, y: 18, duration: 0.9, ease: "power3.out" });
      gsap.to(".js-card", { y: -40, ease: "none", scrollTrigger: { trigger: root.current!, start: "top top", end: "bottom top", scrub: 0.5 } });

      // shine sweep
      if (shineRef.current) {
        gsap.timeline({ repeat: -1, repeatDelay: 2.2 })
          .set(shineRef.current, { xPercent: -120, opacity: 0 })
          .to(shineRef.current, { xPercent: 120, opacity: 1, duration: 1.1, ease: "power2.out" })
          .to(shineRef.current, { opacity: 0, duration: 0.2 });
      }

      // stat counters
      const counters = gsap.utils.toArray<HTMLElement>(".js-stat");
      counters.forEach((el) => {
        const target = parseInt(el.dataset.value || "0", 10);
        const suffix = el.dataset.suffix || "";
        const obj = { n: 0 };
        ScrollTrigger.create({
          trigger: ".js-stats",
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              n: target,
              duration: 1.2,
              ease: "power3.out",
              onUpdate: () => (el.textContent = Math.round(obj.n).toString() + suffix),
            }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-[#0b0b0b] text-white">
      {/* background blobs */}
      <div className="pointer-events-none absolute -top-48 -right-24 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-20 bg-[#ff6a00]" />
      <div className="pointer-events-none absolute -bottom-56 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20 bg-[#ffd166]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* left */}
          <div className="js-left">
            <p className="js-sub mt-1 text-white/80 max-w-prose">
              Since 2016, <strong>The Pizza Ovens by Saif</strong> has been India’s trusted name for handcrafted
              wood-fired and gas-fired pizza ovens. Designed in India with Italian inspiration, our ovens blend
              tradition, performance, and craftsmanship—bringing restaurant-grade flavor to every kitchen.
            </p>

            <ul className="mt-6 space-y-5">
              {uspItems.map((it) => (
                <li key={it.t} className="js-usp">
                  <div className="flex items-start gap-3">
                    <img src={it.icon} alt="" className="w-6 h-6 object-contain mt-1" />
                    <div>
                      <div className="font-semibold text-white">{it.t}</div>
                      <p className="text-white/80 text-sm mt-1">{it.d}</p>
                    </div>
                  </div>
                  <div className="mt-4 h-px w-full bg-white/15" />
                </li>
              ))}
            </ul>

            <a href="#about" className="js-cta relative z-10 inline-flex items-center px-5 py-3 rounded-xl bg-white !text-black font-semibold hover:scale-[1.02] transition mt-6 opacity-100">
              Explore
            </a>
            <div className="js-tag mt-3 text-white/70 text-sm">Handcrafted • Reliable • Performance you can taste</div>
          </div>

          {/* right */}
          <div className="js-card relative will-change-transform">
            <h1 className="js-headline mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight" data-text={VIDEO_HEADING}>
              {VIDEO_HEADING}
            </h1>

            <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 bg-black/40 backdrop-blur-sm mx-auto w-full max-w-[640px]">
              <div ref={shineRef} className="pointer-events-none absolute inset-y-0 -left-[30%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
              <div className="w-full" style={{ height: 628 }}>
                {/* ✅ Use an image (your PNG). Swap to <video> when you have MP4/WebM */}
                <img src={BG} alt="Hero oven" className="block h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/0" />
            </div>

            <div className="absolute -left-4 -bottom-6 hidden md:block">
              <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-4 py-2">
                <span className="text-white/85 text-sm">Live Oven • The Pizza Ovens by Saif</span>
              </div>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="js-stats mt-10 grid grid-cols-3 gap-4 max-w-md">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold">
                <span className="js-stat" data-value={s.value} data-suffix={s.suffix || ""}>0</span>
              </div>
              <div className="text-xs mt-1 text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroVideoGSAP;
