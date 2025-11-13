// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Footer from "./components/Layout/Footer";
import FloatingWhatsApp from "./components/UI/FloatingWhatsApp";
import ScrollToTop from "./components/Layout/ScrollToTop";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductsDetails";
import RecentWork from "./pages/RecentWork";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import CommercialOvens from "./ovens/commercial/CommercialOvens";
import PortableOvens from "./ovens/portable/PortableOvens";
import ResidentialOvens from "./ovens/residential/ResidentialOvens";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black">
        <main>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetails />} />
              <Route path="/recent-work" element={<RecentWork />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/commercialovens" element={<CommercialOvens />} />
              <Route path="/portableovens" element={<PortableOvens />} />
              <Route path="/residentialovens" element={<ResidentialOvens />} />
            </Routes>
          </Layout>
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
};

export default App;
