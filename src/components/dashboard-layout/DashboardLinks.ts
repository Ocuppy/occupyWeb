import AdministratorsIcon from "@/assets/icon/administrators.svg";
import {
  AnalyticsIcon,
  CategoriesIcon,
  HomeIcon,
  InventoryIcon,
  UserIcon,
  WalletIcon,
} from "@/assets/icon/icons";
import { SVGProps } from "react";
interface IDashboardLink {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  url: string;
}

export interface IDashboardLinks extends IDashboardLink {
  subLinks?: Omit<IDashboardLink, "icon">[];
}
export const DashboardLinks: IDashboardLinks[] = [
  { icon: HomeIcon, title: "Dashboard", url: "/dashboard" },
  {
    icon: UserIcon,
    title: "Orders",
    url: "/orders",
    subLinks: [
      { title: "Ongoing Orders", url: "/ongoing" },
      { title: "Rider's Assigning", url: "/riders-assigning" },
    ],
  },
  {
    icon: InventoryIcon,
    title: "Inventory",
    url: "inventory",
    subLinks: [
      { title: "Pending", url: "/pending" },
      { title: "Approved", url: "/approved" },
      { title: "Price Management", url: "/price-management" },
    ],
  },
  { icon: CategoriesIcon, title: "Categories", url: "/categories" },
  {
    icon: WalletIcon,
    title: "Wallet Management",
    url: "/wallet-management",
  },
  { icon: AnalyticsIcon, title: "Analysis", url: "/analysis" },
];
