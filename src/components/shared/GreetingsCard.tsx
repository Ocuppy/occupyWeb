import Image from "next/image";
import React from "react";
import GreetingsImage from "@/assets/icon/Greetings.svg";
const GreetingsCard = () => {
  return (
    <div className="border-[#E0E0E0] border rounded-[12px] grow min-w-[250px] h-[140px] relative overflow-hidden px-4 py-6">
      <p className="w-[70%] text-[18px] font-bold">Good Afternoon 🌤 Adam</p>
      <Image
        src={GreetingsImage}
        alt="greetings-svg"
        className="absolute bottom-0 right-[-16px]"
      />
    </div>
  );
};

export default GreetingsCard;
