"use client";

import { NextPageWithLayout } from "../_app";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Button } from "@/components/ui/button";
import Router from "next/router";
import StoreItem from "@/components/select-supermarket/select-supermarket/StoreItem";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import SupermarketDetails from "@/components/select-supermarket/select-supermarket/SupermarketDetails";
import Image from "next/image";
import illustration from "../../../public/images/illustration.png";
import { Inter } from "next/font/google";
import CategoryItem from "@/components/select-supermarket/select-supermarket/CategoryItem";
import {
  ArrowLeft,
  ArrowRight,
  MoveLeft,
  MoveRight,
  Loader2,
  Route,
} from "lucide-react";
import NoSupermarkets from "@/components/select-supermarket/select-supermarket/NoSupermarkets";
import CategoryBar from "@/components/select-supermarket/select-supermarket/CategoryBar";
import TransactionsTable from "@/components/select-supermarket/select-supermarket/TransactionsTable";
import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
import { useGetUserSupermarketsQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { getCredentials } from "@/store/redux/services/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import AccountStatus from "@/components/select-supermarket/select-supermarket/AccountStatus";
import store from "@/store/redux/store";
import ActionButtons from "@/components/select-supermarket/settings/ActionButtons";
// imort Router from "next/router";
import UserDashboard from "@/components/select-supermarket/select-supermarket/UserDashboard";
import { useRouter } from "next/router";

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

  const [showMarketDet, setShowMarketDet] = useState(false);
  const [selectedSupermarket, setSelectedSupermarket] = useState(null);

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
    skip: !userID,
  });

  const {
    data: supermarketsData = { data: [] },
    error: supermarketsError,
    isLoading: isSupermarketsLoading,
  } = useGetUserSupermarketsQuery(userID, {
    skip: !userID,
  });

  // Safely get the array of supermarkets
  console.log("Supermarkets data:", supermarketsData);
  const supermarkets = supermarketsData;

  const toggleMarketDet = (supermarket: SetStateAction<null>) => {
    setSelectedSupermarket(supermarket);
    setShowMarketDet(!showMarketDet);
  };

  if (isSupermarketsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const saveSelectedSupermarket = (supermarket: {
    id: any;
    name: any;
    business_name: any;
    supermarket_photo: any;
    is_online: any;
    contact_person_name: any;
    business_address: any;
    contact_person_phone_number: any;
  }) => {
    sessionStorage.setItem("occupy-supermarket", JSON.stringify(supermarket));
    location.reload();
  };

  // console.log("Supermarkets:", supermarkets);
  if (supermarkets.length > 0) {
    return (
      <div className="h-full rounded-md bg-white px-4 py-6">
        <SpaceBetween>
          <p className="text-[20px] font-medium">Manage Store</p>
          <Button onClick={() => Router.push("/dashboard/store/add")}>
            Add Store
          </Button>
        </SpaceBetween>
        <div className="mx-auto mt-8 flex max-w-[900px] flex-col gap-8">
          {supermarkets.map(
            (store: {
              id: any;
              name: any;
              business_name: any;
              supermarket_photo: any;
              is_online: any;
              contact_person_name: any;
              business_address: any;
              contact_person_phone_number: any;
            }) => (
              <StoreItem
                key={store.id}
                store={{
                  id: store.id,
                  name: store.name,
                  business_name: store.business_name,
                  supermarket_photo: store.supermarket_photo,
                  business_address: store.business_address,
                  is_online: store.is_online,
                  contact_person_name: store.contact_person_name,
                  contact_person_phone_number:
                    store.contact_person_phone_number,
                }}
                // onClickStore={() => console.log("Store clicked:", store.id)}
                onClickStore={() =>
                  //  router.push(`/dashboard/inventory/${supermarket_id}`);
                  // router.push(`dashboard/inventory/${store.id}`)
                  saveSelectedSupermarket(store)
                }
              />
            ),
          )}

          {/* {supermarkets.map((store: Supermarket) => (
            <StoreItem
              key={store.id}
              store={store}
              onClickStore={() => toggleMarketDet(store)}
            />
          ))} */}
        </div>
      </div>
    );

    // Default view: List of stores
  }

  console.log("when supermarkets is == 0", supermarkets);
  if (supermarkets.length === 0) {
    return (
      <div className="h-full rounded-md bg-white px-4 py-6">
        <SpaceBetween>
          <p className="text-[20px] font-medium">Manage Store</p>
          <Button onClick={() => Router.push("/dashboard/store/add")}>
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
              onClick={() => Router.push("/dashboard/store/add")}
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
