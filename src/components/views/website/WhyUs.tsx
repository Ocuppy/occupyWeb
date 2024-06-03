import whyUsData from "@/data/whyUsData";
import WhyUsCard from "@/subComponents/WhyUsCard";
import Image from "next/image";
import Container from "../../shared/Container";

const WhyUs = () => {
  return (
    <Container className="bg-white">
      <section className=" flex flex-col pt-20 gap-6">
        <div className="flex flex-col justify-center items-center px-6 lg:px-0 gap-4">
          <h1 className="font-bold text-[#232233] text-2xl md:text-3xl">Why Choose Us</h1>
          <p className="font-normal text-[#6C6C72] text-sm md:text-lg text-center md:w-[601px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit
            vitae. Est tellus vitae, nullam lobortis enim. Faucibus amet etiam tincidunt
            rhoncus, ullamcorper velit. Ullamcorper risus tempor, ac nunc libero urna, feugiat.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-20 px-6 lg:px-20">
          <Image src={"/images/whyUs.png"} alt="img" width={600} height={300} />

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
