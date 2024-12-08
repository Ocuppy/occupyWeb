import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import React from "react";

interface StoreItemProps {
  store: any;

  onEdit?: () => void;

  onClickStore?: () => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ onClickStore, onEdit }) => {
  return (
    <div className="flex flex-col gap-8 rounded-md border">
      <Flex className="w-full gap-0">
        <div
          onClick={onClickStore}
          className="hover;cursor-pointer flex h-[150px] min-w-[280px] items-center justify-center bg-[#F0F1F3] hover:cursor-pointer"
        >
          <p className="font-semibold text-[#48505e]">
            Livewell Kadokuchi, Abuja
          </p>
        </div>
        <Flex className="w-full items-start justify-between p-4">
          <div className="flex flex-col gap-2">
            <p className="text-[16px] font-medium text-[#5D6679]">Lisy Store</p>
            <p className="max-w-[300px] text-[14px] leading-[2] text-[#858D9D]">
              1A/Krihnarajapuram, 3 rd street sulur Coimbatore - 6313403
            </p>
            <p className="max-w-[300px] text-[14px] text-[#858D9D]">
              044-653578
            </p>
          </div>
          <Button
            onClick={onEdit}
            className="text-occupy-primary"
            variant={"outline"}
          >
            Edit
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default StoreItem;
