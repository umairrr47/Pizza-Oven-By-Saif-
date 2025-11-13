// src/sections/RevolvingOvenHero.tsx
import React, { useState } from "react";
import Video from "../assets/video.mp4";
import Poster from "../assets/bg.png";

const RevolvingOven: React.FC = () => {
  const [play, setPlay] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-[#0b0b0b] via-[#0f0f0f] to-[#0a0a0a] text-white overflow-hidden min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-[1400px] px-8 sm:px-12 lg:px-16 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-12 gap-6 lg:gap-8 w-full">
          
          {/* Heading */}
          <h1 className="col-span-12 lg:col-span-7 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[clamp(30px,3.2vw,56px)] leading-[1.08] font-light tracking-[-0.005em] text-gray-100">
            Saif introduced revolving
            <br className="hidden sm:block" />
            wood and gas fired ovens in
            <br className="hidden sm:block" />
            India for the first time!
          </h1>

          {/* Description */}
          <p className="col-span-12 lg:col-span-5 text-[16px] md:text-[18px] text-[#e9e6e6] leading-[1.7] tracking-[0.02em]">
            Experience the unmatched performance and ease of use of Saif&apos;s revolving oven, an engineering marvel that boosts productivity while enabling pizza makers to consistently deliver high-quality results.
          </p>

          {/* Video Section - made wider to match parent max width */}
          <div className="col-span-12 mt-6 lg:mt-8">
            <div className="relative w-full max-w-[1400px] rounded-xl overflow-hidden bg-neutral-900/50 ring-1 ring-white/5 shadow-xl backdrop-blur-sm">
              <div className="w-full aspect-[16/9] relative">
                {!play ? (
                  <button
                    type="button"
                    aria-label="Play video"
                    onClick={() => setPlay(true)}
                    className="group relative flex h-full w-full items-center justify-center transition-all duration-300 hover:scale-[1.01]"
                  >
                    {/* Poster */}
                    <img
                      src={Poster}
                      alt="Revolving oven demo poster"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                    {/* Play Button */}
                    <span className="relative z-10 inline-flex items-center justify-center rounded-full bg-white/95 text-black h-16 w-16 sm:h-20 sm:w-20 shadow-2xl ring-2 ring-white/20 transition-all duration-300 group-hover:bg-white group-hover:scale-110 group-active:scale-95">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    autoPlay
                    muted
                    playsInline
                    poster={Poster}
                  >
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#0b0b0b]/50 to-[#0b0b0b]" />

      {/* Decorative Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default RevolvingOven;
