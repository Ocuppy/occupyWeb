import { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Button } from "../ui/button";
import { AngleLeftIcon } from "@/assets/icon/icons";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: ReactNode }) => {
  const [showFullSidebar, setShowFullSidebar] = useState<boolean>(true);
  const toggleSidebarState = () => setShowFullSidebar(!showFullSidebar);
  return (
    <div className="flex bg-[#F9FBFD]  flex-auto flex-col">
      <div className="flex gap-4 flex-auto min-w-0">
        <div className="relative">
          <Button
            onClick={toggleSidebarState}
            className={cn(
              "fixed  rounded-lg z-[100] top-8  translate-x-[50%] border-[2px] px-2 py-4 bg-occupy-primary text-white border-[#F3D9EC]",
              showFullSidebar ? "left-[210px]" : "left-[65px]"
            )}
          >
            <AngleLeftIcon
              className={`${showFullSidebar ? "" : "rotate-[180deg]"}`}
              fill="white"
            />
          </Button>
          <DashboardSidebar showFullSidebar={showFullSidebar} />
        </div>
        <div className="flex  flex-col flex-auto min-h-screen min-w-0 relative w-full ">
          <DashboardHeader />
          <main className="overflow-y-auto hideScroll pr-4 py-4 mt-[120px] flex-1 h-full grow">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
