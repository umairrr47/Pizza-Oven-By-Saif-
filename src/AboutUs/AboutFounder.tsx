
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FounderImage from "../assets/saif-img.jpg";
import ResidentialOven from "../assets/residential.png";
import OvenShow1 from "../assets/ovens/OvenShow1.png";
import OvenShow2 from "../assets/ovens/OvenShow2.png";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   REUSABLE LINE REVEAL — SAME FILE
   ========================================================= */

function LineReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[]>([text]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const measure = measureRef.current;

    if (!root || !measure) return;

    let frame = 0;

    const calculateLines = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const words = text.trim().split(/\s+/);
        const result: string[] = [];
        let currentLine = "";
        let previousTop: number | null = null;

        measure.replaceChildren();

        words.forEach((word) => {
          const span = document.createElement("span");
          span.textContent = `${word} `;
          span.style.display = "inline";
          measure.appendChild(span);

          const top = span.offsetTop;

          if (previousTop !== null && top !== previousTop) {
            result.push(currentLine.trim());
            currentLine = "";
          }

          currentLine += `${word} `;
          previousTop = top;
        });

        if (currentLine.trim()) {
          result.push(currentLine.trim());
        }

        setLines((previous) =>
          previous.join("|") === result.join("|")
            ? previous
            : result
        );
      });
    };

    calculateLines();

    const observer = new ResizeObserver(calculateLines);
    observer.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [text]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets =
      root.querySelectorAll<HTMLElement>(".line-reveal-inner");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      gsap.set(targets, {
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        yPercent: 110,
        opacity: 0,
        filter: "blur(5px)",
      });

      const reveal = () => {
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          delay,
          stagger: 0.11,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const hide = () => {
        gsap.set(targets, {
          yPercent: 110,
          opacity: 0,
          filter: "blur(5px)",
        });
      };

      ScrollTrigger.create({
        trigger: root,
        start: "top 88%",
        end: "bottom 12%",
        onEnter: reveal,
        onEnterBack: reveal,
        onLeave: hide,
        onLeaveBack: hide,
      });
    }, root);

    return () => ctx.revert();
  }, [lines, delay]);

  return (
    <div ref={rootRef} className={className}>
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0"
        style={{
          width: rootRef.current?.clientWidth || "100%",
          visibility: "hidden",
        }}
      />

      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="block">
        {lines.map((line, index) => (
          <span
            key={`${index}-${line}`}
            className="block overflow-hidden"
          >
            <span
              className="line-reveal-inner block"
              style={{
                willChange: "transform, opacity, filter",
              }}
            >
              {line}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}

/* =========================================================
   JOURNEY DATA
   ========================================================= */

const journey = [
  {
    year: "2015",
    title: "The Beginning",
    tag: "Where it started",
    description:
      "My journey in the pizza oven manufacturing industry began with a commitment to learning, understanding the craft, and gaining practical experience.",
  },
  {
    year: "01",
    title: "Learning the Engineering",
    tag: "Technical foundation",
    description:
      "Working in partnership with an Italian pizza oven manufacturing company helped me develop practical knowledge of oven design, heating calculations, heat distribution, insulation systems, material selection, and manufacturing techniques.",
  },
  {
    year: "02",
    title: "Building the Brand",
    tag: "A vision takes shape",
    description:
      "With a stronger technical foundation and a clear understanding of quality, I established The Pizza Ovens by Saif to create customized ovens built around performance, craftsmanship, and practical design.",
  },
  {
    year: "Today",
    title: "Creating Better Oven Solutions",
    tag: "The journey continues",
    description:
      "Today, the focus continues to be on customized solutions for restaurants, pizzerias, cafés, hotels, resorts, cloud kitchens, food trucks, and residential spaces across India.",
  },
];

const categories = [
  {
    number: "01",
    title: "Wood-Fired Ovens",
    description:
      "Traditional wood-fired cooking solutions for commercial and residential applications.",
    image: ResidentialOven,
  },
  {
    number: "02",
    title: "Italian-Concept Ovens",
    description:
      "Italian-inspired aesthetics combined with thoughtful engineering and practical construction.",
    image: OvenShow1,
  },
  {
    number: "03",
    title: "Customized Ovens",
    description:
      "Oven configurations tailored to individual requirements, kitchen layouts, and cooking needs.",
    image: OvenShow2,
  },
  {
    number: "04",
    title: "Commercial Solutions",
    description:
      "Purpose-oriented oven solutions for restaurants, pizzerias, hotels, and professional kitchens.",
    image: ResidentialOven,
  },
];

const principles = [
  {
    number: "01",
    title: "Thoughtful Engineering",
    text: "Heating requirements, heat distribution, insulation, and dimensions are considered according to each project's needs.",
  },
  {
    number: "02",
    title: "Material & Craftsmanship",
    text: "Material selection, construction, finishing, and attention to detail are important parts of the manufacturing process.",
  },
  {
    number: "03",
    title: "Customer-Focused Design",
    text: "Every project starts by understanding the customer's space, application, expectations, and operational requirements.",
  },
];

/* =========================================================
   ABOUT PAGE
   ========================================================= */

export default function About() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      /* Hero entrance */
      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .from(".about-hero-image", {
          scale: 1.07,
          opacity: 0,
          duration: 1.3,
        })
        .from(
          ".about-hero-kicker",
          {
            y: 18,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.75"
        )
        .from(
          ".about-hero-title",
          {
            y: 30,
            opacity: 0,
            duration: 0.85,
          },
          "-=0.4"
        )
        .from(
          ".about-hero-bottom",
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.35"
        );

      /* Section reveals — replay on reverse scroll */
      gsap.utils
        .toArray<HTMLElement>(".about-reveal")
        .forEach((element) => {
          gsap.from(element, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          });
        });

      /* Animated timeline line */
      const timelineLine = page.querySelector(
        ".journey-line-fill"
      );

      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          {
            scaleY: 0,
            transformOrigin: "top center",
          },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-section",
              start: "top 65%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          }
        );
      }

      /* Journey milestone entrance */
      gsap.utils
        .toArray<HTMLElement>(".journey-item")
        .forEach((item, index) => {
          gsap.from(item, {
            x: index % 2 === 0 ? -20 : 20,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          });
        });

      /* Gentle hero parallax */
      gsap.to(".about-hero-image", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#0b0b0b] text-[#f4f0e9] selection:bg-orange-500 selection:text-black"
    >
      {/* HERO */}
      <section className="about-hero relative isolate flex min-h-[650px] items-end overflow-hidden sm:min-h-[720px] lg:min-h-[800px]">
        <div className="absolute inset-0 -z-20 overflow-hidden bg-[#17130f]">
          <img
            src={FounderImage}
            alt="Mohammad Saif, founder of The Pizza Ovens by Saif"
            className="about-hero-image h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/45 to-black/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-transparent to-black/20" />

        <div className="absolute right-6 top-8 hidden text-right sm:block lg:right-12 lg:top-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/65">
            Craftsmanship / Engineering
          </span>
          <p className="mt-2 text-sm text-white/85">
            Built on experience since 2015
          </p>
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-5 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
          <div className="about-hero-kicker mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-orange-400 sm:text-xs">
            <span className="h-px w-9 bg-orange-500" />
            Meet the Founder
          </div>

          {/* Reduced heading size */}
          <h1 className="about-hero-title max-w-5xl font-serif text-[clamp(3rem,7.2vw,7rem)] leading-[0.92] tracking-[-0.055em]">
            Mohammad
            <br />
            <span className="text-[#e6a05d]">Saif.</span>
          </h1>

          <div className="about-hero-bottom mt-9 flex flex-col gap-6 border-t border-white/20 pt-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-white/85 sm:text-base">
                Founder — The Pizza Ovens by Saif
              </p>
              <p className="mt-2 max-w-xl font-serif text-xl leading-snug text-white/70 sm:text-2xl">
                Turning experience into quality craftsmanship.
              </p>
            </div>

            
<a
  href="/aboutus#founder-story"
  className="discover-story group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-orange-400"
>
  <span>Discover the story</span>

  <span className="discover-icon flex h-11 w-11 items-center justify-center rounded-full border border-orange-500/60 bg-orange-500/10 text-orange-400 transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-orange-400 group-hover:bg-orange-500 group-hover:text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  </span>
</a>
          </div>
        </div>
      </section>

      {/* FOUNDER INTRODUCTION */}
      <section
        id="founder-story"
        className="border-b border-white/10 bg-[#11100e] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="about-reveal">
            <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
              <span className="h-px w-7 bg-orange-500" />
              The Person Behind the Craft
            </p>
            <h2 className="max-w-md font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A journey built on experience.
            </h2>
          </div>

          <div className="space-y-6">
            <LineReveal
              text="A high-quality pizza oven is built on more than appearance. Its performance depends on thoughtful engineering, suitable materials, effective insulation, and careful construction."
              className="font-serif text-2xl leading-relaxed text-[#f4f0e9] sm:text-3xl"
            />

            <LineReveal
              text="My journey in the pizza oven manufacturing industry began in 2015. What started as a learning experience gradually developed into a deeper understanding of the engineering, materials, and craftsmanship behind professional pizza ovens."
              className="text-sm leading-8 text-white/65 sm:text-base sm:leading-9"
              delay={0.05}
            />

            <LineReveal
              text="During the early stages of my career, I worked in partnership with an Italian pizza oven manufacturing company. This experience helped me develop practical knowledge of oven design, heating calculations, heat distribution, insulation systems, material selection, and manufacturing techniques."
              className="text-sm leading-8 text-white/65 sm:text-base sm:leading-9"
              delay={0.08}
            />

            <LineReveal
              text="With this experience and technical foundation, I established The Pizza Ovens by Saif with a clear vision: to manufacture customized pizza ovens that combine quality craftsmanship, reliable performance, and practical design."
              className="text-sm leading-8 text-white/65 sm:text-base sm:leading-9"
              delay={0.08}
            />

            <div className="flex items-center gap-4 pt-3">
              <span className="h-px w-12 bg-orange-500" />
              <span className="text-xs uppercase tracking-[0.22em] text-orange-400">
                Mohammad Saif / Founder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="journey-section relative overflow-hidden bg-[#0b0b0b] px-5 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-orange-500/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="about-reveal mb-20 max-w-2xl sm:mb-28">
            <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
              <span className="h-px w-7 bg-orange-500" />
              The Journey
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              From learning
              <br />
              <span className="text-white/35">to building.</span>
            </h2>
            <LineReveal
              text="Every stage has contributed to a deeper understanding of what makes a pizza oven reliable, functional, and well-crafted."
              className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base sm:leading-8"
            />
          </div>

          <div className="relative">
            <div className="absolute bottom-5 left-[15px] top-5 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
            <div className="journey-line-fill absolute bottom-5 left-[15px] top-5 w-px origin-top bg-orange-500 sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-14 sm:space-y-20">
              {journey.map((item, index) => (
                <article
                  key={item.title}
                  className="journey-item relative grid grid-cols-[32px_1fr] gap-5 sm:grid-cols-2 sm:gap-16"
                >
                  <div className="absolute left-[9px] top-2 z-10 h-[13px] w-[13px] rounded-full border-2 border-orange-500 bg-[#0b0b0b] shadow-[0_0_18px_rgba(249,115,22,0.25)] sm:left-1/2 sm:-translate-x-1/2" />

                  <div
                    className={`hidden sm:flex ${
                      index % 2 === 0
                        ? "flex-col items-end pr-4 text-right"
                        : "flex-col items-start pl-4 text-left"
                    }`}
                  >
                    <span className="font-serif text-5xl text-orange-400/80 lg:text-7xl">
                      {item.year}
                    </span>
                    <span className="mt-3 text-[10px] uppercase tracking-[0.24em] text-white/35">
                      {item.tag}
                    </span>
                  </div>

                  <div
                    className={`min-w-0 ${
                      index % 2 === 0
                        ? "sm:pl-4"
                        : "sm:col-start-1 sm:row-start-1 sm:pr-4 sm:text-right"
                    }`}
                  >
                    <div className="mb-3 sm:hidden">
                      <span className="font-serif text-3xl text-orange-400">
                        {item.year}
                      </span>
                    </div>

                    <p className="mb-3 hidden text-[10px] uppercase tracking-[0.24em] text-orange-400 sm:block">
                      {item.tag}
                    </p>

                    <h3 className="font-serif text-2xl leading-tight sm:text-3xl lg:text-4xl">
                      {item.title}
                    </h3>

                    <LineReveal
                      text={item.description}
                      className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE MANUFACTURE */}
      <section className="border-y border-white/10 bg-[#11100e] px-5 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="about-reveal mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
                <span className="h-px w-7 bg-orange-500" />
                What We Manufacture
              </p>
              <h2 className="font-serif text-4xl leading-tight sm:text-6xl">
                Designed around
                <br />
                <span className="text-white/35">your requirements.</span>
              </h2>
            </div>

            <LineReveal
              text="Customized oven solutions for hospitality businesses, professional kitchens, and residential spaces."
              className="max-w-sm text-sm leading-7 text-white/55 sm:text-base"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.number}
                className="group overflow-hidden border border-white/10 bg-[#171512] transition-colors duration-500 hover:border-orange-500/50"
              >
                <div className="relative aspect-[4/4.2] overflow-hidden bg-[#201c17]">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171512] via-transparent to-transparent opacity-70" />
                  <span className="absolute left-5 top-5 text-xs tracking-[0.2em] text-orange-400">
                    / {category.number}
                  </span>
                  <span className="absolute bottom-4 right-5 text-2xl text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-400">
                    ↗
                  </span>
                </div>

                <div className="p-5 pb-7 sm:p-6">
                  <h3 className="font-serif text-xl sm:text-2xl">
                    {category.title}
                  </h3>
                  <LineReveal
                    text={category.description}
                    className="mt-3 text-sm leading-6 text-white/50"
                  />
                  <div className="mt-6 h-px w-8 bg-orange-500/70 transition-all duration-500 group-hover:w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY APPROACH */}
      <section className="bg-[#0b0b0b] px-5 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="about-reveal">
            <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
              <span className="h-px w-7 bg-orange-500" />
              Our Approach to Quality
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">
              Details matter.
              <br />
              <span className="text-white/35">Performance follows.</span>
            </h2>
            <LineReveal
              text="Every project begins with understanding the customer's needs. The aim is to balance functionality, durability, design, and cooking performance."
              className="mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-base sm:leading-8"
            />
          </div>

          <div>
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="group grid grid-cols-[44px_1fr] gap-4 border-t border-white/15 py-7 sm:grid-cols-[60px_1fr] sm:gap-6 sm:py-9"
              >
                <span className="pt-1 text-xs tracking-[0.15em] text-orange-400">
                  {principle.number}
                </span>
                <div>
                  <h3 className="font-serif text-2xl transition-colors duration-300 group-hover:text-orange-300 sm:text-3xl">
                    {principle.title}
                  </h3>
                  <LineReveal
                    text={principle.text}
                    className="mt-3 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8"
                  />
                </div>
              </div>
            ))}
            <div className="border-t border-white/15" />
          </div>
        </div>
      </section>

      {/* SERVING INDIA */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#15120e] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[100px]" />

        <div className="about-reveal relative mx-auto grid max-w-[1400px] gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
              <span className="h-px w-7 bg-orange-500" />
              Serving Customers Across India
            </p>
            <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-5xl lg:text-6xl">
              From the first discussion to the final installation.
            </h2>
            <LineReveal
              text="We work with restaurants, hospitality businesses, and restaurant chains on customized oven projects. Manufacturing, delivery, and installation support are provided according to project requirements, with a focus on dependable service and lasting relationships."
              className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8"
            />
          </div>

          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-orange-500/40 sm:h-36 sm:w-36">
            <div className="text-center">
              <span className="block font-serif text-3xl text-orange-400 sm:text-4xl">
                IN
              </span>
              <span className="mt-2 block text-[9px] uppercase tracking-[0.2em] text-white/60">
                Across India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="relative px-5 py-28 sm:px-10 sm:py-40 lg:px-16 lg:py-48">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.07),transparent_60%)]" />

        <div className="about-reveal relative mx-auto max-w-5xl text-center">
          <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-orange-400 sm:text-xs">
            Looking Ahead
          </p>

          <h2 className="font-serif text-4xl leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
            A vision built on
            <br />
            <span className="text-orange-400">
              continuous improvement.
            </span>
          </h2>

          <LineReveal
            text="My vision is to establish The Pizza Ovens by Saif as a trusted name in pizza oven manufacturing, recognized for technical expertise, customized solutions, quality craftsmanship, and customer-focused service. The journey that began in 2015 continues with the same commitment to learning, improving, and creating better oven solutions for businesses and individuals."
            className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8"
          />

          <div className="mx-auto mt-12 h-px w-16 bg-orange-500" />

          <p className="mt-8 font-serif text-2xl leading-relaxed text-[#f4f0e9] sm:text-3xl lg:text-4xl">
            Built on Experience.
            <br className="sm:hidden" /> Driven by Engineering.
            <br />
            <span className="text-orange-400">
              Committed to Quality.
            </span>
          </p>

          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/35 sm:text-xs">
            The Pizza Ovens by Saif
          </p>
        </div>
      </section>
    </main>
  );
}
