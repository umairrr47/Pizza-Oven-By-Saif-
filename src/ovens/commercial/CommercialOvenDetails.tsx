// src/sections/CommercialOvensSection.tsx
import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export type OvenItem = {
  id: string; // e.g. "/01"
  title: string;
  blurb: string;
};

const ITEMS: OvenItem[] = [
  {
    id: "/01",
    title: <>Revolving Semi-portable  <br /> Brick Oven</>,
    blurb:
      "The revolving semi-portable brick oven offers unparalleled output, effortless operation, and exceptional heat retention. By combining traditional brick dome construction with a modern revolving base, this oven consistently produces high-quality results in large quantities. With adequate equipment and man power this oven can be moved.",
  },
  {
    id: "/02",
    title: "Semi-portable Brick Oven",
    blurb:
      "The semi-portable brick oven offers a good output and exceptional heat retention. With traditional brick dome construction and brick base, this oven produces high-quality results in good quantities. With adequate equipment and man power this oven can be moved.",
  },
  {
    id: "/03",
    title: "Fixed Brick Oven",
    blurb:
      "The fixed brick oven offers a good output and exceptional heat retention. With traditional brick dome construction and brick base, this oven produces high-quality results in good quantities. Since this oven is fixed to the ground it has an authentic look and feel.",
  },
  {
    id: "/04",
    title: "Portable Oven",
    blurb:
      "The portable oven is compact, lightweight, robust and can be moved on a regular basis, it is cost effective, offers a decent output, heat retention and produces high-quality results.",
  },
  {
    id: "/05",
    title: "Large Steel Oven",
    blurb:
      "The large steel oven offers a decent output and heat retention. With thick stainless steel dome construction and brick base, this oven produces high-quality results in moderate quantities. The oven is compact and cost effective and can be easily moved.",
  },
];

const CommercialOvenDetails: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // compute prefersReducedMotion at runtime (SSR-safe)
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // don't run animations for reduced motion
    if (prefersReducedMotion) {
      gsap.set(".heading, .subtext, .oven-row", { opacity: 1, y: 0, filter: "none", x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // heading animation (fade + slide up)
      gsap.from(".heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".heading",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // paragraph animation
      gsap.from(".subtext", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".subtext",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // rows animation: slide-in from right, fade, and blur->sharp (per-row)
      gsap.utils.toArray(".oven-row").forEach((el: any) => {
        gsap.fromTo(
          el,
          { x: 60, opacity: 0, filter: "blur(3px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // add hover nudge for rows (mouseenter / leave)
      gsap.utils.toArray(".oven-row").forEach((el: any) => {
        const enter = () => gsap.to(el, { x: 6, duration: 0.25, ease: "power2.out" });
        const leave = () => gsap.to(el, { x: 0, duration: 0.35, ease: "power2.out" });
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        (el as any).__gsapListeners = { enter, leave };
      });
    }, sectionRef);

    return () => {
      // cleanup listeners + GSAP
      gsap.utils.toArray(".oven-row").forEach((el: any) => {
        const l = (el as any).__gsapListeners;
        if (l) {
          el.removeEventListener("mouseenter", l.enter);
          el.removeEventListener("mouseleave", l.leave);
        }
      });
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b0b0b] text-white flex justify-center"
      /* desktop exact size kept at lg+; mobile scales fluidly */
    >
      <div
        className="
          w-full
          max-w-[1351px]    /* ensures desktop max width */
          lg:w-[1351px] lg:min-h-[1427px]
          px-4 sm:px-6 md:px-8 lg:px-0
          py-10 md:py-12
          flex justify-center
        "
      >
        <div
          className="
            w-full
            max-w-[1145px]
            lg:w-[1145px] lg:min-h-[1427px]
            mx-auto
            flex flex-col justify-start
          "
        >
          {/* Heading Section */}
          <div className="mb-8 md:mb-12">
            <h2
              className="heading text-[clamp(28px,3.2vw,56px)] leading-[1.08] font-light tracking-[-0.005em] text-gray-100 mb-4"
              style={{
                fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif',
                wordSpacing: "-0.08em",
              }}
            >
              All About Commercial Wood Fired Pizza <br /> Oven – By Saif Ameer
            </h2>

            <p className="subtext text-[15px] sm:text-[16px] md:text-[18px] text-[#bcbcbc] leading-[1.6] md:leading-[1.7] tracking-[0.02em] mb-6">
              Experience the essence of Italian mastery with Saif’s commercial wood fired
              ovens - <br />
              engineered for culinary precision, endurance, and rich, authentic flavor.
              Perfect for <br /> gourmet kitchens and fine pizzerias, every oven unites
              heritage craftsmanship <br /> with modern innovation, redefining
              professional wood-fired excellence.
            </p>
          </div>

          {/* Oven List */}
          <div className="oven-list w-full space-y-8">
            {ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                className="oven-row border-t border-white/10 pt-8"
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <div className="grid grid-cols-12 items-start gap-4 md:gap-6">
                  {/* Number */}
                  <div className="col-span-12 md:col-span-2 flex md:justify-start">
                    <motion.span
                      className="italic text-[22px] sm:text-[24px] md:text-[26px] font-extralight tracking-wide text-[#ffffff]"
                      style={{
                        fontFamily: "NeueHaasGroteskDisp Pro, sans-serif",
                      }}
                      whileHover={{ color: "#e0e0e0", x: 3 }}
                    >
                      {item.id}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <div className="col-span-12 md:col-span-4 flex justify-start">
                    <motion.h3
                      className="text-[18px] md:text-[20px] lg:text-[22px] font-normal text-[#ffffff] tracking-[0.015em] mb-2 md:mb-0"
                      whileHover={{ color: "#E20A17" }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.title}
                    </motion.h3>
                  </div>

                  {/* Description */}
                  <div className="col-span-12 md:col-span-6">
                    <p className="text-[15px] md:text-[16px] text-[#bcbcbc] leading-[1.6] md:leading-[1.7] tracking-[0.02em] mb-6">
                      {item.blurb}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Border */}
          <div className="border-t border-white/10 mt-8" />
        </div>
      </div>
    </section>
  );
};

export default CommercialOvenDetails;
