import { SVGProps } from "react";
import { HomeIcon, InventoryIcon, UserIcon, WalletIcon, AnalyticsIcon } from "@/assets/icon/icons"; // Make sure you have these icons
import { ADMIN_DASHBOARD_URL } from "@/constants"; // You can remove this if it's not necessary anymore

interface IDashboardLink {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  url: string;
}

export interface IDashboardLinks extends IDashboardLink {
  subLinks?: Omit<IDashboardLink, "icon">[]; // If there are sub-links, this allows them to be added
}

export const DashboardLinks: Record<string, IDashboardLinks[]> = {
  main: [
    {
      icon: HomeIcon,
      title: "Select Supermarket",
      url: "/select-supermarket", // Ensure this is correct
    },
    {
      icon: InventoryIcon,
      title: "Dashboard",
      url: "/select-supermarket/dashboard", // Corrected the URL to just /dashboard
    },
    {
      icon: UserIcon,
      title: "Orders",
      url: "/select-supermarket/orders", // Corrected the URL to just /orders
    },
    {
      icon: WalletIcon,
      title: "Wallet Management",
      url: "/select-supermarket/wallet-management", // Corrected the URL to just /wallet-management
    },
  ],
  settings: [
    {
      icon: AnalyticsIcon,
      title: "Settings",
      url: "/select-supermarket/settings", // Corrected the URL to just /settings
    },
  ],
};
