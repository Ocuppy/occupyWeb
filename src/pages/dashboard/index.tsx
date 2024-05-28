"use client";

import Flex from "@/components/shared/Flex";
import { NextPageWithLayout } from "../_app";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Button } from "@/components/ui/button";

import Router from "next/router";
import NoSupermarkets from "@/components/dashboard/dashboard/NoSupermarkets";
import StoreItem from "@/components/dashboard/dashboard/StoreItem";

const Page: NextPageWithLayout = () => {
  return (
    <div className="h-full px-4 overflow-auto hideScroll rounded-md bg-white py-6">
      <SpaceBetween>
        <p className="text-[20px] font-medium">Manage Store</p>
        <Button onClick={() => Router.push("/dashboard/store/add")}>
          Add Store
        </Button>
      </SpaceBetween>

      <Flex className="h-[90%] justify-center">
        <NoSupermarkets />
      </Flex>

      <div className="mt-8 flex flex-col gap-8">
        <StoreItem />
        <StoreItem />
        <StoreItem />
      </div>
    </div>
  );
};

export default Page;
