import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CustomPrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow custom-prev absolute z-10 left-4 md:left-[-300px] block`}
      onClick={onClick}
    >
      <ChevronLeft className="bg-white rounded-full w-8 h-8 text-[#A74E8E] border border-[#A74E8E]" />
    </button>
  );
};

export const CustomNextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow custom-next absolute z-10 right-4 md:right-[-300px] block`}
      //   style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronRight className="bg-[#A74E8E] rounded-full w-8 h-8 text-white" />
    </button>
  );
};
