import Image from "next/image";
import DispatchImage from "../../../../public/dispatch.png";
import Router from "next/router";

const Header = () => {
  return (
    <header className="grid w-full items-center gap-4 px-5 pt-12 lg:grid-cols-2 lg:pt-0">
      <div className="lg:pb-12">
        <p className="mb-4 text-[3.375rem] font-bold leading-snug lg:text-[4.125rem]">
          Careers
        </p>

        <p className="mb-4 text-[1.5rem]">
          Have a zeal to contribute to the real world and create a visible
          impact in businesses and lives of consumers? we are transforming
          businesses and consumer experience everyday using technology
        </p>

        <button
          onClick={() => Router.push("/auth/login")}
          className="rounded-full bg-occupy-primary px-16 py-4 text-sm font-medium text-white"
        >
          Join Us
        </button>
      </div>
      <Image alt="header-image" src={DispatchImage} />
    </header>
  );
};

export default Header;
