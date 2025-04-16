import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStore } from "react-icons/fa";
import { useEffect } from "react";

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
  isSelected?: boolean;
}

const StoreItem: React.FC<StoreItemProps> = ({ store, onClickStore, isSelected = false }) => {
  // Debugging - verify the handler is received
  useEffect(() => {
    console.log('StoreItem mounted with onClickStore:', !!onClickStore);
  }, [onClickStore]);

  const handleCardClick = () => {
    console.log('Card clicked, calling onClickStore');
    onClickStore();
  };

  // const handleEditClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   console.log('Edit button clicked');
  //   // Add your edit functionality here
  // };

  return (
    <div className="relative"> {/* Container for absolute positioning */}
      {/* Main Clickable Card Area */}
      <div 
        className={`flex h-full cursor-pointer flex-col items-center rounded-lg border hover:bg-gray-100 lg:h-[150px] lg:flex-row ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Store Photo */}
        {store.supermarket_photo ? (
          <Image
            src={store.supermarket_photo}
            alt={`${store.name} logo`}
            width={290}
            height={150}
            className="h-full w-full rounded-lg object-cover lg:w-[290px]"
          />
        ) : (
          <div className="flex h-[150px] w-[290px] items-center justify-center bg-gray-200 rounded-l-lg">
            <FaStore className="text-4xl text-gray-500" />
          </div>
        )}

        {/* Store Details - Takes full width */}
        <div className="flex w-full items-center p-4 pr-20"> {/* Extra padding for button */}
          <div className="flex flex-col items-start justify-center">
            <h3 className="text-lg font-semibold text-[#5D6679]">{store.name}</h3>
            <p className="text-xl text-[#5D6679]">{store.contact_person_name}</p>
            <p className="text-gray-500">{store.business_address}</p>
            <p className="text-xl text-[#5D6679]">{store.business_name}</p>
            <p className="text-sm text-[#858D9D]">{store.contact_person_phone_number}</p>
            <div className="flex items-center">
              <span
                className={`mr-2 h-2 w-2 rounded-full ${
                  store.is_online ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              <span className="text-sm text-gray-500">
                {store.is_online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button - Absolutely positioned */}
      {/* <div 
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={handleEditClick}
      >
        <Button
          variant="outline"
          className="h-[40px] w-[90px] border-occupy-primary text-occupy-primary hover:bg-occupy-primary hover:text-white"
        >
          Edit
        </Button>
      </div> */}
    </div>
  );
};

export default StoreItem;