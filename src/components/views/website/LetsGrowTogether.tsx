import RegisterSupermarket from "../../../../public/register-supermarket.png";
import OccupyRider from "../../../../public/occupy-rider.png";
import CareerPath from "../../../../public/career-path.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { ArrowRight } from "lucide-react";
import Router from "next/router";

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
  return (
    <Container className="bg-[#F9FBFD]">
      <div className="py-12">
        <p className="text-center font-semibold text-[40px] mb-8">
          Let’s Grow Together
        </p>
        <div className="grid md:grid-cols-3 justify-center gap-4 ">
          {DataList.map((data, index) => (
            <div
              key={index}
              className="p-4 pt-10 pb-4 flex-[0_0_100%] md:flex-[0_0_calc(50%-32px)] flex flex-col gap-2 rounded-md bg-white"
            >
              <div className="w-full flex flex-col justify-between  h-full">
                <div className="mb-4">
                  <div className="mx-auto w-[120px]">
                    <Image alt="icon" src={data.image} />
                  </div>
                  <p className="text-[27px] text-[#090335] font-[600]">
                    {data.title}
                  </p>
                  <p className="text-[18px] mt-2 text-[#090335]">
                    {data.description}
                  </p>
                </div>
                <Button
                  onClick={data.onclick}
                  className="bg-occupy-primary px-6 text-white rounded-full w-fit gap-4"
                >
                  <span>{data.btnText}</span>
                  <ArrowRight />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LetsGrowTogether;
