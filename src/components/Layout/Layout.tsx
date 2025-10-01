import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerHeight = isScrolled ? 100 : 110; // Header height for non-Hero pages

  // Check if current page is Home
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      <div style={{ paddingTop: isHome ? 0 : `${headerHeight}px` }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
