// components/CategoryCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CategoryCardProps {
  image: string;
  title: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ image, title }) => {
  return (
    <div className="mr-4 grid h-52 w-40 flex-none place-items-center rounded-md border border-[#E0E0E0] bg-white text-center">
      <div className="relative mb-2 h-24 w-full">
        <Image src={image} alt={title} layout="fill" className="object-cover" />
      </div>
      <p className="text-lg text-gray-700">{title}</p>
    </div>
  );
};

export default CategoryCard;
