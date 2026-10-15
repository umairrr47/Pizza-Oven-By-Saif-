// CommercialOvenSection.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Benefit from "../../assets/benefitthumb.png";

type IconProps = React.SVGProps<SVGSVGElement>;
// import Usp1 from "../../assets/intro-usp-1.webp";
// import Usp2 from "../../assets/intro-usp-2.webp";
// import Usp3 from "../../assets/intro-usp-3.webp";
// import Usp4 from "../../assets/intro-usp-4.webp";
// import Usp5 from "../../assets/intro-usp-5.webp";

const CraftMan: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M50 15 
             Q 58 15 62 20 Q 70 20 73 25
             Q 80 28 82 35 Q 90 40 88 50
             Q 90 60 82 65 Q 80 72 73 75
             Q 70 80 62 80 Q 58 85 50 85
             Q 42 85 38 80 Q 30 80 27 75
             Q 20 72 18 65 Q 10 60 12 50
             Q 10 40 18 35 Q 20 28 27 25
             Q 30 20 38 20 Q 42 15 50 15 Z" />
    {/* Inner Circle */}
    <circle cx="50" cy="50" r="22" />
    {/* Checkmark */}
    <path d="M40 50 L 48 58 L 60 42" />
    {/* Ribbon Tails */}
    <path d="M35 82 L 35 95 L 50 85 L 65 95 L 65 82" />
  </svg>
);

const OnSite: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M30 70 L 60 40" />
    {/* Wrench Head */}
    <path d="M 60 40 L 65 35 A 10 10 0 0 1 80 40 L 75 45" /> 
    <path d="M 60 40 L 65 45 A 10 10 0 0 0 80 40" />
    {/* Wrench Handle bottom */}
    <path d="M 30 70 L 25 75 A 3 3 0 0 0 30 80 L 35 75 L 30 70" />

    {/* Screwdriver/Tool (Diagonal Right-Bottom to Left-Top) */}
    {/* Handle */}
    <path d="M 70 70 L 65 75 L 80 90 L 90 80 L 75 65 L 70 70" />
    {/* Shaft */}
    <path d="M 70 70 L 40 40" />
    {/* Tip */}
    <path d="M 40 40 L 30 30 L 35 25 L 45 35 L 40 40" />
    <path d="M 30 30 L 20 20" strokeOpacity="0.5" strokeDasharray="2 2"/> {/* Action line/spark */}
  </svg>
);

const HighHeat: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="60" cy="60" r="30" />
    {/* Top Button/Stem */}
    <path d="M55 25 V 15" />
    <path d="M48 15 H 62" />
    {/* Diagonal Button */}
    <path d="M78 32 L 85 25" />
    <path d="M83 23 L 87 27" /> {/* Button head */}
    {/* Hands */}
    <path d="M55 55 L 55 40" />
    <path d="M55 55 L 70 55" />
    {/* Speed Lines on the left */}
    <path d="M10 65 H 25" />
    <path d="M5 75 H 35" />
    <path d="M15 85 H 30" />
  </svg>
);

const HeavyDuty: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Back bookmark */}
    <path d="M 40 10 H 80 V 70 L 60 60 L 40 70 V 10" opacity="0.4" />
    {/* Front bookmark */}
    <path
      d="M 20 20 H 60 V 90 L 40 80 L 20 90 V 20"
      fill="currentColor"
      stroke="none"
      opacity="0.05"
    />
    <path d="M 20 20 H 60 V 90 L 40 80 L 20 90 V 20" />
    {/* Checkmark */}
    <path d="M 32 45 L 38 52 L 50 38" />
  </svg>
);

const DualFuel: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M50 25 Q 65 55 65 65 A 15 15 0 0 1 35 65 Q 35 55 50 25 Z" />
    <path d="M45 60 Q 45 68 52 68" opacity="0.5" /> {/* Droplet highlight */}
    
    {/* Circular Arrows */}
    {/* Top Right Arrow */}
    <path d="M55 15 A 40 40 0 0 1 85 40" />
    <path d="M85 40 L 80 32 M 85 40 L 90 32" /> {/* Arrowhead */}
    
    {/* Bottom Arrow */}
    <path d="M85 60 A 40 40 0 0 1 50 90" />
    <path d="M50 90 L 58 90 L 55 82" opacity="0"/> {/* Spacer */}
    <path d="M50 90 L 58 85 M 50 90 L 58 95" /> {/* Arrowhead */}

    {/* Top Left Arrow */}
    <path d="M35 85 A 40 40 0 0 1 15 40" />
    <path d="M15 40 L 10 48 M 15 40 L 20 48" /> {/* Arrowhead */}
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  Icon?: React.FC<IconProps>;
};

type Props = {
  heading?: React.ReactNode;
  description?: string;
  imageSrc?: string;
  features?: Feature[];
};

export default function BenefitSection({
  heading = (
    <>
      Saif Ameer: The
      <br />
      Leading Commercial Pizza
      <br />
      Oven Supplier in India
    </>
  ),
  description =
  "The Pizza Oven Co. by Saif is India’s leading destination for authentic Italian wood and gas ovens. Trusted by award-winning chefs and top-rated pizzerias across the country, our ovens deliver the same craftsmanship and performance found in Italy’s finest kitchens.",
  imageSrc = Benefit,
  features = [
    {
      title: "Authentic Italian Craftsmanship",
      subtitle: "Designed with traditional domes for even heat distribution and best cooking",
      Icon: CraftMan,
    },
    {
      title: "On-Site Installation",
      subtitle: "Fully customized and installed by our expert team.",
      Icon: OnSite,
    },
    {
      title: "High Heat, Fast Cooking",
      subtitle: "Reaches 450°C in 30–60 min, ideal for Neapolitan pizza.",
      Icon: HighHeat,
    },
    {
      title: "Heavy-Duty & Durable",
      subtitle: "Built for lifelong use in commercial kitchens.",
      Icon: HeavyDuty,
    },
    {
      title: "Dual Fuel Options",
      subtitle: "Available in both wood-fired and gas-assisted models.",
      Icon: DualFuel,
    },
  ],
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // shared handlers so we can remove them in cleanup
    const handleEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { x: 6, duration: 0.25, ease: "power2.out" });
    };

    const handleLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { x: 0, duration: 0.35, ease: "power2.out" });
    };

    const ctx = gsap.context(() => {
      // LEFT column reveal
      if (leftRef.current) {
        const leftChildren = Array.from(leftRef.current.children); // HTMLCollection -> array

        gsap.fromTo(
          leftChildren,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              // markers: true,
            },
          }
        );
      }

      // RIGHT column items
      const items = gsap.utils.toArray<HTMLElement>(".feature-item"); // <- typed

      items.forEach((el) => {
        gsap.fromTo(
          el,
          { x: 60, opacity: 0, filter: "blur(3px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
              // markers: true,
            },
          }
        );

        // hover nudge
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });

      // Parallax & subtle scale for the left image: uses ScrollTrigger scrub so it moves smoothly with scroll
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -6, // subtle upward parallax movement
          scale: 1.03, // tiny scale up for premium feel
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom", // when top of image hits bottom of viewport
            end: "bottom top", // until bottom of image hits top of viewport
            scrub: 0.8, // smooth follow (0.8 seconds)
            // markers: true,
          },
        });
      }

    }, rootRef);

    return () => {
      ctx.revert();
      const items = gsap.utils.toArray<HTMLElement>(".feature-item");
      items.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });

      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="w-screen min-h-screen bg-off-white flex justify-center items-center overflow-hidden">
      <div className="max-w-7xl w-full px-6 md:px-10 lg:px-16 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN */}
        <div ref={leftRef} className="space-y-8 left-col">
          <h2
            className="text-[clamp(30px,3.2vw,56px)] leading-[1.1] font-light tracking-[0.03em] text-gray-950 mb-4"
            style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
          >
            {heading}
          </h2>

          <p className="text-[16px] md:text-[18px] text-[#575757] leading-[1.7] tracking-[0.02em] mb-6">
            {description}
          </p>

          <div className="mt-4">
            {/* Wrap image in a ref container used for parallax */}
            <div ref={imageRef} className="overflow-hidden rounded-2xl shadow-lg max-w-[520px]">
              <img src={imageSrc} alt="Pizza chef" className="w-full h-auto object-cover block" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - features list */}
        <div ref={rightRef} className="space-y-8">
          {features.map((f, i) => (
            <div key={i} className="feature-item flex items-center gap-5 border-t border-gray-300 pt-6">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center overflow-hidden ">
                {f.Icon ? (
                  <f.Icon className="w-8 h-8 text-[#e31814]" />
                ) : f.imageSrc ? (
                  <img src={f.imageSrc} alt={f.title} className="w-8 h-8 object-contain" />
                ) : null}
              </div>


              <div className="flex flex-col justify-center">
                <h3
                  className="text-[clamp(20px,2vw,28px)] font-normal text-gray-950 tracking-[0.015em]"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                >
                  {f.title}
                </h3>
                {f.subtitle && (
                  <p className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
                    {f.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
Notes / Tweak points:
- For a stronger parallax, increase yPercent (e.g., -10) or scale (e.g., 1.06).
- To start animations earlier/later: adjust ScrollTrigger.start (e.g., "top 90%" -> "top 80%").
- Toggle actions currently: play ... reverse (so animations replay when scrolling back). Change to "play none none none" if you want one-time play.
- If you want markers for debugging, uncomment the markers: true lines.
- Make sure to `npm i gsap` and import this file where required.
*/
