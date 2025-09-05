import { WhyUs } from "@/data/whyUsData";
import Image from "next/image";

interface CardProps {
  data: WhyUs;
}

const WhyUsCard: React.FC<CardProps> = ({ data }) => (
  <div
    className="flex items-start gap-5 rounded-lg p-4 pb-8"
    style={{ boxShadow: " 0px 1px 10px 0px #0000001A" }}
  >
    <Image
      src={"/icons/checkGood.svg"}
      alt="check mark"
      width={20}
      height={20}
    />
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold text-[#232233]">{data.header}</h1>
      <p className="text-lg font-normal text-[#6C6C72]">{data.text}</p>
    </div>
  </div>
);

export default WhyUsCard;
