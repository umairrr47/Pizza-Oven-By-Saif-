// src/index.tsx
import "./styles/lenis.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import './index.css';
import SmoothScrollProvider from "./lib/SmoothScrollProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>
);
