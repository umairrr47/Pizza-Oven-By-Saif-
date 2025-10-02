import { motion } from "framer-motion";

const clients = [
  { name: "Domino's Pizza", logo: "/assets/clients/dominos.svg", desc: "Boosted delivery speed & consistency with our hybrid ovens." },
  { name: "Pizza Hut", logo: "/assets/clients/pizzahut.svg", desc: "Serving authentic Neapolitan-style pizzas at scale." },
  { name: "Subway", logo: "/assets/clients/subway.svg", desc: "Integrated ovens for quick-service gourmet pizzas." },
  { name: "Taj Hotels", logo: "/assets/clients/taj.svg", desc: "Luxury dining experiences powered by our premium ovens." },
  { name: "Barbeque Nation", logo: "/assets/clients/bbq.svg", desc: "High-volume efficiency with authentic wood-fired taste." },
  { name: "Starbucks", logo: "/assets/clients/starbucks.svg", desc: "Crafted oven solutions for global coffeehouse menus." },
];

const OurClients = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6">
            Trusted by <span className="text-amber-600">Global Icons</span>
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg">
            From <span className="font-semibold">fast-food giants</span> to <span className="font-semibold">luxury hotels</span>, 
            our ovens deliver unmatched performance, speed & authentic flavor.  
            That’s why world-class brands trust us to power their kitchens.
          </p>
        </motion.div>

        {/* Client Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          {clients.map((client, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center h-20 mb-6">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-14 object-contain grayscale group-hover:grayscale-0 transition duration-500"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{client.name}</h3>
              <p className="text-sm text-neutral-600">{client.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Logo Strip (marquee effect) */}
        <div className="mt-20 relative overflow-hidden">
          <motion.div
            className="flex gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...clients, ...clients].map((client, i) => (
              <img
                key={i}
                src={client.logo}
                alt={client.name}
                className="h-12 object-contain opacity-60 hover:opacity-100 transition duration-300"
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-neutral-700 text-lg mb-4">
            Join 100+ brands already baking with <span className="font-semibold text-amber-600">our ovens</span>.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold shadow hover:bg-amber-700 transition"
          >
            Become Our Client
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OurClients;
