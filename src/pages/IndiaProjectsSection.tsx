
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Map from "../assets/PMap.png";

gsap.registerPlugin(ScrollTrigger);

export default function IndiaProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.from(".india-map-heading", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".india-map-visual", {
        y: 24,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#0000] px-5 py-16 text-[#f4f0e9] sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      {/* Subtle background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-orange-500/[0.06] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-orange-500/[0.05] blur-[120px]"
      />

      <div className="mx-auto max-w-[1500px]">
        {/* Section heading */}
        <div className="india-map-heading">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
            <span className="h-px w-9 bg-orange-500" />
            Our Presence
          </p>

          <h2 className="max-w-3xl font-serif text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[0.99] tracking-[-0.045em]">
            Explore Our
            <br />
            Projects Across{" "}
            <span className="italic text-[#e6a05d]">India.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            A look at our pizza oven projects and installations
            across different cities in India.
          </p>
        </div>

        {/* Your original map image */}
        <div className="india-map-visual relative mt-10 sm:mt-14 lg:mt-16">
          <img
            src={Map}
            alt="Map of India showing project locations"
            className="mx-auto block h-auto w-full select-none object-contain"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
