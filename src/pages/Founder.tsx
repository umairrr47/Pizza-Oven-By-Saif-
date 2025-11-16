// src/sections/Founder.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  founderImg: string;
  name?: string;
  role?: string;
  quote?: string;
  bullets?: string[];
};

const Founder: React.FC<Props> = ({
  founderImg,
  name = "Saif Ameer",
  role = "Founder & CEO",
  quote = "After building 500+ ovens and more than a decade in manufacturing and onsite installations, I confidently guarantee every model. I know pizza making and the hospitality business inside out — from heat management to real-world kitchen workflows.",
  bullets = [
    "Started crafting ovens in Delhi in 2014",
    "Delivered high-quality projects across India.",
    "Widely respected by professional chefs and restaurateurs."
  ]
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const futuristicCardVariants = {
    hidden: { x: 50, opacity: 0, rotateY: 10 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingElementsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.6, ease: "backOut" }
    })
  };

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-16 sm:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile Layout: Heading -> Text -> Image -> Bullets + CTA -> About */}
        <div className="lg:hidden space-y-8">
          {/* Heading */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-4xl sm:text-5xl font-normal leading-tight">
              Meet<br />
              <span className="text-[#E20A17]">The Founder</span>
            </div>
          </motion.div>

          {/* Intro text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm text-gray-300 leading-relaxed">
              Hands-on entrepreneur driven by innovation and a passion for serving chefs and hospitality.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 -top-6 mx-auto w-[90%] h-[95%] rounded-t-[35px] rounded-b-[18px] bg-gradient-to-b from-[#E20A17]/25 to-transparent" />
              <img
                src={founderImg}
                alt={name}
                className="relative w-full max-w-[350px] h-auto object-contain rounded-t-[28px] rounded-b-[14px] z-10"
              />
              <div className="absolute inset-x-0 -bottom-3 mx-auto h-3 w-40 rounded-full bg-black/50 blur-md" />
            </div>
          </motion.div>

          {/* Bullets under image (mobile) */}
          <motion.div
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {bullets.map((bullet, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="mt-1.5 size-2.5 rounded-full bg-[#E20A17] flex-shrink-0"
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-base font-semibold leading-relaxed">
                    {bullet}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* About Us button under image (mobile) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <motion.a
              href="#about"
              className="inline-flex items-center gap-3 bg-[#E20A17] hover:bg-[#c50914] text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 group border border-[#E20A17]/30"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(226, 10, 23, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>About Us</span>
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </motion.div>

          {/* About Content card (kept) */}
          <motion.div
            className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#E20A17]/20"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-gray-300 leading-relaxed mb-6">{quote}</p>
            <div className="border-t border-[#E20A17]/30 pt-4">
              <div className="font-bold text-lg">{name}</div>
              <div className="text-[#E20A17] text-sm">{role}</div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            className="fd-left space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <div className="text-6xl font-normal leading-tight tracking-tight">
                Meet<br />
                <span className="text-[#E20A17]">The Founder</span>
              </div>
            </motion.div>

            <motion.p
              className="text-base text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              Hands-on entrepreneur driven by innovation and a passion for serving others.
            </motion.p>

            <motion.div className="space-y-6" variants={containerVariants}>
              {bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="mt-2 size-3 rounded-full bg-[#E20A17] flex-shrink-0"
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-lg font-semibold leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.a
                href="#about"
                className="inline-flex items-center gap-3 bg-[#E20A17] hover:bg-[#c50914] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 group border border-[#E20A17]/30"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(226, 10, 23, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>About Us</span>
               <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M9 5l7 7-7 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Center Portrait */}
          <motion.div
            className="relative fd-portrait flex justify-center"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 -top-10 mx-auto w-[110%] h-[120%] rounded-t-[45px] rounded-b-[25px] bg-gradient-to-b from-[#E20A17]/15 via-transparent to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="relative z-10"
                whileHover={{ y: -8, rotateZ: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <img
                  src={founderImg}
                  alt={name}
                  className="w-full max-w-[420px] h-auto object-contain rounded-t-[35px] rounded-b-[18px] border-2 border-[#E20A17]/20"
                />
              </motion.div>
              <motion.div
                className="absolute inset-x-0 -bottom-6 mx-auto h-4 w-56 rounded-full bg-[#E20A17]/20 blur-xl"
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Right Section — hidden on mobile explicitly */}
          <motion.div
            className="relative hidden lg:block"
            variants={futuristicCardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 border border-[#E20A17]/30 shadow-2xl overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%),
                  radial-gradient(circle at 20% 80%, #E20A17/10 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, #E20A17/5 0%, transparent 50%)
                `
              }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 30px 60px rgba(226, 10, 23, 0.2), 0 0 120px rgba(226, 10, 23, 0.1)",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, transparent 24px, #E20A17 25px, transparent 26px),
                    linear-gradient(0deg, transparent 24px, #E20A17 25px, transparent 26px)
                  `,
                  backgroundSize: "50px 50px"
                }}
              />

              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 bg-[#E20A17] rounded-full cursor-pointer"
                variants={floatingElementsVariants}
                custom={0}
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#E20A17] rounded-full cursor-pointer"
                variants={floatingElementsVariants}
                custom={1}
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.5, rotate: -360 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-1/2 -right-2 w-2 h-2 bg-[#E20A17] rounded-full cursor-pointer"
                variants={floatingElementsVariants}
                custom={2}
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ scale: 2, opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <motion.p
                  className="text-lg leading-relaxed font-light text-gray-200 mb-8 relative pl-6 border-l-2 border-[#E20A17]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {quote}
                </motion.p>

                <motion.div
                  className="border-t border-[#E20A17]/20 pt-6 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {name}
                  </div>
                  <div className="text-[#E20A17] font-semibold text-lg flex items-center gap-3">
                    <span>{role}</span>
                    <motion.div
                      className="w-2 h-2 bg-[#E20A17] rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#E20A17] rounded-tr-2xl" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#E20A17] rounded-bl-2xl" />

              <motion.div
                className="absolute inset-0 rounded-3xl bg-[#E20A17]/5 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="absolute -z-10 -right-10 top-10 w-20 h-20 bg-[#E20A17]/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -z-10 -left-10 bottom-10 w-16 h-16 bg-[#E20A17]/8 rounded-full blur-xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E20A17]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#E20A17]/3 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default Founder;
