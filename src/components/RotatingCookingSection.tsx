
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/RotatingCookingSection.css";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    title: "360° rotational movement",
    description:
      "A rotating cooking platform designed for controlled baking.",
  },
  {
    number: "02",
    title: "Consistent heat exposure",
    description:
      "Rotate the cooking surface to help pizzas bake more evenly.",
  },
  {
    number: "03",
    title: "Precision in every cycle",
    description:
      "A mechanical detail engineered around the cooking process.",
  },
];

export default function RotatingCookingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Start the mechanical rotation independently of scroll animations.
// Use section-scoped selectors so this component targets its own elements.
const turntable = section.querySelector(".rc-turntable");
const outerOrbit = section.querySelector(".rc-orbit-outer");
const coreGlow = section.querySelector(".rc-core-glow");

if (turntable) {
  gsap.to(turntable, {
    rotation: "+=360",
    duration: 32,
    ease: "none",
    repeat: -1,
    transformOrigin: "50% 50%",
    force3D: true,
  });
}

if (outerOrbit) {
  gsap.to(outerOrbit, {
    rotation: "+=360",
    duration: 46,
    ease: "none",
    repeat: -1,
    transformOrigin: "50% 50%",
    force3D: true,
  });
}

if (coreGlow) {
  gsap.to(coreGlow, {
    opacity: 0.55,
    scale: 1.12,
    duration: 2.6,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

// Reduced-motion preference should skip the scroll-driven intro,
// not prevent the mechanical rotation from starting.
if (reduceMotion) return;


      // Reset elements to their initial animation states.
      gsap.set(".rc-eyebrow", { opacity: 0, y: 12 });

      gsap.set(".rc-heading-line", {
        opacity: 0,
        yPercent: 110,
      });

      gsap.set(".rc-description-line", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".rc-feature", {
        opacity: 0,
        y: 24,
      });

      gsap.set(".rc-visual", {
        opacity: 0,
        scale: 0.94,
      });

      gsap.set(".rc-bottom-note", {
        opacity: 0,
        y: 12,
      });

      /*
       * Every scroll movement controls the animation.
       * Scroll down = reveal.
       * Scroll up = reverse.
       */
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "center 28%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      reveal
        .to(
          ".rc-eyebrow",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0
        )
        .to(
          ".rc-heading-line",
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            stagger: 0.22,
            ease: "power3.out",
          },
          0.15
        )
        .to(
          ".rc-description-line",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.18,
            ease: "power2.out",
          },
          0.85
        )
        .to(
          ".rc-feature",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.22,
            ease: "power2.out",
          },
          1.5
        )
        .to(
          ".rc-visual",
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.45
        )
        .to(
          ".rc-bottom-note",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          2.3
        );

      // Rotating oven mechanism.
      // This rotation continues independently of scroll.
      gsap.to(".rc-turntable", {
        rotation: "+=360",
        duration: 32,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(".rc-orbit-outer", {
        rotation: "+=360",
        duration: 46,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(".rc-core-glow", {
        opacity: 0.55,
        scale: 1.12,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Progress line follows the section's scroll position.
      gsap.fromTo(
        ".rc-progress-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".rc-features",
            start: "top 85%",
            end: "bottom 45%",
            scrub: 0.5,
          },
        }
      );

      // Refresh trigger measurements after layout is ready.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rc-section"
      aria-labelledby="rc-heading"
    >
      <div className="rc-noise" aria-hidden="true" />
      <div className="rc-ambient rc-ambient-left" aria-hidden="true" />
      <div className="rc-ambient rc-ambient-right" aria-hidden="true" />

      <div className="rc-container">
        <div className="rc-copy">
          <div className="rc-eyebrow">
            <span className="rc-eyebrow-dot" />
            <span>ENGINEERED FOR BETTER BAKING</span>
            <span className="rc-eyebrow-line" />
            <span className="rc-eyebrow-index">TECH / 001</span>
          </div>

          <h2 id="rc-heading" className="rc-heading">
            <span className="rc-heading-mask">
              <span className="rc-heading-line rc-heading-white">
                360°
              </span>
            </span>

            <span className="rc-heading-mask">
              <span className="rc-heading-line rc-heading-orange">
                COOKING
              </span>
            </span>

            <span className="rc-heading-mask">
              <span className="rc-heading-line rc-heading-orange">
                CONTROL<span className="rc-period">.</span>
              </span>
            </span>
          </h2>

          <div className="rc-description">
            <p className="rc-description-line">
              More control over the cooking surface.
            </p>
            <p className="rc-description-line">
              A rotating base built around the art of
            </p>
            <p className="rc-description-line">
              achieving a beautifully baked pizza.
            </p>
          </div>

          <div className="rc-features">
            {features.map((feature) => (
              <div className="rc-feature" key={feature.number}>
                <span className="rc-feature-number">
                  {feature.number}
                </span>

                <div className="rc-feature-copy">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>

                <span className="rc-feature-mark" aria-hidden="true">
                  ↗
                </span>

                {feature.number === "01" && (
                  <span className="rc-progress-track" aria-hidden="true">
                    <span className="rc-progress-fill" />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="rc-bottom-note">
            <span className="rc-bottom-rule" />
            <span>MECHANICAL PRECISION / BUILT TO PERFORM</span>
          </div>
        </div>

        <div className="rc-visual">
          <div className="rc-visual-top">
            <span>ROTATIONAL SYSTEM</span>
            <span className="rc-live">
              <span />
              SYSTEM OVERVIEW
            </span>
          </div>

          <div className="rc-machine">
            <div className="rc-orbit rc-orbit-outer">
              <span className="rc-orbit-marker rc-marker-top" />
              <span className="rc-orbit-marker rc-marker-bottom" />
            </div>

            <div className="rc-orbit rc-orbit-inner" />

            <div className="rc-turntable">
              <div className="rc-metal-rim">
                <span className="rc-rivet rc-rivet-1" />
                <span className="rc-rivet rc-rivet-2" />
                <span className="rc-rivet rc-rivet-3" />
                <span className="rc-rivet rc-rivet-4" />

                <div className="rc-metal-disc">
                  <div className="rc-disc-texture" />
                  <div className="rc-disc-ring" />
                  <div className="rc-disc-ring rc-disc-ring-inner" />

                  <span className="rc-bracket rc-bracket-top" />
                  <span className="rc-bracket rc-bracket-right" />
                  <span className="rc-bracket rc-bracket-bottom" />
                  <span className="rc-bracket rc-bracket-left" />

                  <div className="rc-core-glow" />

                  <div className="rc-core">
                    <span className="rc-core-arrows">↻</span>
                    <span className="rc-core-degree">360°</span>
                    <span className="rc-core-label">ROTATION</span>
                  </div>
                </div>
              </div>
            </div>

            <span className="rc-axis rc-axis-top" />
            <span className="rc-axis rc-axis-bottom" />
            <span className="rc-axis rc-axis-left" />
            <span className="rc-axis rc-axis-right" />
          </div>

          <div className="rc-visual-bottom">
            <div>
              <span className="rc-visual-label">01 / MOVEMENT</span>
              <strong>FULL ROTATION</strong>
            </div>

            <div className="rc-angle">
              <span>360</span>
              <sup>°</sup>
            </div>
          </div>

          <span className="rc-corner rc-corner-tl" />
          <span className="rc-corner rc-corner-tr" />
          <span className="rc-corner rc-corner-bl" />
          <span className="rc-corner rc-corner-br" />
        </div>
      </div>

    </section>
  );
}
