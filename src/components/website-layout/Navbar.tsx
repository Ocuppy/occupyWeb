import Image from "next/image";
import SpaceBetween from "../shared/SpaceBetween";
import OccupyLogo from "../../../public/occupy-logo.png";
import Link from "next/link";
import Flex from "../shared/Flex";
import IconButton from "../shared/IconButton";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Router from "next/router";

const Navbar = () => {
  return (
    <nav className="w-full">
      <SpaceBetween>
        <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
        <Link
          className="text-[20px] hover:underline hover:text-occupy-primary"
          href="/"
        >
          Home
        </Link>
        <Flex>
          <IconButton
            variant={"ghost"}
            onClick={() => {}}
            Icon={ShoppingCartIcon}
            className="rounded-full px-8 py-6 "
          />
          <Button
            onClick={() => Router.push("/login")}
            className="bg-occupy-primary px-8 py-6  text-white font-bold text-[16px] rounded-full"
          >
            Log in
          </Button>
        </Flex>
      </SpaceBetween>
    </nav>
  );
};

export default Navbar;
