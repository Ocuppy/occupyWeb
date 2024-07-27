import { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Button } from "../ui/button";
import { AngleLeftIcon } from "@/assets/icon/icons";
import { cn } from "@/lib/utils";
import { inter } from "@/pages/_app";
import { Toaster } from "../ui/toaster";

const Layout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-auto flex-col bg-[#F9FBFD]", className)}>
      <Toaster />
      <div className="flex min-w-0 flex-auto gap-10">
        <div className="">
          <DashboardSidebar />
        </div>
        <div className="relative mb-12 flex min-h-screen min-w-0 max-w-[100vw] flex-auto flex-col overflow-y-auto overflow-x-hidden">
          <DashboardHeader />

          <main
            className={cn(
              "mt-[120px] h-full flex-1 grow py-4 pr-4",
              inter.className,
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
