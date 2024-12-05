import whyUsData from "@/data/whyUsData";
import WhyUsCard from "@/subComponents/WhyUsCard";
import Image from "next/image";
import Container from "../../shared/Container";

const WhyUs = () => {
  return (
    <Container className="bg-white pb-16">
      <section className="flex flex-col gap-6 pt-20">
        <div className="mx-auto w-fit gap-4 space-y-5 px-6 text-center lg:px-0">
          <h1 className="text-4xl font-bold uppercase text-[#232233]">
            Why Choose Us
          </h1>
          <p className="text-xl font-normal leading-normal text-[#6C6C72] md:w-[601px]">
          Occupy offers a comprehensive solution for estate-based shopping and delivery. For customers, we provide a convenient way to shop from your local estate supermarket with easy ordering and swift delivery. For supermarkets, we enable you to reach more customers within your estate, manage your inventory, and boost sales seamlessly. For riders, we offer an opportunity to earn consistently by delivering within the estate. Choose Occupy for a trusted and efficient local service that connects customers, supermarkets, and riders for a seamless experience.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 px-6 lg:flex-row lg:gap-20 lg:px-20">
          <Image src={"/images/whyUs.png"} alt="img" width={600} height={1000} />

          {/* Map and display card */}
          <div className="flex flex-col gap-6">
            {whyUsData.map((item, index) => (
              <WhyUsCard key={index} data={item} />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default WhyUs;