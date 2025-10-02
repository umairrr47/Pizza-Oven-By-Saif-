// src/pages/Contact.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CircleCheck as CheckCircle,
  MessageCircle,
  FileText,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const Contact: React.FC = () => {
  // -------------------- CONFIG (EDIT THESE) --------------------
  const WHATSAPP_NUMBER = "919899593526"; // e.g. 91 + number (no spaces)
  const CATALOGUE_LINK = "/catalogue.pdf"; // put your PDF/Drive link
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const MAP_EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56100.18625585837!2d77.21521936340282!3d28.501774862302774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1c20c896915%3A0xdadfe33e00246eea!2sTHE%20PIZZA%20OVENS%20BY%20SAIF!5e0!3m2!1sen!2sin!4v1759431546365!5m2!1sen!2sin";
  const SHOWROOM_ADDRESS =
    "H-16, 1461, Shooting Range Rd, near Shikshalayam School, Block G 1, Sangam Vihar, New Delhi, Delhi 110080";
  // -------------------------------------------------------------

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    productInterest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      alert("EmailJS IDs missing. Please configure them at the top of Contact.tsx");
      return;
    }

    setIsSubmitting(true);

    // EmailJS expects a key/value object for the template
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      productInterest: formData.productInterest,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            productInterest: "",
          });
        },
        (err) => {
          console.error("EmailJS Error:", err);
          setIsSubmitting(false);
          alert("Something went wrong while sending. Please try again.");
        }
      );
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98995 93526"],
      action: { label: "Call Now", href: "tel:+919899593526" },
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@premiumovens.com"],
      action: { label: "Send Email", href: "mailto:info@premiumovens.com" },
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "H-16, Shooting Range Rd",
        "Sangam Vihar, New Delhi, Delhi 110080",
      ],
      action: {
        label: "Get Directions",
        href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          SHOWROOM_ADDRESS
        )}`,
      },
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      action: undefined,
    },
  ];

  return (
    <div className="min-h-screen pt-10 pb-20 bg-gradient-to-b from-white via-neutral-50 to-white">
      {/* Accent background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-320px] -z-10 h-[750px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(212,56,4,0.12),transparent)] blur-3xl" />

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Contact Our Experts
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
            Premium pizza ovens, built for performance. Tell us your capacity,
            space & fuel preference—our team will tailor the perfect setup.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column — Info + Quick Actions */}
          <motion.aside
            {...fadeUp(0.1)}
            className="space-y-6"
          >
            <div className="rounded-2xl p-8 text-white shadow-xl bg-gradient-to-br from-[#d43804] to-[#b13003]">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-white/20 p-3 rounded-lg">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      {info.details.map((d, di) => (
                        <p key={di} className="text-orange-100 text-sm">
                          {d}
                        </p>
                      ))}
                      {info.action && (
                        <a
                          href={info.action.href}
                          className="mt-1 inline-block text-sm underline hover:text-orange-200"
                        >
                          {info.action.label}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 gap-4"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-4 font-medium text-white shadow transition hover:bg-green-600"
              >
                <MessageCircle size={20} />
                WhatsApp Chat
              </a>

              <a
                href={CATALOGUE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#d43804] py-4 font-medium text-[#d43804] transition hover:bg-[#d43804] hover:text-white"
              >
                <FileText size={20} />
                Request Catalogue
              </a>
            </motion.div>
          </motion.aside>

          {/* Right Column — Form */}
          <motion.section
            {...fadeUp(0.15)}
            className="lg:col-span-2 rounded-2xl bg-white/80 backdrop-blur shadow-xl ring-1 ring-black/5 p-6 sm:p-8"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name *"
                    className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#d43804]"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email Address *"
                    className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#d43804]"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Phone Number *"
                    className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#d43804]"
                  />
                  <select
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleInputChange}
                    className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#d43804]"
                  >
                    <option value="">Product Interest</option>
                    <option value="wood-ovens">Wood-Fired Ovens</option>
                    <option value="gas-ovens">Gas Ovens</option>
                    <option value="hybrid-ovens">Hybrid Ovens</option>
                    <option value="home-ovens">Home Ovens</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>

                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject *"
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#d43804]"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us about your space, capacity & any special requirements…"
                  className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#d43804]"
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d43804] py-4 font-semibold text-white transition hover:bg-[#b13003] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="text-green-600" size={40} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-neutral-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-neutral-600">
                  Thank you. Our team will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 rounded-lg bg-[#d43804] px-6 py-3 font-medium text-white transition hover:bg-[#b13003]"
                >
                  Send Another
                </button>
              </motion.div>
            )}
          </motion.section>
        </div>

        {/* Map */}
        <motion.section {...fadeUp(0.2)} className="mt-14">
          <h2 className="mb-6 text-center text-3xl font-bold text-neutral-900">
            Visit Our Showroom
          </h2>
          <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-md">
            <div className="aspect-[16/9]">
              <iframe
                title="Showroom Map"
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={MAP_EMBED_SRC}
              />
            </div>
          </div>
          <p className="mt-4 text-center font-medium text-neutral-700">
            {SHOWROOM_ADDRESS}
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
