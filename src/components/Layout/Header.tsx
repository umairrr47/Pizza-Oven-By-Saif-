// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/Logo.png"; // replace with your logo path

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const leftMenu = [
    { name: "Who We Are", path: "/about-us" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blogs", path: "/blog" },
  ];
  const rightMenu = [
    { name: "Commercial Oven", path: "/commercialovens" },
    { name: "Portable Oven", path: "/portableovens" },
    { name: "Residential Oven", path: "/residentialovens" },
  ];
  const isActive = (p: string) => location.pathname === p;

  const headerAnim = {
    background: scrolled
      ? "linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.75))"
      : "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,0))",
    backdropFilter: scrolled ? "blur(10px)" : "blur(6px)",
    height: scrolled ? "66px" : "82px",
    boxShadow: scrolled ? "0 8px 28px rgba(0,0,0,.35)" : "0 2px 10px rgba(0,0,0,.12)",
  };

  // small subtle nav text like ilforno
  const navTextClass =
    "font-normal text-[14px] tracking-wide transition-colors duration-200";

  return (
    <motion.header
  initial={false}
  animate={headerAnim}
  transition={{ duration: 0.25, ease: "easeInOut" }}
  className="relative w-full text-white"
  style={{ fontFamily: "var(--brand-font)" }}
>

      <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
        {/* Use a 3-column grid so logo sits centered absolutely like ilforno */}
        <div className="h-full grid grid-cols-3 items-center">
          {/* LEFT nav (desktop only) */}
          <nav className="hidden lg:flex items-center justify-start gap-6 pl-2">
            {leftMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${navTextClass} ${isActive(item.path) ? "text-white" : "text-white/80 hover:text-red-700"}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CENTER logo (keep centered) */}
          <div className="flex items-center justify-center">
            <Link to="/" aria-label="Home" className="inline-block">
              <img
                src={Logo}
                alt="Logo"
                className="h-[48px] md:h-[56px] object-contain transition-transform duration-300 hover:scale-[1.03]"
                style={{ display: "block" }}
              />
            </Link>
          </div>

          {/* RIGHT nav (desktop only) */}
          <nav className="hidden lg:flex items-center justify-end gap-6 pr-2">
            {rightMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${navTextClass} ${isActive(item.path) ? "text-white" : "text-white/80 hover:text-red-700"}`}
              >
                {item.name}
              </Link>
            ))}

            {/* small mail icon (no box) */}
            <a
              href="mailto:info@yourbrand.com"
              aria-label="Email"
              className="p-1 opacity-85 hover:opacity-100 transition-opacity"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" className="stroke-white fill-none">
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.6" />
                <path d="M3 7l9 6 9-6" strokeWidth="1.6" />
              </svg>
            </a>
          </nav>

          {/* MOBILE: hamburger on right (overlaps with grid-right column) */}
          <div className="lg:hidden col-span-3 flex items-center justify-end">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="w-10 h-10 grid place-items-center mr-2"
            >
              <span className="relative block w-6">
                <span className="absolute inset-x-0 -top-2 h-[2px] bg-white"></span>
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white"></span>
                <span className="absolute inset-x-0 -bottom-2 h-[2px] bg-white"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-[86%] xs:w-[78%] sm:w-[60%]
                       bg-[#0b0b0b]/98 backdrop-blur-xl text-white z-[60] shadow-2xl"
            style={{ fontFamily: "var(--brand-font)" }}
          >
            <div className="flex items-center justify-end px-5 pt-5">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 grid place-items-center"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" className="stroke-white fill-none">
                  <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="px-5 pt-2">
              {[...leftMenu, ...rightMenu].map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[16px] font-normal text-white/90 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                  <div className={`mt-3 h-px bg-white/10 ${idx === leftMenu.length + rightMenu.length - 1 ? "hidden" : ""}`} />
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black z-50 lg:hidden"
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
