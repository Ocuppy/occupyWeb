import React from "react";
import DiabeticFood from "@/assets/images/diabetic food.png";
import Image from "next/image";

const CategoryItem = ({
  title,
  imgSrc,
  onClick,
}: {
  title: string;
  imgSrc?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="nunito group flex h-[213px] w-44 cursor-pointer flex-col items-center justify-center gap-6 rounded-md border border-[#e6e6e6] bg-white p-3 hover:border hover:border-occupy-primary hover:shadow-[0px_0px_12px_rgba(32,181,38,0.32)] hover:transition-all hover:duration-700 2xl:w-fit"
    >
      <Image
        className="w-[120px]"
        src={imgSrc || DiabeticFood}
        alt="category-image"
      />
      <p className="text-center text-[18px] text-[#1A1A1A] group-hover:text-occupy-primary">
        {title}
      </p>
    </div>
  );
};

export default CategoryItem;
