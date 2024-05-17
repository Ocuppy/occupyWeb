import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import checkAppData from "@/data/checkAppData";
import Image from "next/image";
import { CustomNextArrow, CustomPrevArrow } from "../ui/customArrow";

const CheckAppSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

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
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  return (
    <section className="flex flex-col justify-center items-center gap-6 px-12 md:px-0 pt-20 pb-20 font-[inter]">
      <h1 className="font-bold text-[#232233] text-2xl md:text-3xl">Checkout Our Mobile App</h1>
      <p className="font-normal text-[#6C6C72] text-sm md:text-lg text-center md:w-[601px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam
        lobortis enim. Faucibus amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus tempor, ac nunc
        libero urna, feugiat.
      </p>

      <div className="relative w-full max-w-lg">
        <Slider ref={sliderRef} {...settings} initialSlide={currentSlide}>
          {checkAppData.map((feature, index) => (
            <div key={index} className="flex justify-center items-center">
              <Image src={feature.image} alt={`Slide ${index + 1}`} width={900} height={20} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CheckAppSection;
