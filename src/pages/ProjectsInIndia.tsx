// src/sections/ProjectsInIndia.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ProjectsInIndia: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Major cities with precise coordinates on India map
  const cities = [
    { name: "Delhi", projects: 45, x: 485, y: 155, region: "North" },
    { name: "Mumbai", projects: 52, x: 380, y: 300, region: "West" },
    { name: "Bangalore", projects: 38, x: 400, y: 450, region: "South" },
    { name: "Chennai", projects: 28, x: 450, y: 470, region: "South" },
    { name: "Kolkata", projects: 32, x: 550, y: 240, region: "East" },
    { name: "Hyderabad", projects: 35, x: 420, y: 380, region: "South" },
    { name: "Pune", projects: 41, x: 380, y: 320, region: "West" },
    { name: "Ahmedabad", projects: 29, x: 340, y: 260, region: "West" },
    { name: "Jaipur", projects: 26, x: 430, y: 200, region: "North" },
    { name: "Kochi", projects: 22, x: 390, y: 520, region: "South" },
    { name: "Lucknow", projects: 18, x: 470, y: 190, region: "North" },
    { name: "Bhopal", projects: 15, x: 430, y: 280, region: "Central" },
    { name: "Chandigarh", projects: 12, x: 450, y: 140, region: "North" },
    { name: "Goa", projects: 14, x: 360, y: 380, region: "West" },
    { name: "Guwahati", projects: 8, x: 580, y: 200, region: "East" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative bg-white min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="w-full max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - Moved to Top */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 mb-6">
            Explore Our Projects In India
          </h2>
          
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Saif Ameer (formerly known as Pizza Oven By Saif) has blended authentic Italian craftsmanship 
            with cutting-edge manufacturing processes to deliver high-performance ovens at scale.
          </motion.p>

          {/* Statistics Grid - Moved to Top */}
          <motion.div
            className="grid grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[
              { number: "500+", label: "Oven Delivered", delay: 0.2 },
              { number: "15+", label: "Years of Expertise", delay: 0.3 },
              { number: "100+", label: "Pizza Courses Done", delay: 0.4 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={statsVariants}
                transition={{ delay: stat.delay }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#E20A17] mb-3">
                  {stat.number}
                </div>
                <div className="text-lg sm:text-xl text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons - Moved to Top */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-3 bg-[#E20A17] hover:bg-[#c50914] text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 group shadow-lg hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Know More</span>
              <svg
                width="20"
                height="20"
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
              </svg>
            </motion.a>

            {/* ILC and Course Links */}
            <motion.div
              className="flex flex-wrap gap-8 justify-center"
              variants={containerVariants}
            >
              <motion.a
                href="#ilc"
                className="flex items-center gap-3 text-gray-700 hover:text-[#E20A17] transition-all duration-300 group text-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <span className="w-3 h-3 rounded-full bg-[#E20A17] group-hover:scale-125 transition-transform duration-300"></span>
                <span className="font-medium">ILC – Presence</span>
              </motion.a>

              <motion.a
                href="#courses"
                className="flex items-center gap-3 text-gray-700 hover:text-[#E20A17] transition-all duration-300 group text-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <span className="w-3 h-3 rounded-full bg-[#E20A17] group-hover:scale-125 transition-transform duration-300"></span>
                <span className="font-medium">Course</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Full Viewport India Map Section */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Map Container - Full viewport width */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 shadow-2xl w-full">
            
            {/* Map Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-normal text-gray-900 mb-2">
                  Our Pan-India Presence
                </h3>
                <p className="text-xl text-gray-600">
                  Serving <span className="text-[#E20A17] font-semibold">{cities.length}+ cities</span> across India with premium pizza oven installations
                </p>
              </div>
              <div className="flex flex-wrap gap-6 text-lg text-gray-500">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#E20A17] rounded-full"></div>
                  <span>Project Locations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#E20A17] rounded-full animate-pulse"></div>
                  <span>Active Projects</span>
                </div>
              </div>
            </div>

            {/* Massive India Map - Full Width & Height */}
            <div className="relative w-full h-[60vh] min-h-[500px] lg:h-[70vh] bg-white rounded-2xl border-2 border-gray-300 overflow-hidden shadow-inner">
              
              {/* India Map SVG - Scaled Up */}
              <svg 
                viewBox="0 0 800 600" 
                className="w-full h-full"
                fill="none" 
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Detailed India Outline */}
                <path
                  d="M650,250 Q600,200 550,220 Q500,240 450,230 Q400,220 350,240 Q300,260 250,240 Q200,220 180,260 Q160,300 200,340 Q240,380 280,400 Q320,420 350,450 Q380,480 400,500 Q420,520 450,520 Q480,520 500,480 Q520,440 550,420 Q580,400 600,380 Q620,360 630,330 Q640,300 650,280 Z
                   M580,200 Q600,180 620,190 Q630,200 620,220 Q610,240 590,230 Q580,220 580,200 Z
                   M300,500 Q320,520 340,510 Q350,500 340,480 Q330,460 310,470 Q300,480 300,500 Z"
                  fill="#f8fafc"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                
                {/* Major geographical features */}
                <path
                  d="M350,300 Q370,320 360,340 Q350,360 330,350 Q320,340 330,320 Q340,300 350,300 Z"
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                
                <path
                  d="M500,350 Q520,360 510,380 Q500,400 480,390 Q470,380 480,360 Q490,350 500,350 Z"
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />

                {/* Enhanced City Points */}
                {cities.map((city, index) => (
                  <motion.g
                    key={city.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      delay: 0.8 + index * 0.08,
                      type: "spring", 
                      stiffness: 120,
                      damping: 12
                    }}
                    className="cursor-pointer"
                  >
                    {/* Enhanced Pulsing Effect */}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r="16"
                      fill="#E20A17"
                      fillOpacity="0.2"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                    
                    {/* Main Point - Larger */}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r="8"
                      fill="#E20A17"
                      stroke="#fff"
                      strokeWidth="3"
                      whileHover={{ r: 12 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Enhanced City Name Label */}
                    <text
                      x={city.x}
                      y={city.y - 20}
                      textAnchor="middle"
                      className="font-bold fill-gray-800 pointer-events-none"
                      style={{ fontSize: '14px', fontFamily: 'system-ui' }}
                    >
                      {city.name}
                    </text>
                    
                    {/* Enhanced Project Count Badge */}
                    <rect
                      x={city.x - 18}
                      y={city.y + 8}
                      width="36"
                      height="20"
                      rx="10"
                      fill="#E20A17"
                      className="pointer-events-none"
                    />
                    <text
                      x={city.x}
                      y={city.y + 22}
                      textAnchor="middle"
                      className="font-bold fill-white pointer-events-none"
                      style={{ fontSize: '12px', fontFamily: 'system-ui' }}
                    >
                      {city.projects}
                    </text>
                  </motion.g>
                ))}

                {/* Enhanced Strategic Connection Lines */}
                {[
                  { from: cities[0], to: cities[1], width: 3 }, // Delhi-Mumbai
                  { from: cities[1], to: cities[5], width: 2.5 }, // Mumbai-Hyderabad
                  { from: cities[5], to: cities[2], width: 2.5 }, // Hyderabad-Bangalore
                  { from: cities[2], to: cities[3], width: 2.5 }, // Bangalore-Chennai
                  { from: cities[0], to: cities[4], width: 3 }, // Delhi-Kolkata
                  { from: cities[0], to: cities[8], width: 2 }, // Delhi-Jaipur
                  { from: cities[1], to: cities[6], width: 2 }, // Mumbai-Pune
                ].map((connection, index) => (
                  <motion.path
                    key={index}
                    d={`M${connection.from.x},${connection.from.y} L${connection.to.x},${connection.to.y}`}
                    stroke="#E20A17"
                    strokeWidth={connection.width}
                    strokeDasharray="6,4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                    transition={{ 
                      duration: 2.5, 
                      delay: 1.2 + index * 0.15,
                      ease: "easeOut" 
                    }}
                  />
                ))}
              </svg>

              {/* Interactive Overlay for Enhanced Tooltips */}
              {cities.map((city) => (
                <motion.div
                  key={city.name}
                  className="absolute cursor-pointer group"
                  style={{ 
                    left: `${(city.x / 800) * 100}%`, 
                    top: `${(city.y / 600) * 100}%` 
                  }}
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Larger hit area */}
                  <div className="w-12 h-12 -translate-x-6 -translate-y-6 opacity-0" />
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                    <div className="bg-gray-900 text-white rounded-2xl px-6 py-4 shadow-2xl min-w-48 border border-gray-700 backdrop-blur-sm">
                      <div className="font-bold text-white text-lg mb-1">{city.name}</div>
                      <div className="text-gray-300 text-base mb-3">{city.region} Region</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Projects Completed:</span>
                        <span className="text-[#E20A17] font-bold text-lg">{city.projects}+</span>
                      </div>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-gray-900" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Map Footer */}
            <div className="flex flex-col lg:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200 gap-6">
              <div className="text-xl text-gray-600">
                Total installations: <span className="text-[#E20A17] font-bold text-2xl">500+</span> across <span className="text-[#E20A17] font-bold text-2xl">{cities.length}+</span> cities
              </div>
              <div className="flex items-center gap-8 text-lg text-gray-500">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#E20A17] rounded-full"></div>
                  <span>Major City Hub</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-2 bg-[#E20A17] rounded-full"></div>
                  <span>Supply Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Floating Decorative Elements */}
          <motion.div
            className="absolute -top-12 -right-12 w-48 h-48 bg-[#E20A17]/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#E20A17]/5 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -left-60 top-1/4 w-[40rem] h-[40rem] rounded-full bg-[#E20A17]/3 blur-4xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default ProjectsInIndia;