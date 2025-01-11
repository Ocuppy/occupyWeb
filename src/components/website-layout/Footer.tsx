import DownloadBtn from "@/subComponents/DownloadBtn";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";

const Footer = () => {
  return (
    <div className="mt-8 w-full items-center justify-center gap-1 bg-occupy-primary">
      <footer className="mx-auto w-full xl:max-w-[1300px]">
        <div className="flex flex-col items-start justify-start gap-8 gap-y-20 pl-6 pt-20 md:flex-row md:gap-40 md:px-20">
          {/* first section */}
          <section className="flex flex-col gap-4">
            <Image src="/footerLogo.svg" alt="logo" width={75} height={75} />
            <p className="w-full font-[inter] text-xl text-white md:text-base xl:w-[312px]">
              Occupy Technologies Limited
            </p>
          </section>
          {/* second section */}
          <section className="flex gap-16 text-xl font-medium text-white md:text-base">
            <div className="flex grow flex-col gap-4">
              <div className="flex items-center gap-2">
                {/* <div className="h-0.5 w-5 rounded-full bg-white"></div> */}
                <p className="text-2xl font-bold">Account</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href={"/#"}>My Account</Link>
                <Link href={"/#"}>FAQs</Link>
              
              </div>
            </div>
            <div className="flex grow flex-col gap-4">
              <p className="text-2xl font-bold">Help</p>
              <div className="flex flex-col gap-3">
                <Link href={"/#"}>Contact</Link>
              </div>
            </div>
          </section>
          {/* third section */}
          <section className="flex flex-col gap-4">
            <span className="text-2xl font-medium text-white">
              admin@occupy.com
            </span>
            <p className="text-lg font-normal text-white">
              21 442 cresent Citec vill <br />
              Gwarimpa, Abuja, Nigeria
            </p>
            {/* <div className="grid grid-cols-2 gap-4">
              <DownloadBtn
                name={"Google Play"}
                title={"Download on the"}
                href={""}
                icon={"/icons/google-play.svg"}
              />
              <DownloadBtn
                name={"App Store"}
                title={"Download on the"}
                href={""}
                icon={"/icons/apple.svg"}
              />
            </div> */}
          </section>
        </div>

        <div className="mt-20 flex w-full items-center justify-between bg-[#6E1C47] px-4 py-6">
          <div className="flex flex-row items-start gap-2">
            {/* <Link href={"https://x.com/vershimakelvin"}>
              <Image
                src={"/icons/twitter.svg"}
                alt="icon"
                width={40}
                height={40}
              />
            </Link> */}
            <Link
              href={"https://www.linkedin.com/company/occupy-mart/ "}
            >
              <Image
                src={"/icons/linkedin.svg"}
                alt="icon"
                width={40}
                height={40}
              />
            </Link>
            <Link href={"https://www.instagram.com/occupy_abuja/"}>
              <Image
                src={"/icons/instagram.svg"}
                alt="icon"
                width={40}
                height={40}
              />
            </Link>
          </div>
          <span className="text-lg text-white">
            © {new Date().getFullYear()} - occupy
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
