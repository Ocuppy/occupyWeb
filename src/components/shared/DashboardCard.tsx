import React from "react";
import Flex from "./Flex";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";

const DashboardCard = ({
  title,
  value,
  onSelect,
}: {
  title: string;
  value: number | string;
  onSelect?: (value: string) => void;
}) => {
  return (
    <div className="border rounded-md p-4 pt-6">
      <Flex>
        <p className="text-[14px] whitespace-nowrap w-full font-bold text-[#333333]">
          {title}
        </p>
        <p className="w-full whitespace-nowrap text-[13px] font-medium text-[#BABEC6]">
          Sort by:
        </p>
        <Select defaultValue="monthly">
          <SelectTrigger className="bg-[#F4F5F9] capitalize">
            <SelectValue placeholder={"Select value"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["monthly", "yearly"].map((item) => (
                <SelectItem
                  onSelect={() => onSelect?.(item)}
                  key={item}
                  value={item}
                  className="capitalize"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Flex>
      <p className="text-[#333333] mb-2 text-[26px] font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
