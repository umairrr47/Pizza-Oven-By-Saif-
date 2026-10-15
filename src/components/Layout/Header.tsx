
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

  useEffect(() => {
    setOpen(false);
  }, [location]);

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

  const isActive = (path: string) => location.pathname === path;

  const headerAnim = {
    background: scrolled
      ? "linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.75))"
      : "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,0))",
    backdropFilter: scrolled ? "blur(10px)" : "blur(6px)",
    height: scrolled ? "66px" : "82px",
    boxShadow: scrolled
      ? "0 8px 28px rgba(0,0,0,.35)"
      : "0 2px 10px rgba(0,0,0,.12)",
  };

  const navTextClass =
    "font-light text-[14px] tracking-wide transition-colors duration-200 whitespace-nowrap";

  return (
    <>
      <motion.header
        initial={false}
        animate={headerAnim}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative z-[10] w-full text-white"
        style={{ fontFamily: "var(--brand-font)" }}
      >
        <div
          className="relative w-full px-4 sm:px-6 lg:px-8"
          style={{ height: headerAnim.height }}
        >
          <div className="grid h-full grid-cols-3 items-center">
            {/* Left navigation: wider desktop screens only */}
            <nav className="hidden xl:flex items-center justify-start gap-5 pl-2">
              {leftMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${navTextClass} ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-white/80 hover:text-[#E30613]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <div className="col-start-2 flex items-center justify-center">
              <Link to="/" aria-label="Home" className="inline-block">
                <img
                  id="site-header-logo"
                  src={Logo}
                  alt="Logo"
                  className="h-[52px] sm:h-[60px] xl:h-[76px] object-contain transition-transform duration-300"
                  style={{ display: "block" }}
                />
              </Link>
            </div>

            {/* Right navigation: wider desktop screens only */}
            <nav className="hidden xl:flex items-center justify-end gap-5 pr-2">
              {rightMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${navTextClass} ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-white/80 hover:text-red-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="mailto:info@yourbrand.com"
                aria-label="Email"
                className="p-1 opacity-85 transition-opacity hover:opacity-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-none stroke-white"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    strokeWidth="1.6"
                  />
                  <path d="M3 7l9 6 9-6" strokeWidth="1.6" />
                </svg>
              </a>
            </nav>

            {/* Hamburger: tablet and mobile */}
            <div className="xl:hidden">
              <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                aria-label={open ? "Close menu" : "Toggle menu"}
                aria-expanded={open}
                className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                style={{ zIndex: 9999 }}
              >
                <span className="relative block w-6">
                  <span className="absolute inset-x-0 -top-2 h-[2px] bg-white" />
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white" />
                  <span className="absolute inset-x-0 -bottom-2 h-[2px] bg-white" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Drawer rendered at document.body */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
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
                  }}
                />

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
                    willChange: "transform, opacity",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close menu"
                      className="grid h-9 w-9 place-items-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        className="fill-none stroke-white"
                      >
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <nav
                    className="overflow-auto px-5 py-6"
                    style={{ maxHeight: "calc(100vh - 64px)" }}
                  >
                    {[...leftMenu, ...rightMenu].map((item) => (
                      <div key={item.name} className="mb-0">
                        <Link
                          to={item.path}
                          onClick={() => setOpen(false)}
                          className="block py-4 text-[18px] font-medium text-white/90 transition-colors duration-200 hover:text-white"
                        >
                          {item.name}
                        </Link>
                        <div className="h-px bg-white/10" />
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
