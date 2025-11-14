// BrandsLoop.tsx (fixed for mobile animation)
import React, { useRef, useEffect } from "react";
import C1 from "../assets/client1.png";
import C2 from "../assets/client2.png";
import C3 from "../assets/client3.png";
import C4 from "../assets/client4.png";
import C5 from "../assets/client5.png";
import C6 from "../assets/client6.png";

const BrandsLoop: React.FC = () => {
  const logos: string[] = [
    C1,
    C2,
    C3,
    C4,
    C5,
    C6,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNnoi5M6BApMVpkrQqWRluovCUBy6oV9Mdfg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH2a7tdC5uCJvlHum0F2nJXo5ybNYmX3Zbug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrR_56CZRQjqjpwK9jG4uzuDWkJ4Y4kWVk-w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkw_4dA-qmqGWGx4DSghIdVJzMCUTol2vX1Q&s",
  ];

  const HEIGHT_PX = 80;
  const HEIGHT_PX_SM = 60;
  const GAP_REM = 3;
  const GAP_REM_SM = 2;
  const SPEED_SEC = 26;

  // triple-track for seamless looping
  const track = [...logos, ...logos, ...logos];

  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // ensure we force hardware compositing & set inline animation (helps many mobile browsers)
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // ensure transform layer
    el.style.willChange = "transform";
    el.style.transform = "translateZ(0)";

    // explicit inline animation rule (useful when CSS var support inconsistent)
    const anim = `slideX ${SPEED_SEC}s linear infinite`;
    el.style.animation = anim;
    // webkit fallback
    (el.style as any).webkitAnimation = anim;

    // when user hovers (desktop), speed-up — add listeners
    const enter = () => {
      el.style.animationDuration = `${SPEED_SEC * 0.7}s`;
      (el.style as any).webkitAnimationDuration = `${SPEED_SEC * 0.7}s`;
    };
    const leave = () => {
      el.style.animationDuration = `${SPEED_SEC}s`;
      (el.style as any).webkitAnimationDuration = `${SPEED_SEC}s`;
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section className="relative w-full py-10 sm:py-12 overflow-hidden bg-white">
      <div className="relative w-full rounded-3xl bg-white/90">
        <div className="pointer-events-none absolute inset-0 rounded-3xl [background:radial-gradient(1200px_400px_at_10%_-20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 sm:w-32 bg-gradient-to-r from-white to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 sm:w-32 bg-gradient-to-l from-white to-transparent z-20" />

        <div className="relative overflow-hidden py-6">
          {/* marquee track */}
          <div
            ref={marqueeRef}
            className="flex items-center z-10"
            style={{
              gap: `${GAP_REM}rem`,
              // fallback inline animation set in useEffect for wider compatibility
            }}
            aria-hidden="false"
          >
            {track.map((src, i) => (
              <LogoChip key={`logo-${i}`} src={src} height={HEIGHT_PX} heightSm={HEIGHT_PX_SM} gapRem={GAP_REM} />
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS (keyframes + reduced-motion + mobile tweaks + vendor prefixes) */}
      <style>{`
        /* Required: each chip must not shrink (we already set shrink-0 in the chip), and track must be wider than container */
        .pro-chip { flex: 0 0 auto; }

        /* Keyframes with vendor prefix for WebKit (iOS) */
        @-webkit-keyframes slideX {
          0% { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); }
          100% { -webkit-transform: translate3d(-33.3333%,0,0); transform: translate3d(-33.3333%,0,0); }
        }
        @keyframes slideX {
          0% { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); }
          100% { -webkit-transform: translate3d(-33.3333%,0,0); transform: translate3d(-33.3333%,0,0); }
        }

        /* prefer-reduced-motion remains respected */
        @media (prefers-reduced-motion: reduce) {
          .pro-chip { animation: none !important; -webkit-animation: none !important; }
        }

        /* Mobile gap tweak */
        @media (max-width: 640px) {
          .pro-chip { margin-right: ${GAP_REM_SM}rem; }
        }
      `}</style>
    </section>
  );
};

export default BrandsLoop;

/** LogoChip: unchanged but add className 'pro-chip' to ensure flex non-shrink + stable layout */
const LogoChip: React.FC<{ src: string; height: number; heightSm: number; gapRem?: number }> = ({ src, height, heightSm }) => {
  return (
    <div
      className="pro-chip shrink-0 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5
                 bg-white/70 backdrop-blur-md
                 shadow-[0_6px_30px_rgba(0,0,0,0.12)]
                 transition-transform duration-300
                 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,0,0,0.18)]
                 hover:bg-white/90"
    >
      <img
        src={src}
        alt="brand"
        loading="lazy"
        decoding="async"
        className="block object-contain transition duration-300"
        style={{
          height: `clamp(${heightSm}px, 6.5vw, ${height}px)`,
          width: "auto",
          display: "block",
        }}
      />
    </div>
  );
};
