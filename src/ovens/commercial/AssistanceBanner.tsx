// src/components/AssistanceBanner.tsx
import React from "react";
import Icon from "../../assets/headphoneicon.webp";

type Props = {
  title?: React.ReactNode;
  ctaLabel?: string;
  whatsappNumber?: string; 
  iconSrc?: string;
  iconAlt?: string;
};

export default function AssistanceBanner({
  title = (
    <>
      Get Assistance to Install Wood Fired
      <br />
      Pizza Oven at a Commercial Site
    </>
  ),
  ctaLabel = "Get Assistance",
  whatsappNumber = "919899593526", 
  iconSrc = Icon,
  iconAlt = "Customer support",
}: Props) {
  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello! I’d like assistance with installing a wood-fired pizza oven."
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section
      aria-label="Assistance banner"
      className="w-full bg-[#191919] flex items-center justify-center"
      style={{ height: "190px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 w-full opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{ height: "104px" }}
        >
          {/* Left Section */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src={iconSrc}
              alt={iconAlt}
              className="w-[71px] h-[66px] object-contain flex-shrink-0"
              width={71}
              height={66}
            />

            <h4
              className="m-0 text-white"
              style={{
                fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif',
                lineHeight: 1.18,
                letterSpacing: "0.015em",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              <span className="block text-[clamp(16px,2.2vw,20px)] md:text-[clamp(20px,2.4vw,30px)] font-medium">
                {title}
              </span>
            </h4>
          </div>

          {/* Right Section */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={handleWhatsAppClick}
              type="button"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-b from-[#e30715] to-[#c00612] hover:from-[#ff1a23] hover:to-[#e30715] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb3b3] transition-transform duration-150 hover:scale-105 active:scale-95"
              aria-label={ctaLabel}
            >
              <svg
                className="w-4 h-4 opacity-90"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-medium">{ctaLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
