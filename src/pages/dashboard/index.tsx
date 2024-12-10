// "use client";

// import { NextPageWithLayout } from "../_app";
// import SpaceBetween from "@/components/shared/SpaceBetween";
// import { Button } from "@/components/ui/button";
// import Router from "next/router";
// import StoreItem from "@/components/dashboard/dashboard/StoreItem";
// import { useEffect, useState } from "react";
// import SupermarketDetails from "@/components/dashboard/dashboard/SupermarketDetails";
// import Image from "next/image";
// import illustration from "../../../public/images/illustration.png";
// import { Inter } from "next/font/google";
// import CategoryItem from "@/components/dashboard/dashboard/CategoryItem";
// import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from "lucide-react";
// import NoSupermarkets from "@/components/dashboard/dashboard/NoSupermarkets";
// import CategoryBar from "@/components/dashboard/dashboard/CategoryBar";
// import TransactionsTable from "@/components/dashboard/dashboard/TransactionsTable";
// import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
// import { getCredentials } from "@/store/redux/services/authSlice/authSlice";
// import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";

// const inter = Inter({ subsets: ["latin"] });

// const SortCard = (props: { name: string }) => {
//   return (
//     <div className="h-[7.6875rem] w-[15.625rem] rounded-lg border border-[#E0E0E0] bg-white p-3">
//       <header className="mb-3 flex w-full items-center justify-between">
//         <div className="ml-auto flex items-center gap-2">
//           <p className={`text-[#BABEC6] ${inter.className}`}>Sort by:</p>
//           <div className="flex items-center gap-3 rounded-md bg-[#F4F5F9] px-3 py-2.5">
//             <p className="text-xs font-medium">Monthly</p>
//             <svg
//               width="15"
//               height="9"
//               viewBox="0 0 15 9"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M13.2759 0.924316H7.04595H1.43595C0.475949 0.924316 -0.00405031 2.08432 0.67595 2.76432L5.85595 7.94432C6.68595 8.77432 8.03595 8.77432 8.86595 7.94432L10.8359 5.97432L14.0459 2.76432C14.716 2.08432 14.2359 0.924316 13.2759 0.924316Z"
//                 fill="#080B30"
//               />
//             </svg>
//           </div>
//         </div>
//       </header>
//       <div className="space-y-1">
//         <p className="text-xs font-semibold text-[#333333]">{props.name}</p>
//         <div className="flex items-center gap-2">
//           <p className="text-2xl font-bold text-[#333333]">203k</p>
//           <svg
//             width="19"
//             height="8"
//             viewBox="0 0 19 8"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M18.6083 0.778517V3.70059C18.6083 3.9928 18.3083 4.18761 17.8583 4.18761C17.4083 4.18761 17.1083 3.9928 17.1083 3.70059V1.94735L11.2583 5.74605C10.9583 5.94085 10.5083 5.94085 10.2083 5.74605L6.98334 3.65189L1.88334 6.96358C1.73334 7.06098 1.58334 7.10969 1.35834 7.10969C1.13334 7.10969 0.983337 7.06098 0.833337 6.96358C0.533337 6.76878 0.533337 6.47657 0.833337 6.28176L6.45834 2.62917C6.75834 2.43436 7.20834 2.43436 7.50834 2.62917L10.7333 4.72332L16.0583 1.26553H13.3583C12.9083 1.26553 12.6083 1.07072 12.6083 0.778517C12.6083 0.486309 12.9083 0.291504 13.3583 0.291504H17.8583C17.9333 0.291504 18.0833 0.291504 18.1583 0.340205C18.3083 0.388907 18.4583 0.486309 18.5333 0.583712C18.6083 0.632413 18.6083 0.729816 18.6083 0.778517Z"
//               fill="#27AE60"
//             />
//           </svg>
//           <p className="text-[0.625rem] text-[#27AE60]">12.5%</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Page: NextPageWithLayout = () => {
//   const [showMarketDet, setShowMarketDet] = useState(false);
//   const toggleMarketDet = () => setShowMarketDet(!showMarketDet);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(getCredentials());
//   }, [dispatch]);

//   const userID = useAppSelector((state) => state.auth.userID);
//   const {
//     data: userData,
//     error,
//     isLoading,
//   } = useGetSupermarketProfileQuery(userID, {
//     skip: userID ? false : true,
//   });

//   const getTimeOfDay = () => {
//     const currentHour = new Date().getHours();

//     if (currentHour >= 5 && currentHour < 12) {
//       return "morning";
//     } else if (currentHour >= 12 && currentHour < 17) {
//       return "afternoon";
//     } else if (currentHour > 17 && currentHour < 21) {
//       return "evening";
//     } else {
//       return "night";
//     }
//   };

//   return !showMarketDet ? (
//     <div className="h-full rounded-md bg-white px-4 py-6">
//       {!showMarketDet ? (
//         <>
//           <SpaceBetween>
//             <p className="text-[20px] font-medium">Manage Store</p>
//             <Button onClick={() => Router.push("/dashboard/store/add")}>
//               Add Store
//             </Button>
//           </SpaceBetween>

//           {/* Component for when no store has been added */}
//           {/* <Flex className="justify-center">
//       <NoSupermarkets />
//     </Flex> */}

//           <div className="mx-auto mt-8 flex max-w-[900px] flex-col gap-8">
//             <StoreItem onClickStore={toggleMarketDet} />
//             <StoreItem onClickStore={toggleMarketDet} />
//             <StoreItem onClickStore={toggleMarketDet} />
//           </div>
//         </>
//       ) : (
//         <SupermarketDetails onBack={toggleMarketDet} />
//       )}
//     </div>
//   ) : (
//     <>
//       <div className="mb-7 flex w-full items-center gap-6 overflow-x-scroll xl:overflow-x-visible">
//         <section className="flex items-center gap-6">
//           <div className="relative h-[9.5rem] w-[19rem] rounded-lg border border-[#E0E0E0] bg-white p-4">
//             <header>
//               <h5 className="font-bold text-[#333333]">
//                 Good {getTimeOfDay()} 🌤
//               </h5>
//               <h6 className="font-bold text-[#333333]">
//                 {userData?.first_name}
//               </h6>
//             </header>
//             <div className="absolute bottom-0 right-1">
//               <Image src={illustration} alt="Illustration" />
//             </div>
//           </div>
//           <div className="h-[7.6875rem] w-[15.625rem] rounded-lg border border-[#E0E0E0] bg-white p-3">
//             <header className="mb-3 flex w-full items-center justify-between">
//               <div className="ml-auto flex items-center gap-2">
//                 <p className={`text-[#BABEC6] ${inter.className}`}>Sort by:</p>
//                 <div className="flex items-center gap-3 rounded-md bg-[#F4F5F9] px-3 py-2.5">
//                   <p className="text-xs font-medium">Monthly</p>
//                   <svg
//                     width="15"
//                     height="9"
//                     viewBox="0 0 15 9"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M13.2759 0.924316H7.04595H1.43595C0.475949 0.924316 -0.00405031 2.08432 0.67595 2.76432L5.85595 7.94432C6.68595 8.77432 8.03595 8.77432 8.86595 7.94432L10.8359 5.97432L14.0459 2.76432C14.716 2.08432 14.2359 0.924316 13.2759 0.924316Z"
//                       fill="#080B30"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </header>
//             <div className="space-y-1">
//               <p className="text-xs font-semibold text-[#333333]">
//                 Total Revenue
//               </p>
//               <div className="flex items-center gap-2">
//                 <p className="text-2xl font-bold text-[#333333]">203k</p>
//                 <svg
//                   width="19"
//                   height="8"
//                   viewBox="0 0 19 8"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M18.6083 0.778517V3.70059C18.6083 3.9928 18.3083 4.18761 17.8583 4.18761C17.4083 4.18761 17.1083 3.9928 17.1083 3.70059V1.94735L11.2583 5.74605C10.9583 5.94085 10.5083 5.94085 10.2083 5.74605L6.98334 3.65189L1.88334 6.96358C1.73334 7.06098 1.58334 7.10969 1.35834 7.10969C1.13334 7.10969 0.983337 7.06098 0.833337 6.96358C0.533337 6.76878 0.533337 6.47657 0.833337 6.28176L6.45834 2.62917C6.75834 2.43436 7.20834 2.43436 7.50834 2.62917L10.7333 4.72332L16.0583 1.26553H13.3583C12.9083 1.26553 12.6083 1.07072 12.6083 0.778517C12.6083 0.486309 12.9083 0.291504 13.3583 0.291504H17.8583C17.9333 0.291504 18.0833 0.291504 18.1583 0.340205C18.3083 0.388907 18.4583 0.486309 18.5333 0.583712C18.6083 0.632413 18.6083 0.729816 18.6083 0.778517Z"
//                     fill="#27AE60"
//                   />
//                 </svg>
//                 <p className="text-[0.625rem] text-[#27AE60]">12.5%</p>
//               </div>
//             </div>
//           </div>
//           <div className="h-[7.6875rem] w-[15.625rem] rounded-lg border border-[#E0E0E0] bg-white p-3">
//             <header className="mb-3 flex w-full items-center justify-between">
//               <div className="ml-auto flex items-center gap-2">
//                 <p className={`text-[#BABEC6] ${inter.className}`}>Sort by:</p>
//                 <div className="flex items-center gap-3 rounded-md bg-[#F4F5F9] px-3 py-2.5">
//                   <p className="text-xs font-medium">Monthly</p>
//                   <svg
//                     width="15"
//                     height="9"
//                     viewBox="0 0 15 9"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M13.2759 0.924316H7.04595H1.43595C0.475949 0.924316 -0.00405031 2.08432 0.67595 2.76432L5.85595 7.94432C6.68595 8.77432 8.03595 8.77432 8.86595 7.94432L10.8359 5.97432L14.0459 2.76432C14.716 2.08432 14.2359 0.924316 13.2759 0.924316Z"
//                       fill="#080B30"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </header>
//             <div className="space-y-1">
//               <p className="text-xs font-semibold text-[#333333]">
//                 Total Item Sold
//               </p>
//               <div className="flex items-center gap-2">
//                 <p className="text-2xl font-bold text-[#333333]">203k</p>
//                 <svg
//                   width="19"
//                   height="8"
//                   viewBox="0 0 19 8"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M18.6083 0.778517V3.70059C18.6083 3.9928 18.3083 4.18761 17.8583 4.18761C17.4083 4.18761 17.1083 3.9928 17.1083 3.70059V1.94735L11.2583 5.74605C10.9583 5.94085 10.5083 5.94085 10.2083 5.74605L6.98334 3.65189L1.88334 6.96358C1.73334 7.06098 1.58334 7.10969 1.35834 7.10969C1.13334 7.10969 0.983337 7.06098 0.833337 6.96358C0.533337 6.76878 0.533337 6.47657 0.833337 6.28176L6.45834 2.62917C6.75834 2.43436 7.20834 2.43436 7.50834 2.62917L10.7333 4.72332L16.0583 1.26553H13.3583C12.9083 1.26553 12.6083 1.07072 12.6083 0.778517C12.6083 0.486309 12.9083 0.291504 13.3583 0.291504H17.8583C17.9333 0.291504 18.0833 0.291504 18.1583 0.340205C18.3083 0.388907 18.4583 0.486309 18.5333 0.583712C18.6083 0.632413 18.6083 0.729816 18.6083 0.778517Z"
//                     fill="#27AE60"
//                   />
//                 </svg>
//                 <p className="text-[0.625rem] text-[#27AE60]">12.5%</p>
//               </div>
//             </div>
//           </div>
//           <div className="h-[7.6875rem] w-[15.625rem] rounded-lg border border-[#E0E0E0] bg-white p-3">
//             <header className="mb-3 flex w-full items-center justify-between">
//               <div className="ml-auto flex items-center gap-2">
//                 <p className={`text-[#BABEC6] ${inter.className}`}>Sort by:</p>
//                 <div className="flex items-center gap-3 rounded-md bg-[#F4F5F9] px-3 py-2.5">
//                   <p className="text-xs font-medium">Monthly</p>
//                   <svg
//                     width="15"
//                     height="9"
//                     viewBox="0 0 15 9"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M13.2759 0.924316H7.04595H1.43595C0.475949 0.924316 -0.00405031 2.08432 0.67595 2.76432L5.85595 7.94432C6.68595 8.77432 8.03595 8.77432 8.86595 7.94432L10.8359 5.97432L14.0459 2.76432C14.716 2.08432 14.2359 0.924316 13.2759 0.924316Z"
//                       fill="#080B30"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </header>
//             <div className="space-y-1">
//               <p className="text-xs font-semibold text-[#333333]">
//                 Order fulfilled
//               </p>
//               <div className="flex items-center gap-2">
//                 <p className="text-2xl font-bold text-[#333333]">203k</p>
//                 <svg
//                   width="19"
//                   height="8"
//                   viewBox="0 0 19 8"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M18.6083 0.778517V3.70059C18.6083 3.9928 18.3083 4.18761 17.8583 4.18761C17.4083 4.18761 17.1083 3.9928 17.1083 3.70059V1.94735L11.2583 5.74605C10.9583 5.94085 10.5083 5.94085 10.2083 5.74605L6.98334 3.65189L1.88334 6.96358C1.73334 7.06098 1.58334 7.10969 1.35834 7.10969C1.13334 7.10969 0.983337 7.06098 0.833337 6.96358C0.533337 6.76878 0.533337 6.47657 0.833337 6.28176L6.45834 2.62917C6.75834 2.43436 7.20834 2.43436 7.50834 2.62917L10.7333 4.72332L16.0583 1.26553H13.3583C12.9083 1.26553 12.6083 1.07072 12.6083 0.778517C12.6083 0.486309 12.9083 0.291504 13.3583 0.291504H17.8583C17.9333 0.291504 18.0833 0.291504 18.1583 0.340205C18.3083 0.388907 18.4583 0.486309 18.5333 0.583712C18.6083 0.632413 18.6083 0.729816 18.6083 0.778517Z"
//                     fill="#27AE60"
//                   />
//                 </svg>
//                 <p className="text-[0.625rem] text-[#27AE60]">12.5%</p>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section>
//           <header className="mb-2 w-fit">
//             <h6
//               className={`text-xl font-medium text-[#1C2A53] ${inter.className}`}
//             >
//               Wallet Management
//             </h6>
//           </header>
//           <div className="w-[19.9375rem] rounded-lg bg-gradient-to-r from-[#44A159] to-[#9CEA38] px-2 py-14">
//             <div className="text-white">
//               <h5 className="text-sm">Wallet Balance</h5>
//               <h6 className="text-3xl font-semibold">NGN250,500.00</h6>
//             </div>
//           </div>
//         </section>
//       </div>
//       <section className="mb-7">
//         <header className="mx-auto mb-3 flex w-11/12 items-center justify-between">
//           <h5 className="font-poppins text-fhover text-xl font-semibold">
//             Categories
//           </h5>
//           <button className="flex items-center gap-2 font-medium text-[#00B207]">
//             View all
//             <ArrowRight size={17} />
//           </button>
//         </header>

//         <CategoryBar />
//       </section>
//       <TransactionsTable />
//     </>
//   );
// };

// export default Page;

"use client";

import { NextPageWithLayout } from "../_app";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Button } from "@/components/ui/button";
import Router from "next/router";
import StoreItem from "@/components/dashboard/dashboard/StoreItem";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import SupermarketDetails from "@/components/dashboard/dashboard/SupermarketDetails";
import Image from "next/image";
import illustration from "../../../public/images/illustration.png";
import { Inter } from "next/font/google";
import CategoryItem from "@/components/dashboard/dashboard/CategoryItem";
import {
  ArrowLeft,
  ArrowRight,
  MoveLeft,
  MoveRight,
  Loader2,
} from "lucide-react";
import NoSupermarkets from "@/components/dashboard/dashboard/NoSupermarkets";
import CategoryBar from "@/components/dashboard/dashboard/CategoryBar";
import TransactionsTable from "@/components/dashboard/dashboard/TransactionsTable";
import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
import { useGetUserSupermarketsQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { getCredentials } from "@/store/redux/services/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import AccountStatus from "@/components/dashboard/dashboard/AccountStatus";
import store from "@/store/redux/store";
import ActionButtons from "@/components/dashboard/settings/ActionButtons";
import UserDashboard from "@/components/dashboard/dashboard/UserDashboard";
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

  console.log("Supermarkets:", supermarkets);
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
              contact_person_phone_number: any;
            }) => (
              <StoreItem
                key={store.id}
                store={{
                  id: store.id,
                  name: store.name,
                  business_name: store.business_name,
                  supermarket_photo: store.supermarket_photo,
                  is_online: store.is_online,
                  contact_person_name: store.contact_person_name,
                  contact_person_phone_number:
                    store.contact_person_phone_number,
                }}
                onClickStore={() => console.log("Store clicked:", store.id)}
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
