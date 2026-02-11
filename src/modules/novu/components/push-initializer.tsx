"use client";

import { useEffect } from "react";
import {
    FirebaseError,
    initializeApp,
    getApps,
    type FirebaseApp,
} from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB-NUXA8eYNl8r0avZYkXsA5hweA6I4D1g",
    authDomain: "push-notification-8e551.firebaseapp.com",
    projectId: "push-notification-8e551",
    storageBucket: "push-notification-8e551.firebasestorage.app",
    messagingSenderId: "425026760181",
    appId: "1:425026760181:web:26ad3d8e03a9d9ff0784bc",
    measurementId: "G-LW7GWH2YEN",
};

function getFirebaseApp(): FirebaseApp {
    const existingApps = getApps();
    if (existingApps.length > 0) {
        return existingApps[0];
    }

    return initializeApp(firebaseConfig);
}

type PushInitializerProps = {
    vapidKey: string;
};

const STORAGE_KEY = "novu_fcm_device_token";

export function PushInitializer({ vapidKey }: PushInitializerProps) {
    useEffect(() => {
        let active = true;

        (async () => {
            if (!active) return;
            if (typeof window === "undefined") return;
            if (!("Notification" in window)) return;
            if (!vapidKey) return;

            const supported = await isSupported().catch(() => false);
            if (!supported) return;

            const permission = await Notification.requestPermission();
            if (permission !== "granted") return;

            const registration = await navigator.serviceWorker.register(
                "/firebase-messaging-sw.js",
            );

            const app = getFirebaseApp();
            const messaging = getMessaging(app);

            const token = await getToken(messaging, {
                vapidKey,
                serviceWorkerRegistration: registration,
            });

            if (!token) return;
            if (!active) return;

            const lastToken = window.localStorage.getItem(STORAGE_KEY);
            if (lastToken === token) return;

            const response = await fetch("/api/novu/credentials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => "");
                throw new Error(
                    `Token sync failed (${response.status}): ${text}`,
                );
            }

            window.localStorage.setItem(STORAGE_KEY, token);
        })().catch((error) => {
            if (error instanceof FirebaseError) {
                console.error("FCM error:", error.code);
                return;
            }
            console.error("Push initialization error:", error);
        });

        return () => {
            active = false;
        };
    }, [vapidKey]);

    return null;
}

export function getStoredFcmToken() {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
}

export function clearStoredFcmToken() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
}
