import Flex from "@/components/shared/Flex";
import Image from "next/image";
import React from "react";
import WaitinIcon from "@/assets/icon/WaitingIcon.svg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AccountStatus = ({ isApproved }: { isApproved?: boolean }) => {
  return (
    <Flex className="justify-center">
      <div className=" flex flex-col items-center bg-white p-4 rounded-lg">
        <Flex className="w-full justify-end">
          <Badge variant={isApproved ? "approved" : "pending"}>
            {isApproved ? "Approved" : "Pending"}
          </Badge>
        </Flex>
        <Image src={WaitinIcon} alt="" />
        <p className="text-[30px] text-center text-[#060f27] mb-2">
          Account still Under Investigation
        </p>
        <p className="w-[75%] text-[#aaaaaa] text-[14px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>
        {isApproved && <Button>Proceed to Supermarket</Button>}
      </div>
    </Flex>
  );
};

export default AccountStatus;
