import { InformationIcon } from "@/assets/icon/icons";
import Flex from "@/components/shared/Flex";
import { cn } from "@/lib/utils";

const FormSteps = ({
  stepState,
  currentStep,
  onClickElement,
}: {
  stepState: { title: string; desc: string }[];
  currentStep: number;
  onClickElement?: (val: number) => void;
}) => {
  return (
    <div className="flex-col bg-white min-w-[250px] rounded-md border-dashed border p-4 flex">
      {stepState.map((item, idx) => (
        <div className="w-full" key={idx}>
          <Flex
            onClick={() => {
              onClickElement && onClickElement(idx + 1);
            }}
            className={cn("gap-4", onClickElement && "hover:cursor-pointer")}
          >
            <InformationIcon />
            <div className="flex-col justify-start items-start">
              <p
                className={cn(
                  "text-[#212330] font-medium",
                  idx === currentStep - 1 && "text-occupy-primary"
                )}
              >
                {item.title}
              </p>
              <p className="text-[12px] text-[#848484]">{item.desc}</p>
            </div>
          </Flex>
          {idx !== stepState.length - 1 && (
            <div className="my-4 h-[1px] bg-[#D0D5DD] w-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormSteps;
