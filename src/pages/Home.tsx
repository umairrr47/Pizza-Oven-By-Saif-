
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Hero from "./Hero";
import OvensShowcase from "./OvensShowcase";
import Installation from "./Installation";
import RevolvingOven from "./RevolvingOven";
import BrandCarousal from "./BrandCarousel";
import EnquiryFormSection from "./EnquiryFormSection";
import Products from "./Products";
import RotatingCookingSection from "../components/RotatingCookingSection";
import InstagramSection from "../components/InstagramSection";

const HeroVideoGSAP = lazy(() => import("./HeroVideoGSAP"));
const OvenInfographic = lazy(() => import("./OvenInfographic"));

function SectionLoader() {
  return (
    <div
      className="flex min-h-24 items-center justify-center"
      aria-label="Loading section"
    >
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-300 border-t-amber-500" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Main hero */}
      <Hero />

      {/* Brand carousel */}
      <BrandCarousal />

      {/* Cinematic oven video */}
      <Suspense fallback={<SectionLoader />}>
        <HeroVideoGSAP />
      </Suspense>

      {/* Oven infographic */}
      <Suspense fallback={<SectionLoader />}>
        <OvenInfographic />
      </Suspense>

      {/* Oven categories and showcase */}
      <section aria-label="Oven collection">
        <OvensShowcase />
      </section>

      {/* Product catalog call to action */}
      <section aria-label="Oven collection">
        <Products />
      </section>

      <Suspense fallback={<SectionLoader />}>
        <RotatingCookingSection />
      </Suspense>

      {/* Installation services */}
      <Installation />

      {/* Revolving oven showcase */}
      {/* <Suspense fallback={<SectionLoader />}>
        <RevolvingOven />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <InstagramSection />
      </Suspense>

      {/* Enquiry form */}
      <Suspense fallback={<SectionLoader />}>
        <EnquiryFormSection />
      </Suspense>
    </div>
  );
}
