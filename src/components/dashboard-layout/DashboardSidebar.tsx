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
import { Menu, X } from "lucide-react";
import { DashboardMenuVisibilityContext } from "@/contexts/DashboardMenuVisibilityContext";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
import { getCredentials } from "@/store/redux/services/authSlice/authSlice";

const ParentLinkComponent = ({ link }: { link: IDashboardLinks }) => {
  return (
    <Flex className="gap-4">
      <link.icon width={18} />
      <span className="text-[15px] font-semibold">{link.title}</span>
    </Flex>
  );
};

const DashboardSidebar = () => {
  const router = useRouter();

  const context = useContext(DashboardMenuVisibilityContext);

  if (!context) {
    throw new Error("ToggleComponent must be used within a VisibilityProvider");
  }

  const { toggleVisibility } = context;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCredentials());
  }, [dispatch]);

  const userID = useAppSelector((state) => state.auth.userID);
  const {
    data: userData,
    error,
    isLoading,
  } = useGetSupermarketProfileQuery(userID, {
    skip: userID ? false : true,
  });

  return (
    <aside
      className={`sticky top-0 z-30 h-screen w-full overflow-y-auto rounded-r-lg bg-occupy-primary p-4 text-white xl:w-[270px]`}
      // className={`sticky top-0 z-30 h-screen w-screen rounded-r-lg bg-occupy-primary p-4 text-white`}
    >
      <div className="relative flex items-center gap-4 pt-4">
        <Avatar>
          <AvatarImage src={"images/avatar.png"} alt="profile-avatar" />
          <AvatarFallback className="bg-slate-400">CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-white">
          <p className="text-[10px] uppercase opacity-[40%]">
            Live Well Supermarket
          </p>
          <p className="text-[14px] font-medium opacity-[80%]">
            {" "}
            {userData?.first_name ?? "John"} {userData?.last_name ?? "Doe"}
          </p>
        </div>

        <button onClick={toggleVisibility} className="ml-auto xl:hidden">
          <X className="text-white" />
        </button>
      </div>
      <Separator className="my-8 h-[2px]" />
      <p className="pl-4 text-[12px] text-white opacity-50">MAIN</p>
      <div className="flex flex-col gap-4">
        {DashboardLinks.main.map((link) => {
          const isCurrentPath = link.url === router.pathname;
          return (
            <div key={link.url}>
              {link.subLinks ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={link.url}>
                    <AccordionTrigger
                      className={`rounded-lg p-2 py-[12px] pl-4 ${
                        isCurrentPath
                          ? "bg-white text-occupy-primary"
                          : "bg-transparent text-white"
                      }`}
                    >
                      <ParentLinkComponent link={link} />
                      {/* <Link
                        href={link.url}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <ParentLinkComponent link={link} />
                      </Link> */}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mth-4 ml-8">
                        {link.subLinks.map((subLink, idx) => {
                          const linkToClick = `${link.url}${subLink.url}`;
                          const isCurrentPath = linkToClick === router.pathname;
                          const isLast = idx === link?.subLinks?.length! - 1;
                          return (
                            <div
                              className={`flex items-baseline ${
                                !isLast && "mb-[-18px]"
                              }`}
                              key={idx}
                            >
                              <div
                                className={`border-l- w-[20px] rounded-bl-md border-b-[2px] border-l border-[#c183b0] ${
                                  idx === 0 ? "h-[40px]" : "h-[50px]"
                                }`}
                              ></div>
                              <Link
                                href={linkToClick}
                                className={`flex w-full items-center rounded-lg px-4 py-2 font-semibold ${
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
                  className={`flex items-center rounded-lg p-2 py-[12px] pl-4 ${
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
      <p className="pl-4 text-[12px] text-white opacity-50">SETTINGS</p>
      <div>
        {DashboardLinks.settings.map((link, i) => {
          const isCurrentPath = link.url === router.pathname;
          return (
            <Link
              key={i}
              className={`flex items-center rounded-lg p-2 py-[12px] pl-4 ${
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
