const VERSION = 'english-circuit-v1';
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/offline.html', '/icons/icon.svg', '/icons/icon-192.svg', '/icons/icon-512.svg', '/icons/icon-maskable.svg'];
self.addEventListener('install', (event) => { event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL))); });
self.addEventListener('activate', (event) => { event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('english-circuit-') && key !== VERSION).map((key) => caches.delete(key))))); self.clients.claim(); });
self.addEventListener('fetch', (event) => {
  const request = event.request; if (request.method !== 'GET') return; const url = new URL(request.url);
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('firebase')) return;
  if (request.mode === 'navigate') { event.respondWith(fetch(request).then((response) => { const copy = response.clone(); caches.open(VERSION).then((cache) => cache.put('/index.html', copy)); return response; }).catch(async () => (await caches.match('/index.html')) || (await caches.match('/offline.html')))); return; }
  if (url.origin === self.location.origin) event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => { if (response.ok) { const copy = response.clone(); caches.open(VERSION).then((cache) => cache.put(request, copy)); } return response; })));
});
self.addEventListener('message', (event) => { if (event.data === 'SKIP_WAITING') self.skipWaiting(); });
