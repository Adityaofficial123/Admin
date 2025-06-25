importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js");
const CACHE_NAME = "campusmart-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./index.js",
  "./manifest.json",
  "./ekd-logo.png"
];

// Install service worker and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Force activate immediately
});

// Activate event: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // Take control of clients right away
});

// Intercept fetch requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return new Response("⚠️ Offline or resource not found", {
          status: 404,
          headers: { "Content-Type": "text/plain" }
        });
      });
    })
  );
});


firebase.initializeApp({
  apiKey: "AIzaSyAbDaEt1ACIRNyC4QerqZQhTO8VJuNoWfE",
  authDomain: "marketplace-378f6.firebaseapp.com",
  projectId: "marketplace-378f6",
  messagingSenderId: "519512596002",
  appId: "1:519512596002:web:b4cd5978ffa111ef55b47b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("📦 Background FCM received:", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body: body,
    icon: "/ekd-logo.png"
  });
});

