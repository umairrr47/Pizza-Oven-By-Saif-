import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
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

  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      {/* ✅ Global horizontal clip to kill right gutter */}
      <div className={`${isHome ? "" : "pt-16 sm:pt-20"} overflow-x-clip`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
