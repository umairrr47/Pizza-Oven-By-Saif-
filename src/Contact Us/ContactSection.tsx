// src/components/ContactSection.tsx
import React from "react";

export default function ContactSection() {
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
            To reach Marco. Please ensure your email address is accurate, as minor typos may prevent a
            response (3-5% of inquiries may not be answered due to this)
          </p>
        </div>

        {/* Form */}
        <form className="mt-10">
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
                  className="inline-flex items-center gap-3 bg-[#e21a25] hover:bg-[#d11720] text-white rounded-full px-6 py-3 text-[15px] shadow-md"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-white/20" />
                  <span>Submit</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </section>
  );
}
