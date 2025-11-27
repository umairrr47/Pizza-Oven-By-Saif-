// src/components/ContactSection.tsx
import React, { useRef, useState } from "react";
import { sendEmail } from "../lib/emailService"; // <-- adjust path if needed

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    // VERY IMPORTANT: run preventDefault immediately and defensively.
    try {
      e.preventDefault();
    } catch (err) {
      console.error("[ContactSection] preventDefault failed:", err);
      return; // if preventing default failed, bail to avoid navigation
    }

    // stop propagation in case something else is listening higher up
    try {
      if (typeof (e as any).stopPropagation === "function") (e as any).stopPropagation();
    } catch (err) {
      // not fatal — continue
      console.warn("[ContactSection] stopPropagation failed:", err);
    }

    setStatus(null);
    setSending(true);

    if (import.meta.env && import.meta.env.DEV) {
      console.debug("[ContactSection] handleSubmit called");
    }

    try {
      // prefer the attached ref if available (keeps behaviour stable if the event target is unexpected)
      const formElement = formRef.current ?? (e.currentTarget as HTMLFormElement);
      const fd = new FormData(formElement);

      const payload = {
        full_name: fd.get("full-name")?.toString() ?? "",
        phone_number: fd.get("phone-number")?.toString() ?? "",
        selected_product: fd.get("selected-product")?.toString() ?? "",
        message: fd.get("message")?.toString() ?? "",
        email_address: fd.get("email-address")?.toString() ?? "",
        city: fd.get("city")?.toString() ?? "",
        page_link: typeof window !== "undefined" ? window.location.href : "",
        source: "ContactSection",
        full_summary: JSON.stringify(Object.fromEntries(fd as any)),
      };

      if (import.meta.env && import.meta.env.DEV) {
        console.debug("[ContactSection] payload:", payload);
      }

      const res = await sendEmail(payload);

      if (res.ok) {
        setStatus("Thanks — we received your enquiry.");
        // reset using the ref
        try {
          formRef.current?.reset();
        } catch (err) {
          // if reset fails, ignore
          console.warn("[ContactSection] form reset failed:", err);
        }
      } else {
        console.error("[ContactSection] Email send failed:", (res as any).error);
        let errMsg = "There was a problem sending your enquiry. Please try again.";

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
      }
    } catch (err) {
      console.error("[ContactSection] Unexpected error sending email:", err);
      setStatus("Unexpected error. Please check console and try again.");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 4500);
    }
  };

  return (
    <section className="bg-gray-50 text-gray-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <h2
            className="text-[clamp(26px,2.8vw,36px)] font-medium text-gray-900 mb-4"
            style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
          >
            Fill Out the Contact Form Below
          </h2>

          <p className="text-[15px] text-[#6b6b6b] leading-[1.8]">
            To reach Saif. Please ensure your email address is accurate, as minor typos may prevent a
            response (3-5% of inquiries may not be answered due to this)
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-10" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 items-start">
            {/* Left column labels */}
            <div className="space-y-8">
              {/* My name is */}
              <div>
                <label className="text-[22px] text-gray-700 inline-block mb-3" style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                  My name is
                </label>
                <div>
                  <input
                    name="full-name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2 text-[15px]"
                  />
                </div>
              </div>

              {/* Contact me back at */}
              <div>
                <label className="text-[22px] text-gray-700 inline-block mb-3" style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                  Contact me back at
                </label>
                <div>
                  <input
                    name="phone-number"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2 text-[15px]"
                  />
                </div>
              </div>

              {/* I'd like to discuss */}
              <div>
                <label className="text-[22px] text-gray-700 inline-block mb-3" style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                  I'd like to discuss
                </label>
                <div>
                  <select
                    name="selected-product"
                    defaultValue=""
                    className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2 text-[15px] appearance-none"
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    <option>Commercial Oven</option>
                    <option>Residential Oven</option>
                    <option>Accessories</option>
                  </select>
                </div>
              </div>

              {/* Message (full width under left col on desktop) */}
              <div>
                <label className="text-[22px] text-gray-700 inline-block mb-3" style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                  Message
                </label>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={3}
                    className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2 text-[15px] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Right column inputs aligned to right like screenshot */}
            <div className="space-y-8">
              {/* Email */}
              <div className="md:text-right">
                <label className="text-[22px] text-gray-700 inline-block mb-3" style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                  Email
                </label>
                <div>
                  <input
                    name="email-address"
                    type="email"
                    placeholder="Email Address"
                    className="w-full md:w-[420px] bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2 text-[15px] md:ml-auto"
                  />
                </div>
              </div>

              {/* My city */}
              <div className="md:text-right">
                <label className="text-[22px] text-gray-700 inline-block mb-3" style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                  My city
                </label>
                <div>
                  <input
                    name="city"
                    type="text"
                    placeholder="City Name"
                    className="w-full md:w-[420px] bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-2 text-[15px] md:ml-auto"
                  />
                </div>
              </div>

              {/* empty space to vertically align */}
              <div className="h-6" />

              {/* Submit button (right aligned) */}
              <div className="md:flex md:justify-end items-center">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 bg-[#e21a25] hover:bg-[#d11720] text-white rounded-full px-6 py-3 text-[15px] shadow-md disabled:opacity-60"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-white/20" />
                  <span>{sending ? "Sending..." : "Submit"}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>

        {status && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">{status}</p>
          </div>
        )}
      </div>
    </section>
  );
}
