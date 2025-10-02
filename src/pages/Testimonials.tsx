import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Quote, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

/* ========== Data ========== */
type Testimonial = {
  id: number;
  name: string;
  company: string;
  rating: number;
  review: string;
  image?: string;
  location: string;
};

const testimonialsData: Testimonial[] = [
  { id: 1, name: "Marco Rossi", company: "Pizzeria Italiana", rating: 5,
    review: "The best investment we made for our restaurant! The wood-fired oven delivers authentic Neapolitan flavor that our customers absolutely love. Sales increased by 40% since installation.",
    image: "https://images.pexels.com/photos/1181717/pexels-photo-1181717.jpeg?auto=compress&cs=tinysrgb&w=300", location: "Mumbai, Maharashtra" },
  { id: 2, name: "Priya Sharma", company: "The Pizza Corner", rating: 5,
    review: "Exceptional quality and craftsmanship! The gas oven heats up quickly and maintains consistent temperature. Perfect for our busy lunch hours. Highly recommended!",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300", location: "Delhi, NCR" },
  { id: 3, name: "Rajesh Patel", company: "Patel's Kitchen", rating: 5,
    review: "Outstanding service from start to finish. The team handled installation professionally and provided excellent training. Our hybrid oven works perfectly for both wood and gas cooking.",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300", location: "Ahmedabad, Gujarat" },
  { id: 4, name: "Sofia D'Angelo", company: "Bella Vista Restaurant", rating: 5,
    review: "The attention to detail and authentic Italian design exceeded our expectations. Our customers can actually see the craftsmanship, and it adds to the dining experience.",
    location: "Bangalore, Karnataka" },
  { id: 5, name: "Chef Amit Kumar", company: "Spice Route", rating: 5,
    review: "Incredible heat retention and even cooking. We've been using it for 2 years now with zero issues. The investment paid for itself within the first year through increased sales.",
    image: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300", location: "Chennai, Tamil Nadu" },
  { id: 6, name: "Ananya Verma", company: "Urban Slice", rating: 5,
    review: "Setup to first bake was super smooth. Temperature stability is insane—perfect leopard spots every time. Customers notice the difference.",
    location: "Pune, Maharashtra" },
  { id: 7, name: "Karan Mehta", company: "Stone & Fire", rating: 5,
    review: "Training team was fantastic. We switched from electric to hybrid and throughput improved ~30% on weekends without losing consistency.",
    location: "Gurugram, Haryana" },
  { id: 8, name: "Ritu Malhotra", company: "La Forno", rating: 5,
    review: "Build quality screams premium. The oven becomes a live showpiece—guests love watching the flame while pizzas bake in 90 seconds.",
    location: "New Delhi" },
  { id: 9, name: "Harsh Goel", company: "Crust Craft", rating: 5,
    review: "We run long service hours; heat retention + fuel efficiency surprised us. Pays back through volume and repeat customers.",
    location: "Jaipur, Rajasthan" },
  { id: 10, name: "Neha Kulkarni", company: "Oven & Olive", rating: 5,
    review: "Support is responsive, installation was neat, and documentation is clear. Easily the best decision we made for our new outlet.",
    location: "Hyderabad, Telangana" },
];

/* ========== Helpers ========== */
const initials = (name: string) => name.split(" ").map(n => n[0]?.toUpperCase()).slice(0,2).join("");
const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        aria-hidden="true" />
    ))}
  </div>
);

/* ========== Premium Card (hover tilt + glare) ========== */
const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(my, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 1000 }}>
      <motion.div style={{ rotateX, rotateY }} className="relative group rounded-3xl">
        {/* dynamic glare */}
        <motion.div
          style={{
            left: useTransform(mx, v => `${v * 100}%`),
            top:  useTransform(my, v => `${v * 100}%`),
          }}
          className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        />
        {children}
      </motion.div>
    </div>
  );
};

const TestimonialCard: React.FC<{ t: Testimonial; active?: boolean }> = ({ t, active }) => (
  <motion.article
    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
    className="snap-center min-w-[88%] sm:min-w-[62%] md:min-w-[48%] lg:min-w-[32%]"
  >
    <TiltCard>
      <div className="p-[1px] rounded-3xl bg-gradient-to-br from-orange-200 via-white to-rose-200">
        <div className={`relative rounded-3xl bg-white/85 backdrop-blur-md border border-white/60 shadow-[0_12px_40px_rgba(16,24,40,.08)] overflow-hidden ${active ? "scale-[1.01]" : "scale-100"} transition-transform`}>
          <div className="absolute inset-x-0 -top-1 h-28 bg-gradient-to-b from-orange-50/70 to-transparent" />
          <div className="relative p-6 md:p-7">
            <Quote className="absolute -top-4 -left-4 text-[#d43804]/15" size={60} />
            <div className="flex items-center gap-4 mb-4">
              {t.image ? (
                <img src={t.image} alt={`${t.name} avatar`} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-[#d43804]/20" loading="lazy" />
              ) : (
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 text-[#d43804] flex items-center justify-center font-semibold ring-2 ring-[#d43804]/20">
                  {initials(t.name)}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{t.name}</h3>
                <p className="text-sm text-[#d43804] font-medium truncate">{t.company}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={14} /> {t.location}</p>
              </div>
            </div>

            <div className="mb-3"><Stars rating={t.rating} /></div>
            <p className="text-gray-700 leading-relaxed line-clamp-6">“{t.review}”</p>
          </div>
        </div>
      </div>
    </TiltCard>
  </motion.article>
);

/* ========== Page (scroll-snap + arrows + autoplay, no hang) ========== */
const TestimonialsPage: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [hover, setHover] = useState(false);

  const n = testimonialsData.length;
  const avg = useMemo(() =>
    Math.round((testimonialsData.reduce((a, t) => a + (t.rating ?? 0), 0) / n) * 10) / 10
  , [n]);

  // measure each slide's offset for precise snapping (robust across breakpoints)
  const measure = () => {
    const el = trackRef.current; if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    setOffsets(kids.map(k => k.offsetLeft));
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  // keep active dot in sync while user scrolls
  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const kids = Array.from(el.children) as HTMLElement[];
      let best = 0, min = Number.MAX_VALUE;
      kids.forEach((k, i) => {
        const c = offsets[i] + k.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < min) { min = d; best = i; }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [offsets]);

  const goTo = (i: number) => {
    if (!trackRef.current || !offsets.length) return;
    const next = (i + n) % n;
    trackRef.current.scrollTo({ left: offsets[next], behavior: "smooth" });
    setIndex(next);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // autoplay that never hangs; pauses on hover
  useEffect(() => {
    if (hover) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [index, hover, offsets]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] rounded-full bg-[radial-gradient(closest-side,rgba(212,56,4,0.12),transparent)] blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent
                       bg-[linear-gradient(90deg,#111,#d43804,#111)] bg-[length:200%_100%] animate-[shine_6s_linear_infinite]"
          >
            What Our Clients Say
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-gray-600 max-w-3xl mx-auto"
          >
            Real stories from restaurants and chefs across India—premium ovens, premium performance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 inline-flex items-center gap-2 text-sm text-gray-700 bg-white rounded-full px-3 py-1 shadow-sm border border-gray-100"
          >
            <Star className="text-yellow-400 fill-yellow-400" size={16} />
            {avg} / 5.0 · {n}+ verified reviews
          </motion.div>
        </div>
      </section>

      {/* Carousel */}
      <section className="relative py-10 md:py-14">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* arrows */}
          <button onClick={prev}
            className="hidden md:flex absolute -left-2 top-[55%] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border shadow hover:bg-white transition"
            aria-label="Previous testimonials"><ChevronLeft /></button>
          <button onClick={next}
            className="hidden md:flex absolute -right-2 top-[55%] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border shadow hover:bg-white transition"
            aria-label="Next testimonials"><ChevronRight /></button>

          {/* track: scroll-snap + smooth */}
          <motion.div
            ref={trackRef}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar"
          >
            {testimonialsData.map((t, i) => (
              <TestimonialCard key={t.id} t={t} active={i === index} />
            ))}
          </motion.div>

          {/* dots */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonialsData.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-[#d43804]" : "w-2.5 bg-gray-300"}`}
                aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* local styles */}
      <style>{`
        @keyframes shine { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .line-clamp-6{ display:-webkit-box; -webkit-line-clamp:6; -webkit-box-orient:vertical; overflow:hidden; }
        .hide-scrollbar{ scrollbar-width:none; -ms-overflow-style:none; }
        .hide-scrollbar::-webkit-scrollbar{ display:none; }
      `}</style>
    </div>
  );
};

export default TestimonialsPage;
