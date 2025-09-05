import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

interface NotificationContextProps {
  message: string | null;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setMessage(message);
  };

  const hideNotification = () => {
    setMessage(null);
  };

  //   useEffect(() => {
  //     if (message) {
  //       const timer = setTimeout(() => {
  //         hideNotification();
  //       }, 3e3);
  //       console.log("notification", message);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [message]);

  return (
    <NotificationContext.Provider
      value={{ message, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
