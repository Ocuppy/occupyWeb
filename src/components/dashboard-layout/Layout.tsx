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
    <div className={cn("flex bg-[#F9FBFD] flex-auto flex-col", className)}>
      <Toaster />
      <div className="flex gap-10  flex-auto min-w-0">
        <div className="">
          <DashboardSidebar />
        </div>
        <div className="flex mb-12 flex-col flex-auto overflow-y-auto min-h-screen min-w-0 relative w-full ">
          <DashboardHeader />

          <main
            className={cn(
              "pr-4 py-4 mt-[120px] flex-1 h-full grow",
              inter.className
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
