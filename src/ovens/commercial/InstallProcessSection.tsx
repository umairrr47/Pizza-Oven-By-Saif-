// src/components/InstallProcessSection.tsx
import React from "react";
import { motion } from "framer-motion";
import CurveImg from "../../assets/process-line.webp"; // your image (1682 x 554)

const IMG_W = 1645;
const IMG_H = 554;

const steps = [
  {
    num: "1",
    title: "Consultation",
    desc: "We assess your kitchen layout via plans and/or video calls to recommend the ideal oven type and placement for optimal performance.",
  },
  {
    num: "2",
    title: "Custom Design",
    desc: "We tailor our oven designs to fit your needs, customizing the burner position and shape to seamlessly integrate with your venue's aesthetics and goals.",
  },
  {
    num: "3",
    title: (
      <>
        Delivery & On- <br /> Site Assembly
      </>
    ),
    desc: "The bigger ovens arrive in parts and are assembled on site by our team; smaller ovens arrive readymade and are ready to use.",
  },
  {
    num: "4",
    title: (
      <>
        Testing And <br /> Guidance
      </>
    ),
    desc: "Once installed, Marco provides personalized guidance on first firing, ingredient sourcing, and pizza-making techniques to ensure optimal results.",
  },
];

const listVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const stepVariant = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function InstallProcessSection() {
  const stepMargins = [
    "md:mt-0",   // Step 1
    "md:-mt-9",  // Step 2
    "md:-mt-20", // Step 3
    "md:-mt-32", // Step 4
  ];

  return (
    <section className="bg-gray-50 text-gray-900 pt-32 md:pt-40 pb-20 overflow-visible relative">
      {/* Added small left-right padding for mobile & desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="relative w-full overflow-visible rounded-3xl">
          {/* Heading: relative on mobile, absolute on md+ */}
          <div className="relative md:absolute md:-top-[10%] md:left-0 z-20 max-w-[720px] text-left">
            <h2
              className="text-[clamp(32px,3.6vw,56px)] leading-[1.1] font-light tracking-[0.03em] text-gray-950 mb-4"
              style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
            >
              How To Install Fired Pizza <br /> Oven At a Commercial Site
            </h2>

            <p className="text-[16px] md:text-[18px] text-[#575757] leading-[1.7] tracking-[0.02em] mb-6">
              Installing a wood-fired pizza oven at your commercial location is simple when done with the right
              guidance. Here's how we ensure a smooth and efficient installation.
            </p>
          </div>

          {/* Image (hidden on mobile) */}
          <div
            className="relative w-full hidden md:block"
            style={{ paddingTop: `${(IMG_H / IMG_W) * 100}%` }}
          >
            <img
              src={CurveImg}
              alt="Process curve"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* STEPS SECTION */}
          <motion.div
            className="mt-10 w-full relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={listVariant}
          >
            {/* DESKTOP VIEW */}
            <div className="hidden md:flex md:items-start md:gap-8 lg:gap-10">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  variants={stepVariant}
                  className={`relative flex-1 pr-2 ${i === 0 ? "pl-0" : ""} ${stepMargins[i]}`}
                >
                  {/* Number */}
                  <div
                    className="absolute -top-10 right-6 text-[5.2rem] lg:text-[6.4rem] font-extrabold text-[#dfdfdf] leading-[1] select-none pointer-events-none -z-10"
                    style={{
                      WebkitTextFillColor: "#dfdfdf",
                    }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(245,245,245,0.95), rgba(245,245,245,0.7), rgba(245,245,245,0.4), rgba(245,245,245,0.1))",
                        pointerEvents: "none",
                        mixBlendMode: "normal",
                      }}
                    />
                    {s.num}
                  </div>

                  {/* Title */}
                  <h5
                    className="text-[clamp(18px,1.8vw,26px)] font-normal text-gray-950 mb-3 tracking-[0.015em] font-poppins"
                    style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                  >
                    {s.title}
                  </h5>

                  {/* Desc */}
                  <p className="text-[14px] md:text-[16px] text-[#575757] leading-[1.7] tracking-[0.02em] mb-4 font-inter">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* MOBILE VIEW (2x2 GRID) */}
            <div className="md:hidden grid grid-cols-2 gap-6 mt-10">
              {steps.map((s) => (
                <motion.div key={s.num} variants={stepVariant} className="relative">
                  <div
                    className="absolute -top-6 right-3 text-[4rem] font-extrabold text-[#dfdfdf] leading-[1] select-none pointer-events-none -z-10"
                    style={{
                      WebkitTextFillColor: "#dfdfdf",
                    }}
                    aria-hidden
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(245,245,245,0.95), rgba(245,245,245,0.7), rgba(245,245,245,0.4), rgba(245,245,245,0.1))",
                        pointerEvents: "none",
                        mixBlendMode: "normal",
                      }}
                    />
                    {s.num}
                  </div>

                  <h5
                    className="text-[clamp(18px,1.8vw,26px)] font-normal text-gray-950 mb-2 tracking-[0.015em] font-poppins"
                    style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                  >
                    {s.title}
                  </h5>

                  <p className="text-[14px] text-[#575757] leading-[1.6] tracking-[0.02em] mb-2 font-inter">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 md:mt-20"></div>
        </div>
      </div>
    </section>
  );
}
