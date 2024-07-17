import Image from "next/image";
import React from "react";
import BackgroundSvg from "@/assets/images/backgroundCard.svg";

const WalletBalance = ({
  amount,
  walletName,
  walletNumber,
}: {
  amount?: string | number;
  walletName?: string;
  walletNumber?: string;
}) => {
  return (
    <div className="relative ml-[-24px] min-w-[350px] mr-[-10px] overflow-hidden ">
      <Image className="" src={BackgroundSvg} alt="wallet-card" />
      <div className="top-1/2 absolute text-white left-10 translate-y-[-50%]">
        <p className="text-[14px] ">{walletName || "Wallet Balance"}</p>
        <p className="text-[28px] font-semibold mb-4">
          {amount || "NGN250,500.00"}
        </p>
        {walletNumber && (
          <p className="font-semibold text-[14px] text-[#FFEF60]">
            {walletNumber}
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
