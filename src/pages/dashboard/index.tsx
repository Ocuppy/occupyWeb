"use client";

import Flex from "@/components/shared/Flex";
import { NextPageWithLayout } from "../_app";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Button } from "@/components/ui/button";
import NoSupermarkets from "@/components/views/dashboard/homepage/NoSupermarkets";
import NoSupermarketsDialog from "@/components/views/dashboard/homepage/NoSupermarketsDialog";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useEffect } from "react";
import Router from "next/router";

const Page: NextPageWithLayout = () => {
  const { isOpen, toggleOpenState, onOpen } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <div className="h-full overflow-auto hideScroll rounded-md bg-white px-4 py-6">
      <SpaceBetween>
        <p className="text-[20px] font-medium">Manage Store</p>
        <Button onClick={() => Router.push("/dashboard/store/add")}>
          Add Store
        </Button>
      </SpaceBetween>
      {/* <NoSupermarketsDialog isOpen={isOpen} toggleOpenState={toggleOpenState} /> */}
      <Flex className="h-[90%] justify-center">
        <NoSupermarkets />
      </Flex>
    </div>
  );
};

export default Page;
