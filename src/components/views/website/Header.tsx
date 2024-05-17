import Image from "next/image";
import CartImage from "../../../../public/cart-image.png";
import { Button } from "@/components/ui/button";
import Router from "next/router";
import Flex from "@/components/shared/Flex";
import { AppleIcon } from "lucide-react";
const Header = () => {
  return (
    <header className="w-full pt-12 lg:pt-0 items-center grid gap-4 lg:grid-cols-2">
      <div className="pb-12">
        <p className="text-[54px] lg:text-[66px] font-bold">
          Grocery Shopping just got{" "}
          <span className="text-occupy-primary">Better</span>
        </p>
        <p className="mb-4 text-[24px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
          dolorum provident nostrum sint natus, sapiente non quisquam ad
          corporis nihil!
        </p>
        <Button
          onClick={() => Router.push("/login")}
          className="bg-occupy-primary px-6 text-white rounded-full"
        >
          Go Shopping
        </Button>
        <Flex className="mt-4">
          <Flex
            onClick={() => {}}
            className="bg-[#333333] rounded-md cursor-pointer text-white  p-2"
          >
            <AppleIcon />
            <div>
              <p className="text-[11px]">Download on the</p>
              <p className="font-[500]">App Store</p>
            </div>
          </Flex>
          <Flex
            onClick={() => {}}
            className="bg-[#333333] rounded-md cursor-pointer text-white  p-2"
          >
            <AppleIcon />
            <div>
              <p className="text-[11px]">Download on the</p>
              <p className="font-[500]">Google play</p>
            </div>
          </Flex>
        </Flex>
      </div>
      <Image alt="header-image" src={CartImage} />
    </header>
  );
};

export default Header;
