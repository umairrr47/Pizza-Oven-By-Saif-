// src/SmoothScrollProvider.tsx
"use client";
import React, {
  createContext, useCallback, useContext, useEffect,
  useMemo, useRef, useState, PropsWithChildren,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisCtor = new (opts?: Record<string, any>) => {
  raf: (time: number) => void;
  destroy: () => void;
  resize: () => void;
  scrollTo: (target: number | string | HTMLElement | null, opts?: Record<string, unknown>) => void;
  on: (event: "scroll" | string, cb: (...args: any[]) => void) => () => void;
};

type Ctx = {
  lenis: InstanceType<LenisCtor> | null;
  scrollToId: (id: string, opts?: Record<string, unknown>) => void;
  isReady: boolean;
};

const SmoothCtx = createContext<Ctx>({ lenis: null, scrollToId: () => {}, isReady: false });

export default function SmoothScrollProvider({
  children,
  options = {},
}: PropsWithChildren<{ options?: Record<string, any> }>) {
  const lenisRef = useRef<InstanceType<LenisCtor> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const GlobalLenis: LenisCtor | null = (window as any).Lenis ?? null;
    if (!GlobalLenis) {
      console.warn("[Lenis] window.Lenis not found — add <script src=\"/lenis.min.js\"></script> in <head>.");
      return;
    }

    // Disable native CSS smooth
    try { document.documentElement.style.scrollBehavior = "auto"; } catch {}

    const lenis = new GlobalLenis({
      smoothWheel: true,
      syncTouch: true,
      duration: 1.2,
      lerp: 0.1,
      ...options,
    });
    lenisRef.current = lenis;
    setReady(true);

    // Drive Lenis from GSAP ticker (gives most consistent frametime)
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);

    // Keep ScrollTrigger in sync
    const off = lenis.on("scroll", () => ScrollTrigger.update());

    // Resize
    const onResize = () => lenis.resize();
    window.addEventListener("resize", onResize);

    return () => {
      try { off && off(); } catch {}
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setReady(false);
    };
  }, [options]);

  const scrollToId = useCallback((id: string, opts: Record<string, unknown> = {}) => {
    const inst = lenisRef.current;
    if (!inst) return;
    const el = document.getElementById(id);
    inst.scrollTo(el || 0, { offset: 0, ...opts });
  }, []);

  const value = useMemo(() => ({ lenis: lenisRef.current, scrollToId, isReady: ready }), [scrollToId, ready]);
  return <SmoothCtx.Provider value={value}>{children}</SmoothCtx.Provider>;
}

export const useLenis = () => useContext(SmoothCtx);
