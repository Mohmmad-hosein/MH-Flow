import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Restore the user's appearance before React paints to avoid a dark-theme flash.
try {
  const savedTheme = localStorage.getItem('mhflow.theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.dataset.theme = savedTheme;
  }
} catch { /* Storage can be unavailable in restricted browser contexts. */ }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

