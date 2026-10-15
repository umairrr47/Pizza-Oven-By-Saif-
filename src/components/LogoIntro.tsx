
import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useAnimationControls } from "framer-motion";
import { useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

const LogoIntro: React.FC = () => {
  const { pathname } = useLocation();
  const controls = useAnimationControls();
  const [showIntro, setShowIntro] = useState(false);

  useLayoutEffect(() => {
    setShowIntro(pathname === "/");
  }, [pathname]);

  useLayoutEffect(() => {
    if (!showIntro || pathname !== "/") return;

    const target = document.querySelector<HTMLImageElement>(
      "#site-header-logo"
    );

    if (!target) {
      setShowIntro(false);
      return;
    }

    let cancelled = false;
    const previousVisibility = target.style.visibility;

    target.style.visibility = "hidden";

    const animateLogo = async () => {
      // Wait until the existing header logo has loaded.
      if (!target.complete || !target.naturalWidth) {
        await new Promise<void>((resolve) => {
          const finish = () => resolve();

          target.addEventListener("load", finish, { once: true });
          target.addEventListener("error", finish, { once: true });
        });
      }

      if (cancelled) return;

      // Let the browser finish layout before measuring the header logo.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });

      if (cancelled) return;

      const rect = target.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        target.style.visibility = previousVisibility;
        setShowIntro(false);
        return;
      }

      const ratio =
        target.naturalWidth && target.naturalHeight
          ? target.naturalWidth / target.naturalHeight
          : rect.width / rect.height;

      const isDesktop = window.innerWidth >= 1024;

      // Keep the intro logo comfortably within the viewport.
      const maxWidth = isDesktop
        ? Math.min(window.innerWidth * 0.3, 250)
        : Math.min(window.innerWidth * 0.48, 190);

      const maxHeight = Math.min(
        window.innerHeight * 0.3,
        isDesktop ? 210 : 160
      );

      const startWidth = Math.min(maxWidth, maxHeight * ratio);
      const startHeight = startWidth / ratio;

      const startLeft = (window.innerWidth - startWidth) / 2;
      const startTop = (window.innerHeight - startHeight) / 2;

      controls.set({
        left: startLeft,
        top: startTop,
        width: startWidth,
        height: startHeight,
        rotateY: 0,
        opacity: 1,
      });

      await controls.start({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        rotateY: 360,
        opacity: 1,
        transition: {
          duration: 4.8,
          ease: [0.76, 0, 0.24, 1],
          rotateY: {
            duration: 3.8,
            ease: [0.45, 0.05, 0.25, 1],
          },
        },
      });

      if (cancelled) return;

      target.style.visibility = previousVisibility;
      setShowIntro(false);
    };

    void animateLogo();

    return () => {
      cancelled = true;
      controls.stop();
      target.style.visibility = previousVisibility;
    };
  }, [showIntro, pathname, controls]);

  if (!showIntro || pathname !== "/") return null;

  return createPortal(
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100001,
        pointerEvents: "none",
        perspective: "1600px",
        overflow: "hidden",
      }}
    >
      <motion.img
        src={Logo}
        alt=""
        initial={false}
        animate={controls}
        style={{
          position: "absolute",
          display: "block",
          objectFit: "contain",
          transformStyle: "preserve-3d",
          backfaceVisibility: "visible",
          willChange: "left, top, width, height, transform",
        }}
      />
    </div>,
    document.body
  );
};

export default LogoIntro;