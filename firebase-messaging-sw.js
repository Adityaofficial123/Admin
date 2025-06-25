// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAbDaEt1ACIRNyC4QerqZQhTO8VJuNoWfE",  apiKey: "YOUR_KEY",
   projectId: "marketplace-378f6",
  messagingSenderId: "519512596002",
  appId: "1:519512596002:web:b4cd5978ffa111ef55b47b",
  authDomain: "marketplace-378f6.firebaseapp.com",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("📦 Background message received: ", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/ekd-logo.png" // Or your preferred icon
  });
});
