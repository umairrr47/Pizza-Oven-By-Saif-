import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/Logo.png";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on route change & lock body scroll
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const leftMenu = [
    { name: "Who We Are", path: "/about-us" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blogs", path: "/blog" },
  ];
  const rightMenu = [
    { name: "Commercial Oven", path: "/commercial-oven" },
    { name: "Portable Oven", path: "/portable-oven" },
    { name: "Residential Oven", path: "/residential-oven" },
  ];
  const isActive = (p: string) => location.pathname === p;

  // Premium glass header animation
  const headerAnim = {
    background:
      scrolled
        ? "linear-gradient(180deg, rgba(10,10,10,.85), rgba(10,10,10,.75))"
        : "linear-gradient(180deg, rgba(10,10,10,.35), rgba(10,10,10,0))",
    backdropFilter: scrolled ? "blur(10px)" : "blur(6px)",
    height: scrolled ? "66px" : "82px",
    boxShadow: scrolled ? "0 8px 28px rgba(0,0,0,.35)" : "0 2px 10px rgba(0,0,0,.15)",
  };

  // Fluid sizes so it still looks big at 75% zoom
  const itemBase =
    "relative font-semibold tracking-wide transition-colors";
  const itemSize = "text-[clamp(13px,1.08vw,16px)]"; // <= key: fluid desktop text
  const itemSpace = "space-x-[clamp(14px,1.8vw,36px)]";
  const activeClass = "text-white";
  const idleClass = "text-white/80 hover:text-white";

  return (
    <motion.header
      initial={false}
      animate={headerAnim}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed inset-x-0 top-0 z-50 text-white"
    >
      <div className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="h-full flex items-center justify-between">

          {/* LEFT (desktop) */}
          <nav className={`hidden lg:flex items-center ${itemSpace}`}>
            {leftMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${itemBase} ${itemSize} ${isActive(item.path) ? activeClass : idleClass}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CENTER logo (fluid height so it doesn’t look tiny at 75%) */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={Logo}
              alt="Logo"
              className="w-auto object-contain transition-transform duration-300 hover:scale-[1.04]
                         h-[clamp(40px,4.4vw,58px)]"
            />
          </Link>

          {/* RIGHT (desktop) + email icon (no box) */}
          <nav className={`hidden lg:flex items-center ${itemSpace}`}>
            {rightMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${itemBase} ${itemSize} ${isActive(item.path) ? activeClass : idleClass}`}
              >
                {item.name}
              </Link>
            ))}

            {/* Email icon – box removed */}
            <a
              href="mailto:info@yourbrand.com"
              aria-label="Email"
              className="p-2 opacity-85 hover:opacity-100 transition-opacity"
            >
              <svg
                viewBox="0 0 24 24"
                width="clamp(18px,1.4vw,22px)"
                height="clamp(18px,1.4vw,22px)"
                className="stroke-white fill-none drop-shadow-[0_0_6px_rgba(255,255,255,.25)]"
              >
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.6" />
                <path d="M3 7l9 6 9-6" strokeWidth="1.6" />
              </svg>
            </a>
          </nav>

          {/* MOBILE: hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-10 h-10 grid place-items-center"
          >
            <span className="relative block w-6">
              <span className="absolute inset-x-0 -top-2 h-[2px] bg-white"></span>
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white"></span>
              <span className="absolute inset-x-0 -bottom-2 h-[2px] bg-white"></span>
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (slides from right) */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-[86%] xs:w-[78%] sm:w-[60%]
                       bg-[#0b0b0b]/95 backdrop-blur-xl text-white z-[60] shadow-2xl"
          >
            {/* close (top-right) */}
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

            {/* links with separators */}
            <nav className="px-5 pt-2">
              {[...leftMenu, ...rightMenu].map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[clamp(14px,3.6vw,18px)] font-semibold text-white/90 hover:text-white"
                >
                  {item.name}
                  <div className={`mt-3 h-px bg-white/15 ${idx === leftMenu.length + rightMenu.length - 1 ? "hidden" : ""}`} />
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* OVERLAY (dim background) */}
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
