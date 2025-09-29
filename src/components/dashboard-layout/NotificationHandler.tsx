// components/NotificationHandler.tsx
import { useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase";
import { useToast } from "../ui/use-toast";

export default function NotificationHandler() {
  const { toast } = useToast();

  useEffect(() => {
    const setupMessageListener = async () => {
      try {
        const messagingInstance = await messaging();

        if (!messagingInstance) {
          // console.log("Messaging not supported or permission not granted");
          return;
        }

        // This listener only works when the app is in the foreground
        onMessage(messagingInstance, (payload) => {
          console.info("Foreground message received:", payload);

          // Extract notification data (same structure as in your service worker)
          const notificationTitle =
            payload.notification?.title || "New Notification";
          const notificationBody = payload.notification?.body || "";
          const link = payload.fcmOptions?.link || payload.data?.link;

          // Show toast notification
          toast({
            title: notificationTitle,
            description: notificationBody,
            variant: "default",
          });
        });
      } catch (error) {
        console.error("Error setting up message listener:", error);
      }
    };

    setupMessageListener();
  }, [toast]);

  // This component doesn't render anything visible
  return null;
}
