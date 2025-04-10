import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CategoryItem from "../select-supermarket/CategoryItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import Router from "next/router";
import NoProducts from "./NoProducts";
import Flex from "@/components/shared/Flex";
import products from "@/data/productData";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleItemClick = (id: string) => {
    Router.push(`/select-supermarket/dashboard/${id}`);
  };

  const filteredData = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-12 bg-white rounded-lg py-8 px-6 space-y-4">
      <div className="flex items-center gap-12 pb-4 justify-between">
        <h1 className="text-[#1C2A53] font-medium text-xl">Inventory</h1>
        <Input
          placeholder="Search your grocery category etc..."
          className="h-[38px] w-full text-black"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="flex gap-2 items-center">
          <Button onClick={() => Router.push("/select-supermarket/dashboard/add")} className="py-1 px-3">
            Add Product
          </Button>
          <Button className="ml-auto hidden py-1 px-3 bg-transparent text-[#5D6679] border lg:flex">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="py-1 px-3 bg-transparent border text-[#5D6679]">
            Download all
          </Button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <Flex className="justify-center">
          <NoProducts />
        </Flex>
      ) : (
        <ScrollArea className="w-full mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-20">
            {filteredData.map((item) => (
              <CategoryItem
                key={item.id}
                title={item.title}
                imgSrc={item.imgSrc}
                onClick={() => handleItemClick(item.id)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default Inventory;
