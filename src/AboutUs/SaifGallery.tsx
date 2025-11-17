// MarcoGalleryFinal.jsx
import React, { useEffect, useState, useCallback } from "react";
import ab1 from "../assets/ResidentialOven.png";
import ab2 from "../assets/CommercialOven.png";
import ab3 from "../assets/gal4.jfif";
import ab4 from "../assets/gal5.jfif";
import ab5 from "../assets/gal1.jpg";
import ab6 from "../assets/gal2.jfif";

/* Small expand icon used on every tile */
const ExpandIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    stroke="white"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 3 21 3 21 9"></polyline>
    <polyline points="9 21 3 21 3 15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>
);

export default function SaifGallery({
  title = "The Visual Gallery of\nSaif Ameer",
  subtitle = "More Than Delivery — We Build Experiences. Our ovens are installed with precision, passion, and care. Each installation is tailored, whether at a hill café or a metro fine-dine kitchen.",
  images = [],
}) {
  const imgs =
    images && images.length >= 6
      ? images.slice(0, 6)
      : [ab1, ab2, ab3, ab4, ab5, ab6];

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openModal = useCallback((index) => {
    setCurrent(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + imgs.length) % imgs.length);
  }, [imgs.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % imgs.length);
  }, [imgs.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal, prev, next]);

  return (
    <section className="bg-[#111] text-gray-100 py-12 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <h1
            className="font-normal leading-tight"
            style={{
              fontSize: "clamp(28px, 4.2vw, 56px)",
              whiteSpace: "pre-line",
              fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif',
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

      <div className="max-w-[1200px] mx-auto">
        <style>{`
          .saif-gallery-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(120px, auto);
          }

          .g-1, .g-2, .g-3, .g-4, .g-5, .g-6 {
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            transition: transform .2s ease, box-shadow .2s ease;
            background: #111;
          }
          .g-1 img, .g-2 img, .g-3 img, .g-4 img, .g-5 img, .g-6 img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .expand-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 10;
            background: rgba(0,0,0,0.45);
            padding: 6px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .expand-btn:hover { background: rgba(0,0,0,0.6); }

          /* MOBILE: enforce explicit 3-row template -> 2 / 1 / 2 */
          @media (max-width: 767px) {
            .saif-gallery-grid {
              grid-template-columns: repeat(2, 1fr);
              /* explicit 3 rows so browser can't collapse to 2 */
              grid-template-rows: auto auto auto;
              gap: 12px;
            }

            .g-1 { grid-column: 1 / 2; grid-row: 1 / 2; min-height: 140px; }
            .g-2 { grid-column: 2 / 3; grid-row: 1 / 2; min-height: 140px; }
            .g-3 { grid-column: 1 / 3; grid-row: 2 / 3; min-height: 220px; } /* big single row */
            .g-4 { grid-column: 1 / 2; grid-row: 3 / 4; min-height: 140px; }
            .g-5 { grid-column: 2 / 3; grid-row: 3 / 4; min-height: 140px; }

            /* hide g-6 on mobile (optional) */
            .g-6 { display: none; }
          }

          /* TABLET (md) */
          @media (min-width: 768px) and (max-width: 1023px) {
            .saif-gallery-grid {
              grid-template-columns: 1fr 1fr;
              grid-auto-rows: 180px;
            }
            .g-1 { grid-column: 1 / 2; grid-row: 1 / 2; min-height: 260px; }
            .g-2 { grid-column: 2 / 3; grid-row: 1 / 2; min-height: 260px; }
            .g-3 { grid-column: 1 / 3; grid-row: 2 / 3; min-height: 220px; }
            .g-4 { grid-column: 1 / 2; grid-row: 3 / 4; min-height: 160px; }
            .g-5 { grid-column: 2 / 3; grid-row: 3 / 4; min-height: 160px; }
            .g-6 { grid-column: 1 / 3; grid-row: 4 / 5; min-height: 160px; }
          }

          /* DESKTOP (lg): original 3-col */
          @media (min-width: 1024px) {
            .saif-gallery-grid {
              grid-template-columns: 1fr 0.65fr 1.3fr;
              grid-auto-rows: 220px;
              height: 900px;
              overflow: hidden;
            }
            .g-1 { grid-column: 1 / 2; grid-row: 1 / span 2; }
            .g-2 { grid-column: 2 / 3; grid-row: 1 / 2; }
            .g-3 { grid-column: 3 / 4; grid-row: 1 / span 2; }
            .g-4 { grid-column: 2 / 3; grid-row: 2 / 3; }
            .g-5 { grid-column: 1 / 2; grid-row: 3 / 4; min-height: 460px; }
            .g-6 { grid-column: 2 / 4; grid-row: 3 / 4; min-height: 460px; }
          }

          @media (hover: hover) {
            .g-1:hover, .g-2:hover, .g-3:hover, .g-4:hover, .g-5:hover, .g-6:hover {
              transform: translateY(-6px) scale(1.01);
              box-shadow: 0 10px 30px rgba(0,0,0,0.45);
            }
          }

          /* Lightbox */
          .saif-lightbox {
            position: fixed;
            inset: 0;
            z-index: 60;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            background: rgba(0,0,0,0.75);
          }
        `}</style>

        <div className="saif-gallery-grid">
          {/* g-1 */}
          <div className="g-1 rounded-lg overflow-hidden shadow-lg">
            <img src={imgs[0]} alt="gallery 1" loading="lazy" />
            <button
              className="expand-btn"
              aria-label="Open image 1"
              onClick={() => openModal(0)}
            >
              <ExpandIcon />
            </button>
          </div>

          {/* g-2 */}
          <div className="g-2 rounded-lg overflow-hidden shadow-lg">
            <img src={imgs[1]} alt="gallery 2" loading="lazy" />
            <button
              className="expand-btn"
              aria-label="Open image 2"
              onClick={() => openModal(1)}
            >
              <ExpandIcon />
            </button>
          </div>

          {/* g-3 (large) */}
          <div className="g-3 rounded-lg overflow-hidden shadow-lg">
            <img src={imgs[2]} alt="gallery 3" loading="lazy" />
            <button
              className="expand-btn"
              aria-label="Open image 3"
              onClick={() => openModal(2)}
            >
              <ExpandIcon />
            </button>
          </div>

          {/* g-4 */}
          <div className="g-4 rounded-lg overflow-hidden shadow-lg">
            <img src={imgs[3]} alt="gallery 4" loading="lazy" />
            <button
              className="expand-btn"
              aria-label="Open image 4"
              onClick={() => openModal(3)}
            >
              <ExpandIcon />
            </button>
          </div>

          {/* g-5 */}
          <div className="g-5 rounded-lg overflow-hidden shadow-lg">
            <img src={imgs[4]} alt="gallery 5" loading="lazy" />
            <button
              className="expand-btn"
              aria-label="Open image 5"
              onClick={() => openModal(4)}
            >
              <ExpandIcon />
            </button>
          </div>

          {/* g-6 */}
          <div className="g-6 rounded-lg overflow-hidden shadow-lg">
            <img src={imgs[5]} alt="gallery 6" loading="lazy" />
            <button
              className="expand-btn"
              aria-label="Open image 6"
              onClick={() => openModal(5)}
            >
              <ExpandIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 px-4 sm:px-0">
        <hr className="border-gray-700" />
      </div>

      {/* LIGHTBOX */}
      {isOpen && (
        <div
          className="saif-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative max-w-[1100px] w-full max-h-[90vh] flex items-center justify-center">
            {/* Close */}
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-4 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 hidden md:block"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-4 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 hidden md:block"
            >
              ›
            </button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={imgs[current]}
                alt={`Large view ${current + 1}`}
                className="max-w-full max-h-[86vh] object-contain rounded-md shadow-2xl transform transition-all duration-300"
              />
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 bg-black/40 rounded-md text-white text-sm">
              {current + 1} / {imgs.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
