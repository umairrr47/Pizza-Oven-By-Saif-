// src/components/BrandMarquee.tsx
import React, { useEffect, useRef } from "react";

const logos = [
  "/brands/a.png","/brands/b.png","/brands/c.png","/brands/d.png","/brands/e.png",
  "/brands/f.png","/brands/g.png","/brands/h.png",
];

export default function BrandMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const total = track.scrollWidth / 2; // because we duplicate the row
    let start: number | null = null;

    const speed = 45; // px/s (adjust)
    const step = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;
      const x = (elapsed * speed) % total;
      track.style.transform = `translateX(-${x}px)`;
      requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="overflow-hidden py-6 border-y bg-white/60 backdrop-blur" aria-label="Our partners">
      <div className="flex gap-10 will-change-transform" ref={trackRef}>
        {[...logos, ...logos].map((src, i) => (
          <img key={i} src={src} alt="" className="h-10 w-auto object-contain opacity-80" loading="lazy" />
        ))}
      </div>
    </div>
  );
}
