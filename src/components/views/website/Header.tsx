import Image from "next/image";
import CartImage from "../../../../public/cart-image.png";
import { Button } from "@/components/ui/button";
import Router from "next/router";
import Flex from "@/components/shared/Flex";
import AppStoreIcon from "@/assets/icon/appstore.svg";
import PlayStoreIcon from "@/assets/icon/playstore.svg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: () => {
    return {
      y: -20,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: () => {
    return {
      zIndex: 0,
      opacity: 0,
    };
  },
};

const Header = () => {
  const texts = ["better", "easier"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === texts.length) {
        next = 0;
      }
      setIndex(next);
    }, 3 * 1000);
  }, [index, setIndex, texts.length]);

  return (
    <header className="w-full pt-12 lg:pt-0 items-center grid gap-4 lg:grid-cols-2">
      <div className="lg:pb-12">
        <p className="text-[54px] lg:text-[66px] font-bold">
          <span>Grocery Delivery just got&nbsp; </span>
          <AnimatePresence>
            <motion.span
              style={{ position: "absolute" }}
              variants={variants}
              key={index}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-occupy-primary"
              transition={{
                y: { type: "spring", stiffness: 180, damping: 10 },
                opacity: { duration: 0.3 },
              }}
            >
              {" " + texts[index]}
            </motion.span>
          </AnimatePresence>
        </p>

        <p className="mb-4 text-[24px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
          dolorum provident nostrum sint natus, sapiente non quisquam ad
          corporis nihil!
        </p>
        <Button
          onClick={() => Router.push("/auth/login")}
          className=" rounded-full"
        >
          Go Shopping
        </Button>
        <Flex className="mt-4">
          {[
            { desc: "App Store", onClick: () => {}, imgSrc: AppStoreIcon },
            { desc: "Google play", onClick: () => {}, imgSrc: PlayStoreIcon },
          ].map((data, idx) => (
            <Flex
              key={idx}
              onClick={data.onClick}
              className="bg-[#333333] rounded-lg cursor-pointer text-white  p-4"
            >
              <Image
                className="w-[24px]"
                src={data.imgSrc}
                alt={data.desc + "-icon"}
              />
              <div>
                <p className="text-[11px] text-[#B3B3B3]">Download on the</p>
                <p className="font-[500]">{data.desc}</p>
              </div>
            </Flex>
          ))}
        </Flex>
      </div>
      <Image alt="header-image" src={CartImage} />
    </header>
  );
};

export default Header;
