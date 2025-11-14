// MarcoGalleryFinal.jsx
import React from "react";
import ab1 from "../assets/ResidentialOven.png"
import ab2 from "../assets/CommercialOven.png"
import ab3 from "../assets/gal4.jfif"
import ab4 from "../assets/gal5.jfif"
import ab5 from "../assets/gal1.jpg"
import ab6 from "../assets/gal2.jfif"

export default function SaifGallery({
  title = "The Visual Gallery of\nSaif Ameer",
  subtitle = "More Than Delivery — We Build Experiences. Our ovens are installed with precision, passion, and care. Each installation is tailored, whether at a hill café or a metro fine-dine kitchen.",
  images = [],
}) {
  // fallback images if not provided
  const imgs =
    images && images.length >= 6
      ? images.slice(0, 6)
      : [
          ab1,
          ab2,
          ab3,
          ab4,
          ab5,
          ab6,
        ];

  return (
    <section className="bg-[#111] text-gray-100 py-12 px-8">
      {/* Header: title left, subtitle right */}
      <div className="max-w-[1200px] mx-auto mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
  <div className="lg:col-span-8">
    <h1
      className="font-normal leading-tight"
      style={{ 
        fontSize: "clamp(28px, 4.2vw, 56px)", 
        whiteSpace: "pre-line",
        fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif'
      }}
    >
      {title}
    </h1>
  </div>
  <div className="lg:col-span-4">
    <p className="text-[16px] md:text-[18px] text-[#BCBCBC] tracking-[0.02em] leading-7">
      {subtitle}
    </p>
  </div>
</div>

      {/* Gallery */}
      <div className="max-w-[1200px] mx-auto">
        <div
          className="grid gap-6"
          style={{
            // desktop: 3 columns (left tall, middle narrow, right wide)
            gridTemplateColumns: "1fr 0.65fr 1.3fr",
            gridAutoRows: "220px",
          }}
        >
          {/* 1 - Tall left (spans 2 rows) */}
          <div style={{ gridColumn: "1 / 2", gridRow: "1 / span 2" }}>
            <img
              src={imgs[0]}
              alt="g1"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* 2 - Top middle (narrow) */}
          <div style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
            <img
              src={imgs[1]}
              alt="g2"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* 3 - Top right (wide, spans 2 rows) */}
          <div style={{ gridColumn: "3 / 4", gridRow: "1 / span 2" }}>
            <img
              src={imgs[2]}
              alt="g3"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* 4 - Bottom middle (narrow) */}
          <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
            <img
              src={imgs[3]}
              alt="g4"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* 5 - bottom-left wide image spanning columns 1-2 on small screens, but here we'll place it under left on larger (it will appear below because left spans two rows) */}
          <div style={{ gridColumn: "1 / 2", gridRow: "3 / 4", minHeight: "160px" }}>
            <img
              src={imgs[4]}
              alt="g5"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* 6 - extra bottom image (you can place it as you like) */}
          <div style={{ gridColumn: "2 / 4", gridRow: "3 / 4", minHeight: "160px" }}>
            <img
              src={imgs[5]}
              alt="g6"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* bottom thin divider like in screenshot */}
      <div className="max-w-[1200px] mx-auto mt-8">
        <hr className="border-gray-700" />
      </div>
    </section>
  );
}
