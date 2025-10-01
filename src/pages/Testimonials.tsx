import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/UI/TestimonialCard';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what restaurant owners and pizza enthusiasts 
            have to say about their Premium Ovens experience.
          </p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-r from-[#d43804] to-[#b13003] rounded-3xl p-8 md:p-12 mb-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <Quote className="absolute top-8 left-8 text-white/20" size={80} />
          
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-300 fill-current" size={24} />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-4xl mx-auto">
                  "{testimonials[currentIndex].review}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  {testimonials[currentIndex].image && (
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-white"
                    />
                  )}
                  <div className="text-left">
                    <h4 className="text-xl font-bold">{testimonials[currentIndex].name}</h4>
                    <p className="text-orange-200 font-medium">{testimonials[currentIndex].company}</p>
                    <p className="text-orange-100 text-sm">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
            
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 ml-4"
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            More Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#d43804] mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#d43804] mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#d43804] mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#d43804] mb-2">8+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </motion.div>

        {/* Video Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Video Testimonials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((video) => (
              <div
                key={video}
                className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video group cursor-pointer"
              >
                <img
                  src={`https://images.pexels.com/photos/${video === 1 ? '4087367' : '5175654'}/pexels-photo-${video === 1 ? '4087367' : '5175654'}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                  alt={`Video testimonial ${video}`}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#d43804] text-white w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={24} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">Chef Marco's Experience</h4>
                  <p className="text-sm opacity-90">Pizzeria Italiana, Mumbai</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#d43804] to-[#b13003] rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Happy Customers
          </h2>
          <p className="text-lg mb-6 text-orange-100">
            Experience the Premium Ovens difference and see why our customers love their investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#d43804] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get Your Quote
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#d43804] px-8 py-3 rounded-lg font-medium transition-all">
              Schedule Visit
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;