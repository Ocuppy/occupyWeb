import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import checkAppData from "@/data/checkAppData";
import { CustomNextArrow, CustomPrevArrow } from "../../ui/customArrow";
import CheckAppCard from "@/subComponents/CheckAppCard";
import Container from "../../shared/Container";

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
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
  };

  return (
    <Container>
      <section className="flex items-center justify-center pb-20">
        <div className="relative w-full max-w-lg px-12 md:max-w-2xl md:px-0">
          <Slider ref={sliderRef} {...settings} initialSlide={currentSlide}>
            {checkAppData.map((feature, index) => (
              <div key={index} className="flex items-center justify-center">
                <CheckAppCard data={feature} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </Container>
  );
};

export default CheckAppSection;
