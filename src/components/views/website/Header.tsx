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
  // enter: () => {
  //   return {
  //     y: -20,
  //     opacity: 0,
  //   };
  // },
  // center: {
  //   zIndex: 1,
  //   y: 0,
  //   opacity: 1,
  // },
  // exit: () => {
  //   return {
  //     zIndex: 0,
  //     opacity: 0,
  //   };
  // },
  enter: {
    y: -20,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

const Header = () => {
  const blackText = ["Your estate's Supermarket got", "You want? We Deliver!"];
  const texts = ["Closer", "You Smile😃"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4e3);

    return () => clearInterval(textInterval);
  }, [index, texts.length]);

  return (
    <header className="grid w-full items-center gap-4 px-5 pt-12 lg:grid-cols-2 lg:pt-0">
      <div className="md:w-11/12 lg:pb-12">
        <p className="mb-4 text-[3.375rem] font-bold leading-snug lg:text-[4.125rem]">
          <span>{blackText[index]}&nbsp;</span>
          <AnimatePresence>
            <motion.span
              // style={{ position: "absolute" }}
              variants={variants}
              key={index}
              // initial="enter"
              // animate="center"
              // exit="exit"
              className="text-occupy-primary"
              // transition={{
              //   y: { type: "spring", stiffness: 180, damping: 10 },
              //   opacity: { duration: 0.1 },
              //   delay: 0.1,
              // }}
            >
              {texts[index]}
            </motion.span>
          </AnimatePresence>
        </p>

        <p className="mb-4 text-[1.5rem]">
        Experience the convenience of shopping from the comfort of your home. We bring your estate's supermarket right to you, delivering your order directly to your doorstep.
        </p>
        {/* <Button onClick={() => Router.push("/auth/login")} className="rounded-full" size={"lg"}>
          Go Shopping
        </Button> */}
        <button
          onClick={() => Router.push("/auth/login")}
          className="rounded-full bg-occupy-primary px-16 py-4 text-sm font-medium text-white"
        >
          Login
        </button>

        <Flex className="mt-4">
          {[
            { desc: "App Store", onClick: () => {}, imgSrc: AppStoreIcon },
            { desc: "Google Play", onClick: () => {}, imgSrc: PlayStoreIcon },
          ].map((data, idx) => (
            <Flex
              key={data.desc}
              onClick={data.onClick}
              className="cursor-pointer rounded-lg bg-[#333333] px-5 py-3 text-white md:px-4 md:py-2"
            >
              <Image
                className="w-[24px]"
                src={data.imgSrc}
                alt={`${data.desc} icon`}
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
