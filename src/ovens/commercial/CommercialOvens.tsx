import React from "react";
import CommercialOvenHero from "./CommercialOvenHero";
import AssistanceBanner from "./AssistanceBanner";
import BenifitSection from "./BenefitSection";
import CommercialSpecs from "./CommercialSpecs";
import RevolvingOven from "../../pages/RevolvingOven";
import CommercialOvenDetails from "./CommercialOvenDetails";
import ReviewsSection from "./ReviewsSection";
import CommercialGallery from "./CommercialGallery";
import CommercialAbout from "./CommercialAbout";
import AboutLink from "./AboutLink";


const CommercialOvens = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Full width */}
      <CommercialOvenHero />
      <AssistanceBanner />
      <BenifitSection />
      <CommercialSpecs />
      <RevolvingOven />
      <CommercialOvenDetails />
      <ReviewsSection />
      <CommercialGallery />
      <CommercialAbout />
      <AboutLink />
    </div>
  );
};

export default CommercialOvens;