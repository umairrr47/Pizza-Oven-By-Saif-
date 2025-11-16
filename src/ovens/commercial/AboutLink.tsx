// HeroCommercial.tsx
import React from "react";
import HeroImg from "../../assets/Aboutbg.png"; // replace with your image path

export default function HeroCommercial({
  image = HeroImg,
  title = (
    <>
      Experience the Legacy of
      <br />
      Saif Wood-Fired Pizza Ovens
    </>
  ),
  subtitle = "Born in India, inspired by Italy — Saif has mastered the art of wood-fired oven making through years of hands-on experience and innovation.Each oven reflects a perfect balance of Indian craftsmanship and Italian design philosophy, built to deliver authentic flavor, reliability, and lasting performance for every chef.",
  ctaLabel = "About Us",
}: {
  image?: string;
  title?: React.ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  whatsappLink?: string;
}) {
  return (
    <header className="relative w-full">
      {/* Background image */}
      <div className="relative w-full h-[420px] md:h-[560px] lg:h-[760px] overflow-hidden">
        <img
          src={image}
          alt="pizza oven background"
          className="absolute inset-0 w-full h-full object-cover transform scale-105 filter blur-[1px] brightness-[0.55]"
          draggable={false}
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* content container */}
        <div className="relative z-10 max-w-[1175px] mx-auto px-6 md:px-8 lg:px-12 h-full flex items-center">
          <div className="w-full lg:w-3/4 text-white">
            {/* Heading */}
            <h1
              className="text-[clamp(30px,3.2vw,56px)] leading-[1.28] font-light tracking-[-0.005em] text-gray-100 mb-4"
              style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif', wordSpacing: "-0.08em" }}
            >
              <span className="inline-block">{title}</span>
            </h1>

            {/* underline */}
            <div className="w-[80px] md:w-[110px] h-0.5 bg-white/90 mb-4" />

            {/* Subtitle */}
            <p className="max-w-[780px] text-[16px] md:text-[17px] text-gray-300  tracking-[0.02em] leading-[1.7] opacity-95 mb-6">
              {subtitle}
            </p>

            {/* CTA */}
            <a
              href="#about"
              className="inline-flex items-center gap-3 bg-gradient-to-b from-[#e30616] to-[#c9040f] hover:from-[#ff1a23] hover:to-[#e30715] text-white rounded-full px-6 md:px-8 py-1.5 md:py-2.5 shadow-lg transition-transform active:scale-95"
              aria-label="About Us"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10">
                {/* small chevron icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" stroke="currentColor"></path>
                </svg>
              </span>
              <span className="font-medium text-[15px] md:text-[16px]">
                {ctaLabel}
              </span>
            </a>

          </div>
        </div>
      </div>
    </header>
  );
}
