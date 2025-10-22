// src/hooks/useReveal.ts
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function useReveal(selector = "[data-reveal]") {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = gsap.utils.toArray<HTMLElement>(selector);

    items.forEach((el) => {
      if (!mql.matches) gsap.set(el, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (mql.matches) return;
          gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector]);
}
