import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../../data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <Quote className="text-[#d43804] mb-4 opacity-20" size={40} />
        
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="text-yellow-400 fill-current" size={20} />
          ))}
        </div>

        <p className="text-gray-700 leading-relaxed mb-6 italic">
          "{testimonial.review}"
        </p>

        <div className="flex items-center space-x-4">
          {testimonial.image && (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#d43804]"
            />
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-[#d43804] font-medium">{testimonial.company}</p>
            <p className="text-gray-500 text-sm">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;