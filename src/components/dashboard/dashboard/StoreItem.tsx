import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import React from "react";

const StoreItem = ({ onEdit }: { onEdit?: () => void }) => {
  return (
    <div className="flex flex-col border rounded-md gap-8">
      <Flex className="gap-0 w-full">
        <div className="min-w-[280px] h-[150px] flex items-center justify-center bg-[#F0F1F3]">
          <p className="font-semibold text-[#48505e]">
            Livewell Kadokuchi, Abuja
          </p>
        </div>
        <Flex className="justify-between items-start w-full p-4">
          <div className="flex flex-col gap-2">
            <p className="text-[#5D6679] text-[16px] font-medium">Lisy Store</p>
            <p className="text-[14px] leading-[2] text-[#858D9D] max-w-[300px]">
              1A/Krihnarajapuram, 3 rd street sulur Coimbatore - 6313403
            </p>
            <p className="text-[14px] text-[#858D9D] max-w-[300px]">
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
