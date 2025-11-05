// src/components/UI/SmokeOverlay.tsx
import React, { useEffect, useRef, useState } from "react";

const SmokeOverlay: React.FC<{ durationMs?: number }> = ({ durationMs = 3500 }) => {
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // accessibility: skip animation

    setVisible(true);

    let t = 0;
    let raf = 0;

    const animate = () => {
      t += 0.01;
      const fx = 0.015 + 0.010 * Math.cos(t);
      const fy = 0.020 + 0.008 * Math.sin(t * 0.8);
      turbRef.current?.setAttribute("baseFrequency", `${fx.toFixed(4)} ${fy.toFixed(4)}`);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const timeout = setTimeout(() => {
      setVisible(false);
      cancelAnimationFrame(raf);
    }, durationMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [durationMs]);

  // Inline styles to avoid editing global CSS
  const wrapStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    pointerEvents: "none",
    opacity: visible ? 1 : 0,
    transition: "opacity 400ms ease",
    background:
      "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0) 60%)",
  };

  return (
    <div aria-hidden="true" style={wrapStyle}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="smoke-filter">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.015 0.020"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="55"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <linearGradient id="smoke-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="40%" stopColor="#ccc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#smoke-grad)" filter="url(#smoke-filter)" opacity="0.6" />
      </svg>
    </div>
  );
};

export default SmokeOverlay;
