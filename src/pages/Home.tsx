import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, CircleCheck as CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/UI/ProductCard';
import { useState } from 'react';
import QuickViewModal from '../components/UI/QuickViewModal';
import { Product } from '../data/products';
import Heroo from "../assets/heroo.png"
import Saif from "../assets/Saif.jpeg"

const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const featuredProducts = products.slice(0, 3);

  const stats = [
    { icon: Award, number: '500+', label: 'Ovens Installed' },
    { icon: Users, number: '300+', label: 'Happy Clients' },
    { icon: Clock, number: '8+', label: 'Years Experience' },
    { icon: CheckCircle, number: '99%', label: 'Satisfaction Rate' }
  ];

  const features = [
    {
      title: 'Authentic Italian Design',
      description: 'Traditional craftsmanship meets modern engineering for the perfect pizza experience.',
      image: 'https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Premium Materials',
      description: 'Only the finest refractory bricks and stainless steel components for lasting durability.',
      image: 'https://images.pexels.com/photos/5175654/pexels-photo-5175654.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Expert Installation',
      description: 'Professional setup and training included with every oven purchase.',
      image: 'https://images.pexels.com/photos/4087367/pexels-photo-4087367.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <div className="min-h-screen">
{/* Hero Section */}
<section className="relative h-screen flex items-end overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${Heroo})` }}
  />
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Content */}
  <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pb-16 sm:pb-20 md:pb-24 flex flex-col justify-end">
    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-snug sm:leading-tight md:leading-tight drop-shadow-xl mb-4 sm:mb-6"
      style={{ textAlign: 'left' }}
    >
      Fire. Flavor.
    </motion.h1>

    {/* Subtitle / Paragraph */}
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-sm sm:text-base md:text-xl text-gray-200 leading-relaxed max-w-full sm:max-w-lg md:max-w-2xl mb-6 sm:mb-8"
      style={{ textAlign: 'left' }}
    >
      Crafted in India, loved by chefs everywhere <br />
      Unmatched heat, flawless bakes, zero compromise
    </motion.p>

    {/* Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="flex flex-wrap sm:flex-row gap-3 xs:gap-4"
    >
      <Link
        to="/products"
        className="inline-flex bg-[#d43804] hover:bg-[#b13003] text-white px-5 py-2 sm:px-7 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        style={{ minWidth: 'fit-content' }}
      >
        <span>Explore Products</span>
        <ArrowRight
          className="group-hover:translate-x-1 transition-transform"
          size={16}
        />
      </Link>

      <Link
        to="/contact"
        className="inline-flex border-2 border-white text-white hover:bg-white hover:text-gray-900 px-5 py-2 sm:px-7 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 items-center justify-center"
        style={{ minWidth: 'fit-content' }}
      >
        Get Custom Quote
      </Link>
    </motion.div>
  </div>
</section>






      {/* Tagline Section */}
      <section className="py-16 bg-gray-50">
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
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed"
          >
            India’s premium wood & gas ovens designed to master pizzas, grills, roasts & more — built for chefs, loved by foodies.
          </motion.p>
        </div>
      </section>


      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Leading India’s Pizza Oven Revolution
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                As the Director of The Pizza Ovens, I bring a vision of combining **artisan Italian craftsmanship**
                with **cutting-edge engineering** to deliver ovens that create authentic flavors with unmatched
                performance. Since our inception, we have empowered restaurants, cafes, and pizza enthusiasts
                across India to craft culinary perfection — with reliability, quality, and passion at the core of everything we do.
              </p>
              <div className="space-y-4">
                {[
                  'Italian-inspired traditional designs',
                  'Premium materials and construction',
                  'Expert installation and training',
                  '2-year comprehensive warranty'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-[#d43804]" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 mt-8 text-[#d43804] hover:text-[#b13003] font-medium"
              >
                <span>Learn More About Us</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={Saif}
                alt="Director Image"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mohammad Saif</h3>
                <p className="text-gray-600 text-sm">Founder & Director</p>
                <p className="text-xs text-gray-500 mt-1">14+ Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Premium Ovens?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine traditional Italian craftsmanship with modern innovation to create
              ovens that deliver exceptional performance and authentic flavors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#d43804]">
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
              Join hundreds of satisfied customers who have transformed their kitchens
              with our premium pizza ovens. Get your custom quote today!
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
      </section>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;