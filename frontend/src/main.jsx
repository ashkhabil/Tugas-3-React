import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import './index.css';

/**
 * Entry point aplikasi
 * Sesuai Slide 09 PPT:
 * BrowserRouter membungkus App dan menyediakan sinkronisasi URL dan history.
 */
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
