import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CategoryItem from "../dashboard/CategoryItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const dummyData = Array.from({ length: 12 }, (_, idx) => ({
  id: `#5320000${idx + 1}`,
  title: `Category ${idx + 1}`,
  imgSrc: "", 
  item: `Item ${idx + 1}`,
  price: (Math.random() * 1000).toFixed(2),
  quantity: Math.floor(Math.random() * 100),
  value: Math.floor(Math.random() * 100),
  expiry_date: `11/${(idx % 12) + 1}/24`,
  status: idx % 2 === 0 ? "Approved" : "Pending",
  availability: idx % 3 === 0 ? "In-Stock" : "Out of Stock",
}));

const Inventory = () => {
  return (
    <div className="mt-12 bg-white rounded-lg py-8 px-6 space-y-4">
      <div className="flex items-center gap-12 pb-4 justify-between">
        <h1 className="text-[#1C2A53] font-medium text-xl">Inventory</h1>
        <Input
          placeholder="Search your grocery category etc..."
          className="h-[38px] w-full text-black"
        />
        <div className="flex gap-2 items-center">
          <Button className="py-1 px-3">Add Product</Button>
          <Button className="ml-auto hidden py-1 px-3 bg-transparent text-[#5D6679] border lg:flex">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="py-1 px-3 bg-transparent border text-[#5D6679]">
            Add Product
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-12">
          {dummyData.map((item) => (
            <CategoryItem
              key={item.id}
              title={item.title}
              imgSrc={item.imgSrc}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Inventory;
