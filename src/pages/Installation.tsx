// src/sections/Installation.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Installation: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const featureVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Heading Section */}
        <motion.div
          className="text-center space-y-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-gray-900"
            variants={itemVariants}
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #E20A17 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Elevate Your Culinary Experience<br />
            <span className="font-semibold bg-gradient-to-r from-[#E20A17] to-[#ff4757] bg-clip-text text-transparent">
              with Premium Wood-Fired Ovens
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light"
            variants={itemVariants}
          >
            Discover unparalleled craftsmanship with Saif Ameer-expertly curated, bespoke ovens delivered seamlessly across India, 
            blending tradition with cutting-edge design for an unforgettable gastronomic journey.
          </motion.p>
        </motion.div>

        {/* Elegant Divider */}
        <motion.div
          className="relative my-16"
          variants={dividerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#E20A17]/30 to-transparent blur-sm"></div>
        </motion.div>

        {/* Features List with Enhanced Icons */}
        <div className="space-y-16">
          
          {/* Feature 1: Expert Guidance */}
          <motion.div
            className="flex flex-col lg:flex-row items-start gap-8 group"
            variants={featureVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
          >
            {/* Icon with Glow Effect */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#E20A17] to-[#ff4757] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#E20A17]/20 group-hover:shadow-[#E20A17]/40 transition-shadow duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <motion.h3
                className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-[#E20A17] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Personalized Expert Guidance
              </motion.h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Immerse yourself in a bespoke consultation process where our artisans guide you through every detail—from selecting the ideal model and dimensions to navigating the seamless ordering, delivery, and installation phases—ensuring perfection tailored to your vision and budget.
              </p>
            </div>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div
            className="relative"
            variants={dividerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#E20A17]/30 to-transparent blur-sm"></div>
          </motion.div>

          {/* Feature 2: Custom Built */}
          <motion.div
            className="flex flex-col lg:flex-row items-start gap-8 group"
            variants={featureVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.0 }}
          >
            {/* Icon with Glow Effect */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#E20A17] to-[#ff4757] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#E20A17]/20 group-hover:shadow-[#E20A17]/40 transition-shadow duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <motion.h3
                className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-[#E20A17] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Bespoke Craftsmanship
              </motion.h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Indulge in a world of customization: select from an exquisite array of models, sizes, configurations, and luxurious finishes, meticulously engineered to harmonize with your aesthetic and elevate your indoor or outdoor sanctuary.
              </p>
            </div>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div
            className="relative"
            variants={dividerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.2 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#E20A17]/30 to-transparent blur-sm"></div>
          </motion.div>

          {/* Feature 3: Nationwide Delivery */}
          <motion.div
            className="flex flex-col lg:flex-row items-start gap-8 group"
            variants={featureVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.4 }}
          >
            {/* Icon with Glow Effect */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#E20A17] to-[#ff4757] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#E20A17]/20 group-hover:shadow-[#E20A17]/40 transition-shadow duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <motion.h3
                className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-[#E20A17] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Pan-India Delivery & Precision Installation
              </motion.h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Experience unrivaled reliability with nationwide shipping and expert installation services, guaranteeing your masterpiece arrives pristine and is flawlessly integrated into your space.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Final Elegant Divider */}
        <motion.div
          className="relative mt-20"
          variants={dividerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 1.6 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#E20A17]/30 to-transparent blur-sm"></div>
        </motion.div>
      </div>

      {/* Advanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -left-32 top-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#E20A17]/10 to-[#ff4757]/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full bg-gradient-to-tl from-[#E20A17]/8 to-[#ff4757]/3 blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.05, 0.25, 0.05],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Subtle Particle Effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#E20A17]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Installation;
