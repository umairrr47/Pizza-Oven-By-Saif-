// src/sections/CommercialCostSection.tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendEmail } from "../../lib/emailService"; // <-- adjust path

gsap.registerPlugin(ScrollTrigger);

type Props = {
  className?: string;
};

export default function PortableAbout({ className = "" }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const featuresUlRef = useRef<HTMLUListElement | null>(null);
  const ovenTypesRef = useRef<HTMLDivElement | null>(null);
  const formBoxRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // EmailJS states
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.querySelectorAll("h2, p, .mt-4"),
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (featuresUlRef.current) {
        const listItems = gsap.utils.toArray(featuresUlRef.current.children);
        listItems.forEach((el: any) => {
          gsap.fromTo(
            el,
            { x: 40, opacity: 0, filter: "blur(3px)" },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );

          el.addEventListener("mouseenter", () =>
            gsap.to(el, { x: 6, duration: 0.22 })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(el, { x: 0, duration: 0.28 })
          );
        });
      }

      if (ovenTypesRef.current) {
        gsap.fromTo(
          ovenTypesRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ovenTypesRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (formBoxRef.current) {
        gsap.fromTo(
          formBoxRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formBoxRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ------------------------------
  // EMAILJS SUBMIT LOGIC
  // ------------------------------
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    try {
      const fd = new FormData(e.currentTarget);

      // <-- Using the SAME payload keys as your working SaifFaq component
      const payload = {
        full_name: fd.get("full-name")?.toString() ?? fd.get("name")?.toString() ?? "",
        phone_number: fd.get("phone-number")?.toString() ?? fd.get("phone")?.toString() ?? "",
        email_address: fd.get("email-address")?.toString() ?? fd.get("email")?.toString() ?? "",
        selected_product: fd.get("selected-product")?.toString() ?? "",
        company: fd.get("company")?.toString() ?? "",
        page_link:
          (fd.get("page-link")?.toString() as string) ||
          (typeof window !== "undefined" ? window.location.href : ""),
        source: "PortableAbout",
        message: fd.get("message")?.toString() ?? "",
        full_summary: JSON.stringify(Object.fromEntries(fd as any)),
      };

      if (import.meta.env && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("[PortableAbout] sending payload:", payload);
      }

      const result = await sendEmail(payload);

      if (result.ok) {
        setStatus("Thank you! Your enquiry has been submitted.");
        formRef.current?.reset();
      } else {
        // try to extract useful message from error object
        let errMsg = "Something went wrong. Please try again.";
        const err = (result as any).error;
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
        if (import.meta.env && import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.error("[PortableAbout] send failed detail:", result.error);
        }
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("Error sending message.");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  // ------------------------------
  // JSX
  // ------------------------------
  return (
    <section ref={rootRef} className={`commercial-about-section commercial-cost-section bg-white ${className}`}>
      <div className="max-w-[1920px] mx-auto bg-[#0b0b0b] com-padding rounded-section px-6 sm:px-12">
        
        <div className="mx-auto px-4 sm:px-12 mx-2 max-w-[1100px]">
          
          <div className="flex flex-wrap lg:flex-nowrap justify-between relative text-white py-12 gap-8">
            
            {/* LEFT COLUMN */}
            <div ref={leftRef} className="w-full lg:w-[65%] pr-0 lg:pr-2 space-y-10">
              
              <div className="section-heading overflow-hidden">
                <h2
                  className="text-[clamp(30px,3.2vw,56px)] leading-[1.08] font-light text-gray-100 mb-4"
                  style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                >
                  Cost of Portable Wood-Fired
                  <br /> The Pizza Oven by Saif
                </h2>

                <div className="mt-3">
                  <p className="text-[16px] md:text-[17px] text-gray-300 leading-[1.6] max-w-[780px]">
                    Investing in a Saif Pizza oven means choosing performance, authenticity, durability
                    <br /> and guidance with peace of mind.
                  </p>
                </div>
              </div>

              <ul
                ref={featuresUlRef}
                className="mt-8 flex flex-wrap gap-6 text-sm text-[16px] md:text-[17px] text-gray-300"
              >
                {["After-Sales Support", "Warranty", "On-Time Delivery", "Pan-India Presence"].map((text) => (
                  <li key={text} className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" stroke="#e11d2b" strokeWidth="1.6" />
                      <path
                        d="M7 12.5l2.5 2.5L17 8.5"
                        stroke="#e11d2b"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="my-6 border-t border-gray-600/30" />

              <div ref={ovenTypesRef} className="oven-types mt-8 space-y-6 text-gray-300">
                <article>
                  <h4 className="text-[clamp(20px,2vw,28px)] font-normal text-white mb-2">
                    Cost Of A Brick Oven
                  </h4>
                  <p className="text-[16px] md:text-[17px]">
                    Prices vary based on size and custom features. Fill out our enquiry form for a detailed catalogue.
                  </p>
                </article>

                <div className="border-t border-gray-600/20 my-4" />

              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="w-full lg:w-[32%] mt-8 lg:mt-0">
              <div className="relative">
                <div ref={formBoxRef} className="form-box sticky top-8">
                  
                  <div className="bg-[#292929] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
                    
                    <h5 className="text-[clamp(20px,2vw,28px)] font-normal text-gray-100 mb-2">
                      We’re Here to Help
                    </h5>

                    <form
                      ref={formRef}
                      className="space-y-3"
                      onSubmit={handleSubmit}
                    >
                      <div>
                        <input
                          name="full-name"
                          placeholder="Your Full Name"
                          required
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-gray-200"
                        />
                      </div>

                      <div>
                        <input
                          name="phone-number"
                          placeholder="Mobile Number"
                          required
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-gray-200"
                        />
                      </div>

                      <div>
                        <input
                          name="email-address"
                          placeholder="Email Address"
                          required
                          type="email"
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-gray-200"
                        />
                      </div>

                      <div>
                        <textarea
                          name="message"
                          placeholder="Message"
                          rows={3}
                          className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-gray-200 resize-none"
                        />
                      </div>

                      {/* hidden fields */}
                      <input type="hidden" name="company" />
                      <input type="hidden" name="page-link" />

                      {status && (
                        <p className="text-gray-300 text-sm pt-1">{status}</p>
                      )}

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full py-3 rounded-full bg-[#e30715] text-white font-medium disabled:opacity-60"
                        >
                          {sending ? "Sending..." : "Submit"}
                        </button>
                      </div>
                    </form>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
