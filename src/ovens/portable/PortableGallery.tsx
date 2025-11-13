// src/sections/CommercialGallery.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Gal1 from "../../assets/gal1.jpg";
import Gal2 from "../../assets/gal2.jfif";
import Gal3 from "../../assets/gal3.jfif";
import Gal4 from "../../assets/gal4.jfif";

type Props = {
  heading?: React.ReactNode;
  subcopy?: React.ReactNode;
  images?: { src: string; alt?: string }[];
  autoplayInterval?: number; // ms
};

const BASE_IMG_W = 717; // desktop base
const BASE_IMG_H = 499;
const GAP = 24;
const CONTAINER_W_DESKTOP = 1351;
const CONTAINER_H_DESKTOP = 720; // base container height (desktop)
const LEFT_PADDING_DESKTOP = 104;

const TRANSITION_DURATION = 0.7; // seconds

export default function CommercialGallery({
  heading = <>Portable Pizza Oven Image Gallery</>,
  subcopy = (
    <>
      Take a visual tour of our installations — from rustic rooftops to bustling
      portable <br /> kitchens — across India.
    </>
  ),
  images = [
    { src: Gal1, alt: "Oven installation 1" },
    { src: Gal2, alt: "Oven installation 2" },
    { src: Gal3, alt: "Oven installation 3" },
    { src: Gal4, alt: "Oven installation 4" },
  ],
  autoplayInterval = 3500,
}: Props) {
  // extended images for seamless looping
  const extendedImages = useMemo(() => {
    if (!images || images.length === 0) return images || [];
    const first = images[0];
    const last = images[images.length - 1];
    return [last, ...images, first];
  }, [images]);

  // Responsive dimensions
  const [imgW, setImgW] = useState(BASE_IMG_W);
  const [imgH, setImgH] = useState(BASE_IMG_H);
  const [containerW, setContainerW] = useState(CONTAINER_W_DESKTOP);
  const [containerH, setContainerH] = useState(CONTAINER_H_DESKTOP);
  const [leftPadding, setLeftPadding] = useState(LEFT_PADDING_DESKTOP);
  const [headerPaddingTop, setHeaderPaddingTop] = useState(56);
  const [carouselMarginTop, setCarouselMarginTop] = useState(12);

  // NEW: extra bottom spacing under the image row (responsive)
  const [extraBottom, setExtraBottom] = useState<number>(80); // default desktop

  // update responsive sizes on mount + resize
  useEffect(() => {
    function updateSizes() {
      const vw = window.innerWidth;
      // container width: at most desktop width, otherwise use viewport minus small padding
      const cW = Math.min(CONTAINER_W_DESKTOP, Math.max(320, vw - 24));
      setContainerW(cW);

      // container height: responsive to fit content better
      const cH = vw < 640 ? 550 : CONTAINER_H_DESKTOP; // 550 for mobile, 720 for desktop/tablet
      setContainerH(cH);

      // left padding scale down on small screens
      const lp =
        vw < 640
          ? Math.round(LEFT_PADDING_DESKTOP * 0.35)
          : vw < 1024
          ? Math.round(LEFT_PADDING_DESKTOP * 0.6)
          : LEFT_PADDING_DESKTOP;
      setLeftPadding(lp);

      // header padding top: less on mobile for tighter spacing
      const hpt = vw < 640 ? 32 : 56;
      setHeaderPaddingTop(hpt);

      // carousel margin top: none on mobile to reduce space
      const cmt = vw < 640 ? 0 : 12;
      setCarouselMarginTop(cmt);

      // choose image size tiers
      if (vw < 480) {
        setImgW(Math.round(BASE_IMG_W * 0.45)); // ~322
        setImgH(Math.round(BASE_IMG_H * 0.45));
      } else if (vw < 1024) {
        setImgW(Math.round(BASE_IMG_W * 0.67)); // ~480
        setImgH(Math.round(BASE_IMG_H * 0.67));
      } else {
        setImgW(BASE_IMG_W);
        setImgH(BASE_IMG_H);
      }

      // update extra bottom space responsively
      if (vw < 480) setExtraBottom(32); // mobile
      else if (vw < 1024) setExtraBottom(56); // tablet
      else setExtraBottom(80); // desktop
    }

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // defensive fallback
  if (!extendedImages || extendedImages.length < 3) {
    return (
      <section className="bg-white text-neutral-900 mx-auto" aria-label="Commercial gallery">
        <div style={{ width: `${containerW}px`, height: `${containerH + extraBottom}px` }} className="mx-auto relative">
          {/* Divider still at top:0 even in fallback */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1111, height: 1, background: "rgba(148,163,184,0.35)" }} className="hidden sm:block" />
          <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "rgba(148,163,184,0.25)" }} className="block sm:hidden" />

          <div className="mx-auto px-6 lg:px-8 pt-14" style={{ maxWidth: "1175px", minHeight: 120 }}>
            <header className="mb-6">
              <h2 className="text-[clamp(22px,3.2vw,36px)] font-normal leading-tight mb-4">{heading}</h2>
              <p className="text-sm md:text-base text-gray-600 max-w-[900px]">{subcopy}</p>
            </header>
          </div>
          <div className="flex items-center justify-center h-[613px] mt-8">
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
      </section>
    );
  }

  // carousel state + refs
  const [position, setPosition] = useState<number>(1); // index into extendedImages
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const autoplayRef = useRef<number | null>(null);
  const pendingResetRef = useRef<"toStart" | "toEnd" | null>(null);

  // recompute derived sizes based on responsive image width
  const step = imgW + GAP;
  const totalRowWidthPx = (imgW + GAP) * extendedImages.length - GAP;
  const viewportWidth = Math.max(280, Math.min(containerW - leftPadding, containerW)); // ensure positive

  // Ensure position valid when extendedImages changes
  useEffect(() => {
    const min = 0;
    const max = extendedImages.length - 1;
    if (position < min || position > max) {
      setIsAnimating(false);
      setPosition(1);
      setTimeout(() => setIsAnimating(true), 0);
    }
  }, [extendedImages.length]); // eslint-disable-line

  // autoplay interval
  useEffect(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    autoplayRef.current = window.setInterval(() => {
      setIsAnimating(true);
      setPosition((p) => p + 1);
    }, autoplayInterval);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [autoplayInterval]);

  // mark pending reset when clones reached
  useEffect(() => {
    const lastIndex = extendedImages.length - 1;
    if (position === lastIndex) {
      pendingResetRef.current = "toStart";
      setIsAnimating(true);
    } else if (position === 0) {
      pendingResetRef.current = "toEnd";
      setIsAnimating(true);
    } else {
      pendingResetRef.current = null;
      setIsAnimating(true);
    }
  }, [position, extendedImages.length]);

  // translate calc (numeric px)
  const translateX = useMemo(() => -(position * step), [position, step]);

  // transition choice
  const motionTransition = isAnimating ? { duration: TRANSITION_DURATION, ease: "linear" as const } : { duration: 0 };

  // on animation complete -> handle clone resets without timeouts
  const handleAnimComplete = () => {
    if (!pendingResetRef.current) return;
    const lastIndex = extendedImages.length - 1;
    if (pendingResetRef.current === "toStart") {
      setIsAnimating(false);
      setPosition(1);
    } else if (pendingResetRef.current === "toEnd") {
      setIsAnimating(false);
      setPosition(lastIndex - 1);
    }
    pendingResetRef.current = null;
  };

  // clamp position if external set tries to go out-of-range
  useEffect(() => {
    const min = 0;
    const max = extendedImages.length - 1;
    if (position < min) setPosition(min);
    if (position > max) setPosition(max);
  }, [position, extendedImages.length]);

  return (
    <section className="bg-white text-neutral-900 mx-auto" aria-label="Commercial gallery">
      {/* main container height increased by extraBottom to give visible space under images */}
      <div className="mx-auto relative" style={{ width: `${containerW}px`, height: `${containerH + extraBottom}px` }}>
        {/* TOP: absolute divider line centered (1111px on sm+), and full-width thin on small */}
        <div
          className="hidden sm:block"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1111px",
            height: 1,
            background: "rgba(148,163,184,0.35)",
            zIndex: 10,
          }}
        />
        <div
          className="block sm:hidden"
          style={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 1,
            background: "rgba(148,163,184,0.25)",
            zIndex: 10,
          }}
        />

        {/* Header area with responsive top spacing for more margin from divider */}
        <div className="mx-auto px-6 lg:px-8" style={{ maxWidth: "1175px", paddingTop: headerPaddingTop, minHeight: 120 }}>
          <header className="mb-6 md:mb-8">
            <h2
              className="heading text-[clamp(28px,3.2vw,56px)] leading-[1.08] font-light tracking-[-0.005em] text-gray-950 mb-6"
              style={{
                fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif',
                wordSpacing: "-0.08em",
              }}
            >
              {heading}
            </h2>
            <p className="subtext text-[15px] sm:text-[16px] md:text-[18px] text-[#6e6c6c] leading-[1.6] md:leading-[1.7] tracking-[0.02em] mb-8">
              {subcopy}
            </p>
          </header>
        </div>

        {/* Carousel viewport - responsive margin-top to reduce space on mobile
            NOTE: paddingBottom supplies extra bottom gap */}
        <div
          className="relative overflow-hidden"
          style={{
            width: `${viewportWidth}px`,
            // height = image height + small buffer; paddingBottom supplies extra bottom gap
            height: `${imgH + 20}px`,
            marginLeft: `${leftPadding}px`,
            marginTop: carouselMarginTop,
            paddingBottom: `${extraBottom}px`,
          }}
        >
          <motion.div
            initial={false}
            className="flex items-center"
            style={{
              width: `${totalRowWidthPx}px`,
              gap: `${GAP}px`,
              willChange: "transform",
              transform: "translateZ(0)",
            }}
            animate={{ x: translateX }}
            transition={motionTransition}
            onAnimationComplete={handleAnimComplete}
          >
            {extendedImages.map((img, idx) => {
              const isActive = idx === position;
              return (
                <div
                  key={idx}
                  className="flex-shrink-0"
                  style={{
                    width: `${imgW}px`,
                    height: `${imgH}px`,
                    perspective: 1200,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.figure
                      layout
                      initial={false}
                      animate={
                        isActive
                          ? { rotateY: [90, -10, 0], opacity: 1, scale: 1 }
                          : { rotateY: 0, opacity: 0.9, scale: 0.98 }
                      }
                      exit={{ opacity: 0.6 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-full h-full rounded-[18px] overflow-hidden bg-white shadow-sm"
                      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={imgW}
                        height={imgH}
                        className="w-full h-full object-cover block"
                        style={{ backfaceVisibility: "hidden", display: "block" }}
                      />
                    </motion.figure>
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
