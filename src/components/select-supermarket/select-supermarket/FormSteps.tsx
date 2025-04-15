import { use, useEffect, useState } from "react";
import Flex from "@/components/shared/Flex";
import { cn } from "@/lib/utils";
import { ArrowLeftSquare, ArrowLeft } from "lucide-react";
import SideMenu from "./SideMenu";
import { AnimatePresence } from "framer-motion";
// AngleLeftIcon
const FormSteps = ({
  stepState,
  currentStep,
  onClickElement,
}: {
  stepState: {
    title: string;
    desc: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  }[];
  currentStep: number;
  onClickElement?: (val: number) => void;
}) => {
  const [showSteps, setshowSteps] = useState(false);

  const [allowMenu, setAllowMenu] = useState(false);

  useEffect(() => {
    const supermarket = sessionStorage.getItem("occupy-supermarket");

    if (supermarket) {
      setAllowMenu(true);
    }
  }, []);

  return (
    <div className="relative flex h-full flex-col justify-center rounded-md border border-dashed bg-white p-4 sm:min-w-[250px]">
      {!allowMenu && (
        <div className="absolute left-0 top-0 z-20 h-full w-full cursor-not-allowed bg-white/50"></div>
      )}
      <ArrowLeftSquare
        className="mb-8 w-8 sm:hidden"
        onClick={(e) => {
          e.stopPropagation();
          setshowSteps(true);
        }}
      />
      <AnimatePresence>
        {showSteps && (
          <SideMenu
            onClickElement={onClickElement}
            currentStep={currentStep}
            stepState={stepState}
            hideMenu={() => setshowSteps(false)}
          />
        )}
      </AnimatePresence>
      {stepState.map((item, idx) => (
        <div className="w-full" key={idx}>
          <Flex
            onClick={(e) => {
              e.stopPropagation();
              onClickElement && onClickElement(idx + 1);
            }}
            className={cn("gap-4", onClickElement && "hover:cursor-pointer")}
          >
            <item.icon />
            <div className="hidden flex-col items-start justify-start sm:block">
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
  );
};

export default FormSteps;
