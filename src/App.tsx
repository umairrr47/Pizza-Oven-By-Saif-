import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import FloatingWhatsApp from "./components/UI/FloatingWhatsApp";
import ScrollToTop from "./components/Layout/ScrollToTop";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Products from "./pages/Products";
// If your file is named ProductsDetails.tsx, either rename the file to ProductDetails.tsx
// or change the import below to match the actual filename.
import ProductDetails from "./pages/ProductsDetails";
import RecentWork from "./pages/RecentWork";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import SmoothScrollProvider from "./lib/SmoothScrollProvider";
import SmokeOverlay from "./components/Layout/SmokeOverlay";
const App: React.FC = () => {
  return (
    <Router>
       <SmokeOverlay />
      <SmoothScrollProvider />
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
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
            </Routes>
          </Layout>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
      <SmoothScrollProvider />
    </Router>
  );
};

export default App;
