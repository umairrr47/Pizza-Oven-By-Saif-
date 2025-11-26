// src/components/SaifFaq.jsx
import React, { useState, useRef } from "react";
import { sendEmail } from "../lib/emailService"; // adjust path if needed

const FAQS = [
  {
    id: 1,
    q: "What is the best oven to buy?",
    a: (
      <div className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em] pl-14">
        <p className="mb-4 text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
          All Saif's ovens deliver exceptional quality and perfectly baked pizzas. 
          However, the right choice depends on your specific needs. Key considerations include:
        </p>

        <ol className="pl-6 list-decimal space-y-2 text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
          <li>Expected output</li>
          <li>Mobility</li>
          <li>Budget</li>
        </ol>
      </div>
    ),
  },
  {
    id: 2,
    q: "Is wood better or gas?",
    a: (
      <>
        <p className=" pl-14 mb-3 text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
          Both wood and gas give great results, Saif ovens are engineered to give the right heat and cook the pizza perfectly. having both the option is important because wood gives the smoky flavor but with gas is easier to maintain the temperature and is faster to heat up specially if the wood is dump.
        </p>
      </>
    ),
  },
  {
    id: 3,
    q: "Why does Saif oven cost more than local brands?",
    a: (
      <>
        <p className="pl-14 text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
          Saif focuses on build quality, material selection, craftsmanship and
          long-term reliability. Cheaper local options often cut corners on
          insulation, steel thickness, or finish.
        </p>
      </>
    ),
  },
  {
    id: 4,
    q: "Is maintenance and after service provided?",
    a: (
      <>
        <p className="pl-14 text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
          Saif give timely and cost effective servicing because he understand how important is it and because he aim for happy customers and brand value instead of cutting corners.
        </p>
      </>
    ),
  },
  {
    id: 5,
    q: "Are the ovens customizable?",
    a: (
      <>
        <p className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
         The oven are fully customizable except of changes that compromise on performance, efficiency or durability.
        </p>
      </>
    ),
  },
];

export default function SaifFaq() {
  const [openId, setOpenId] = useState(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    try {
      const fd = new FormData(e.currentTarget);

      // Build payload matching your EmailJS template variable names
      const payload = {
        // include both variants where helpful — template prefers these names
        full_name: fd.get("full-name")?.toString() ?? fd.get("name")?.toString() ?? "",
        phone_number: fd.get("phone-number")?.toString() ?? fd.get("phone")?.toString() ?? "",
        email_address: fd.get("email-address")?.toString() ?? fd.get("email")?.toString() ?? "",
        selected_product: fd.get("selected-product")?.toString() ?? "",
        page_link: (fd.get("page-link")?.toString() as string) || (typeof window !== "undefined" ? window.location.href : ""),
        source: "SaifFaq",
        message: fd.get("message")?.toString() ?? "",
        full_summary: JSON.stringify(Object.fromEntries(fd)),
      };

      // Debug in dev (sendEmail also logs in dev)
      if (import.meta.env && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("[SaifFaq] sending payload:", payload);
      }

      const res = await sendEmail(payload);

      if (res?.ok) {
        setStatus("Thanks — we received your enquiry.");
        // reset form fields
        formRef.current?.reset();
      } else {
        console.error("Email send failed:", res?.error);
        setStatus("There was a problem sending your enquiry. Please try again.");
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
    <section className="w-full bg-white py-16">
      <div className="max-w-[1250px] mx-auto px-4 md:px-6 flex flex-col md:flex-row md:justify-between gap-10">
        {/* LEFT — FAQ */}
        <div className="md:w-2/3">
          <h2
            className="text-[40px] font-medium text-gray-900 mb-2"
            style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
          >
            Frequently Asked Questions
          </h2>

          <p className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
            Here are answers to some common queries. Have more?
            <br />
            Reach out anytime.
          </p>

          <div className="mt-10 space-y-6">
            {FAQS.map((f, idx) => {
              const isOpen = openId === f.id;
              return (
                <div key={f.id} className="border-b text-[24px] md:text-[24px] text-[#333] leading-[1.6] tracking-[0.02em] pb-4">
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggle(f.id)}
                    role="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${f.id}`}
                  >
                    <div className="flex items-start gap-6">
                      <span className="text-gray-400 font-medium min-w-[48px]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <span className="text-[24px] md:text-[24px] text-[#333] leading-[1.6] tracking-[0.02em]">
                        {f.q}
                      </span>
                    </div>

                    {/* plus icon */}
                    <svg
                      className={`w-6 h-6 mt-1 transform transition-transform duration-200 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>

                  {/* ANSWER: larger max-h so longer content shows */}
                  <div
                    id={`faq-panel-${f.id}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-[500px] mt-4" : "max-h-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="text-[16px] md:text-[16px]">
                      {f.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Contact card */}
        <aside
          className="
          w-full
          max-w-[360px]
          mx-auto
          md:mx-0
          md:w-[283px]
          md:h-[407px]
          bg-[#1e1e1e]
          text-white
          p-6
          md:p-8
          rounded-2xl
          shadow-lg
          flex flex-col
        "
        >
          <h3 className="text-2xl font-light mb-6 text-center md:text-left">We're Here to Help</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 flex-1 flex flex-col"
          >
            {/* NOTE: name attributes below must match what's read in handleSubmit */}
            <input
              name="full-name"
              className="w-full bg-transparent border-b border-gray-600 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="Your Name"
              aria-label="Your Name"
            />
            <input
              name="phone-number"
              className="w-full bg-transparent border-b border-gray-600 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="Phone Number"
              aria-label="Phone Number"
            />
            <input
              name="email-address"
              className="w-full bg-transparent border-b border-gray-600 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="Email Address"
              aria-label="Email Address"
            />
            <textarea
              name="message"
              rows="2"
              className="w-full bg-transparent border-b border-gray-600 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none flex-1 min-h-[60px]"
              placeholder="Message"
              aria-label="Message"
            ></textarea>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-full text-white text-lg transition-colors mt-2 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Submit"}
            </button>

            {status && <p className="text-sm text-gray-200 mt-2 text-center">{status}</p>}
          </form>
        </aside>
      </div>

      <div className="max-w-[1250px] mx-auto mt-12">
        <hr className="border-gray-300" />
      </div>
    </section>
  );
}
