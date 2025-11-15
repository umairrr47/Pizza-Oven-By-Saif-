// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/Logo.png";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
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
    { name: "Who We Are", path: "/aboutus" },
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

  const navTextClass =
    "font-normal text-[14px] tracking-wide transition-colors duration-200 whitespace-nowrap";

  return (
    <>
      {/* Header (non-sticky relative as requested) */}
      <motion.header
        initial={false}
        animate={headerAnim}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative w-full text-white z-[10]"
        style={{ fontFamily: "var(--brand-font)" }}
      >
        <div className="relative w-full px-4 sm:px-6 lg:px-8" style={{ height: headerAnim.height }}>
          <div className="h-full grid grid-cols-3 items-center">
            {/* LEFT nav (desktop) */}
            <nav className="hidden lg:flex items-center justify-start gap-6 pl-10">
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

            {/* CENTER logo */}
            <div className="flex items-center justify-center">
              <Link to="/" aria-label="Home" className="inline-block">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-[68px] md:h-[76px] object-contain transition-transform duration-300"
                  style={{ display: "block" }}
                />
              </Link>
            </div>

            {/* RIGHT nav (desktop) */}
            <nav className="hidden lg:flex items-center justify-end gap-6 pr-8">
              {rightMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${navTextClass} ${isActive(item.path) ? "text-white" : "text-white/80 hover:text-red-700"}`}
                >
                  {item.name}
                </Link>
              ))}

              <a href="mailto:info@yourbrand.com" aria-label="Email" className="p-1 opacity-85 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" width="20" height="20" className="stroke-white fill-none">
                  <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.6" />
                  <path d="M3 7l9 6 9-6" strokeWidth="1.6" />
                </svg>
              </a>
            </nav>

            {/* MOBILE hamburger (toggle) - absolute so it won't drop under other elements */}
            <div className="lg:hidden">
              <button
                onClick={() => setOpen((p) => !p)}
                aria-label="Toggle menu"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                style={{ zIndex: 9999 }}
              >
                <span className="relative block w-6">
                  <span className="absolute inset-x-0 -top-2 h-[2px] bg-white" />
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white" />
                  <span className="absolute inset-x-0 -bottom-2 h-[2px] bg-white" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Drawer portal: rendered at document.body to avoid stacking/context issues */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* Overlay */}
                <motion.div
                  key="portal-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setOpen(false)}
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.55)",
                    zIndex: 99999,
                    willChange: "opacity",
                    transform: "translateZ(0)",
                  }}
                />

                {/* Drawer panel */}
                <motion.aside
                  key="portal-drawer"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100vh",
                    width: "86%",
                    maxWidth: "640px",
                    background: "#0b0b0b",
                    color: "#fff",
                    zIndex: 100000,
                    transform: "translateZ(0)",
                    willChange: "transform, opacity",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="flex items-center justify-between ">
                    

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

                  <nav className="px-5 py-6 overflow-auto" style={{ maxHeight: "calc(100vh - 64px)" }}>
                    {[...leftMenu, ...rightMenu].map((item) => (
                      <div key={item.name} className="mb-0">
                        <Link
                          to={item.path}
                          onClick={() => setOpen(false)}
                          className="block py-4 text-[18px] font-medium text-white/90 hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                        <div className="h-px bg-white/6" />
                      </div>
                    ))}
                  </nav>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Header;
