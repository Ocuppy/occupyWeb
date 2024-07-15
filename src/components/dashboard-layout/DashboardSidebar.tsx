import Link from "next/link";
import { DashboardLinks, IDashboardLinks } from "./DashboardLinks";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Flex from "@/components/shared/Flex";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";

const ParentLinkComponent = ({ link }: { link: IDashboardLinks }) => {
  return (
    <Flex className="gap-4">
      <link.icon width={18} />
      <span className="font-semibold text-[15px]">{link.title}</span>
    </Flex>
  );
};

const DashboardSidebar = () => {
  const router = useRouter();

  return (
    <aside
      className={`bg-occupy-primary  rounded-r-lg w-[270px] text-white p-4 sticky z-30 top-0 h-screen`}
    >
      <div className="flex items-center relative gap-4 pt-4 ">
        <Avatar>
          <AvatarImage
            src={"../../../assets/images/avatar.png"}
            alt="profile-avatar"
          />
          <AvatarFallback className="bg-slate-400">CN</AvatarFallback>
        </Avatar>

        <div className="flex text-white flex-col">
          <p className="uppercase opacity-[40%] text-[10px]">
            Live Well Supermarket
          </p>
          <p className="font-medium opacity-[80%] text-[14px]">Andrew Smith</p>
        </div>
      </div>
      <Separator className="my-8 h-[2px]" />
      <p className="pl-4 text-white opacity-50 text-[12px]">MAIN</p>
      <div className="flex flex-col gap-4">
        {DashboardLinks.main.map((link) => {
          const isCurrentPath = link.url === router.pathname;
          return (
            <div key={link.url}>
              {link.subLinks ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={link.url}>
                    <AccordionTrigger
                      className={`p-2 py-[12px] pl-4  rounded-lg ${
                        isCurrentPath
                          ? "bg-white text-occupy-primary"
                          : "bg-transparent text-white"
                      }`}
                    >
                      <Link
                        href={link.url}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <ParentLinkComponent link={link} />
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-8 mth-4">
                        {link.subLinks.map((subLink, idx) => {
                          const linkToClick = `${link.url}${subLink.url}`;
                          const isCurrentPath = linkToClick === router.pathname;
                          const isLast = idx === link?.subLinks?.length! - 1;
                          return (
                            <div
                              className={`flex items-baseline  ${
                                !isLast && "mb-[-18px]"
                              }`}
                              key={idx}
                            >
                              <div
                                className={`border-b-[2px] border-l- border-l border-[#c183b0] rounded-bl-md w-[20px] ${
                                  idx === 0 ? "h-[40px]" : "h-[50px]"
                                }`}
                              ></div>
                              <Link
                                href={linkToClick}
                                className={`flex font-semibold px-4 py-2   rounded-lg items-center w-full ${
                                  isCurrentPath
                                    ? "bg-white text-occupy-primary"
                                    : "bg-transparent text-[#c183b0]"
                                }`}
                              >
                                {subLink.title}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  className={`flex p-2 py-[12px] pl-4 rounded-lg items-center ${
                    isCurrentPath
                      ? "bg-white text-occupy-primary"
                      : "bg-transparent text-white"
                  }`}
                  href={link.url}
                >
                  <ParentLinkComponent link={link} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <Separator className="my-12 h-[2px]" />
      <p className="pl-4 text-white opacity-50 text-[12px]">SETTINGS</p>
      <div>
        {DashboardLinks.settings.map((link, i) => {
          const isCurrentPath = link.url === router.pathname;
          return (
            <Link
              key={i}
              className={`flex p-2 py-[12px] pl-4 rounded-lg items-center ${
                isCurrentPath
                  ? "bg-white text-occupy-primary"
                  : "bg-transparent text-white"
              }`}
              href={link.url}
            >
              <ParentLinkComponent link={link} />
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
