import DownloadBtn from "@/subComponents/DownloadBtn";
import Image from "next/image";

const DownloadAppSection = () => {
  return (
    <section className="pb-12 flex flex-col md:flex-row lg:justify-between lg:items-center px-6 lg:px-20">
      <div className="flex flex-col gap-4 lg:gap-12">
        <p className="text-black font-bold text-3xl lg:text-7xl">
          Download now and <br /> start shopping
        </p>
        <div className="flex flex-row gap-4">
          <DownloadBtn name={"Google Play"} title={"Download on the"} href={""} icon={"/icons/google-play.svg"} />
          <DownloadBtn name={"App Store"} title={"Download on the"} href={""} icon={"/icons/apple.svg"} />
        </div>
      </div>
      <div className="pt-6 lg:pt-0">
        <Image src="/images/iphoneApp.png" alt="iphone" width={500} height={100} />
      </div>
    </section>
  );
};

export default DownloadAppSection;
