import { Features } from "@/data/checkAppData";
import Image from "next/image";

interface CardProps {
  data: Features;
}

const CheckAppCard: React.FC<CardProps> = ({ data }) => (
  <div className="gap-6 space-y-5 pt-20 text-center">
    <h1 className="text-4xl font-bold uppercase text-[#232233]">
      {data.header}
    </h1>
    <p className="w-full text-center text-lg font-normal text-[#6C6C72]">
      {data.text}
    </p>
    <Image src={data.image} alt={`images`} width={900} height={20} />
  </div>
);

export default CheckAppCard;
