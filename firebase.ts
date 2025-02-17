import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyABA2ypU4e0Tg_VkuJlRrywJTV6hzl4B0k",
  authDomain: "occupy-notification.firebaseapp.com",
  projectId: "occupy-notification",
  storageBucket: "occupy-notification.firebasestorage.app",
  messagingSenderId: "377753652412",
  appId: "1:377753652412:web:c57ca4cf7dd98ea84f14b9",
  measurementId: "G-EDJFV0DRHW",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging);
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging, fetchToken };

