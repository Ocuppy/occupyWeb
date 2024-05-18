import { WhyUs } from "@/data/whyUsData";
import Image from "next/image";

interface CardProps {
  data: WhyUs;
}

const WhyUsCard: React.FC<CardProps> = ({ data }) => (
  <div className="border border-[#6C6C72] rounded-lg">
    <div className="flex items-start gap-2 p-2">
      <Image src={"/icons/checkGood.svg"} alt="check mark" width={20} height={20} />
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-xl text-[#232233]">{data.header}</h1>
        <p className="font-normal text-[#6C6C72] text-lg">{data.text}</p>
      </div>
    </div>
  </div>
);

export default WhyUsCard;
