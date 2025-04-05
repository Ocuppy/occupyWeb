import { useContext, useEffect } from "react";
import { NotificationContext } from "../../../contexts/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NotificationPopup.module.css";
import { X } from "lucide-react";

const NotificationPopup: React.FC = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "NotificationPopup must be used within a NotificationProvider",
    );
  }

  const { message, hideNotification } = context;

  //   useEffect(() => {
  //     if (message) {
  //       const timer = setTimeout(() => {
  //         hideNotification();
  //       }, 3e3);
  //       console.log("notification", message);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [message, hideNotification]);

  return message ? (
    <div className={styles.notificationContainer} onClick={hideNotification}>
      <AnimatePresence>
        {message && (
          <motion.div
            className={styles.notificationPopup}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            <header className="flex w-full items-center justify-between rounded-t-md bg-slate-50 p-4">
              <h6>This is the notification container</h6>
              <button>
                <X onClick={hideNotification} />
              </button>
            </header>
            <section className="px-7 py-5">
              <ul className="list-disc">
                <li>{message}</li>
              </ul>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <></>
  );
};

export default NotificationPopup;
