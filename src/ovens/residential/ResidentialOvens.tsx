import React from "react";
import ResidentialOvenHero from "./ResidentialOvenHero";
import AssistanceBanner from "../commercial/AssistanceBanner";
import ResidentialBenefit from "./ResidentialBenefit";
import ResidentialSpecs from "./ResidentialSpecs";
import RevolvingOven from "../../pages/RevolvingOven";
import ResidentialOvenDetails from "./ResidentialOvenDetails";
import ReviewsSection from "../commercial/ReviewsSection";
import ResidentialGallery from "./ResidentialGallery";
import ResidentialAbout from "./ResidentialAbout";
import AboutLink from "../commercial/AboutLink";


const ResidentialOvens = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Full width */}
      <ResidentialOvenHero />
      <AssistanceBanner />
      <ResidentialBenefit />
      <ResidentialSpecs />
      <RevolvingOven />
      <ResidentialOvenDetails />
      <ReviewsSection />
      <ResidentialGallery />
      <ResidentialAbout />
      <AboutLink />
    </div>
  );
};

export default ResidentialOvens;