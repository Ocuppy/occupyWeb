import { usePathname } from 'next/navigation';
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { BellIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AngleLeftIcon, UserClockIcon } from "@/assets/icon/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Flex from "../shared/Flex";
import { DashboardMenuVisibilityContext } from "@/contexts/DashboardMenuVisibilityContext";
import { useContext, useEffect } from "react";
import { NotificationContext } from "@/contexts/NotificationContext";
import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
import { useAppSelector, useAppDispatch } from "@/store/redux/hooks";
import { getCredentials } from "@/store/redux/services/authSlice/authSlice";
import useFcmToken from "@/hooks/useFcmToken";
import { logOut } from "@/store/redux/services/authSlice/authSlice";
import Image from "next/image";
import { OrderNotificationContext } from "@/contexts/OrderNotificationContext";
import { fetchToken } from "../../../firebase";
import { headers } from "next/headers";

const baseUrl = "https://backend.occupymart.com/api";

const SEARCH_VISIBLE_ROUTES = [
  '/orders',
  '/inventory'
];

const DashboardHeader = () => {
  const pathname = usePathname();
  const { token, notificationPermissionStatus } = useFcmToken();
  const showSearchBar = SEARCH_VISIBLE_ROUTES.some(route => pathname?.includes(route));

  const sideMenuContext = useContext(DashboardMenuVisibilityContext);
  if (!sideMenuContext) {
    throw new Error(
      "DashboardMenuButton toggle must be used within a VisibilityProvider",
    );
  }

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
  const { toggleVisibility } = sideMenuContext;

  const notificationContext = useContext(OrderNotificationContext);
  if (!notificationContext) {
    throw new Error("Home must be used within a NotificationProvider");
  }
  const { showNotification } = notificationContext;

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header className="fixed right-0 z-10 flex w-screen items-center bg-white py-5 xl:w-full xl:pl-[270px] xl:pr-4">
      <Flex className="w-full justify-between px-4 xl:pl-10">
        {/* Conditional Search Bar */}
        <div className={`transition-all duration-300 ${showSearchBar ? 'w-full max-w-[500px]' : 'w-0'}`}>
          {showSearchBar && (
            <input
              type="search"
              className="h-10 w-full rounded-lg bg-[#F9FAFB] px-3 py-6 text-sm ring-offset-white file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search for products etc..."
              aria-label="Search products"
            />
          )}
        </div>

        {/* Spacer when search is hidden */}
        {!showSearchBar && <div className="flex-1" />}

        <button onClick={toggleVisibility} className="xl:hidden">
          <Menu className="text-black" />
        </button>

        <div className="hidden items-center gap-8 xl:flex">
          <div className="flex items-center space-x-2">
            <Label htmlFor="online-mode">Online</Label>
            <Switch id="online-mode" />
          </div>
          
          {/* <Button
            onClick={() => {}}
            className="rounded-lg bg-[#f6f6f6] px-4 py-6 text-black"
          >
            <UserClockIcon width={21} />
          </Button> */}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative flex w-52 items-center gap-2 rounded-md border p-2">
                <Image src="/images/profile.png" alt="Profile Picture" />
                <div className="text-left">
                  <p className="text-sm font-medium text-black/80">
                    {userData?.first_name ?? "John"} {userData?.last_name ?? "Doe"}
                  </p>
                  <p className="text-[0.625rem] uppercase text-black/30">
                    Supermarket
                  </p>
                </div>
                <AngleLeftIcon width={16} className="ml-auto rotate-[-90deg]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Flex>
    </header>
  );

  // Notification Testing
  // const handleTestNotification = async () => {
  //   const response = await fetch("/api/notification", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: token,
  //       title: "Test Notification",
  //       message: "This is a test notification",
  //       link: "/dashboard/orders/ongoing",
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log("response data", data);
  // };

  // return (
  //   <main className="p-10">
  //     {notificationPermissionStatus === "granted" ? (
  //       <p>Permission to receive notifications has been granted.</p>
  //     ) : notificationPermissionStatus !== null ? (
  //       <p>
  //         You have not granted permission to receive notifications. Please
  //         enable notifications in your browser settings.
  //       </p>
  //     ) : null}

  //     <Button
  //       disabled={!token}
  //       className="mt-5"
  //       onClick={handleTestNotification}
  //     >
  //       Send Test Notification
  //     </Button>
  //   </main>
  // );
};

export default DashboardHeader;