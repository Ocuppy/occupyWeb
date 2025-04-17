import { SVGProps } from "react";
import {
  HomeIcon,
  InventoryIcon,
  UserIcon,
  WalletIcon,
  AnalyticsIcon,
  PackageIcon, // Add this import
} from "@/assets/icon/icons";

interface IDashboardLink {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  url: string;
}

export interface IDashboardLinks extends IDashboardLink {
  subLinks?: Omit<IDashboardLink, "icon">[];
}

export const DashboardLinks: Record<string, IDashboardLinks[]> = {
  main: [
    {
      icon: HomeIcon,
      title: "Select Supermarket",
      url: "/select-supermarket",
    },
    {
      icon: PackageIcon, // Changed from InventoryIcon
      title: "Dashboard",
      url: "/select-supermarket/dashboard",
    },
    {
      icon: InventoryIcon, // Now used for Inventory
      title: "Inventory",
      url: "/select-supermarket/inventory",
    },
    {
      icon: UserIcon,
      title: "Orders",
      url: "/select-supermarket/orders",
    },
    {
      icon: WalletIcon,
      title: "Wallet Management",
      url: "/select-supermarket/wallet-management",
    },
  ],
  settings: [
    {
      icon: AnalyticsIcon,
      title: "Settings",
      url: "/select-supermarket/settings",
    },
  ],
};
