// src/components/AboutHero.tsx
import React from "react";
import HeroImg from "../assets/ResidentialOven.png";
import InstallProcess from "./InstallProcess";
import ContactSection from "./ContactSection";
import OvensShowcase from "../pages/OvensShowcase";
import ContactOvensShowcase from "./ContactOvenShowcase";


export default function ContactHome() {
  return (
    <>
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] h-[75vh] md:h-[90vh] overflow-hidden">
      
      {/* Background Image */}
      <img
        src={HeroImg}
        alt="About Hero"
        className="w-full h-full object-cover brightness-75"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center ml-14 md:ml-20 lg:ml-24">
        
        <p
          className="text-[clamp(30px,3.2vw,56px)] leading-[1.1] font-thin tracking-[0.03em] text-gray-100 mb-4"
          style={{ fontFamily: '"NeueHaasGroteskDisp Pro", sans-serif' }}
        >
          Contact Saif Ameer
        </p>

        <h1 className="text-white font-bold leading-[1.05] tracking-tight 
                       text-[32px] md:text-[46px] lg:text-[76px]">
          The Pizza Ovens By Saif
        </h1>

        <p className="text-[16px] md:text-[18px] text-gray-300 leading-[1.8] tracking-[0.02em] mt-4 font-inter max-w-3xl">Reach out for premium wood-fired pizza ovens and expert advise, get the information and prices and then take Saif's personal opinion on how to move forward.</p>
      </div>
    </section>
    <InstallProcess />
    
    <ContactOvensShowcase />
    </>
    
  );
}
