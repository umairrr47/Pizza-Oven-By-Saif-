import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* =========================
   INLINE SVG ICONS
   ========================= */

type IconProps = { className?: string };

const ConsultationIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="#e30613"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Head */}
    <circle cx="50" cy="22" r="15" />
    {/* Body */}
    <path d="M 22 50 C 22 40 78 40 78 50 V 85 H 22 V 50 Z" />
    {/* Star inside body */}
    <path d="M 50 60 L 55 70 H 66 L 57 77 L 60 88 L 50 81 L 40 88 L 43 77 L 34 70 H 45 Z" />
  </svg>
);

const SpeedIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="#e30613"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Speed Lines on the left */}
    <path d="M 10 30 H 35" />
    <path d="M 10 50 H 25" />
    <path d="M 10 70 H 35" />
    <path d="M 10 90 H 25" />
    {/* Lightning Bolt */}
    <path d="M 85 10 L 50 50 H 70 L 40 90 L 55 50 H 35 L 70 10 Z" />
  </svg>
);

const TrophyIcon: React.FC<IconProps> = ({ className }) => (
 <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="#e30613"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Ground line */}
    <path d="M 5 95 H 95" />
    {/* Tiered base */}
    <path d="M 30 95 V 85 H 70 V 95" />
    <path d="M 38 85 V 75 H 62 V 85" />
    <path d="M 44 75 V 68 H 56 V 75" />
    {/* Pillar/Stem */}
    <path d="M 50 68 V 45" />
    {/* Star */}
    <path d="M 50 8 L 59 26 H 79 L 63 38 L 69 58 L 50 46 L 31 58 L 37 38 L 21 26 H 41 Z" />
  </svg>
);

const ToolsIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="#e30613"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* 1. The Pencil (Top-Left to Bottom-Right) */}
    {/* Pencil Body */}
    <path d="M 28 34 L 70 76 M 38 24 L 80 66" /> 
    {/* Pencil Tip (The Cone) */}
    <path d="M 38 24 L 15 15 L 28 34" />
    {/* Lead Tip Detail */}
    <path d="M 23 20 L 30 27" />
    {/* Pencil End (Eraser/Flat end) */}
    <path d="M 70 76 L 80 66" />

    {/* 2. The Wrench (Bottom-Left to Top-Right) */}
    {/* Wrench Shaft (Centered crossing the pencil) */}
    <path d="M 35 65 L 65 35" strokeWidth="7" />
    
    {/* Bottom-Left Wrench Head */}
    <path d="M 22 62 A 15 15 0 1 0 38 78" /> {/* Circular outer part */}
    <path d="M 22 62 L 30 70 M 38 78 L 30 70" /> {/* Inner "C" opening */}

    {/* Top-Right Wrench Head */}
    <path d="M 62 22 A 15 15 0 1 1 78 38" /> {/* Circular outer part */}
    <path d="M 62 22 L 70 30 M 78 38 L 70 30" /> {/* Inner "C" opening */}
  </svg>
);

/* =========================
   GSAP SETUP
   ========================= */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-item",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".feature-icon",
        { rotation: -10, scale: 0, opacity: 0 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".text-reveal",
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".border-animate",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0b0b0b] text-white py-14 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <div ref={featuresRef} className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-10">

          <Feature
            icon={<ConsultationIcon className="feature-icon w-10 h-10 text-[#7d402d]" />}
            title="Expert Site Consultation by Saif Himself"
            desc="Get direct guidance ensuring your oven setup is optimized for performance, safety, and space."
          />

          <Feature
            icon={<SpeedIcon className="feature-icon w-10 h-10 text-[#7d402d]" />}
            title="Fast, Reliable Pan-India Support"
            desc="Wherever you are in India, our team assists with delivery, installation, and maintenance."
          />

          <Feature
            icon={<TrophyIcon className="feature-icon w-10 h-10 text-[#7d402d]" />}
            title="Lifetime-Performance Ovens"
            desc="Built with premium materials and expert craftsmanship for long-term reliability."
          />

          <Feature
            icon={<ToolsIcon className="feature-icon w-10 h-10 text-[#7d402d]" />}
            title="Tailored Designs to Fit Your Kitchen"
            desc="Every detail customized to suit your kitchen’s look and culinary vision."
          />

        </div>

        <div ref={textRef} className="space-y-6 text-[#BCBCBC]">
          <p className="text-reveal text-lg">
            Indian precision craftsmanship engineered for performance, durability, and authentic wood-fired flavor.
          </p>
          <p className="text-reveal text-base">
            Designed for professional kitchens, cafés, and high-volume pizzerias across India.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================
   FEATURE ITEM
   ========================= */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="feature-item flex gap-5 pt-4">
      <div className="mt-6">{icon}</div>
      <div className="relative flex-1 pt-4">
        <div className="border-animate absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gray-500 to-gray-700" />
        <h3 className="text-reveal text-xl text-gray-100 pt-3">{title}</h3>
        <p className="text-reveal text-[#BCBCBC] leading-7 mt-2">{desc}</p>
      </div>
    </div>
  );
}
