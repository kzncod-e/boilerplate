importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyB-NUXA8eYNl8r0avZYkXsA5hweA6I4D1g",
  authDomain: "push-notification-8e551.firebaseapp.com",
  projectId: "push-notification-8e551",
  storageBucket: "push-notification-8e551.firebasestorage.app",
  messagingSenderId: "425026760181",
  appId: "1:425026760181:web:26ad3d8e03a9d9ff0784bc",
  measurementId: "G-LW7GWH2YEN",
});

firebase.messaging();

