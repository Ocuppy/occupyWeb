import Image from "next/image";
import React from "react";
import BackgroundSvg from "@/assets/icon/backgroundCard.svg";

const WalletBalance = () => {
  return (
    <div className="relative p-0">
      <Image src={BackgroundSvg} alt="wallet-card" />
      <div className="top-1/2 absolute text-white left-10 translate-y-[-50%]">
        <p className="text-[14px] ">Wallet Balance</p>
        <p className="text-[28px] font-semibold">NGN250,500.00</p>
      </div>
    </div>
  );
};

export default WalletBalance;
