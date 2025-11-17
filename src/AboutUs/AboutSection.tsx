// src/components/AboutSectionClone.tsx
import React from "react";
import PizzaImg from "../assets/aboutimg.png"; // replace with your left artwork

export default function AboutSection(): JSX.Element {
    return (
        <section className="relative bg-[#f6f6f6] py-16">

            {/* ⭐ TOP CURVED CORNER BORDER WITHOUT STRAIGHT LINE */}
            <div className="w-full flex justify-center mb-4 md:mb-10">
                <div className="w-full max-w-[1300px] relative h-[32px]">

                    {/* LEFT CURVE */}
                    <svg
                        className="absolute left-0 top-0"
                        width="70"
                        height="32"
                        viewBox="0 0 70 32"
                        fill="none"
                    >
                        <path
                            d="M70 1 H32 C14 1 1 14 1 32"
                            stroke="#CFCFCF"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* RIGHT CURVE */}
                    <svg
                        className="absolute right-0 top-0"
                        width="70"
                        height="32"
                        viewBox="0 0 70 32"
                        fill="none"
                    >
                        <path
                            d="M1 1 H38 C56 1 69 14 69 32"
                            stroke="#CFCFCF"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                        />
                    </svg>

                </div>
            </div>


            <div className="max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12">
                <div className="relative flex flex-col md:flex-row items-start gap-12">

                    {/* left column */}
                    <aside className="w-full md:w-4/12 flex flex-col items-center md:items-start">

                        <div className="hidden md:flex items-center h-full">
                            <div className="whitespace-nowrap text-gray-700 text-xs tracking-wide transform -rotate-90 origin-left ml-[-30px] mt-10 text-[18px] md:text-[18px] leading-[1.7] ">
                                About Us
                            </div>
                        </div>


                        {/* floating image */}
                        <div className="mt-6 md:mt-0 relative w-full flex justify-center md:justify-start">
                            <div className="w-[260px] sm:w-[320px] md:w-[360px] lg:w-[420px] -translate-y-6">
                                <img
                                    src={PizzaImg}
                                    alt="decorative pizza"
                                    className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)]"
                                />
                            </div>
                        </div>

                    </aside>

                    {/* right column */}
                    <div className="w-full md:w-8/12">
                        <div className="max-w-[760px]">

                            <h2
                                className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[44px] font-medium leading-tight text-[#0b0b0b] mb-6"
                                style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', Arial" }}
                            >
                                India’s Finest Wood-Fired Pizza Ovens Manufacturer – Saif Ovens
                            </h2>

                            <p className="text-gray-600 text-[24px] md:text-[22px] leading-[1.7] mb-6">
                               From handcrafted brick ovens to high-performance residential models, Saif Ovens brings a new standard of Indian craftsmanship to the world of wood-fired cooking—preserving authenticity while delivering exceptional performance for restaurants, cafés, hotels, and homes across the country.
                            </p>

                            <p className="text-gray-500 text-[18px] md:text-[16px] leading-[1.8] mb-4">
                               In 2014, Saif began his journey by building his first oven for a small café in Mumbai, where the charm, heat balance, and flavour of true wood-fired cooking quickly became the heart of the kitchen. Inspired by the growing demand for reliable, handcrafted ovens, Saif saw the opportunity to bring professional-grade wood-fired technology to India and started creating ovens independently—designing, testing, and refining every model by hand.
                            </p>

                            <p className="text-gray-500 text-[18px] md:text-[16px] leading-[1.8]">
                                Beginning alone, sourcing materials locally, and assembling ovens on-site, Saif gradually expanded his craft into a dedicated manufacturing setup. Over the years, his precision engineering and real-world experience helped him grow from modest beginnings into one of India’s most trusted wood-fired oven makers, offering residential ovens, portable solutions, commercial units, and custom-built brick ovens crafted to elevate every kitchen they serve.
                            </p>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
