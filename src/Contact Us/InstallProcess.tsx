// src/components/InstallProcessSection.tsx
import React from "react";
import { motion } from "framer-motion";
import CurveImg from "../assets/process-line.webp"; // your image (1682 x 554)

const IMG_W = 1645;
const IMG_H = 554;

const steps = [
    {
        num: "1",
        title: "Consultation",
        desc: "We assess your kitchen layout via plans and/or video calls to recommend the ideal oven type and placement for optimal performance.",
    },
    {
        num: "2",
        title: "Custom Design",
        desc: "We tailor our oven designs to fit your needs, customizing the burner position and shape to seamlessly integrate with your venue's aesthetics and goals.",
    },
    {
        num: "3",
        title: (
            <>
                Delivery & On- <br /> Site Assembly
            </>
        ),
        desc: "The bigger ovens arrive in parts and are assembled on site by our team; smaller ovens arrive readymade and are ready to use.",
    },
    {
        num: "4",
        title: (
            <>
                Testing And <br /> Guidance
            </>
        ),
        desc: "Once installed, Marco provides personalized guidance on first firing, ingredient sourcing, and pizza-making techniques to ensure optimal results.",
    },
];

const listVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};
const stepVariant = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

export default function InstallProcess() {
    const stepMargins = ["md:mt-0", "md:-mt-9", "md:-mt-20", "md:-mt-32"];

    return (
        <>
        <section
            className="bg-gray-50 text-gray-900 pt-36 md:pt-56 pb-20 overflow-visible relative"
            // ensure the section has more vertical room so content won't feel cramped
            style={{ minHeight: "720px" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
                <div className="relative w-full overflow-visible rounded-3xl">

                    {/* ========================== */}
                    {/*   LEFT HEADING + RIGHT OFFICE INFO  */}
                    {/* ========================== */}
                    <div
                        className="relative md:absolute md:left-0 z-20 w-full flex flex-col md:flex-row md:items-start md:justify-between gap-10"
                        // moved higher on desktop (you asked to increase md:-top)
                        style={{ top: "0" }}
                    >
                        {/* NOTE: using inline-style top on parent so we can keep Tailwind value updated below */}
                    </div>

                    {/* replace above thin wrapper with the actual one that includes the increased -top */}
                    <div className="relative md:absolute md:-top-[30%] md:left-0 z-20 w-full flex flex-col md:flex-row md:items-start md:justify-between gap-10">

                        {/* LEFT HEADING SECTION */}
                        <div className="max-w-[720px] text-left">
                            <h2
                                className="text-[clamp(32px,3.6vw,46px)] leading-[1.1] font-normal tracking-[0.03em] text-gray-950 mb-4"
                                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                            >
                                Get In Touch With The Best <br />
                                Wood Fired Pizza Oven <br />
                                Manufacturers
                            </h2>

                            <p className="text-[16px] md:text-[18px] text-[#575757] leading-[1.7] tracking-[0.02em] mb-6">
                                Connect with the leading wood-fired pizza oven experts for custom-built,<br />
                                high-performance ovens crafted to perfection.
                            </p>
                        </div>

                        {/* RIGHT OFFICE INFO SECTION */}
                        <div className="max-w-[320px] text-left"> <h3 className="text-[clamp(24px,2vw,36px)] font-medium text-gray-900 mb-2" style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }} > Visit Our Office </h3>

                            {/* Location */}
                            <div className="flex items-start gap-3 mb-3"> <span className="text-xl mt-0.5">📍</span> <p className="text-[18px] text-[#575757] leading-[1.6]"> H-16, 1461, Shooting Range Rd, near by Shikshalayam School, Block G 1, Sangam Vihar, New Delhi, Delhi 110080 </p> </div>

                            {/* Email */}
                            <div className="flex items-start gap-3 mb-3"> <span className="text-xl mt-0.5">✉️</span> <p className="text-[18px] text-[#575727] leading-[1.6]"> info@thepizzaovens.com </p> </div>

                            {/* Phone */}
                            <div className="flex items-start gap-3"> <span className="text-xl mt-0.5">📞</span> <p className="text-[18px] text-[#575757] leading-[1.6]"> +91 989 959 35 26 </p> </div> </div>
                    </div>

                    {/* ============= CURVE IMAGE ============= */}
                    <div
                        className="relative w-full hidden md:block"
                        style={{ paddingTop: `${(IMG_H / IMG_W) * 100}%` }}
                    >
                        <img
                            src={CurveImg}
                            alt="Process curve"
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                    </div>

                    {/* STEPS LIST */}
                    <motion.div
                        className="mt-10 w-full relative z-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={listVariant}
                    >
                        {/* DESKTOP STEPS */}
                        <div className="hidden md:flex md:items-start md:gap-8 lg:gap-10">
                            {steps.map((s, i) => (
                                <motion.div
                                    key={s.num}
                                    variants={stepVariant}
                                    className={`relative flex-1 pr-2 ${i === 0 ? "pl-0" : ""} ${stepMargins[i]}`}
                                >
                                    {/* Background number */}
                                    <div
                                        className="absolute -top-10 right-6 text-[5.2rem] lg:text-[6.4rem] font-extrabold text-[#dfdfdf] leading-[1] select-none pointer-events-none -z-10"
                                        style={{ WebkitTextFillColor: "#dfdfdf" }}
                                    >
                                        <span
                                            className="absolute inset-0"
                                            style={{
                                                background:
                                                    "linear-gradient(to top, rgba(245,245,245,0.95), rgba(245,245,245,0.7), rgba(245,245,245,0.4), rgba(245,245,245,0.1))",
                                                pointerEvents: "none",
                                                mixBlendMode: "normal",
                                            }}
                                        />
                                        {s.num}
                                    </div>

                                    <h5
                                        className="text-[clamp(18px,1.8vw,26px)] font-normal text-gray-950 mb-3 tracking-[0.015em]"
                                        style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                                    >
                                        {s.title}
                                    </h5>

                                    <p className="text-[14px] md:text-[16px] text-[#575757] leading-[1.7] tracking-[0.02em]">
                                        {s.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* MOBILE STEPS */}
                        <div className="md:hidden grid grid-cols-2 gap-6 mt-10">
                            {steps.map((s) => (
                                <motion.div key={s.num} variants={stepVariant} className="relative">
                                    <div
                                        className="absolute -top-6 right-3 text-[4rem] font-extrabold text-[#dfdfdf] leading-[1] select-none pointer-events-none -z-10"
                                        style={{ WebkitTextFillColor: "#dfdfdf" }}
                                    >
                                        <span
                                            className="absolute inset-0"
                                            style={{
                                                background:
                                                    "linear-gradient(to top, rgba(245,245,245,0.95), rgba(245,245,245,0.7), rgba(245,245,245,0.4), rgba(245,245,245,0.1))",
                                                pointerEvents: "none",
                                                mixBlendMode: "normal",
                                            }}
                                        />
                                        {s.num}
                                    </div>

                                    <h5
                                        className="text-[clamp(18px,1.8vw,26px)] font-normal text-gray-950 mb-2"
                                        style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
                                    >
                                        {s.title}
                                    </h5>

                                    <p className="text-[14px] text-[#575757] leading-[1.6] tracking-[0.02em] mb-2">
                                        {s.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>

       {/* Contact Form */}

       <section className="bg-gray-50 text-gray-900 py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <h2
            className="text-[clamp(26px,2.8vw,36px)] font-medium text-gray-900 mb-4"
            style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
          >
            Fill Out the Contact Form Below
          </h2>

          <p className="text-[15px] text-[#6b6b6b] leading-[1.8] max-w-[720px]">
            To reach Marco. Please ensure your email address is accurate, as minor typos may prevent a
            response (3-5% of inquiries may not be answered due to this)
          </p>
        </div>

        {/* Form grid: 4 cols on md for precise label/input alignment */}
        <form className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8 items-start">
            {/* Row 1: My name is — full width input under label */}
            <div className="md:col-span-1 flex items-center">
              <label
                className="text-[22px] text-gray-700"
                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
              >
                My name is
              </label>
            </div>
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-3 text-[15px]"
              />
            </div>

            {/* Row 2: Contact me back at (phone) | Email (inline) */}
            <div className="md:col-span-1 flex items-center">
              <label
                className="text-[22px] text-gray-700"
                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
              >
                Contact me back at
              </label>
            </div>

            <div className="md:col-span-1">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-3 text-[15px]"
              />
            </div>

            <div className="md:col-span-1 flex items-center md:justify-end">
              <label
                className="text-[22px] text-gray-700"
                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
              >
                Email
              </label>
            </div>

            <div className="md:col-span-1">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-3 text-[15px]"
              />
            </div>

            {/* Row 3: I'd like to discuss (select) | My city (inline) */}
            <div className="md:col-span-1 flex items-center">
              <label
                className="text-[22px] text-gray-700"
                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
              >
                I'd like to discuss
              </label>
            </div>

            <div className="md:col-span-1">
              <select
                defaultValue=""
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-3 text-[15px] appearance-none"
              >
                <option value="" disabled>
                  Select Product
                </option>
                <option>Commercial Oven</option>
                <option>Residential Oven</option>
                <option>Accessories</option>
              </select>
            </div>

            <div className="md:col-span-1 flex items-center md:justify-end">
              <label
                className="text-[22px] text-gray-700"
                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
              >
                My city
              </label>
            </div>

            <div className="md:col-span-1">
              <input
                type="text"
                placeholder="City Name"
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-3 text-[15px]"
              />
            </div>

            {/* Row 4: Message — label left, textarea full width on right 3 cols */}
            <div className="md:col-span-1 flex items-start pt-1">
              <label
                className="text-[22px] text-gray-700 mt-1"
                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
              >
                Message
              </label>
            </div>

            <div className="md:col-span-3">
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 py-3 text-[15px] resize-none"
              />
            </div>
          </div>

          {/* Submit area — placed visually as bottom-right of the form */}
          <div className="mt-8 md:mt-12 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-[#e21a25] hover:bg-[#d11720] text-white rounded-full px-6 py-3 text-[15px] shadow-md"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-white/20" />
              <span>Submit</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="ml-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>

    {/* Another Section */}
   <section className="bg-[#1a1a1a] text-gray-100 pt-20 md:pt-24 pb-0">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">

    {/* Top row */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <div className="md:col-span-7">
        <h2
          className="text-[clamp(36px,4.6vw,54px)] font-light leading-[1.02] tracking-[-0.01em] text-white"
          style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
        >
          Trusted Worldwide with a <br /> Global Presence
        </h2>
      </div>

      <div className="md:col-span-5">
        <p className="text-[16px] md:text-[17px] text-[#BCBCBC] leading-[1.6] tracking-[0.02em]">
          With a strong presence in India and international recognition, our handcrafted wood-fired
          ovens are known for their durability, performance, and authentic Italian craftsmanship—
          wherever quality pizza is made.
        </p>
      </div>
    </div>

    {/* Reduced spacer */}
    <div className="h-10 md:h-12" />

    {/* Content */}
    <div className="max-w-[1100px]">
      <h3
        className="text-[clamp(22px,2.4vw,28px)] font-medium text-white mb-4"
        style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
      >
        Best wood fired pizza manufacturers and suppliers across India 2025
      </h3>

      <p className="text-[16px] md:text-[17px] text-[#BCBCBC] leading-[1.6] tracking-[0.02em] mb-6">
        Saif proudly manufactures and supplies handcrafted wood-fired pizza ovens across India, delivering
        to major cities and culinary hubs including{" "}
        <span className="font-semibold text-[#BCBCBC]">
          Ahmedabad, Sasan, Valsad, Surat, Lucknow, Tirumanahalli, Jaipur, Agra, Hyderabad, Bangalore,
          Manali, Mumbai, Chennai, Rishikesh, Mussoorie, Gurgaon, Delhi, Noida, Faridabad, Anand, Vadodara,
          Udaipur, Ludhiana, Goa, Chandigarh, Manipal, Pune, and Banjar
        </span>
        . Each oven blends traditional craftsmanship with modern reliability—trusted by chefs nationwide.
      </p>
    </div>

    {/* Upper divider */}
    <div className="mt-6">
      <div className="w-full h-px bg-white/10 mt-12 md:mt-14"></div>
    </div>
  </div>
</section>


        </>
    );
}
