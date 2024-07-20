import whyUsData from "@/data/whyUsData";
import WhyUsCard from "@/subComponents/WhyUsCard";
import Image from "next/image";
import Container from "../../shared/Container";

const WhyUs = () => {
  return (
    <Container className="bg-white">
      <section className="flex flex-col gap-6 pt-20">
        <div className="mx-auto w-fit gap-4 space-y-5 px-6 text-center lg:px-0">
          <h1 className="text-4xl font-bold uppercase text-[#232233]">
            Why Choose Us
          </h1>
          <p className="text-xl font-normal leading-normal text-[#6C6C72] md:w-[601px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            nunc ante velit vitae. Est tellus vitae, nullam lobortis enim.
            Faucibus amet etiam tincidunt rhoncus, ullamcorper velit.
            Ullamcorper risus tempor, ac nunc libero urna, feugiat.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 px-6 lg:flex-row lg:gap-20 lg:px-20">
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
