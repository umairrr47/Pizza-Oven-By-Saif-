
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Footer from "./components/Layout/Footer";
import FloatingWhatsApp from "./components/UI/FloatingWhatsApp";
import ScrollToTop from "./components/Layout/ScrollToTop";
import LogoIntro from "./components/LogoIntro";
import Home from "./pages/Home";
import Products from "./pages/Products";

const ProductDetails = lazy(() => import("./pages/ProductsDetails"));
const RecentWork = lazy(() => import("./pages/RecentWork"));
const Blog = lazy(() => import("./pages/Blog"));
const CommercialOvens = lazy(
  () => import("./ovens/commercial/CommercialOvens")
);
const PortableOvens = lazy(
  () => import("./ovens/portable/PortableOvens")
);
const ResidentialOvens = lazy(
  () => import("./ovens/residential/ResidentialOvens")
);
const AboutUs = lazy(() => import("./AboutUs/AboutUs"));
const OvensShowcase = lazy(() => import("./pages/OvensShowcase"));
const ContactHome = lazy(() => import("./Contact Us/ContactHome"));

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen bg-black">
        <main>
          <Layout>
            <Suspense
              fallback={<div className="min-h-[50vh] bg-black" />}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ovensshowcase" element={<OvensShowcase />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetails />} />
                <Route path="/recent-work" element={<RecentWork />} />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/commercialovens"
                  element={<CommercialOvens />}
                />
                <Route
                  path="/portableovens"
                  element={<PortableOvens />}
                />
                <Route
                  path="/residentialovens"
                  element={<ResidentialOvens />}
                />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contact" element={<ContactHome />} />
              </Routes>
            </Suspense>
          </Layout>

          <LogoIntro />
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
};

export default App;
