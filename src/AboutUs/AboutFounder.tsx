import React from "react";
import Saif from "../assets/Saifbg2.png"
import Qoute from "../assets/quote-icon-gray.webp"

type Props = {
    imageSrc: string;
};

export default function AboutFounderClone({ imageSrc }: Props) {
    return (
        <section className="relative bg-[#0e0e0e] text-white overflow-hidden">
            {/* Animated background headline - visible on ALL screens */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* note: z-0 so it stays behind main content (which uses z-10) */}
                <div className="absolute left-0 top-4 md:top-8 w-[200%] transform-gpu animate-marquee z-0">
                    <h2
                        aria-hidden
                        className="text-[4rem] md:text-[9.5rem] leading-[0.9] font-extrabold opacity-20 md:opacity-8 tracking-tight select-none whitespace-nowrap"
                        style={{ fontFamily: '"NeueHaasGroteskDisp Pro", system-ui, -apple-system, "Segoe UI", Roboto' }}>
                        THE MAN BEHIND FLAME &nbsp; THE MAN BEHIND FLAME &nbsp; THE MAN BEHIND FLAME
                    </h2>
                </div>
            </div>

            {/* Container - Centered content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 lg:py-10 flex flex-col lg:flex-row items-center justify-center relative z-10">
                
                {/* Left content - Centered on mobile */}
                <div className="w-full lg:w-1/2 lg:pr-16 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="pt-16 md:pt-0">
                        {/* Heading */}
                        <h1 className="text-[clamp(30px,3.2vw,56px)] leading-[1.1] font-light tracking-[0.03em] text-gray-100 lg:mt-20 py-2"
                            style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>
                            The Founder of The<br />Pizza Ovens <br /> By Saif
                        </h1>

                        {/* Paragraph */}
                        <p className="text-[16px] md:text-[18px] text-[#BCBCBC] leading-[1.7] tracking-[0.02em] mb-6 py-6 lg:py-8">
                            Saif is more than an oven maker-he's a designer, craftsman, and food enthusiast who understands the soul of wood-fired cooking. Born and raised in India, he blends traditional techniques with modern engineering to create ovens that chefs trust and professionals rely on. Over the years, he has built a brand respected by restaurants, admired by chefs, and recognized for performance.
                        </p>

                        {/* Mobile Image - Show after paragraph on mobile */}
                        <div className="lg:hidden w-full my-8">
                            <div className="w-full h-80 rounded-xl overflow-hidden">
                                <img src={imageSrc} alt="Saif" className="w-full h-full object-cover object-center" />
                            </div>
                        </div>

                        {/* Double Quote with less spacing */}
                        <div className="flex justify-center lg:justify-start my-4">
                            <img
                                src={Qoute}
                                alt="Quote decoration"
                                className="h-6 w-auto opacity-60"
                            />
                        </div>

                        {/* Quote section */}
                        <blockquote className="mt-6 mb-6">
                            <p className="text-[clamp(20px,1.5vw,28px)] font-normal text-gray-100"
                                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}>"An oven isn't just equipment - it's where <br />fire, craft, and flavour come alive."</p>
                            <footer className="mt-6 text-xl font-semibold text-[#BCBCBC]"
                                style={{ fontFamily: '"NeueHaasGroteskDisp Pro", system-ui, -apple-system, "Segoe UI", Roboto' }}>— Saif Ameer<br /><span className="pl-6 text-[13px] text-[#BCBCBC]">Saif Ameer Founder & CEO</span></footer>
                        </blockquote>

                        {/* Button */}
                        <div className="mt-8 lg:mt-12 flex justify-center lg:justify-start">
                            <a href={`https://wa.me/919899593526?text=Hi%20Saif%2C%20I%20would%20like%20to%20chat%20about%20pizza%20ovens`} target="_blank" rel="noopener noreferrer">
                                <button className="inline-flex items-center gap-3 bg-[#e30715] hover:bg-[#9e020c] focus:outline-none focus:ring-2 focus:ring-[#e30715] text-white text-sm px-5 py-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    Chat With Saif
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Desktop Image - Show on right side for desktop */}
                <div className="hidden lg:flex lg:w-1/2 items-end justify-end relative">
                    <div className="relative h-[1080px] lg:h-[940px] flex items-end justify-end">
                        <div className="h-full w-[520px] lg:w-[620px] overflow-hidden relative">
                            <img src={Saif} alt="Saif Ameer" className="h-full w-full object-cover object-right-bottom block" />
                        </div>

                        {/* dark platform under hand */}
                        <div className="absolute right-[-6%] bottom-8 w-[220px] h-12 bg-black/70 rounded-md transform rotate-1" />
                    </div>
                </div>
            </div>

            {/* Inline styles for marquee animation */}
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 9.05s linear infinite;
        }
        .opacity-8 { opacity: 0.08; }
      `}</style>
        </section>
    );
}
