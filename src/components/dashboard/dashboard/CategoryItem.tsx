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
      className="w-[180px] cursor-pointer bg-white h-[213px] flex flex-col items-center nunito justify-center gap-6 p-6 rounded-md hover:transition-all hover:duration-700 hover:shadow-[0px_0px_12px_rgba(32,181,38,0.32)] border hover:border-occupy-primary border-[#e6e6e6] hover:border"
    >
      <Image
        className="w-[120px]"
        src={imgSrc || DiabeticFood}
        alt="category-image"
      />
      <p className="text-center text-[#1A1A1A] text-[18px]">{title}</p>
    </div>
  );
};

export default CategoryItem;
