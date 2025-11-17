// src/components/Layout/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import Footimg from "../../assets/footer.png"

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0e0e0e] text-white">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand + Tagline */}
          <div className="md:col-span-5">
            <div className="flex flex-col gap-6">
              {/* Logo above text - Fixed positioning */}
              <div className="flex flex-col items-start gap-3">
                <img
                  src={Logo}
                  alt="Pizza Oven By Saif"
                  className="h-24 w-auto object-contain" // Removed transform scale, increased height
                />
                
                <div className="mb-4  text-[16px] md:text-[16px] lg:text-[16px] font-light text-[#ffffff] tracking-[0.015em]">
                  <p>The Best Commercial Wood Fired</p>
                  <p>Pizza Oven In India</p>
                </div>
              </div>

              {/* Social media icons */}
              <div className="flex gap-3">
                <a
                  href="www.instagram.com/the_pizza_ovens_by_saif/"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="www.facebook.com/thepizzaovensbysaif/"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="www.youtube.com/channel/UC2Y5-Gmxu854G3hPQ15hl4g"
                  aria-label="YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="mb-4  text-[18px] md:text-[18px] lg:text-[18px] font-normal text-[#ffffff] tracking-[0.015em]">Company</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/who-we-are" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] tracking-[0.02em]">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] tracking-[0.02em]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] tracking-[0.02em]">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Treatments */}
          <div className="md:col-span-2">
            <h4 className=" mb-4  text-[18px] md:text-[18px] lg:text-[18px] font-normal text-[#ffffff] tracking-[0.015em]">Our Treatments</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/products/commercial-oven" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] tracking-[0.02em]">
                  Commercial Oven
                </Link>
              </li>
              <li>
                <Link to="/products/portable-oven" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] tracking-[0.02em]">
                  Portable Oven
                </Link>
              </li>
              <li>
                <Link to="/products/residential-oven" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] tracking-[0.02em]">
                  Residential Oven
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-3">
            <h4 className=" mb-4  text-[18px] md:text-[18px] lg:text-[18px] font-normal text-[#ffffff] tracking-[0.015em]">Contact Us</h4>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-white/80 mt-0.5 flex-shrink-0" />
                <p className="leading-6 text-[14px] md:text-[14px] text-[#c5c2c2] tracking-[0.02em]">
                  H-16, 1461, Shooting Range Rd, near by Shikshalayam School, Block G 1, Sangam Vihar, New Delhi, Delhi 110080
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white/80 flex-shrink-0" />
                <a href="mailto:info@thepizzaovens.com" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] leading-[1.7] tracking-[0.02em]">
                  info@thepizzaovens.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/80 flex-shrink-0" />
                <a href="tel:+919899593526" className="hover:text-white transition-colors duration-300 text-[14px] md:text-[14px] text-[#c5c2c2] leading-[1.7] tracking-[0.02em]">
                  +91 989 959 35 26
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider + Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-[14px] md:text-[16px] text-[#c5c2c2] leading-[1.7] tracking-[0.02em] mb-6">
          <p className="mb-4 md:mb-0">
            © The Pizza Oven By Saif, All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-[14px] md:text-[16px] text-[#c5c2c2] leading-[1.7] tracking-[0.02em] mb-6">
            <Link to="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-white transition-colors duration-300">
              Credit: Umair
            </Link>
          </div>
        </div>
         <div className="w-screen mt-10 relative left-1/2 right-1/2 -mx-[50vw]">
  <img
    src={Footimg}
    alt="Footer Decoration"
    className="w-screen h-auto object-cover"
  />
</div>
      </div>


    </footer>
  );
};

export default Footer;