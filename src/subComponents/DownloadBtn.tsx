import Link from "next/link";
import Image from "next/image";

interface DownloadBtnProps {
  href: string;
  icon: string;
  name: string;
  title: string;
}

const DownloadBtn: React.FC<DownloadBtnProps> = ({
  href,
  icon,
  name,
  title,
}) => {
  return (
    <Link href={href}>
      <div className="flex w-full transform cursor-pointer items-center justify-center rounded-md bg-black px-3 py-3 font-medium hover:scale-105 md:w-[154px] lg:px-0">
        <Image
          src={icon}
          className="mr-4 h-6"
          alt={`${name} icon`}
          width={24}
          height={24}
        />
        <div className="items-left flex flex-col text-[10px] font-bold leading-[14px] md:text-[12px] lg:text-[14px] lg:leading-[18px]">
          <h2 className="text-xs text-[#B3B3B3]">{title}</h2>
          <h1 className="whitespace-nowrap font-medium text-white">{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default DownloadBtn;
