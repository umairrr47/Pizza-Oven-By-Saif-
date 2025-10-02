// src/components/Layout/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png"

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Recent Work", path: "/recent-work" },
    { name: "Blog", path: "/blog" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const productLinks = [
    "Wood-Fired Ovens",
    "Gas Ovens",
    "Hybrid Ovens",
    "Home Ovens",
    "Commercial Ovens",
    "Custom Solutions",
  ];

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/thepizzaovensbysaif/" },
    { icon: Instagram, href: "https://www.instagram.com/the_pizza_ovens_by_saif/" },
    { icon: Twitter, href: "https://x.com/thepizzaovens?lang=en" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UC2Y5-Gmxu854G3hPQ15hl4g" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Glow effect */}
      <div className="absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#d43804]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <img
              src={Logo}  // 👈 apna imported logo yaha
              alt="The Pizza Ovens"
              className="h-24 w-auto object-contain"
            />

            <p className="text-sm text-gray-400 leading-relaxed">
              Crafting premium pizza ovens with Italian heritage & modern
              precision. Bringing authentic flavors to India since 2015.
            </p>

            {/* Socials */}
            <div className="flex space-x-4 mt-4">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-[#d43804] text-gray-300 hover:text-white transition-all shadow-md"
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>


          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#d43804] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-5">Our Products</h4>
            <ul className="space-y-2 text-sm">
              {productLinks.map((p) => (
                <li key={p}>
                  <Link
                    to="/products"
                    className="text-gray-400 hover:text-[#d43804] transition-colors"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-5">Contact Info</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="text-[#d43804]" size={16} />
                <p>
                  H-16, 1461, Shooting Range Rd
                  <br />
                  Sangam Vihar, New Delhi, Delhi 110080
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-[#d43804]" size={16} />
                <p>+91 98995 93526</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-[#d43804]" size={16} />
                <p>info@premiumovens.com</p>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Business Hours</h5>
              <p className="text-sm text-gray-400">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-sm text-gray-400">Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
        >
          <p className="mb-4 md:mb-0">
            © 2025 The Pizza Ovens. All rights reserved. Crafted with passion.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#d43804] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#d43804] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#d43804] transition-colors">
              Warranty
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
