// src/components/AboutHero.tsx
import React from "react";
import HeroImg from "../assets/CommercialOven.png";
import AboutSection from "./AboutSection";
import AboutFounder from "./AboutFounder";
import AboutGallery from "./AboutGallery";
import WhyChooseUs from "./WhyChooseUs";
import ProjectsInIndia from "../pages/ProjectsInIndia";
import SaifGallery from "./SaifGallery";
import SaifFaq from "./SaifFaq";

export default function AboutUs() {
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
          About Saif Ameer
        </p>

        <h1 className="text-white font-bold leading-[1.05] tracking-tight 
                       text-[42px] md:text-[66px] lg:text-[76px]">
          Pizza Manufacturers
          <br />
          In India
        </h1>
      </div>
    </section>
    <AboutSection />
    <AboutFounder />
    <AboutGallery />
    <WhyChooseUs />
    <ProjectsInIndia />
    <SaifGallery />
    <SaifFaq />
    </>
  );
}
