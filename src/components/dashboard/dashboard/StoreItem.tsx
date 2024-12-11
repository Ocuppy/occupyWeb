// import Flex from "@/components/shared/Flex";
// import { Button } from "@/components/ui/button";
// import React from "react";

// interface StoreItemProps {
//   store: any;

//   onEdit?: () => void;

//   onClickStore?: () => void;
// }

// const StoreItem: React.FC<StoreItemProps> = ({ onClickStore, onEdit }) => {
//   return (
//     <div className="flex flex-col gap-8 rounded-md border">
//       <Flex className="w-full gap-0">
//         <div
//           onClick={onClickStore}
//           className="hover;cursor-pointer flex h-[150px] min-w-[280px] items-center justify-center bg-[#F0F1F3] hover:cursor-pointer"
//         >
//           <p className="font-semibold text-[#48505e]">
//             Livewell Kadokuchi, Abuja
//           </p>
//         </div>
//         <Flex className="w-full items-start justify-between p-4">
//           <div className="flex flex-col gap-2">
//             <p className="text-[16px] font-medium text-[#5D6679]">Lisy Store</p>
//             <p className="max-w-[300px] text-[14px] leading-[2] text-[#858D9D]">
//               1A/Krihnarajapuram, 3 rd street sulur Coimbatore - 6313403
//             </p>
//             <p className="max-w-[300px] text-[14px] text-[#858D9D]">
//               044-653578
//             </p>
//           </div>
//           <Button
//             onClick={onEdit}
//             className="text-occupy-primary"
//             variant={"outline"}
//           >
//             Edit
//           </Button>
//         </Flex>
//       </Flex>
//     </div>
//   );
// };

// export default StoreItem;

// StoreItem.tsx

import Flex from "@/components/shared/Flex";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";

import { FaStore } from "react-icons/fa"; // or any other icon library you are using
interface StoreItemProps {
  store: {
    id: string;
    name: string;
    business_name: string;
    supermarket_photo?: string;
    business_address: string;
    is_online: boolean;
    contact_person_name: string;
    contact_person_phone_number: string;
  };
  onClickStore: () => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ store, onClickStore }) => {
  return (
    <div
      className="flex h-[150px] cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-gray-100"
      onClick={onClickStore}
    >
      <div className="mx-4 flex items-center justify-between">
        {/* Store Photo */}
        {store.supermarket_photo ? (
          <Image
            src={store.supermarket_photo}
            alt={`${store.name} logo`}
            width={100}
            height={50}
            // className= object-cover"
            // className="rounded-full"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <FaStore className="text-gray-500" />
          </div>
        )}

        {/* Store details */}
        <div className="flex flex-col items-start justify-center pl-[20px]">
          <h3 className="text-lg font-semibold">{store.name}</h3>
          <p className="text-gray-500">{store.business_address}</p>
          <p className="text-xl text-[#5D6679]">{store.contact_person_name}</p>
          <p className="text-gray-500">{store.business_name}</p>
          {/* <div className="text-right"> */}
          <p className="text-sm text-[#858D9D]">
            {store.contact_person_phone_number}
          </p>
          {/* </div> */}
          <div className="flex items-center">
            <span
              className={`mr-2 h-2 w-2 rounded-full ${
                store.is_online ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-500">
              {store.is_online ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Edit Button */}
      </div>
      <Button
        onClick={onClickStore}
        variant="outline"
        className="text-occupy-primary"
      >
        Edit
      </Button>

      {/* Contact Info */}
    </div>
  );
};

export default StoreItem;
