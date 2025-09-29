import { useContext, useEffect, useRef, useState } from "react";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, messaging } from "../../firebase";
import { useRouter } from "next/navigation";
import { OrderNotificationContext } from "@/contexts/OrderNotificationContext";
import { useUpdateNotificationTokenMutation } from "@/store/redux/services/authSlice/authApiSlice";
import { getCredentials } from "@/store/redux/services/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";

async function getNotificationPermissionAndToken() {
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return null;
  }

  if (Notification.permission === "granted") {
    console.info("Notification permission granted.");
    return await fetchToken();
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  // console.log("Notification permission not granted.");
  return null;
}

const useFcmToken = () => {
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);
  const orderNotificationContext = useContext(OrderNotificationContext);

  if (!orderNotificationContext) {
    throw new Error("Home must be used within a NotificationProvider");
  }

  const { showNotification } = orderNotificationContext;

  const loadToken = async () => {
    if (isLoading.current) return;

    isLoading.current = true;
    const token = await getNotificationPermissionAndToken();

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      console.info(
        "%cPush Notifications issue - permission denied",
        "color: green; background: #c7c7c7; padding: 8px; font-size: 20px",
      );
      isLoading.current = false;
      return;
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load token, refresh the browser");
        console.info(
          "%cPush Notifications issue - unable to load token after 3 retries",
          "color: green; background: #c7c7c7; padding: 8px; font-size: 20px",
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("An error occurred while retrieving token. Retrying...");
      isLoading.current = false;
      await loadToken();
      return;
    }

    // console.info(
    //   `%ctoken: ${token}`,
    //   "color: green; background: #c7c7c7; padding: 8px; font-size: 20px",
    // );

    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return;

      const m = await messaging();
      if (!m) return;

      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== "granted") return;

        const link = payload.fcmOptions?.link || payload.data?.link;

        if (payload?.notification) {
          const notificationData = {
            title: payload.notification.title ?? "New Notification",
            body: payload.notification.body ?? "",
            image: payload.notification.image,
            icon: payload.notification.icon ?? "/favicon.ico", // ✅ Added default icon fallback
          };

          if (link) {
            showNotification(notificationData, link);
          } else {
            showNotification(notificationData);
          }
        }
      });

      return unsubscribe;
    };

    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    return () => unsubscribe?.();
  }, [token, router, showNotification]);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
