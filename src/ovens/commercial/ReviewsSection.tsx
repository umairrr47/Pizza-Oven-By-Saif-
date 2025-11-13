// src/sections/ReviewsCarousel.tsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Test1 from "../../assets/r1.jpg"
import Test2 from "../../assets/r7.jpeg"
import Test3 from "../../assets/r5.jpeg"
import Test4 from "../../assets/r10.jpeg"
import Test5 from "../../assets/r2.jpeg"
import Test6 from "../../assets/rr1.jpg"
import Test7 from "../../assets/rr2.jpg"
import Test8 from "../../assets/rr3.jpg"
type Review = {
    id: number;
    quote: string;
    name: string;
    image: string;
};

const REVIEWS: Review[] = [
    {
        id: 1,
        quote:
            "I got my first Saif oven back in 2021 for my small café. The results were amazing — quick heating, solid build, and proper wood-fired flavor. Last year I upgraded to a bigger one. Still working perfectly, and the team has always been helpful whenever needed.",
        name: "Rohit Menon – Kochi, Kerala",
        image: Test1,
    },
    {
        id: 2,
        quote:
            "We’ve been using Saif’s commercial oven for almost two years now. It performs like a dream — heats evenly and bakes pizzas just right. The quality is solid, and the design looks beautiful in our kitchen. Really happy with both the oven and their service.",
        name: "Ankit Sharma – Jaipur, Rajasthan",
        image: Test2,
    },
    {
        id: 3,
        quote:
            "Bought a portable oven from Saif for our catering setup. Easy to move, quick to heat, and pizzas come out just like a restaurant oven. The support team guided us nicely during installation. It’s been reliable and efficient from day one — worth the money.",
        name: "Vikram Patel – Ahmedabad, Gujarat",
        image: Test3,
    },
    {
        id: 4,
        quote:
            "We started with a medium Saif oven in 2022 and upgraded to a bigger brick model last year. Both have been excellent. Heat retention is great, pizzas cook evenly, and maintenance is minimal. The revolving oven especially makes work faster during busy hours.",
        name: "Neha Khanna – New Delhi",
        image: Test7,
    },
    {
        id: 5,
        quote:
            "Installed a Saif oven last year in our pizzeria. It’s running daily without a single issue. The baking consistency is amazing and the finish on the oven itself looks premium. Our customers often notice the difference in flavor. Great purchase and smooth experience overall.",
        name: "Arjun Mehta – Mumbai, Maharashtra",
        image: Test4,
    },
    {
        id: 6,
        quote:
            "We bought the Saif wood-fired oven in 2023 for our new restaurant. It’s been absolutely reliable — quick to reach temperature and stays hot for hours. Pizzas have that real smoky flavor customers love. The team responds quickly if we ever need guidance.",
        name: "Priya Reddy – Hyderabad, Telangana",
        image: Test6,
    },
    {
        id: 7,
        quote:
            "Being a chef, I’ve used many ovens before, but Saif’s commercial one stands out. The temperature control is excellent, and build quality feels very strong. It gives consistent results even during rush hours. After-sales support is also good — overall, a dependable Indian brand.",
        name: "Rahul Bansal – Chandigarh, Punjab",
        image:Test5,
    },
    {
        id: 8,
        quote:
            "We’ve been using a Saif oven for over a year now in our bakery. It still works like new and bakes perfectly every time. Very low maintenance, energy efficient, and looks great too. The whole buying and installation process was smooth and professional.",
        name: "Sanjana Iyer – Bengaluru, Karnataka",
        image: Test8,
    },
];

const ReviewsCarousel: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(carouselRef, { once: true, margin: "-100px" });

    return (
        <section className="bg-white text-[#0b0b0b] flex justify-center py-8">
            {/* Outer main container: desktop fixed to 1351 x 1024 */}
            <div
                className="w-full max-w-[1351px] lg:w-[1351px] lg:min-h-[1024px] flex flex-col justify-start"
                ref={carouselRef}
                style={{ minHeight: 0 }}
            >
                {/* Inner content container: desktop fixed to 1175 x 795 */}
                <div
                    className="w-full max-w-[1175px] lg:w-[1175px] lg:min-h-[795px] mx-auto px-6 md:px-0 py-8"
                    aria-label="Reviews content container (1175 x 795 at desktop)"
                >
                    {/* Heading */}
                    <div className="mb-6">
                        <h2 className="text-[clamp(28px,3.6vw,40px)] font-normal leading-[1.1] mb-8">
                            The Reviews for The Pizza <br /> Ovens By Saif
                        </h2>
                        <p className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em] max-w-[800px]">
                            Hear from the restaurant owners and chefs across India that transformed their kitchens with <br />
                            Saif's expertly crafted ovens.
                        </p>
                    </div>

                    {/* Carousel */}
                    <motion.div
                        className="overflow-hidden relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" }}
                        >
                            {[...REVIEWS, ...REVIEWS].map((r, index) => (
                                <motion.article
                                    key={index}
                                    className="flex-shrink-0 bg-[#f9f9f9] rounded-[16px] shadow-sm border border-gray-100 p-6 w-[390px] h-[440px] flex flex-col justify-between"
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <div>
                                        <motion.div
                                            className="mb-6"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                        >
                                            {/* 👑 put the SVG code here */}

                                            <div className="text-[#E20A17] mb-6">
                                                <svg
                                                    width="42"
                                                    height="42"
                                                    viewBox="0 0 100 100"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M27.3 20c-10.8 8.8-17 20.8-17 33.8 0 9.8 5.5 17 14.3 17 8.1 0 13.4-5.7 13.4-13.6 0-6.8-4.4-11.6-10.7-11.6-1.9 0-3.7.4-5.1 1.1 2.2-8.7 8.1-16.5 17.8-22.6L27.3 20zM73.3 20c-10.8 8.8-17 20.8-17 33.8 0 9.8 5.5 17 14.3 17 8.1 0 13.4-5.7 13.4-13.6 0-6.8-4.4-11.6-10.7-11.6-1.9 0-3.7.4-5.1 1.1 2.2-8.7 8.1-16.5 17.8-22.6L73.3 20z"
                                                        fill="url(#goldGradient)"
                                                    />
                                                    <defs>
                                                        <linearGradient
                                                            id="goldGradient"
                                                            x1="0"
                                                            y1="0"
                                                            x2="100"
                                                            y2="100"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop stopColor="#E20A17" />
                                                            <stop offset="1" stopColor="#FF5722" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </motion.div>


                                        <p className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">
                                            {r.quote}
                                        </p>
                                    </div>

                                    <div>
                                        <hr className="border-t border-gray-200 my-4" />
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="text-[16px] md:text-[17px] text-[#575757] leading-[1.6] tracking-[0.02em]">{r.name}</div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
