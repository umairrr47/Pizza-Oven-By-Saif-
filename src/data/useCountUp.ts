// src/hooks/useCountUp.ts
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function useCountUp(selector = "[data-count]") {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const els = gsap.utils.toArray<HTMLElement>(selector);
    els.forEach((el) => {
      const end = Number(el.dataset.count ?? "0");
      const suffix = el.dataset.suffix ?? "";
      const dur = Number(el.dataset.duration ?? "1.2");

      const from = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          if (mql.matches) { el.textContent = end + suffix; return; }
          gsap.to(from, {
            val: end,
            duration: dur,
            ease: "power1.out",
            onUpdate: () => { el.textContent = Math.floor(from.val) + suffix; }
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector]);
}
