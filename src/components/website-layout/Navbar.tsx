import Image from "next/image";
import SpaceBetween from "../shared/SpaceBetween";
import OccupyLogo from "../../../public/occupy-logo.png";
import Flex from "../shared/Flex";
import IconButton from "../shared/IconButton";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Router from "next/router";

const Navbar = () => {
  return (
    <nav className="w-full pr-5">
      <SpaceBetween>
        <Image
          onClick={() => Router.push("/")}
          className="w-[7.5rem]"
          src={OccupyLogo}
          alt="logo"
        />

        <Flex>
          <IconButton
            variant={"ghost"}
            onClick={() => {}}
            Icon={<ShoppingCartIcon />}
            className="rounded-full px-8 py-6"
          />
          <Button
            onClick={() => Router.push("/auth/signup")}
            className="rounded-full bg-occupy-primary px-8 py-7 text-[1rem] font-bold text-white md:py-6"
          >
            register
          </Button>
        </Flex>
      </SpaceBetween>
    </nav>
  );
};

export default Navbar;
