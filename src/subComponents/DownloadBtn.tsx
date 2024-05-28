import Link from "next/link";

interface DownloadBtnProps {
  href: string;
  icon: string;
  name: string;
  title: string;
}

const DownloadBtn: React.FC<DownloadBtnProps> = ({ href, icon, name, title }) => {
  return (
    <Link href={href}>
      <div
        className="
          rounded-md cursor-pointer py-2 px-2 lg:px-0 font-medium  
          flex items-center justify-center hover:scale-105 transform w-full md:w-[154px] bg-black
        "
      >
        <img src={icon} className="h-6 mr-4" alt={`${name} icon`} />
        <div className="flex flex-col lg:leading-[18px] text-[10px] md:text-[12px] lg:text-[14px] leading-[14px] font-bold items-left">
          <h2 className="font-thin text-white text-opacity-75 text-sm">{title}</h2>
          <h1 className="font-bold whitespace-nowrap text-white">{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default DownloadBtn;
