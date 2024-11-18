import { useState } from "react";
import Flex from "@/components/shared/Flex";
import { cn } from "@/lib/utils";
import { ArrowLeftSquare, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// AngleLeftIcon
const SideMenu = ({
  stepState,
  currentStep,
  onClickElement,
  hideMenu,
}: {
  stepState: {
    title: string;
    desc: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  }[];
  currentStep: number;
  onClickElement?: (val: number) => void;
  hideMenu: () => void;
}) => {
  // const [showSteps, setshowSteps] = useState(false);

  //   <AnimatePresence>
  //   <motion.div
  //     className="w-10/12"
  //     initial={{ x: "-100%" }}
  //     animate={{ x: 0 }}
  //     exit={{ x: "-100%" }}
  //     transition={{ ease: "easeInOut", duration: 0.5 }}
  //   >
  //     <DashboardSidebar />
  //   </motion.div>
  // </AnimatePresence>

  return (
    // <AnimatePresence>
    <motion.div
      transition={{ ease: "easeInOut", duration: 0.5 }}
      key={"settingsExitMenu"}
      exit={{ x: "100%", opacity: 0 }}
      className="fixed right-0 top-0 z-[10000] h-screen w-screen backdrop-blur-sm sm:hidden"
    >
      <div className="absolute right-0 flex h-full w-[250px] flex-col justify-center rounded-md border border-dashed bg-white p-4">
        <ArrowLeftSquare
          className={`mb-8 w-8 rotate-180`}
          onClick={(e) => {
            hideMenu();
            e.stopPropagation();
          }}
        />
        {stepState.map((item, idx) => (
          <div className="w-full" key={idx}>
            <Flex
              onClick={(e) => {
                e.stopPropagation();
                onClickElement && onClickElement(idx + 1);
                hideMenu();
              }}
              className={cn("gap-4", onClickElement && "hover:cursor-pointer")}
            >
              <item.icon />

              <div className="flex-col items-start justify-start">
                <p
                  className={cn(
                    "font-medium text-[#212330]",
                    idx === currentStep - 1 && "text-occupy-primary",
                  )}
                >
                  {item.title}
                </p>
                <p className="text-[12px] text-[#848484]">{item.desc}</p>
              </div>
            </Flex>
            {idx !== stepState.length - 1 && (
              <div className="my-4 h-[1px] w-full bg-[#D0D5DD]" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
    // </AnimatePresence>
  );
};

export default SideMenu;
