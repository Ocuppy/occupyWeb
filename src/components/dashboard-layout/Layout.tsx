import { ReactNode, useContext, useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Button } from "../ui/button";
import { AngleLeftIcon } from "@/assets/icon/icons";
import { cn } from "@/lib/utils";
import { Toaster } from "../ui/toaster";
import {
  DashboardMenuVisibilityContext,
  DashboardMenuVisibilityProvider,
} from "@/contexts/DashboardMenuVisibilityContext";
import { AnimatePresence, motion } from "framer-motion";
import NotificationPopup from "../select-supermarket/notification/NotificationPopup";
import OrderNotificationPopup from "../select-supermarket/order-notification-popup/OrderNotificationPopup";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { getCredentials } from "@/store/redux/services/authSlice/authSlice";
import { selectAuthToken } from "@/store/redux/services/authSlice/authSlice";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";
import { fetchToken } from "../../../firebase";
import NotificationHandler from "./NotificationHandler";
// import { useRouter } from "next/navigation";

const Layout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(DashboardMenuVisibilityContext);

  if (!context) {
    throw new Error("ToggleComponent must be used within a VisibilityProvider");
  }

  const { isVisible, toggleVisibility } = context;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getCredentials());
  }, [dispatch]);

  // const token = useAppSelector(selectAuthToken);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    // <div className={cn("flex flex-auto flex-col bg-[#F9FBFD]", className)}>
    <div className={cn("bg-[#F9FBFD]", className)}>
      <NotificationPopup />
      <OrderNotificationPopup />
      <Toaster />

      <div
        onClick={() => {
          // console.log("layout");
        }}
        className="min-w-0 flex-auto gap-10 xl:flex"
      >
        {isVisible ? (
          <div
            onClick={toggleVisibility}
            className="fixed left-0 top-0 z-30 block w-screen backdrop-blur-sm xl:hidden"
          >
            <AnimatePresence>
              <motion.div
                className="w-10/12"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                <DashboardSidebar />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <></>
        )}
        <div className="hidden xl:block">
          <DashboardSidebar />
        </div>
        <div className="relative mb-12 flex min-h-screen min-w-0 max-w-[100vw] flex-auto flex-col overflow-y-auto overflow-x-hidden">
          <DashboardHeader />

          <main className={cn("mt-32 h-full flex-1 grow px-4 py-4 font-inter")}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
