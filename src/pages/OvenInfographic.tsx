import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import OvenInfographic from "../assets/oven-infographic.png";

const revealEase = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    number: "01",
    title: "Precision Heat",
    description:
      "A cooking chamber designed around high-temperature performance.",
    icon: "flame",
  },
  {
    number: "02",
    title: "Multi-Layer Construction",
    description:
      "Explore the outer dome, insulation and firebrick layers.",
    icon: "layers",
  },
  {
    number: "03",
    title: "Built for Performance",
    description:
      "A robust base, integrated burner concept and practical controls.",
    icon: "settings",
  },
];

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = "",
  delay = 0,
}) => {
  const words = text.split(/\s+/);

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.15,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.075,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${index}-${word}`}>
          <motion.span
            className="inline-block"
            aria-hidden="true"
            variants={{
              hidden: {
                opacity: 0,
                y: 14,
                filter: "blur(5px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.55,
                  ease: revealEase,
                },
              },
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12h14M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureIcon = ({ type }: { type: string }) => {
  if (type === "flame") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 22c5 0 8-3.5 8-8-0.0-3.5-2.4-6.1-4.5-8.5.1 3-1.3 4.2-2.5 4.8C13 6.3 11.2 3.5 8.2 2 9 6.8 4 9.2 4 14c0 4.5 3.2 8 8 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 18c1.7 0 3-1.3 3-3 0-1.3-.9-2.3-1.8-3.3-.2 1.2-.8 1.7-1.5 2-1-1-1.5-1.7-1.7-2.7-.4 1.6-1 2.5-1 4 0 1.7 1.3 3 3 3Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "layers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m12 3 9 5-9 5-9-5 9-5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="m3 12 9 5 9-5M3 16l9 5 9-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m19.4 15 .1.1 1.1.9-1.5 2.6-1.4-.5a8 8 0 0 1-1.8 1l-.3 1.5h-3l-.3-1.5a8 8 0 0 1-1.8-1l-1.4.5-1.5-2.6 1.1-.9a7 7 0 0 1 0-2l-1.1-.9 1.5-2.6 1.4.5a8 8 0 0 1 1.8-1l.3-1.5h3l.3 1.5a8 8 0 0 1 1.8 1l1.4-.5 1.5 2.6-1.1.9a7 7 0 0 1 0 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const OvenShowcase: React.FC = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if (!isViewerOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsViewerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewerOpen]);

  return (
    <>
      <section
        id="oven-showcase"
        className="relative isolate overflow-hidden bg-[#080808] py-20 text-white sm:py-24 lg:py-32"
      >
        {/* Ambient background lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#ff6a00]/[0.07] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#ff8a00]/[0.06] blur-[120px]"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Section eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: revealEase,
            }}
            className="mb-12 flex items-center gap-3 sm:mb-16"
          >
            <span className="h-px w-10 bg-[#ff781f]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ff934d]">
              <WordReveal text="Engineered around fire" />
            </span>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 xl:gap-20">
            {/* LEFT: Product information */}
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: revealEase }}
                className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/45"
              >
                <WordReveal text="The art of authentic pizza" />
              </motion.p>

              <h2 className="max-w-xl text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl xl:text-6xl">
                <WordReveal text="Serious heat." />
                <br />
                <WordReveal
                  text="Exceptional craft."
                  className="bg-gradient-to-r from-[#ffb36b] via-[#ff812e] to-[#e85b10] bg-clip-text text-transparent"
                  delay={0.12}
                />
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                <WordReveal
                  text="Discover the engineering behind our pizza oven concept. From its layered dome and firebrick chamber to its cooking surface and sturdy base, every component has a purpose."
                  delay={0.12}
                />
              </p>

              {/* Features */}
              <div className="mt-9 divide-y divide-white/[0.09] border-y border-white/[0.09]">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.number}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: revealEase,
                    }}
                    className="group flex gap-4 py-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ff812e]/20 bg-[#ff812e]/[0.07] text-[#ff934d] transition-colors duration-300 group-hover:border-[#ff812e]/50 group-hover:bg-[#ff812e]/[0.13]">
                      <div className="h-5 w-5">
                        <FeatureIcon type={feature.icon} />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-medium tracking-[0.16em] text-[#ff934d]/70">
                          {feature.number}
                        </span>

                        <h3 className="text-sm font-semibold tracking-wide text-white sm:text-base">
                          <WordReveal text={feature.title} />
                        </h3>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-white/50">
                        <WordReveal
                          text={feature.description}
                          delay={0.08}
                        />
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, ease: revealEase }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#ff781f] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#ff994f] hover:shadow-[0_0_35px_rgba(255,120,31,0.18)]"
                >
                  Enquire Now

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsViewerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm text-white/75 transition-colors duration-300 hover:border-[#ff812e]/50 hover:text-white"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7V3h4M17 3h4v4M21 17v4h-4M7 21H3v-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>

                  Explore image
                </button>
              </motion.div>

              <p className="mt-5 text-[11px] leading-5 text-white/35">
                Product features and specifications should be confirmed for
                the final production model.
              </p>
            </div>

            {/* RIGHT: Scroll-triggered image reveal */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: 0.8,
                ease: revealEase,
              }}
              className="relative min-w-0"
            >
              {/* Ambient image glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-8 rounded-full bg-[#ff781f]/[0.09] blur-[85px]"
              />

              <motion.button
                type="button"
                onClick={() => setIsViewerOpen(true)}
                aria-label="Open oven infographic in full screen"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0.75, y: 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.6, ease: revealEase },
                  },
                }}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/[0.12] bg-[#101010] text-left shadow-[0_25px_100px_rgba(0,0,0,0.45)] outline-none transition-colors duration-500 hover:border-[#ff812e]/50 focus-visible:ring-2 focus-visible:ring-[#ff812e] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808] sm:rounded-3xl"
              >
                <motion.div
                  variants={{
                    hidden: { clipPath: "inset(0 0 100% 0)" },
                    visible: {
                      clipPath: "inset(0 0 0% 0)",
                      transition: { duration: 1.6, ease: revealEase },
                    },
                  }}
                >
                  <img
                    src={OvenInfographic}
                    alt="Exploded technical view of a premium pizza oven showing its components and construction"
                    className="block h-auto w-full object-contain"
                    loading="eager"
                  />
                </motion.div>

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-transparent to-black/5 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Image caption */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-4 sm:p-6">
                  {/* <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff934d] sm:text-xs">
                      Inside the engineering
                    </p>

                    <p className="mt-1 text-sm font-medium text-white sm:text-base">
                      Explore every component
                    </p>
                  </div> */}

                  {/* <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#ff812e] group-hover:bg-[#ff812e] group-hover:text-black">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span> */}
                </div>
              </motion.button>

              <div className="mt-4 flex items-center justify-between gap-3 px-1">
                
                  <span className="flex items-center gap-2 text-xs text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff812e]" />
                  Tap to enlarge
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-screen image viewer */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Full-screen oven infographic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsViewerOpen(false);
              }
            }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6 lg:p-10"
          >
            {/* Viewer header */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-4 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff934d]">
                  Product engineering
                </p>

                <p className="mt-1 text-xs text-white/50">
                  Oven construction overview
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsViewerOpen(false)}
                aria-label="Close full-screen image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition-colors duration-200 hover:border-[#ff812e] hover:bg-[#ff812e] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff812e]"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m18 6-12 12M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Full-size image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.35,
                ease: revealEase,
              }}
              className="flex h-full w-full items-center justify-center pb-5 pt-16"
            >
              <img
                src={OvenInfographic}
                alt="Full-size exploded pizza oven infographic with detailed component labels"
                className="max-h-full max-w-full select-none object-contain"
                draggable={false}
              />
            </motion.div>

            <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] tracking-wide text-white/35">
              Press ESC or select × to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OvenShowcase;