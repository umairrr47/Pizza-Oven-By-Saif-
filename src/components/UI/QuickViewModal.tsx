import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Package, Ruler, Weight, Thermometer, CircleCheck as CheckCircle } from 'lucide-react';
import { Product } from '../../data/products';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-[#d43804] hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <span className="bg-[#d43804] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Flame size={14} />
                      <span>{product.fuelType}</span>
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Package size={14} />
                      <span>{product.size}</span>
                    </span>
                  </div>
                </div>
                
                {product.gallery.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {product.gallery.slice(1, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <span className="text-[#d43804] text-sm font-medium">{product.category}</span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h2>
                  <p className="text-2xl font-bold text-[#d43804] mt-2">{product.price}</p>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                {/* Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Ruler className="text-[#d43804]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Dimensions</p>
                        <p className="font-medium">{product.specifications.dimensions}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Weight className="text-[#d43804]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium">{product.specifications.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Package className="text-[#d43804]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Capacity</p>
                        <p className="font-medium">{product.specifications.capacity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Thermometer className="text-[#d43804]" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Max Temp</p>
                        <p className="font-medium">{product.specifications.temperature}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex space-x-4 pt-4">
                  <motion.button
                    className="flex-1 bg-[#d43804] text-white py-3 rounded-lg font-medium hover:bg-[#b13003] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                  >
                    Get Quote Now
                  </motion.button>
                  <motion.button
                    className="flex-1 border-2 border-[#d43804] text-[#d43804] py-3 rounded-lg font-medium hover:bg-[#d43804] hover:text-white transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Call Expert
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;