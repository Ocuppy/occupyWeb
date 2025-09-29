"use client";

import { useEffect, useState, SetStateAction } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Button } from "@/components/ui/button";
import StoreItem from "@/components/select-supermarket/select-supermarket/StoreItem";
import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
import SupermarketDetails from "@/components/select-supermarket/select-supermarket/SupermarketDetails";
import AccountStatus from "@/components/select-supermarket/select-supermarket/AccountStatus";
import UserDashboard from "@/components/select-supermarket/select-supermarket/UserDashboard";
import TransactionsTable from "@/components/select-supermarket/select-supermarket/TransactionsTable";
import { useToast } from "@/components/ui/use-toast";
import { getCredentials } from "@/store/redux/services/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import {
  useGetUserSupermarketsQuery,
  useUpdateSupermarketStatusMutation,
} from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { Inter } from "next/font/google";
import Router from "next/router";

type Supermarket = {
  id: string;
  name: string;
  business_name: string;
  supermarket_photo?: string;
  is_online: boolean;
  contact_person_name: string;
  business_address: string;
  contact_person_phone_number: string;
};

const inter = Inter({ subsets: ["latin"] });

const getTimeOfDay = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "afternoon";
  } else if (currentHour > 17 && currentHour < 21) {
    return "evening";
  } else {
    return "night";
  }
};

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [showMarketDet, setShowMarketDet] = useState(false);
  const [selectedSupermarket, setSelectedSupermarket] =
    useState<Supermarket | null>(null);

  // This will be shared with DashboardHeader
  const [globalSupermarketStatus, setGlobalSupermarketStatus] = useState(false);

  useEffect(() => {
    dispatch(getCredentials());
  }, [dispatch]);

  const userID = useAppSelector((state) => state.auth.userID);

  const {
    data: userData,
    error,
    isLoading,
  } = useGetSupermarketProfileQuery(userID, {
    skip: !userID,
  });

  const {
    data: supermarketsData = { data: [] },
    error: supermarketsError,
    isLoading: isSupermarketsLoading,
  } = useGetUserSupermarketsQuery(userID, {
    skip: !userID,
  });

  const supermarkets = supermarketsData;

  const [updateSupermarketStatus, { isLoading: isUpdating }] =
    useUpdateSupermarketStatusMutation();

  // Update the saveSelectedSupermarket function
  const saveSelectedSupermarket = (supermarket: Supermarket) => {
    // console.log("Saving supermarket:", supermarket);
    sessionStorage.setItem("occupy-supermarket", JSON.stringify(supermarket));
    // console.log(
    //   "SessionStorage after save:",
    //   sessionStorage.getItem("occupy-supermarket"),
    // );
    location.reload();
  };

  // Enhanced status change handler
  const handleStatusChange = async (id: string, newStatus: boolean) => {
    try {
      await updateSupermarketStatus({
        supermarket_id: id,
        is_online: newStatus,
      }).unwrap();

      // Update the selected supermarket if it exists
      if (selectedSupermarket && selectedSupermarket.id === id) {
        const updatedSupermarket = {
          ...selectedSupermarket,
          is_online: newStatus,
        };
        setSelectedSupermarket(updatedSupermarket);
        sessionStorage.setItem(
          "occupy-supermarket",
          JSON.stringify(updatedSupermarket),
        );
      }

      toast({
        title: "Status Updated",
        description: `Supermarket is now ${newStatus ? "online" : "offline"}`,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  // const saveSelectedSupermarket = (supermarket: {
  //   id: any;
  //   name: any;
  //   business_name: any;
  //   supermarket_photo: any;
  //   is_online: any;
  //   contact_person_name: any;
  //   business_address: any;
  //   contact_person_phone_number: any;
  // }) => {
  //   sessionStorage.setItem("occupy-supermarket", JSON.stringify(supermarket));
  //   location.reload();
  // };

  if (isSupermarketsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (supermarkets.length > 0) {
    return (
      <div className="h-full rounded-md bg-white px-4 py-6">
        <SpaceBetween>
          <p className="text-[20px] font-medium">Manage Store</p>
          <Button onClick={() => Router.push("/select-supermarket/store/add")}>
            Add Store
          </Button>
        </SpaceBetween>
        <div className="mx-auto mt-8 flex max-w-[900px] flex-col gap-8">
          {supermarkets.map((store: Supermarket) => (
            <StoreItem
              key={store.id}
              store={store}
              onClickStore={() => saveSelectedSupermarket(store)}
              isSelected={selectedSupermarket?.id === store.id}
            />
          ))}
        </div>
      </div>
    );
  }

  // if (supermarkets.length > 0) {
  //   return (
  //     <div className="h-full rounded-md bg-white px-4 py-6">
  //       <SpaceBetween>
  //         <p className="text-[20px] font-medium">Manage Store</p>
  //         <Button onClick={() => Router.push("/select-supermarket/store/add")}>
  //           Add Store
  //         </Button>
  //       </SpaceBetween>
  //       <div className="mx-auto mt-8 flex max-w-[900px] flex-col gap-8">
  //         {supermarkets.map(
  //           (store: {
  //             id: any;
  //             name: any;
  //             business_name: any;
  //             supermarket_photo: any;
  //             is_online: any;
  //             contact_person_name: any;
  //             business_address: any;
  //             contact_person_phone_number: any;
  //           }) => (
  //             <StoreItem
  //               key={store.id}
  //               store={{
  //                 id: store.id,
  //                 name: store.name,
  //                 business_name: store.business_name,
  //                 supermarket_photo: store.supermarket_photo,
  //                 business_address: store.business_address,
  //                 is_online: store.is_online,
  //                 contact_person_name: store.contact_person_name,
  //                 contact_person_phone_number:
  //                   store.contact_person_phone_number,
  //               }}
  //               onClickStore={() => saveSelectedSupermarket(store)}
  //             />
  //           )
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  // console.log("when supermarkets is == 0", supermarkets);
  if (supermarkets.length === 0) {
    return (
      <div className="h-full rounded-md bg-white px-4 py-6">
        <SpaceBetween>
          <p className="text-[20px] font-medium">Manage Store</p>
          <Button onClick={() => Router.push("/select-supermarket/store/add")}>
            Add Store
          </Button>
        </SpaceBetween>
        <div className="mx-auto mt-8 flex max-w-[540px] flex-col gap-8">
          <div className="flex h-[250px] flex-col items-center justify-center gap-4 rounded-lg p-9 shadow-lg">
            <Image src="/icons/check.svg" width={58} height={58} alt="alt" />
            <h1 className="text-2xl font-bold">No supermarket onboarded</h1>
            <p>
              Proceed to add a supermarket and onboard your products to start
              your progress.
            </p>
            <Button
              type="submit"
              size="lg"
              onClick={() => Router.push("/select-supermarket/store/add")}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return !showMarketDet ? (
    <div className="h-full rounded-md bg-white px-4 py-6">
      {!showMarketDet ? (
        <>
          {/* <div className="h-full rounded-md bg-white px-4 py-6">
            <SpaceBetween>
              <p className="text-[20px] font-medium">Manage Store</p>
              <Button onClick={() => Router.push("/dashboard/store/add")}>
                Add Store
              </Button>
            </SpaceBetween>
            <div className="mx-auto mt-8 flex max-w-[900px] flex-col gap-8">
              {supermarkets.map((store: any) => (
                <StoreItem
                  key={store.id}
                  store={store}
                  onClickStore={() => toggleMarketDet(store)}
                />
              ))}
            </div>
          </div> */}
        </>
      ) : (
        <AccountStatus />
        // <SupermarketDetails onBack={toggleMarketDet} />
      )}
    </div>
  ) : (
    <>
      <UserDashboard />
      <TransactionsTable />
    </>
  );
};

export default Page;
