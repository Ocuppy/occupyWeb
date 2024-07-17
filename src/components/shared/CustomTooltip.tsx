import React from "react";
import Flex from "@/components/shared/Flex";
import { cn } from "@/lib/utils";
import { TooltipProps } from "recharts";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white flex flex-col gap-4 p-4 text-[#70707A] text-[14px] font-medium rounded-lg">
        <p className="capitalize text-[18px]">{label}</p>
        {payload.map((x, i) => (
          <Flex key={i} className="bg-[#F4F4F5] px-2 py-4 rounded-md">
            <p className="capitalize">
              {x.name}:{" "}
              <span className="text-[16px] text-[#0A112F]">NGN{x.value}</span>
            </p>
          </Flex>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
