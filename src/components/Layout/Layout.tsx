import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import { useLocation } from "react-router-dom";

// ⬇️ import the hook from the provider you placed in /src
import { useLenis } from "../../lib//SmoothScrollProvider"

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { lenis, isReady } = useLenis(); // <-- get Lenis instance
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Prefer Lenis scroll event for buttery, frame-accurate updates
    if (isReady && lenis) {
      const off = lenis.on("scroll", (l: any) => {
        // l.scroll is the current animated scroll value
        setIsScrolled(l.scroll > 50);
      });
      return () => {
        try { off && off(); } catch {}
      };
    }

    // Fallback: if Lenis hasn’t mounted yet, use native scroll
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [isReady, lenis]);

  const isHome = location.pathname === "/";

  return (
    <>
      <Header /* you can pass isScrolled if Header needs it */ />
      {/* Keep your gutter fix */}
      <div className={`${isHome ? "" : "pt-16 sm:pt-20"} overflow-x-clip`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
