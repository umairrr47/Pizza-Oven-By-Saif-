// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-[#d43804] rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">P</span>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold">Premium Ovens</h3>
//                 <p className="text-sm text-gray-400">Authentic Italian Experience</p>
//               </div>
//             </div>
//             <p className="text-gray-300 text-sm leading-relaxed">
//               Crafting premium pizza ovens with Italian heritage and modern precision. 
//               Bringing authentic flavors to your kitchen since 2015.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
//                 <Facebook size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
//                 <Instagram size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
//                 <Youtube size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               {[
//                 { name: 'Home', path: '/' },
//                 { name: 'Products', path: '/products' },
//                 { name: 'Recent Work', path: '/recent-work' },
//                 { name: 'Blog', path: '/blog' },
//                 { name: 'Testimonials', path: '/testimonials' },
//                 { name: 'Contact', path: '/contact' }
//               ].map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.path}
//                     className="text-gray-300 hover:text-[#d43804] transition-colors text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Products */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Our Products</h4>
//             <ul className="space-y-2">
//               {[
//                 'Wood-Fired Ovens',
//                 'Gas Ovens',
//                 'Hybrid Ovens',
//                 'Home Ovens',
//                 'Commercial Ovens',
//                 'Custom Solutions'
//               ].map((product) => (
//                 <li key={product}>
//                   <Link
//                     to="/products"
//                     className="text-gray-300 hover:text-[#d43804] transition-colors text-sm"
//                   >
//                     {product}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
//             <div className="space-y-3">
//               <div className="flex items-start space-x-3">
//                 <MapPin size={16} className="mt-1 text-[#d43804]" />
//                 <div>
//                   <p className="text-sm text-gray-300">
//                     123 Industrial Area, Sector 15<br />
//                     Mumbai, Maharashtra 400001
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Phone size={16} className="text-[#d43804]" />
//                 <p className="text-sm text-gray-300">+91 98765 43210</p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Mail size={16} className="text-[#d43804]" />
//                 <p className="text-sm text-gray-300">info@premiumovens.com</p>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <h5 className="text-sm font-semibold mb-2">Business Hours</h5>
//               <div className="text-sm text-gray-300 space-y-1">
//                 <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
//                 <p>Sunday: 10:00 AM - 5:00 PM</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-sm text-gray-400 mb-4 md:mb-0">
//               © 2024 Premium Ovens. All rights reserved. | Crafted with passion for authentic pizza.
//             </p>
//             <div className="flex space-x-6 text-sm text-gray-400">
//               <a href="#" className="hover:text-[#d43804] transition-colors">Privacy Policy</a>
//               <a href="#" className="hover:text-[#d43804] transition-colors">Terms of Service</a>
//               <a href="#" className="hover:text-[#d43804] transition-colors">Warranty</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#d43804] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Premium Ovens</h3>
                <p className="text-sm text-gray-400">Authentic Italian Experience</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d43804] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },  // ✅ About added
                { name: 'Products', path: '/products' },
                { name: 'Recent Work', path: '/recent-work' },
                { name: 'Blog', path: '/blog' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#d43804] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Products</h4>
            <ul className="space-y-2">
              {[
                'Wood-Fired Ovens',
                'Gas Ovens',
                'Hybrid Ovens',
                'Home Ovens',
                'Commercial Ovens',
                'Custom Solutions'
              ].map((product) => (
                <li key={product}>
                  <Link
                    to="/products"
                    className="text-gray-300 hover:text-[#d43804] transition-colors text-sm"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1 text-[#d43804]" />
                <div>
                  <p className="text-sm text-gray-300">
                    123 Industrial Area, Sector 15<br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#d43804]" />
                <p className="text-sm text-gray-300">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#d43804]" />
                <p className="text-sm text-gray-300">info@premiumovens.com</p>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Business Hours</h5>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p>Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Premium Ovens. All rights reserved. | Crafted with passion for authentic pizza.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#d43804] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d43804] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#d43804] transition-colors">Warranty</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
