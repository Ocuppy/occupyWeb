import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useRef,
  useEffect,
} from "react";

interface OrderNotificationContextProps {
  message: string | null;
  link: string | null;
  showNotification: (message: string, link?: string) => void;
  hideNotification: () => void;
}

export const OrderNotificationContext = createContext<
  OrderNotificationContextProps | undefined
>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const OrderNotificationProvider: FC<NotificationProviderProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const notificationSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the audio object only on the client side
    if (typeof window !== "undefined") {
      notificationSound.current = new Audio("/audio/notification-bell.wav");
    }
  }, []);

  const showNotification = (message: string, link?: string) => {
    setMessage(message);
    if (link) {
      setLink(link);
    }
    const sound = notificationSound.current;
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.loop = true;

      sound.play().catch((err) => {
        console.error("Error playing notification sound:", err);
      });
    }
  };

  const hideNotification = () => {
    setMessage(null);
    setLink(null);
    const sound = notificationSound.current;
    if (sound) {
      sound.pause();
      sound.loop = false;
    }
  };

  return (
    <OrderNotificationContext.Provider
      value={{ message, link, showNotification, hideNotification }}
    >
      {children}
    </OrderNotificationContext.Provider>
  );
};
