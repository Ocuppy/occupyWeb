import DownloadBtn from "@/subComponents/DownloadBtn";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";

const Footer = () => {
  return (
    <Container className="bg-occupy-primary">
      <footer>
        <div className="md:px-20 pl-6 pt-20 flex flex-col md:flex-row justify-start items-start md:gap-40 gap-8">
          {/* first section */}
          <section className="flex flex-col gap-4">
            <Image src="/footerLogo.svg" alt="logo" width={75} height={75} />
            <p className="text-[16px] text-white font-medium font-[inter] w-[312px]">
              We build readymade websites, mobile applications, and elaborate online business
              services.
            </p>
          </section>
          {/* second section */}
          <section className="flex gap-16 text-[16px] text-white font-medium">
            <div className="flex flex-col gap-4 grow">
              <p>- Account</p>
              <div className="flex flex-col gap-3">
                <Link href={"/#"}>My Account</Link>
                <Link href={"/#"}>FAQs</Link>
                <Link href={"/#"}>Terms & Condition</Link>
                <Link href={"/#"}>Privacy Policy</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 grow">
              <p>Help</p>
              <div className="flex flex-col gap-3">
                <Link href={"/#"}>Contact</Link>
              </div>
            </div>
          </section>
          {/* third section */}
          <section className="flex flex-col gap-4">
            <span className="text-2xl text-white font-medium">info@golio.com</span>
            <p className="text-lg text-white font-normal">
              901 N Pitt Str., Suite 170 <br />
              Alexandria, VA 22314, USA
            </p>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </section>
        </div>

        <div className="bg-[#6E1C47] flex justify-between items-center md:mx-20 mt-20 py-6 px-4">
          <div className="flex flex-row  gap-2 items-start">
            <Link href={""} className="hover:scale-105 transform">
              <Image src={"/icons/facebook.svg"} alt="icon" width={40} height={40} />
            </Link>
            <Link href={""}>
              <Image src={"/icons/twitter.svg"} alt="icon" width={40} height={40} />
            </Link>
            <Link href={""}>
              <Image src={"/icons/linkedin.svg"} alt="icon" width={40} height={40} />
            </Link>
            <Link href={""}>
              <Image src={"/icons/instagram.svg"} alt="icon" width={40} height={40} />
            </Link>
          </div>
          <span className="text-lg text-white">© {new Date().getFullYear()} - occupy</span>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
