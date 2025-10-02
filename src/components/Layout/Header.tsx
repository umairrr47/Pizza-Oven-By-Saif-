import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Recent Work", path: "/recent-work" },
    { name: "Blog", path: "/blog" },
    // { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Helper function for header style
  const getHeaderStyle = () => {
    const isHome = location.pathname === "/";
    const bgColor = !isHome || isScrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)";
    const blur = !isHome || isScrolled ? "blur(12px)" : "blur(0px)";
    const boxShadow =
      !isHome || isScrolled ? "0 4px 20px rgba(0,0,0,0.25)" : "0 0 0 rgba(0,0,0,0)";
    const height = !isHome || isScrolled ? "60px" : "70px"; // slim on scroll

    return { backgroundColor: bgColor, backdropFilter: blur, boxShadow, height };
  };

  return (
    <motion.header
      initial={false}
      animate={getHeaderStyle()}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full py-0">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 h-full">
            <img
              src={Logo}
              alt="Premium Ovens Logo"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 h-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-1 px-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-[#d43804]"
                    : "text-gray-200 hover:text-[#d43804]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="bg-[#d43804] text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-[#b13003] transition-all duration-300 font-medium hover:shadow-lg hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-[#d43804] text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block bg-[#d43804] text-white px-3 py-2 rounded-lg hover:bg-[#b13003] transition-colors duration-200 font-medium text-center"
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
