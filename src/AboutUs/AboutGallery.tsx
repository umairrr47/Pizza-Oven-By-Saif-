// AboutGallery.tsx
import React, { useState, useEffect, useRef } from "react";
import Gall1 from "../assets/Fimg2.png"
import Gall2 from "../assets/Fimg3.png"
import Gall3 from "../assets/homeoven.jpeg"
import Gall4 from "../assets/rooftop.webp"

type Props = {
  title?: string;        // optional now
  description?: string;
  images?: string[];
};

export default function AboutGallery({
  title = "Where Italian Tradition\nMeets Culinary Excellence",
  description = "From the heart of Italy to your kitchen, our ovens are designed to honor authentic techniques while delivering top-tier performance and rich, wood-fired flavor.",
  images = [],
}: Props) {
  // guard: use empty string fallback so split never throws
  const titleLines = (title || "").split("\n");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Default placeholder images if none provided
  const displayImages = images.length ? images : [
    Gall1, 
    Gall2, 
    Gall3,
    Gall4
  ];

  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [displayImages.length]);

  // Scroll to current index
  useEffect(() => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 1024;
      const imageWidth = isMobile ? 300 : 1052;
      const gap = isMobile ? 16 : 24;
      const scrollPosition = currentIndex * (imageWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section className="bg-[#0b0b0b] text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7">
            <h2
              className="text-[clamp(32px,5.2vw,54px)] leading-[1.02] font-normal tracking-tight mb-8"
              style={{ fontFamily: '"NeueHaasGroteskDisp Pro", system-ui, -apple-system, "Segoe UI", Roboto' }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm md:text-base text-[#BDBDBD] leading-[1.7]">
              {description}
            </p>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 hide-scrollbar"
          >
            {displayImages.map((src, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 snap-start rounded-[20px] bg-gray-800 overflow-hidden w-[300px] h-[300px] lg:w-[1052px] lg:h-[571px]"
              >
                <img
                  src={src}
                  alt={`gallery-${idx}`}
                  className="w-full h-full object-cover object-center block"
                />
              </div>
            ))}
          </div>

          <div className="hidden lg:block pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent" />
          <div className="hidden lg:block pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent" />
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}