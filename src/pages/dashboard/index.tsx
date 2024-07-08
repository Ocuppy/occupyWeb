"use client";

import { NextPageWithLayout } from "../_app";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Button } from "@/components/ui/button";

import Router from "next/router";
import StoreItem from "@/components/dashboard/dashboard/StoreItem";
import { useState } from "react";
import SupermarketDetails from "@/components/dashboard/dashboard/SupermarketDetails";

const Page: NextPageWithLayout = () => {
  const [showMarketDet, setShowMarketDet] = useState(false);
  const toggleMarketDet = () => setShowMarketDet(!showMarketDet);
  return (
    <div className="h-full px-4 rounded-md bg-white py-6">
      {!showMarketDet ? (
        <>
          <SpaceBetween>
            <p className="text-[20px] font-medium">Manage Store</p>
            <Button onClick={() => Router.push("/dashboard/store/add")}>
              Add Store
            </Button>
          </SpaceBetween>

          {/* Component for when no store has been added */}
          {/* <Flex className="justify-center">
        <NoSupermarkets />
      </Flex> */}

          <div className="mt-8 max-w-[900px] mx-auto flex flex-col gap-8">
            <StoreItem onClickStore={toggleMarketDet} />
            <StoreItem onClickStore={toggleMarketDet} />
            <StoreItem onClickStore={toggleMarketDet} />
          </div>
        </>
      ) : (
        <SupermarketDetails onBack={toggleMarketDet} />
      )}
    </div>
  );
};

export default Page;
