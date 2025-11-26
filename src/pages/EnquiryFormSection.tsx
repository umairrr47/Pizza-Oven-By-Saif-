// src/sections/EnquiryFormSection.tsx
import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { sendEmail, EmailPayload } from "../lib/emailService"; // adjust path if needed

type Props = {
  companyEmail?: string;
  phoneDisplay?: string;
  onSubmit?: (form: FormData) => Promise<void> | void;
};

const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const EnquiryFormSection: React.FC<Props> = ({
  companyEmail = "info@thepizzaovens.com",
  phoneDisplay = "+91 989 959 35 26",
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSending(true);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    // If parent passed a custom onSubmit, call it first (non-blocking if it doesn't return a promise).
    try {
      if (onSubmit) await onSubmit(fd);
    } catch (err) {
      // Let email sending still continue even if parent onSubmit failed.
      console.warn("onSubmit handler threw:", err);
    }

    // Build payload matching your EmailJS template keys
    const payload: EmailPayload = {
      full_name: fd.get("full-name")?.toString() ?? "",
      selected_product: fd.get("selected-product")?.toString() ?? "",
      phone_number: fd.get("phone-number")?.toString() ?? "",
      email_address: fd.get("email-address")?.toString() ?? "",
      message: fd.get("message")?.toString() ?? "",
      page_link:
        (fd.get("page-link")?.toString() as string) ||
        (typeof window !== "undefined" ? window.location.href : ""),
      source: "EnquiryFormSection",
      full_summary: JSON.stringify(Object.fromEntries(fd as any)),
    };

    try {
      const res = await sendEmail(payload);
      if (res?.ok) {
        setStatus("Thanks, we received your enquiry.");
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
      // hide the status after a short delay
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Background Pattern for Luxury Feel */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
        {/* Top Row: Heading + Contact Info */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="text-center lg:text-left" variants={item}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-wide text-white mb-6">
              Enquire Now
              <br />
              <span className="text-red-500 font-medium">We’ll Get Back to You Shortly</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Discover our premium pizza ovens. Reach out for personalized consultations and expert advice.
            </p>
          </motion.div>

          <motion.div className="flex flex-col justify-center space-y-6" variants={item}>
            <h4 className="text-2xl sm:text-3xl font-semibold text-white">Get In Touch</h4>
            <div className="space-y-4">
              <a
                href={`mailto:${companyEmail}`}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{companyEmail}</span>
              </a>
              <a
                href="tel:+918627888269"
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{phoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 lg:p-12 shadow-2xl border border-white/10"
            aria-label="Contact form"
            noValidate
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Name */}
              <motion.div className="lg:col-span-1" variants={item}>
                <label className="block text-sm font-medium text-gray-300 mb-2">My name is</label>
                <input
                  name="full-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-red-500 outline-none placeholder:text-gray-500 text-white text-lg py-3 transition-colors duration-300"
                />
              </motion.div>

              {/* Product */}
              <motion.div className="lg:col-span-1" variants={item}>
                <label className="block text-sm font-medium text-gray-300 mb-2">I’d like to discuss</label>
                <select
                  name="selected-product"
                  required
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-red-500 outline-none text-white text-lg py-3 transition-colors duration-300 appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-gray-800">Select Product</option>
                  <option value="Commercial Pizza Oven" className="bg-gray-800">Commercial Pizza Oven</option>
                  <option value="Portable Pizza Oven" className="bg-gray-800">Portable Pizza Oven</option>
                  <option value="Residential Pizza Oven" className="bg-gray-800">Residential Pizza Oven</option>
                </select>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Phone */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact me back at</label>
                <input
                  name="phone-number"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="Phone Number"
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-red-500 outline-none placeholder:text-gray-500 text-white text-lg py-3 transition-colors duration-300"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-red-500 outline-none placeholder:text-gray-500 text-white text-lg py-3 transition-colors duration-300"
                />
              </motion.div>
            </div>

            {/* Message */}
            <motion.div className="mb-8" variants={item}>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                rows={6}
                maxLength={2000}
                placeholder="Tell us about your requirements..."
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-red-500 outline-none placeholder:text-gray-500 text-white text-lg py-3 resize-none transition-colors duration-300"
              />
            </motion.div>

            {/* Hidden fields */}
            <input type="text" name="company" className="hidden" />
            <input type="text" name="page-link" className="hidden" />

            {/* Submit */}
            <motion.div className="flex justify-end" variants={item}>
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                disabled={sending}
              >
                {sending ? "Sending..." : "Submit"}
              </motion.button>
            </motion.div>

            {status && (
              <div className="mt-4 text-right">
                <span className="text-sm text-gray-300">{status}</span>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EnquiryFormSection;
