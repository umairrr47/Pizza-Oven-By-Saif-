// CommercialOvenSection.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Benefit from "../../assets/benefitthumb.png";
import Usp1 from "../../assets/intro-usp-1.webp";
import Usp2 from "../../assets/intro-usp-2.webp";
import Usp3 from "../../assets/intro-usp-3.webp";
import Usp4 from "../../assets/intro-usp-4.webp";
import Usp5 from "../../assets/intro-usp-5.webp";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  title: string;
  subtitle?: string;
  imageSrc: string;
};

type Props = {
  heading?: React.ReactNode;
  description?: string;
  imageSrc?: string;
  features?: Feature[];
};

export default function ResidentialBenefit({
  heading = (
    <>
      Saif Ameer: The
      <br />
      Leading Residential Pizza
      <br />
      Oven Supplier in India
    </>
  ),
  description =
    "The Pizza Oven Co. by Saif is India’s leading destination for authentic Italian wood and gas ovens. Trusted by award-winning chefs and top-rated pizzerias across the country, our ovens deliver the same craftsmanship and performance found in Italy’s finest kitchens.",
  imageSrc = Benefit,
  features = [
    { title: "Authentic Italian Craftsmanship", subtitle: "Designed with traditional domes for even heat distribution and best cooking", imageSrc: Usp1 },
    { title: "On-Site Installation", subtitle: "Fully customized and installed by our expert team.", imageSrc: Usp2 },
    { title: "High Heat, Fast Cooking", subtitle: "Reaches 450°C in 30–60 min, ideal for Neapolitan pizza.", imageSrc: Usp3 },
    { title: "Heavy-Duty & Durable", subtitle: "Built for lifelong use in commercial kitchens.", imageSrc: Usp4 },
    { title: "Dual Fuel Options", subtitle: "Available in both wood-fired and gas-assisted models.", imageSrc: Usp5 },
  ],
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT column reveal (title, text, image) - staggered
      gsap.fromTo(
        leftRef.current?.children,
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

      // RIGHT column items - staggered individual reveal (replayable)
      const items = gsap.utils.toArray(".feature-item");
      items.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { x: 60, opacity: 0, filter: "blur(3px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power2.out",
            delay: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
              // markers: true,
            },
          }
        );
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

      // Optionally add a small hover nudge for items (keeps animation separate from scroll)
      gsap.utils.toArray(".feature-item").forEach((el) => {
        el.addEventListener("mouseenter", () => gsap.to(el, { x: 6, duration: 0.25, ease: "power2.out" }));
        el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, duration: 0.35, ease: "power2.out" }));
      });
    }, rootRef);

    return () => {
      ctx.revert();
      // remove event listeners (gsap.context revert handles animations, but ensure listeners removed)
      gsap.utils.toArray(".feature-item").forEach((el) => {
        el.removeEventListener && el.removeEventListener("mouseenter", () => {});
        el.removeEventListener && el.removeEventListener("mouseleave", () => {});
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
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 overflow-hidden bg-white">
                <img src={f.imageSrc} alt={f.title} className="w-8 h-8 object-contain" />
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
