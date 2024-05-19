import React, { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Button } from "../ui/button";
import { AngleLeftIcon } from "@/assets/icon/icons";

const Layout = ({ children }: { children: ReactNode }) => {
  const [showFullSidebar, setShowFullSidebar] = useState<boolean>(true);
  const toggleSidebarState = () => setShowFullSidebar(!showFullSidebar);
  return (
    <div className="flex gap-12 h-[100dvh] bg-[#F9FBFD] pr-12">
      <div className="w-max relative ">
        <Button
          onClick={toggleSidebarState}
          className="absolute translate-x-[50%] rounded-lg z-[100] top-8 right-0 translate-x-[50%] border-[2px] px-2 py-4 bg-occupy-primary text-white border-[#F3D9EC]"
        >
          <AngleLeftIcon
            className={`${showFullSidebar ? "" : "rotate-[180deg]"}`}
            fill="white"
          />
        </Button>
        <DashboardSidebar showFullSidebar={showFullSidebar} />
      </div>
      <div className="flex-1 px-8 pb-4 flex flex-col h-full">
        <DashboardHeader />
        <main className="overflow-y-auto hideScroll bg-red-200 py-4 mt-12 flex-1 h-full grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
