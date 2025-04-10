import { useContext } from "react";
import { OrderNotificationContext } from "../../../contexts/OrderNotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./OrderNotificationPopup.module.css";
import { X } from "lucide-react";
import Link from "next/link";

const OrderNotificationPopup: React.FC = () => {
  const context = useContext(OrderNotificationContext);

  if (!context) {
    throw new Error(
      "NotificationPopup must be used within a NotificationProvider",
    );
  }

  const { message, link, hideNotification } = context;

  return message ? (
    <div className={styles.notificationContainer}>
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
              <h6>Notification!</h6>
              <button>
                <X onClick={hideNotification} />
              </button>
            </header>
            <section className="px-7 py-5">
              <Link href={`${link}`} className={styles.link}>
                {message}
              </Link>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <></>
  );
};

export default OrderNotificationPopup;
