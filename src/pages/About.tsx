import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CircleCheck as CheckCircle } from "lucide-react";
import Saif from "../assets/Saif.jpeg"

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Top Heading (simple) */}
      {/* About Section (compact + About label inside) */}
<section id="about" className="pt-10 md:pt-12 pb-16 scroll-mt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Small overline label = “About” */}
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-[#d43804] text-2xl font-semibold tracking-wide">
          About
        </span>

        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          Leading India’s Pizza Oven Revolution
        </h2>

        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          As the Director of The Pizza Ovens, I bring a vision of combining <strong>artisan Italian craftsmanship</strong>
          with <strong>cutting-edge engineering</strong> to deliver ovens that create authentic flavors with unmatched
          performance. Since our inception, we have empowered restaurants, cafes, and pizza enthusiasts
          across India to craft culinary perfection — with reliability, quality, and passion at the core of everything we do.
        </p>

        <div className="mt-6 space-y-4">
          {[
            'Italian-inspired traditional designs',
            'Premium materials and construction',
            'Expert installation and training',
            '2-year comprehensive warranty'
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="text-[#d43804]" size={20} />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 mt-8 text-[#d43804] hover:text-[#b13003] font-medium"
        >
          <span>Learn More About Us</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <img
          src={Saif}
          alt="Director Image"
          className="rounded-2xl shadow-2xl w-full"
        />
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-gray-900 mb-2">Mohammad Saif</h3>
          <p className="text-gray-600 text-sm">Founder & Director</p>
          <p className="text-xs text-gray-500 mt-1">14+ Years Experience</p>
        </div>
      </motion.div>

    </div>
  </div>
</section>

    </div>
  );
};

export default About;
