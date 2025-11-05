import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BG from "../assets/bg.png"

const HeroPage: React.FC = () => {
  const scrollBelow = () => {
    const target = document.querySelector("#below-hero");
    // @ts-ignore
    const lenis = (window as any).__lenis;
    if (target && lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: "auto" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "auto" });
    }
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full text-white flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* contrast overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* content */}
      <div className="relative z-10 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-light mb-2"
        >
          Wood Fired
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Pizza Oven
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-gray-200"
        >
          Where Italian craftsmanship meets Indian expertise to build amazing
          wood-fired pizza ovens for the best cooking experience.
        </motion.p>

        {/* CTA — SAME as ref: red pill with left circular nub + chevron */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 rounded-full bg-[#d43804] hover:bg-[#b13003]
                       px-6 md:px-7 py-3 text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,.35)]
                       transition-transform duration-300 hover:scale-[1.03]"
          >
            {/* left circular nub */}
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="stroke-white"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-base md:text-lg">View Products</span>
          </Link>
        </motion.div>
      </div>

      {/* scroll indicator — MOBILE center-bottom, DESKTOP right-bottom */}
    <button
  onClick={scrollBelow}
  aria-label="Scroll down"
  className="
    absolute z-20 text-white opacity-90 hover:opacity-100 transition
    bottom-4 sm:bottom-6 md:bottom-10            /* lower on mobile so it doesn't sit under CTA */
    left-1/2 -translate-x-1/2
    md:left-auto md:right-10 md:translate-x-0
    flex flex-col items-center
  "
  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}  /* iOS safe area */
>
  {/* mouse outline */}
  <svg width="26" height="44" viewBox="0 0 28 48">
    <rect x="4" y="1.5" width="20" height="30" rx="10" className="fill-none" stroke="white" strokeWidth="2" />
    <motion.line
      x1="14" y1="8" x2="14" y2="14" stroke="white" strokeWidth="2"
      animate={{ y1: [8, 10, 8], y2: [14, 18, 14] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>

  {/* arrow — pulled closer */}
  <motion.svg
    width="20" height="20" viewBox="0 0 24 24"
    className="-mt-1"                              /* was mt-2 → now closer */
    animate={{ y: [0, 5, 0] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
  >
    <path
      d="M12 4v14m0 0l-5-5m5 5l5-5"
      fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </motion.svg>
</button>

    </section>
  );
};

export default HeroPage;
