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
    title: "The Portable Oven",
    blurb:
      "The portable oven is compact, lightweight, robust and can be moved on a regular basis, it is cost effective, offers a good output, heat retention and produces high-quality results.",
  },
  {
    id: "/02",
    title: "Large Steel Oven",
    blurb:
      "The large steel oven offers a good performance and heat retention, it run with wood, gas or hybrid. This oven feature a thick stainless steel dome and brick base and is compact and cost effective.",
  },
  {
    id: "/03",
    title: "Medium Steel Oven",
    blurb:
      "The medium steel oven offers a good performance and heat retention, it run with wood, gas or hybrid. This oven feature a thick stainless steel dome and brick base and is compact and cost effective.",
  },
  {
    id: "/04",
    title: "Small Steel Oven",
    blurb:
      "The small steel oven offers a decent output and good heat retention. It’s an outdoor oven but can run indoor with ventilation. This oven feature a thick stainless steel dome and brick base and it produces high-quality pizza. It’s a gas oven but can run hybrid too with small quantities of wood, the oven is very compact and very cost effective and can be Easily moved.",
  },
  
];

const PortableOvenDetails: React.FC = () => {
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
          lg:w-[1351px] lg:min-h-[1227px]
          px-4 sm:px-6 md:px-8 lg:px-0
          py-10 md:py-12
          flex justify-center
        "
      >
        <div
          className="
            w-full
            max-w-[1145px]
            lg:w-[1145px] lg:min-h-[1027px]
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
              All About Portable Wood Fired Pizza <br /> Oven – By Saif Ameer
            </h2>

            <p className="subtext text-[15px] sm:text-[16px] md:text-[18px] text-[#bcbcbc] leading-[1.6] md:leading-[1.7] tracking-[0.02em] mb-6">
              Experience high-precision Indian craftsmanship with Saif’s portable wood-fired pizza <br /> ovens - thoughtfully engineered for powerful performance, long-lasting durability,<br /> and deep, authentic flavor. Perfect for caterers, food trucks, and chefs who <br /> need mobility with professional quality, each oven blends traditional techniques <br /> with modern technology to deliver consistently exceptional results.
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

export default PortableOvenDetails;
