// src/components/RangeSlider.tsx
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

type Slide = { no: string; title: string; copy: string; img?: string; cta?: string; href?: string; };

const SLIDES: Slide[] = [
  { no: "01", title: "Commercial Oven",  copy: "Performance and reliability for serious kitchens.", href: "#" },
  { no: "02", title: "Portable Oven",    copy: "Lightweight, sturdy, and weekend-ready.", href: "#" },
  { no: "03", title: "Residential Oven", copy: "Compact footprint with premium finish.", href: "#" },
];

export default function RangeSlider() {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <div className="relative" data-reveal>
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="min-w-[88%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[33%] pr-6">
              <article className="p-6 rounded-2xl border bg-white/70 backdrop-blur">
                <div className="text-sm opacity-60">{s.no}</div>
                <h3 className="text-2xl font-semibold mt-1">{s.title}</h3>
                <p className="mt-2 opacity-80">{s.copy}</p>
                <a href={s.href} className="mt-4 inline-flex px-4 py-2 rounded-lg border hover:scale-[1.01] transition">
                  Explore
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-4">
        <button
          onClick={() => embla?.scrollPrev()}
          className="px-3 py-2 rounded-lg border text-sm"
          aria-label="Previous"
        >Prev</button>
        <button
          onClick={() => embla?.scrollNext()}
          className="px-3 py-2 rounded-lg border text-sm"
          aria-label="Next"
        >Next</button>
      </div>
    </div>
  );
}
