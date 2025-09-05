import DownloadBtn from "@/subComponents/DownloadBtn";
import Image from "next/image";
import Container from "../../shared/Container";

const DownloadAppSection = () => {
  return (
    <Container>
      <section className="flex flex-col px-6 pb-12 md:flex-row lg:items-center lg:justify-between lg:px-20">
        <div className="space-y-6 lg:space-y-12">
          <p className="text-5xl font-bold leading-tight text-black lg:text-7xl">
            Download now and <br /> start shopping
          </p>
  
        </div>
        <div className="pt-6 lg:pt-0">
          <Image
            src="/images/iphoneApp.png"
            alt="iphone"
            width={500}
            height={100}
          />
        </div>
      </section>
    </Container>
  );
};

export default DownloadAppSection;
