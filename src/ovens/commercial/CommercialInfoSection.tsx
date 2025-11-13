import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Benefit from "../../assets/benefitthumb.png"; // optional
gsap.registerPlugin(ScrollTrigger);

export default function CommercialInfoSection() {
  // form state (simple example — adapt to your real handlers)
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // call your API / email logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  // refs for GSAP
  const rootRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column reveal (title, paragraphs)
      gsap.from(contentRef.current?.querySelectorAll("[data-scroll]") ?? [], {
        opacity: 0,
        y: 36,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Sticky card reveal (form)
      gsap.from(formRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      // Optional subtle item reveal for hr blocks (if you want)
      gsap.utils.toArray(".info-block").forEach((el: any) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="relative w-screen bg-white overflow-hidden">
      {/* dark rounded panel like ilforno */}
      <div className="w-full rounded-[40px] overflow-hidden bg-[#0b0b0b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-20 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column (content) */}
            <div ref={contentRef} className="lg:col-span-8">
              <h2 data-scroll className="text-[clamp(32px,3.8vw,56px)] leading-tight font-light mb-6 font-poppin">
                About Commercial Pizza Oven
              </h2>

              <p data-scroll className="text-[16px] md:text-[18px] text-gray-300 leading-[1.8] tracking-[0.02em] mb-6 font-inter max-w-3xl">
                The Pizza Oven BY Saif the commercial pizza ovens are the modern evolution of traditional Italian ovens,
                designed for professional kitchens: restaurant, pizzeria and catering. Those ovens bring together centuries
                of Italian craftsmanship with cutting edge materials and engineering practices. Marco's ovens deliver
                exceptional cooking, heat retention and efficiency—perfect for high-volume cooking.
              </p>

              <h3 data-scroll className="text-[clamp(20px,2.2vw,28px)] font-normal text-white mb-4 tracking-[0.015em] font-poppins">
                Types of Commercial Ovens
              </h3>

              <p data-scroll className="text-[16px] md:text-[18px] text-gray-300 leading-[1.8] tracking-[0.02em] mb-6 font-inter max-w-3xl">
                Choose from high-output brick ovens or efficient portable ovens—each designed for demanding, high-volume use.
                Every commercial pizza oven offers unmatched performance, durability, and energy efficiency, tailored for
                restaurants, pizzerias, food trucks, and catering kitchens.
              </p>

              <hr className="border-gray-700 my-6" />

              <div data-scroll className="mb-6 info-block">
                <h4 className="text-[clamp(20px,2.2vw,28px)] font-normal text-white mb-4 tracking-[0.015em] font-poppins">
                  Brick ovens
                </h4>
                <p className="text-[16px] md:text-[18px] text-gray-300 leading-[1.8] tracking-[0.02em] mb-6 font-inter max-w-3xl">
                  Brick ovens offer the highest output and heat retention, with minimal maintenance—perfect for pizzerias,
                  restaurants, and breweries where long-term performance and productivity are essential.
                </p>
              </div>

              <hr className="border-gray-700 my-6" />

              <div data-scroll className="info-block">
                <h4 className="text-[clamp(20px,2.2vw,28px)] font-normal text-white mb-4 tracking-[0.015em] font-poppins">
                  Portable Ovens
                </h4>
                <p className="text-[16px] md:text-[18px] text-gray-300 leading-[1.8] tracking-[0.02em] mb-6 font-inter max-w-3xl">
                  Portable ovens are compact, lightweight, and cost-effective—ideal for smaller restaurants, pizza corners,
                  cafés, and catering services where portability and efficiency take priority over high output.
                </p>
              </div>
            </div>

            {/* Right column (sticky contact card) */}
            <aside className="lg:col-span-4">
              <div className="mx-auto md:mx-0 md:sticky md:top-10" style={{ maxWidth: 360 }}>
                <div ref={formRef} className="bg-[#1f1f1f] border border-gray-800 rounded-3xl p-6 shadow-xl md:min-h-[420px]">
                  <h5 className="text-[clamp(20px,2vw,26px)] font-normal text-white mb-5 tracking-[0.02em] font-poppins">
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
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
