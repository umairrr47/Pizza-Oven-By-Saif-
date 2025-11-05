import "./styles/lenis.css";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import SmoothScrollProvider from "./lib/SmoothScrollProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <SmoothScrollProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </SmoothScrollProvider>
);

