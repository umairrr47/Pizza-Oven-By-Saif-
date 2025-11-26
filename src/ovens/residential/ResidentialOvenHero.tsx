// src/components/HeroCarouselSection.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InstallProcessSection from "../commercial/InstallProcessSection";
import { sendEmail } from "../../lib/emailService"; // <-- adjust path if needed

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import images
import Image1 from "../../assets/Fimg1.png";
import Image2 from "../../assets/Fimg2.png";
import Image3 from "../../assets/Fimg3.png";
import Image4 from "../../assets/Italian.jpeg";
import Image5 from "../../assets/Napoli.png";

type Slide = { src: string; alt?: string; caption?: string };

const slidesDefault: Slide[] = [
  { src: Image1, alt: "Slide 1" },
  { src: Image2, alt: "Slide 2" },
  { src: Image3, alt: "Slide 3" },
  { src: Image4, alt: "Slide 4" },
  { src: Image5, alt: "Slide 5" },
];

const ResidentialOvenHero: React.FC<{
  slides?: Slide[];
  autoplay?: boolean;
  interval?: number;
}> = ({ slides = slidesDefault, autoplay = true, interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const len = slides.length;
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = window.setInterval(() => setIndex((i) => (i + 1) % len), interval);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [autoplay, interval, len]);

  const goPrev = () => setIndex((i) => (i - 1 + len) % len);
  const goNext = () => setIndex((i) => (i + 1) % len);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let startX = 0;
    let dist = 0;
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      startX = e.clientX;
    };
    const onPointerUp = (e: PointerEvent) => {
      dist = e.clientX - startX;
      if (dist > 60) goPrev();
      else if (dist < -60) goNext();
    };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, [len]);

  // GSAP simple mount animation for headings inside dark block
  useEffect(() => {
    if (!headingRef.current) return;
    const elems = Array.from(headingRef.current.querySelectorAll("[data-gsap]")) as HTMLElement[];
    if (!elems.length) return;
    gsap.fromTo(
      elems,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }
    );
  }, []);

  // GSAP ScrollTrigger for content animations
  useEffect(() => {
    if (!contentRef.current) return;
    const contentElems = Array.from(contentRef.current.querySelectorAll("[data-scroll]")) as HTMLElement[];
    contentElems.forEach((elem) => {
      gsap.fromTo(
        elem,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // GSAP ScrollTrigger for form
  useEffect(() => {
    if (!formRef.current) return;
    const st = gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      try {
        st.scrollTrigger?.kill();
        st.kill();
      } catch { }
    };
  }, []);

  // Contact form state (client-side only)
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // EmailJS send state & status
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const resetForm = () => setForm({ name: "", mobile: "", email: "", message: "" });

  // ---- UPDATED: sendEmail payload uses same template keys as other forms ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    const payload = {
      full_name: form.name || "",
      phone_number: form.mobile || "",
      email_address: form.email || "",
      message: form.message || "",
      selected_product: "", // no selected product here
      company: "", // no company input in this form — left blank
      page_link: typeof window !== "undefined" ? window.location.href : "",
      source: "ResidentialOvenHero",
      full_summary: JSON.stringify(
        {
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          message: form.message,
        },
        null,
        2
      ),
    };

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[ResidentialOvenHero] sending payload:", payload);
    }

    try {
      const res = await sendEmail(payload);
      if (res.ok) {
        setSubmitted(true);
        setStatus("Thanks — we received your enquiry.");
        resetForm();
        setTimeout(() => setSubmitted(false), 2500);
      } else {
        // try to extract useful message from error object
        let errMsg = "Failed to send. Please try again.";
        const err = (res as any).error;
        if (err) {
          if (err.status || err.statusText) {
            errMsg = `Error: ${err.status || ""} ${err.statusText || ""}`.trim();
          } else if (err.text) {
            errMsg = String(err.text).slice(0, 200);
          } else if (err.message) {
            errMsg = String(err.message);
          }
        }
        setStatus(errMsg);
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.error("[ResidentialOvenHero] send failed detail:", res.error);
        }
      }
    } catch (err) {
      console.error("Unexpected error sending email:", err);
      setStatus("Unexpected error. Please try again.");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 4500);
    }
  };

  return (
    <>
      {/* ---------- Carousel block (with consistent outer margins) ---------- */}
      <section className="pt-20 md:pt-24 pb-16 md:pb-20 px-4 sm:px-6 md:px-10 lg:px-12 bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-heading text-[clamp(18px,2vw,24px)] font-light text-gray-600 mb-4 tracking-widest uppercase"
            >
              For Best Wood Fired Pizza
            </motion.h3>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[clamp(36px,6vw,72px)] font-light leading-tight text-gray-900 font-neuehaas"
            >
              Residential Pizza Ovens
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mt-5 text-[clamp(14px,1.6vw,18px)] text-gray-600 leading-relaxed font-helvetica tracking-wide"
            >
              Saif’s residential ovens deliver the best cooking results and are designed for easy transportation, making them perfect for events, food trucks, and anyone who needs to relocate their oven.
            </motion.p>
          </div>

          {/* Carousel */}
          <div ref={containerRef} className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div className="relative w-full aspect-[1145/677] max-h-[677px] overflow-hidden rounded-2xl">
              {slides.map((s, i) => {
                const visible = i === index;
                return (
                  <AnimatePresence key={s.src}>
                    {visible && (
                      <motion.div
                        key={s.src}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={s.src}
                          alt={s.alt ?? `Slide ${i + 1}`}
                          width={1145}
                          height={677}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        {s.caption && (
                          <div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-10 max-w-lg">
                            <motion.h3
                              initial={{ y: 8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.12 }}
                              className="text-xl sm:text-2xl lg:text-3xl font-light backdrop-blur-sm bg-white/80 p-3 rounded-md text-gray-900"
                            >
                              {s.caption}
                            </motion.h3>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>

            {/* Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 sm:px-6">
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-md hover:bg-white/80 grid place-items-center transition shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="stroke-gray-900">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next slide"
                className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-md hover:bg-white/80 grid place-items-center transition shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="stroke-gray-900">
                  <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-10 h-2 rounded-full transition-all ${i === index ? "scale-110 bg-gray-900" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Full-bleed rounded dark block (consistent margins & responsive) ---------- */}
      <section className="relative w-screen bg-white overflow-hidden">
        <div className="w-full rounded-[60px] overflow-hidden bg-[#0b0b0b] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-20 pb-12 md:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left column (content) */}
              <div ref={contentRef} className="lg:col-span-8">
                <h2 data-scroll className="text-[clamp(28px,3.2vw,54px)] font-light leading-tight text-gray-100 font-neuehaas">
                  About Residential Pizza Oven
                </h2>

                <p data-scroll className="mt-5 text-[clamp(14px,1.6vw,18px)] text-[#BCBCBC] leading-relaxed font-helvetica tracking-wide">
                  At Saif Ovens, we blend authentic Italian craftsmanship with modern engineering.
                  Our premium medium-steel residential ovens ensure superior heat retention and efficiency.
                  Enjoy true pizzeria-quality cooking right at home.
                </p>

                <h3 data-scroll className="text-[clamp(22px,2.2vw,30px)] font-normal text-white mb-4 tracking-[0.015em] font-poppins">
                  Types of Residential Ovens
                </h3>

                <p data-scroll className="mt-5 text-[clamp(14px,1.6vw,18px)] text-[#BCBCBC] leading-relaxed font-helvetica tracking-wide">
                Select from the premium medium steel oven or the compact small steel oven, both offering exceptional performance, durability, and efficiency for home applications.

                </p>

                <hr className="border-gray-700 my-6" />

                <div data-scroll className="mb-6">
                  <h4 className="text-[clamp(22px,2.2vw,30px)] font-normal text-white mb-4 tracking-[0.015em] font-poppins">
                    Medium Steel Ovens
                  </h4>
                  <p className="mt-5 text-[clamp(14px,1.6vw,18px)] text-[#BCBCBC] leading-relaxed font-helvetica tracking-wide">
                   The medium steel oven is a high end residential oven, to use outdoor and indoor, giving the exceptional baking, even for Neapolitan pizza, and great aesthetic but more compact and cost effective as compared to a commercial oven.
                  </p>
                </div>

                <hr className="border-gray-700 my-6" />

                <div data-scroll>
                  <h4 className="text-[clamp(22px,2.2vw,30px)] font-normal text-white mb-4 tracking-[0.015em] font-poppins">
                    Small Steel Ovens
                  </h4>
                  <p className="text-[16px] md:text-[18px] text-gray-300 leading-[1.8] tracking-[0.02em] mb-6 font-inter">
                   The small steel ovens are table top ovens, to use outdoor or in ventilated areas, giving the exceptional baking, even for Neapolitan pizza, at a fraction of the cost and size as compared to professional ovens.
                  </p>
                </div>
              </div>

              {/* Right column (sticky contact card) */}
              <aside ref={formRef} className="lg:col-span-4">
                {/* wrapper: sticky on md+ only, static on mobile so it won't be cut */}
                <div className="mx-auto md:mx-0 md:sticky md:top-10" style={{ maxWidth: 320 }}>
                  <div className="bg-[#2A2A2A] border border-gray-800 rounded-3xl p-6 shadow-xl md:min-h-[420px]">
                    <h5 className="text-[clamp(22px,2vw,28px)] font-normal text-white mb-5 tracking-[0.02em] font-poppins">
                      We're Here to Help
                    </h5>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <label htmlFor="name" className="sr-only">Your Full Name</label>
                        <input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Full Name"
                          className="w-full bg-transparent border-0 border-b border-gray-700 placeholder-gray-500 text-gray-200 py-3 text-sm focus:outline-none focus:border-b-rose-500"
                          aria-label="Your Full Name"
                        />
                      </div>

                      <div>
                        <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                        <input
                          id="mobile"
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="Mobile Number"
                          className="w-full bg-transparent border-0 border-b border-gray-700 placeholder-gray-500 text-gray-200 py-3 text-sm focus:outline-none focus:border-b-rose-500"
                          aria-label="Mobile Number"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="w-full bg-transparent border-0 border-b border-gray-700 placeholder-gray-500 text-gray-200 py-3 text-sm focus:outline-none focus:border-b-rose-500"
                          aria-label="Email Address"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Message"
                          rows={2}
                          className="w-full bg-transparent border-0 border-b border-gray-700 placeholder-gray-500 text-gray-200 py-3 text-sm focus:outline-none focus:border-b-rose-500 resize-none"
                          aria-label="Message"
                        />
                      </div>

                      <div className="pt-4">
                        <motion.button
                          type="submit"
                          whileTap={{ scale: 0.98 }}
                          className="w-full rounded-full py-3 text-[15px] font-poppins font-light tracking-[0.05em] bg-gradient-to-b from-[#e30715] to-[#e30715] hover:from-[#ff1a23] hover:to-[#e30715] transition text-white shadow-md"
                        >
                          {submitted ? "Submitted" : "Submit"}
                        </motion.button>
                      </div>

                      {status && <p className="text-sm text-gray-300 mt-2">{status}</p>}
                    </form>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <InstallProcessSection />
    </>
  );
};

export default ResidentialOvenHero;
