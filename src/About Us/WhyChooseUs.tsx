// AboutFeatures.tsx
import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import icon1 from "../assets/about-gallery-usp-1.webp";
import icon2 from "../assets/about-gallery-usp-2.webp";
import icon3 from "../assets/about-gallery-usp-3.webp";
import icon4 from "../assets/about-gallery-usp-4.webp";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate features with stagger effect
      gsap.fromTo(".feature-item", 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9
        },
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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate icons with rotation and scale
      gsap.fromTo(".feature-icon", 
        { 
          rotation: -10,
          scale: 0,
          opacity: 0
        },
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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Text reveal animation with clipping
      gsap.fromTo(".text-reveal", 
        { 
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          opacity: 0
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Border animation for features
      gsap.fromTo(".border-animate", 
        { 
          scaleX: 0,
          transformOrigin: "left center"
        },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0b0b0b] text-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Features grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 mb-10">
          {/* Feature 1 */}
          <div className="feature-item flex items-start gap-5 pt-4">
            <div className="flex-none mt-6">
              <img 
                src={icon1} 
                alt="icon 1" 
                className="feature-icon w-10 h-10 object-contain" 
              />
            </div>

            <div className="flex-1 pt-4 relative">
              <div className="border-animate absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gray-400 to-gray-600" />
              <h3 className="text-reveal text-[clamp(20px,2vw,24px)] font-normal text-gray-100 mb-2 pt-3"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                Expert Site Consultation by Saif Himself
              </h3>
              <p className="text-reveal text-[16px] md:text-[18px] text-[#BCBCBC] tracking-[0.02em] py-2 leading-7">
                Get direct guidance from The Pizza Ovens By <br /> Saif, ensuring your oven setup is optimized <br />for performance, safety, and space.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-item flex items-start gap-5 pt-4">
            <div className="flex-none mt-6">
              <img 
                src={icon2} 
                alt="icon 2" 
                className="feature-icon w-10 h-10 object-contain" 
              />
            </div>

            <div className="flex-1 pt-4 relative">
              <div className="border-animate absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gray-400 to-gray-600" />
              <h3 className="text-reveal text-[clamp(20px,2vw,24px)] font-normal text-gray-100 mb-2 pt-3"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                Fast, Reliable Pan-India Support
              </h3>
              <p className="text-reveal text-[16px] md:text-[18px] text-[#BCBCBC] tracking-[0.02em] py-2 leading-7">
                Wherever you are in India, our team is ready to assist you with timely delivery, installation, and maintenance.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-item flex items-start gap-5 pt-4">
            <div className="flex-none mt-6">
              <img 
                src={icon3} 
                alt="icon 3" 
                className="feature-icon w-10 h-10 object-contain" 
              />
            </div>

            <div className="flex-1 pt-4 pb-8 ml-1 relative">
              <div className="border-animate absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gray-400 to-gray-600" />
              <div className="border-animate absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gray-400 to-gray-600" />
              <h3 className="text-reveal text-[clamp(20px,2vw,24px)] font-normal text-gray-100 mb-2 pt-3"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                Lifetime-Performance Ovens
              </h3>
              <p className="text-reveal text-[16px] md:text-[18px] text-[#BCBCBC] tracking-[0.02em] py-2 leading-7">
                Each oven is built with premium materials and expert craftsmanship—designed to deliver exceptional cooking for years to come.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-item flex items-start gap-5 pt-4">
            <div className="flex-none mt-6">
              <img 
                src={icon4} 
                alt="icon 4" 
                className="feature-icon w-10 h-10 object-contain" 
              />
            </div>

            <div className="flex-1 pt-4 pb-8 ml-1 relative">
              <div className="border-animate absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gray-400 to-gray-600" />
              <div className="border-animate absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gray-400 to-gray-600" />
              <h3 className="text-reveal text-[clamp(20px,2vw,24px)] font-normal text-gray-100 mb-2 pt-3"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                Tailored Designs to Fit Your Kitchen
              </h3>
              <p className="text-reveal text-[16px] md:text-[18px] text-[#BCBCBC] tracking-[0.02em] py-2 leading-7">
                From dome shape to exterior finish, every detail is customized to suit your kitchen's look and your culinary vision.
              </p>
            </div>
          </div>
        </div>

        {/* Long descriptive paragraphs */}
        <div ref={textRef} className="space-y-6 text-[#BDBDBD]">
          <p className="text-reveal text-[clamp(20px,2vw,24px)] font-normal text-[#BCBCBC] mb-2 pt-3"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
            Experience Indian precision craftsmanship with Saif's commercial wood-fired ovens-engineered for performance, durability, and deep, smoky flavor. Perfect for pizzerias and restaurants, each oven blends traditional wood-fired cooking with advanced modern technology.
          </p>

          <p className="text-reveal text-[16px] md:text-[18px] text-[#BCBCBC] tracking-[0.02em] py-2 leading-7">
            At Saif Ovens, our Commercial Pizza Oven represents the next step in India's evolving food-service innovation. Designed for professional kitchens, restaurants, cafés, and high-volume pizzerias, these ovens combine time-tested wood-fired cooking methods with today's strongest materials and engineering standards. Each unit delivers excellent heat retention, authentic flavor, and reliable day-to-day performance that chefs can trust.
          </p>

          <p className="text-reveal text-[14px] md:text-[16px] text-[#BCBCBC] tracking-[0.02em] py-2 leading-7">
            Whether you're baking pizzas, artisanal breads, roasted meats, or vegetables, Saif's Commercial Oven ensures evenly distributed heat, consistent output, and true wood-fired character. Choose between Fixed models for permanent kitchens or Portable models for mobility and outdoor setups. Both are built for heavy-duty use, long-term durability, and signature wood-fired results—crafted for modern professional kitchens across India.
          </p>
        </div>
      </div>
    </section>
  );
}