import Link from "next/link";
import React, { FC } from "react";

interface OrderBoxProps {
  title: string;
  count: number;
}

const OrderBox: FC<OrderBoxProps> = ({ title, count }) => {
  return (
    <div
      style={{
        transition: "all 0.3s",
        // boxShadow: "0px 9px 17px rgba(0, 0, 0, 0.07)",
      }}
      className="
        bg-white w-full translate-y-0 
        rounded-xl border
      "
    >
      <div className="p-3 pb-6 flex flex-col gap-1">
        <span className="font-bold text-[#828282] font-[DM Sans] text-lg">{title}</span>
        <span className="font-bold text-[#19202C] font-[DM Sans] text-2xl">{count}</span>
      </div>
    </div>
  );
};

export default OrderBox;
