// src/global.d.ts
declare global {
  interface Window {
    Lenis: new (opts?: Record<string, any>) => {
      raf: (time: number) => void;
      destroy: () => void;
      resize: () => void;
      scrollTo: (target: number | string | HTMLElement | null, opts?: Record<string, unknown>) => void;
      on: (event: "scroll" | string, cb: (...args: any[]) => void) => () => void;
    };
    lenisVersion?: string;
  }
}
export {};
