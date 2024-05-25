import { MarkIcon } from "@/assets/icon/icons";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import Router from "next/router";
import React from "react";

const NoSupermarkets = ({
  toggleOpenState,
}: {
  toggleOpenState?: () => void;
}) => {
  return (
    <Flex className="flex-col h0full gap-4 max-w-[500px] p-4 rounded-lg shadow-[0px_2px_10px_rgba(38,44,71,0.16)]">
      <div className="size-[75px] flex items-center justify-center rounded-full bg-[#ECF2FF] text-occupy-primary">
        <MarkIcon />
      </div>

      <p className="text-[#131523] text-[20px] font-bold">
        No supermarket onboarded
      </p>
      <p className="text-center">
        Proceed to add a supermarket and upboard your product to start your
        progess
      </p>
      <div>
        <Button onClick={() => Router.push("/dashboard/store/add")}>
          Continue
        </Button>
      </div>
    </Flex>
  );
};

export default NoSupermarkets;
