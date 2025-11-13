// src/pages/Home.tsx
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Clock, CheckCircle } from "lucide-react";
import { products, Product } from "../data/products";
import QuickViewModal from "../components/UI/QuickViewModal";
import OvensShowcase,{ OvenItem } from "./OvensShowcase";
import ProjectsInIndia from "./ProjectsInIndia";
import Founder from "./Founder"
import Installation from "./Installation";
import RevolvingOven from "./RevolvingOven";
import BrandCarousal from "./BrandCarousel";
import Oven1 from "../assets/oven2.png";
import Oven2 from "../assets/portable.png";
import Oven3 from "../assets/commercial.png";
import Saif from "../assets/Saifbg.png"
const ovens: OvenItem[] = [
  {
    image: Oven3,  // Swapped from Oven1 to Oven3 for Commercial
    title: "Commercial Oven",
    indexLabel: "01",
    blurb: "Built for high-volume service with consistent heat and durable construction.",
  },
  {
    image:  Oven2,  // Remains the same
    title: "Portable Oven",
    indexLabel: "02",
    blurb: "Crafted to be sturdy and lightweight, ideal for events.",
  },
  {
    image: Oven1,  // Swapped from Oven3 to Oven1 for Residential
    title: "Residential Oven",
    indexLabel: "03",
    blurb: "Compact footprint with authentic stone-baked performance for home kitchens and patios.",
  },
];

// Heavy sections (lazy to avoid crash if any child throws)
const Hero = lazy(() => import("./Hero"));
// const BrandCarousel = lazy(() => import("./BrandCarousel"));
const HeroVideoGSAP = lazy(() => import("./HeroVideoGSAP"));
const Testimonials = lazy(() => import("../pages/Testimonials"));

import Fimg1 from "../assets/Fimg1.png";
import Fimg2 from "../assets/Fimg2.png";
import Fimg3 from "../assets/Fimg3.png";
import EnquiryFormSection from "./EnquiryFormSection";



/* ----------------------- CountUp (safe, tiny, no GSAP) ----------------------- */
const useCountUpOnView = (
  end: number,
  { duration = 1100, suffix = "" }: { duration?: number; suffix?: string } = {}
) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startTs = 0;
    let rafId = 0;
    let started = false;

    const format = (v: number) => `${Math.floor(v)}${suffix}`;
    const prefersReduced =
      typeof window !== "" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const prog = Math.min(1, (ts - startTs) / duration);
      el.textContent = format(prog * end);
      if (prog < 1) rafId = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!started && entry.isIntersecting) {
            started = true;
            if (prefersReduced) {
              el.textContent = format(end);
              io.disconnect();
              return;
            }
            rafId = requestAnimationFrame(step);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [end, duration, suffix]);

  return ref;
};

/* ----------------------------- Stat Card ----------------------------- */
const StatCard: React.FC<{
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  number: number;
  suffix?: string;
  label: string;
}> = ({ Icon, number, suffix = "", label }) => {
  const spanRef = useCountUpOnView(number, { duration: 1100, suffix });
  return (
    <div className="p-6 rounded-2xl border bg-white/70 backdrop-blur text-center">
      <div className="mx-auto mb-3 inline-flex items-center justify-center h-12 w-12 rounded-full border">
        <Icon size={22} className="opacity-80" />
      </div>
      <div className="text-4xl font-extrabold tracking-tight">
        <span ref={spanRef}>0</span>
      </div>
      <div className="mt-1 text-sm opacity-70">{label}</div>
    </div>
  );
};

const Home: React.FC = () => {
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleQuickView = (product: Product) => {
  //   setSelectedProduct(product);
  //   setIsModalOpen(true);
  // };

  // const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  // const stats = [
  //   { Icon: Award, number: 500, suffix: "+", label: "Ovens Installed" },
  //   { Icon: Users, number: 300, suffix: "+", label: "Happy Clients" },
  //   { Icon: Clock, number: 8, suffix: "+", label: "Years Experience" },
  //   { Icon: CheckCircle, number: 99, suffix: "%", label: "Satisfaction Rate" },
  // ];

  const features = [
    {
      title: "Authentic Italian Design",
      description:
        "Traditional craftsmanship meets modern engineering for the perfect pizza experience.",
      image: Fimg1,
    },
    {
      title: "Premium Materials",
      description:
        "Only the finest refractory bricks and stainless steel components for lasting durability.",
      image: Fimg2,
    },
    {
      title: "Expert Installation",
      description:
        "Professional setup and training included with every oven purchase.",
      image: Fimg3,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Lazy big sections so one error doesn't kill the page */}
      <Suspense fallback={<div className="py-16 text-center">Loading…</div>}>
        <Hero />
      </Suspense>

      <Suspense fallback={null}>
        <BrandCarousal />
      </Suspense>

      <Suspense fallback={null}>
        <HeroVideoGSAP />
      </Suspense>

      <section className="flow-root py-0 my-0">
      <OvensShowcase
        headline="Ovens range to choose from"
        subcopy="At The Pizza Ovens, we specialize in crafting high-performance ovens engineered for excellence - delivering authentic Neapolitan pizzas in just 60–120 seconds. Our extensive range of models is designed to meet diverse needs, offering various capacities, outputs, and features to suit both home chefs and professional kitchens alike."
        items={ovens}
        autoPlayMs={6000}
      />
      </section>

      <section className="flow-root py-0 my-0">
  <Suspense fallback={null}>
    <Founder founderImg={Saif} />
  </Suspense>
</section>

      <Suspense fallback={null}>
        <Installation />
      </Suspense>
      
      <Suspense fallback={null}>
        <ProjectsInIndia />
      </Suspense>

      <Suspense fallback={null}>
        <RevolvingOven />
      </Suspense>

      <Suspense fallback={null}>
        <EnquiryFormSection />
      </Suspense>


      {/* Tagline */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            India’s #1 Wood & Gas Pizza Oven Brand.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed"
          >
            India’s premium wood & gas ovens designed to master pizzas, grills, roasts & more — built
            for chefs, loved by foodies.
          </motion.p>
        </div>
      </section> */}

      {/* About */}
      {/* <About /> */}

      {/* Stats
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="grid gap-6 grid-cols-2 md:grid-cols-4"
          >
            {stats.map((s, i) => (
              <StatCard
                key={i}
                Icon={s.Icon}
                number={s.number}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Featured Products */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most popular pizza ovens, each designed to bring authentic Italian
              flavors to your kitchen or restaurant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} onQuickView={handleQuickView} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-[#d43804] text-white px-8 py-4 rounded-lg hover:bg-[#b13003] transition-colors font-medium group"
            >
              <span>View All Products</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section> */}

      {/* Features */}
      {/* <section className="relative py-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Why Choose <span className="text-amber-600">Our Pizza Ovens?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We blend <span className="font-semibold">authentic Italian craftsmanship</span> with{" "}
              <span className="font-semibold">modern innovation</span> to deliver ovens that redefine
              performance, luxury, and authentic flavors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transition-transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Clients & Testimonials (lazy) */}
      {/* <Suspense fallback={null}>
        <OurClients />
      </Suspense> */}

      {/* <Suspense fallback={null}>
        <Testimonials />
      </Suspense> */}

      {/* CTA */}
      {/* <section className="py-20 bg-[#d43804]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Elevate Your Pizza Game?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Join hundreds of satisfied customers who have transformed their kitchens with our
              premium pizza ovens. Get your custom quote today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-[#d43804] px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-all duration-300"
              >
                Get Custom Quote
              </Link>
              <Link
                to="/recent-work"
                className="border-2 border-white text-white hover:bg-white hover:text-[#d43804] px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Quick View */}
      {/* <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </div>
  );
};

export default Home;
