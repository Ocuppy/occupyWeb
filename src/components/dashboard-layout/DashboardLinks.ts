import AdministratorsIcon from "@/assets/icon/administrators.svg";
import {
  AnalyticsIcon,
  CategoriesIcon,
  HomeIcon,
  InventoryIcon,
  UserIcon,
  WalletIcon,
} from "@/assets/icon/icons";
import { ADMIN_DASHBOARD_URL } from "@/constants";
import { SVGProps } from "react";
interface IDashboardLink {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  url: string;
}

export interface IDashboardLinks extends IDashboardLink {
  subLinks?: Omit<IDashboardLink, "icon">[];
}
const addParentLinkToUrl = (url: string) => {
  return ADMIN_DASHBOARD_URL + url;
};

export const DashboardLinks: Record<string, IDashboardLinks[]> = {
  main: [
    {
      icon: HomeIcon,
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      icon: UserIcon,
      title: "Orders",
      url: ADMIN_DASHBOARD_URL + "/orders",
      subLinks: [
        { title: "Ongoing Orders", url: "/ongoing" },
        { title: "Rider's Assigning", url: "/riders-assigning" },
      ],
    },
    {
      icon: InventoryIcon,
      title: "Inventory",
      url: ADMIN_DASHBOARD_URL + "/inventory",
      subLinks: [
        { title: "Pending", url: "/pending" },
        { title: "Approved", url: "/approved" },
        { title: "Price Management", url: "/price-management" },
      ],
    },
    // {
    //   icon: CategoriesIcon,
    //   title: "Categories",
    //   url: ADMIN_DASHBOARD_URL + "/categories",
    // },
    {
      icon: WalletIcon,
      title: "Wallet Management",
      url: ADMIN_DASHBOARD_URL + "/wallet-management",
    },
  ],
  settings: [
    {
      icon: AnalyticsIcon,
      title: "Settings",
      url: ADMIN_DASHBOARD_URL + "/settings",
    },
  ],
};
