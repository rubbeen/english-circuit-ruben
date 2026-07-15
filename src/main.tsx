import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => { void navigator.serviceWorker.register('/sw.js').then((registration) => {
    registration.addEventListener('updatefound', () => { const worker = registration.installing; worker?.addEventListener('statechange', () => { if (worker.state === 'installed' && navigator.serviceWorker.controller) window.dispatchEvent(new CustomEvent('english-circuit:update-ready', { detail: registration })); }); });
  }); });
  navigator.serviceWorker.addEventListener('controllerchange', () => window.dispatchEvent(new CustomEvent('english-circuit:update-ready')));
}
