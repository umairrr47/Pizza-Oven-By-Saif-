import React from "react";

/** Single-row premium brand carousel — seamless, modern, no gaps */
const BrandsLoop: React.FC = () => {
  // Replace with your logos (SVG/PNG recommended)
  const logos: string[] = [
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/Swiggy_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d8/JW_Marriott_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7e/Radisson_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/f2/Hyatt_Regency_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Holiday_Inn_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Aloft_hotels_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  ];

  // —— Controls ——
  const HEIGHT_PX = 64;       // desktop max logo height
  const HEIGHT_PX_SM = 48;    // mobile max logo height
  const GAP_REM = 3;          // desktop gap between items
  const GAP_REM_SM = 2;       // mobile gap
  const SPEED_SEC = 26;       // base loop duration (lower = faster)

  // 3× duplication => animate by exactly -33.333% for perfect wrap
  const track = [...logos, ...logos, ...logos];

  return (
    <section className="relative w-full py-10 sm:py-12 overflow-hidden">
      {/* Glassy luxury wrapper */}
      <div className="relative mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/6
                      dark:bg-white/5 backdrop-blur-xl
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_50px_rgba(0,0,0,0.35)]
                      px-4 sm:px-6 lg:px-10">
        {/* Radial sheen */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl
                        [background:radial-gradient(1200px_400px_at_10%_-20%,rgba(255,255,255,0.12),transparent_60%)]" />
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 sm:w-32
                        bg-gradient-to-r from-[rgba(255,255,255,0.9)] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 sm:w-32
                        bg-gradient-to-l from-[rgba(255,255,255,0.9)] to-transparent z-20" />

        {/* Single marquee row */}
        <div className="relative overflow-hidden py-6">
          <div
            className="pro-marquee flex items-center will-change-transform z-10"
            style={
              {
                // @ts-ignore custom props for CSS
                "--speed": `${SPEED_SEC}s`,
                "--gap": `${GAP_REM}rem`,
                "--gap-sm": `${GAP_REM_SM}rem`,
              } as React.CSSProperties
            }
          >
            {track.map((src, i) => (
              <LogoChip key={`logo-${i}`} src={src} height={HEIGHT_PX} heightSm={HEIGHT_PX_SM} />
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS */}
      <style>{`
        .pro-marquee {
          gap: var(--gap);
          animation: slideX var(--speed, 26s) linear infinite;
        }
        @keyframes slideX {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-33.3333%,0,0); }
        }

        /* Hover speed-up (luxury kinetic feel) */
        .pro-marquee:hover {
          animation-duration: calc(var(--speed, 26s) * 0.7);
        }
        /* Optional: pause instead of speed-up — enable if preferred */
        /* .pro-marquee:hover { animation-play-state: paused; } */

        /* Mobile tweaks */
        @media (max-width: 640px) {
          .pro-marquee { gap: var(--gap-sm); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .pro-marquee { animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default BrandsLoop;

/** Single logo chip with premium hover effects */
const LogoChip: React.FC<{ src: string; height: number; heightSm: number }> = ({ src, height, heightSm }) => {
  return (
    <div
      className="shrink-0 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5
                 bg-white/70 dark:bg-white/10 backdrop-blur-md
                 border border-white/30 dark:border-white/10
                 shadow-[0_6px_30px_rgba(0,0,0,0.12)]
                 transition-transform duration-300
                 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,0,0,0.18)]
                 hover:bg-white/90 dark:hover:bg-white/20"
    >
      <img
        src={src}
        alt="brand"
        loading="lazy"
        decoding="async"
        className="block object-contain grayscale contrast-110 opacity-90
                   hover:grayscale-0 hover:opacity-100 transition duration-300
                   [filter:drop-shadow(0_0_0_rgba(0,0,0,0))]
                   hover:[filter:drop-shadow(0_4px_14px_rgba(0,0,0,0.18))]"
        style={{
          height: `clamp(${heightSm}px, 6.5vw, ${height}px)`,
          width: "auto",
        }}
      />
    </div>
  );
};
