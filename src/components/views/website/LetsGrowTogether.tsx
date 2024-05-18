import RegisterSupermarket from "../../../../public/register-supermarket.png";
import OccupyRider from "../../../../public/occupy-rider.png";
import CareerPath from "../../../../public/career-path.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";
import { ArrowRight } from "lucide-react";

const DataList = [
  {
    image: RegisterSupermarket,
    title: "Register your Supermarket",
    description: "Grow your Brand and business with Cloud",
    btnText: "Register",
    onclick: () => {},
  },
  {
    image: OccupyRider,
    title: "Join Occupy riders",
    description: "Grow your Brand and business with Cloud",
    btnText: "Register",
    onclick: () => {},
  },
  {
    image: CareerPath,
    title: "Find a Career Path",
    description: "Grow your Brand and business with Cloud",
    btnText: "Go Shopping",
    onclick: () => {},
  },
];

const LetsGrowTogether = () => {
  return (
    <Container className="bg-[#F9FBFD]">
      <div className="py-12">
        <p className="text-center font-semibold text-[40px] mb-8">
          Let’s Grow Together
        </p>
        <div className="grid gap-8 grid-cols md:grid-cols-2 lg:grid-cols-3">
          {DataList.map((data, index) => (
            <div
              key={index}
              className="p-4 pt-10 pb-4 flex flex-col gap-2 rounded-md bg-white"
            >
              <div className="mx-auto">
                <Image alt="icon" src={data.image} className="w-[120px]" />
              </div>
              <p className="text-[34px] text-[#090335] font-[600]">
                {data.title}
              </p>
              <p className="text-[20px] text-[#090335]">{data.description}</p>
              <Button
                onClick={data.onclick}
                className="bg-occupy-primary px-6 text-white rounded-full w-fit gap-4"
              >
                <span>{data.btnText}</span>
                <ArrowRight />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LetsGrowTogether;
