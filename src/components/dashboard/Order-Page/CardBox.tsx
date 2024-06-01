import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface CardBoxProps {
  title: string;
  count: number;
  percentage: any;
}

const CardBox: FC<CardBoxProps> = ({ title, count, percentage }) => {
  return (
    <div
      style={{
        transition: "all 0.3s",
        // boxShadow: "0px 9px 17px rgba(0, 0, 0, 0.07)",
      }}
      className="
        bg-white w-[241px] translate-y-0 
        rounded-xl border
      "
    >
      <div className="p-3 pb-6 flex flex-col gap-4">
        <span className="font-normal text-[#475367] text-sm">{title}</span>
        <span className="font-semibold text-[#344054] text-xl">{count}</span>
        <span className="flex gap-1 items-center text-xs rounded-full p-1 w-[50px] bg-[#036B26] font-medium bg-opacity-50 text-[#036B26]">
          <Image src={"/icons/percentage.svg"} alt="" width={12} height={12} /> {percentage} %
        </span>
      </div>
    </div>
  );
};

export default CardBox;
