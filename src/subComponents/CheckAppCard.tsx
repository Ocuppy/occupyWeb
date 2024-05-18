import { Features } from "@/data/checkAppData";
import Image from "next/image";

interface CardProps {
  data: Features;
}

const CheckAppCard: React.FC<CardProps> = ({ data }) => (
  <div className="flex flex-col justify-center items-center gap-6  md:px-0 pt-20 font-[inter]">
    <h1 className="font-bold text-[#232233] text-2xl md:text-3xl">{data.header}</h1>
    <p className="font-normal text-[#6C6C72] text-sm md:text-lg text-center md:w-[601px]">{data.text}</p>
    <Image src={data.image} alt={`images`} width={900} height={20} />
  </div>
);

export default CheckAppCard;
