import RegisterSupermarket from "../../../../public/register-supermarket.png";
import OccupyRider from "../../../../public/occupy-rider.png";
import CareerPath from "../../../../public/career-path.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { ArrowRight } from "lucide-react";
import Router from "next/router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import { CustomNextArrow, CustomPrevArrow } from "../../ui/customArrow";

const LetsGrowTogether = () => {
  const DataList = [
    {
      image: RegisterSupermarket,
      title: "Register your Supermarket",
      description: "Grow your Brand and business with Cloud",
      btnText: "Register",
      onclick: () => Router.push("/auth/signup"),
    },
    {
      image: OccupyRider,
      title: "Join Occupy riders",
      description: "Grow your Brand and business with Cloud",
      btnText: "Register",
      onclick: () => Router.push("/auth/signup"),
    },
    {
      image: CareerPath,
      title: "Find a Career Path",
      description: "Grow your Brand and business with Cloud",
      btnText: "Career Page",
      onclick: () => {},
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  return (
    <>
      <Container className="hidden bg-[#F9FBFD] px-5 lg:block">
        <div className="py-7">
          <p className="mb-8 text-center text-4xl font-semibold">
            Let’s Grow Together
          </p>
          <div className="grid justify-center gap-4 md:grid-cols-3">
            {DataList.map((data, index) => (
              <div
                key={index}
                className="flex flex-[0_0_100%] flex-col gap-2 rounded-md bg-white p-4 py-10 md:flex-[0_0_calc(50%-32px)]"
              >
                <div className="flex h-full w-full flex-col justify-between">
                  <div className="mb-4 space-y-3 text-center">
                    <div className="mx-auto w-36">
                      <Image alt="icon" src={data.image} />
                    </div>
                    <p className="text-3xl font-semibold text-[#090335] lg:text-2xl">
                      {data.title}
                    </p>
                    <p className="mt-2 text-[18px] text-[#090335]">
                      {data.description}
                    </p>
                  </div>
                  <Button
                    onClick={data.onclick}
                    className="mx-auto w-fit gap-4 rounded-full bg-occupy-primary px-7 py-8 text-white lg:py-7"
                  >
                    <span>{data.btnText}</span>
                    <ArrowRight size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Container>
        <p className="mb-8 text-center text-3xl font-semibold">
          Let’s Grow Together
        </p>
        <Carousel
          opts={{ loop: true }}
          orientation="horizontal"
          className="mx-auto block w-4/5 lg:hidden"
        >
          <CarouselPrevious className="bg-[#FDE5F9]" />
          <CarouselContent>
            {DataList.map((data, index) => (
              <CarouselItem key={index}>
                <div className="mx-auto flex w-10/12 flex-[0_0_100%] flex-col gap-2 rounded-md bg-white p-4 py-10 md:flex-[0_0_calc(50%-32px)]">
                  <div className="flex h-full w-full flex-col justify-between">
                    <div className="mb-4 space-y-3 text-center">
                      <div className="mx-auto w-36">
                        <Image alt="icon" src={data.image} />
                      </div>
                      <p className="text-3xl font-semibold text-[#090335] lg:text-2xl">
                        {data.title}
                      </p>
                      <p className="mt-2 text-[18px] text-[#090335]">
                        {data.description}
                      </p>
                    </div>
                    <Button
                      onClick={data.onclick}
                      className="mx-auto w-fit gap-4 rounded-full bg-occupy-primary px-7 py-8 text-white lg:py-7"
                    >
                      <span>{data.btnText}</span>
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="bg-[#FDE5F9]" />
        </Carousel>
      </Container>
      {/* <div className="mx-auto block w-4/5 lg:hidden">
        <div className="relative w-full max-w-lg px-12 md:max-w-2xl md:px-0">
          <Slider ref={sliderRef} {...settings} initialSlide={currentSlide}>
            {DataList.map((data, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="flex flex-[0_0_100%] flex-col gap-2 rounded-md bg-white p-4 py-10 md:flex-[0_0_calc(50%-32px)]">
                  <div className="flex h-full w-full flex-col justify-between">
                    <div className="mb-4 space-y-3 text-center">
                      <div className="mx-auto w-36">
                        <Image alt="icon" src={data.image} />
                      </div>
                      <p className="text-3xl font-semibold text-[#090335] lg:text-2xl">
                        {data.title}
                      </p>
                      <p className="mt-2 text-[18px] text-[#090335]">
                        {data.description}
                      </p>
                    </div>
                    <Button
                      onClick={data.onclick}
                      className="mx-auto w-fit gap-4 rounded-full bg-occupy-primary px-7 py-8 text-white lg:py-7"
                    >
                      <span>{data.btnText}</span>
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div> */}
    </>
  );
};

export default LetsGrowTogether;
