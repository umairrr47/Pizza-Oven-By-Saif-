import React from "react";
import CommercialOvenHero from "./PortableOvenHero";
import AssistanceBanner from "../commercial/AssistanceBanner";
import PortableBenefit from "./PortableBenefit";
import PortableSpecs from "./PortableSpecs";
import RevolvingOven from "../../pages/RevolvingOven";
import PortableOvenDetails from "./PortableOvenDetails";
import ReviewsSection from "../commercial/ReviewsSection";
import PortableGallery from "./PortableGallery";
import PortableAbout from "./PortableAbout";
import AboutLink from "../commercial/AboutLink";


const PortableOvens = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Full width */}
      <CommercialOvenHero />
      <AssistanceBanner />
      <PortableBenefit />
      <PortableSpecs />
      <RevolvingOven />
      <PortableOvenDetails />
      <ReviewsSection />
      <PortableGallery />
      <PortableAbout />
      <AboutLink />
    </div>
  );
};

export default PortableOvens;