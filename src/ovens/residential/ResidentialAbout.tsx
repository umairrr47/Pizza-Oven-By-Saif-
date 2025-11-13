// src/sections/CommercialCostSection.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  className?: string;
};

export default function ResidentialAbout({ className = "" }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const featuresUlRef = useRef<HTMLUListElement | null>(null);
  const ovenTypesRef = useRef<HTMLDivElement | null>(null);
  const formBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // LEFT column reveal (heading + paragraph) - staggered
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.querySelectorAll("h2, p, .mt-4"),
          { y: 36, opacity: 0 },
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
            },
          }
        );
      }

      // FEATURES LIST ITEMS - staggered reveal with blur -> sharp
      if (featuresUlRef.current) {
        const listItems = gsap.utils.toArray(featuresUlRef.current.children);
        listItems.forEach((el: any, idx: number) => {
          gsap.fromTo(
            el,
            { x: 40, opacity: 0, filter: "blur(3px)" },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Hover nudge
          el.addEventListener("mouseenter", () => gsap.to(el, { x: 6, duration: 0.22, ease: "power2.out" }));
          el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, duration: 0.28, ease: "power2.out" }));
        });
      }

      // OVEN TYPES block - soft reveal
      if (ovenTypesRef.current) {
        gsap.fromTo(
          ovenTypesRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ovenTypesRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // RIGHT sticky form reveal
      if (formBoxRef.current) {
        gsap.fromTo(
          formBoxRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formBoxRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, rootRef);

    return () => {
      // revert gsap context (kills animations registered inside)
      ctx.revert();
      // kill outstanding ScrollTriggers
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className={`commercial-about-section commercial-cost-section bg-white ${className}`}>
      <div className="max-w-[1920px] mx-auto bg-[#0b0b0b] com-padding rounded-section px-6 sm:px-12">
        {/* Narrower content container + left/right padding + vertical spacing for direct children */}
        <div className="mx-auto px-4 sm:px-12 mx-2 max-w-[1100px]">
          {/* mimic the original flex-box justify-between relative text-white */}
          <div className="flex flex-wrap lg:flex-nowrap justify-between relative text-white py-12 gap-8">
            {/* LEFT: approx 65% / full-width on small screens */}
            <div ref={leftRef} className="w-full lg:w-[65%] pr-0 lg:pr-2 space-y-10">
              {/* Section heading with reveal */}
              <div className="section-heading overflow-hidden">
                <h2
                  className="text-[clamp(30px,3.2vw,56px)] leading-[1.08] font-light tracking-[-0.005em] text-gray-100 mb-4"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif', wordSpacing: "-0.08em" }}
                >
                  Cost of Residential Wood-Fired
                  <br /> The Pizza Oven by Saif
                </h2>

                <div className="mt-3">
                  <p className="text-[16px] md:text-[17px] text-gray-300 leading-[1.6] tracking-[0.02em] max-w-[780px]">
                    Investing in a Saif Pizza oven means choosing performance, authenticity, durability <br /> and guidance with peace of mind.
                  </p>
                </div>
              </div>

              {/* Features list: similar spacing and icons */}
              <ul
                ref={featuresUlRef}
                className="mt-8 flex flex-wrap gap-6 text-sm text-[16px] md:text-[17px] text-gray-300 leading-[1.6] tracking-[0.02em] list-none"
              >
                {["After-Sales Support", "Warranty", "On-Time Delivery", "Pan-India Presence"].map((text) => (
                  <li key={text} className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="11" stroke="#e11d2b" strokeWidth="1.6" />
                      <path d="M7 12.5l2.5 2.5L17 8.5" stroke="#e11d2b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              {/* horizontal divider */}
              <div className="my-6 border-t border-gray-600/30" />

              {/* Oven types block - reveal */}
              <div ref={ovenTypesRef} className="oven-types mt-8 space-y-6 text-gray-300">
                <article>
                  <h4
                    className="text-[clamp(20px,2vw,28px)] font-normal text-[#FFFFFF] tracking-[0.015em] mb-2"
                    style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                  >
                    ⭐ Searching for an affordable medium or small steel pizza oven?
                  </h4>
                  <p className="text-[16px] md:text-[17px] text-gray-300 leading-[1.6] tracking-[0.02em]">
                   Saif Ovens provides budget-friendly options crafted to suit every requirement.
                   Pricing depends on the model and level of customization.
                   Simply fill out our enquiry form to receive the full catalogue and detailed quotations tailored to your needs.
                  </p>
                </article>

                <div className="border-t border-gray-600/20 my-4" />

                
              </div>
            </div>

            {/* RIGHT: sticky enquiry card - approx 25% width on lg */}
            <div className="w-full lg:w-[32%] mt-8 lg:mt-0">
              <div className="relative">
                <div ref={formBoxRef} className="form-box dark-bg-form sticky top-8">
                  <div className="bg-[#292929] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
                    <h5 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-100 tracking-[0.025em] mb-2">We’re Here to Help</h5>

                    <form action="#" method="post" className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <input
                          name="full-name"
                          placeholder="Your Full Name"
                          required
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm outline-none placeholder-gray-500 text-gray-200"
                        />
                      </div>

                      <div>
                        <input
                          name="phone-number"
                          placeholder="Mobile Number"
                          required
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm outline-none placeholder-gray-500 text-gray-200"
                        />
                      </div>

                      <div>
                        <input
                          name="email-address"
                          placeholder="Email Address"
                          required
                          type="email"
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm outline-none placeholder-gray-500 text-gray-200"
                        />
                      </div>

                      <div>
                        <textarea
                          name="message"
                          placeholder="Message"
                          rows={3}
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm outline-none placeholder-gray-500 text-gray-200 resize-none"
                        />
                      </div>

                      {/* hidden fields (keeps markup parity with original) */}
                      <input type="hidden" name="company" />
                      <input type="hidden" name="page-link" />

                      <div className="pt-2">
                        <button type="submit" className="w-full py-3 rounded-full bg-[#e30715] text-white font-medium">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
