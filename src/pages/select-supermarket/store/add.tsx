"use client";

import { withSteppedFormContextProvider } from "@/contexts/SteppedFormContext";
import { NextPageWithLayout } from "@/pages/_app";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Flex from "@/components/shared/Flex";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast, ToastReturn} from "@/components/ui/use-toast";
import { useAppSelector } from "@/store/redux/hooks";
import { useForm } from "react-hook-form";
import { useAddSupermarketMutation } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { useRouter } from "next/navigation";

const baseUrl = "https://backend.occupymart.com/api";

interface Estate {
  name: string;
  address: string;
  id: number;
}

interface FormData {
  email: string;
  phoneNumber: string;
  supermarketAddress: string;
  supermarketPhoto: FileList;
  supermarketName: string;
  supermarketLocation: string;
  inspectionDate: string;
  salesName: string;
  regNumber: string;
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  // const { toast } = useToast();
  const [estateList, setEstateList] = useState<{label: string, value: string}[]>([]);
  const [loadingEstate, setLoadingEstate] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [currentToastId, setCurrentToastId] = useState<string | null>(null);

  const profileID = useAppSelector((state: { auth: { profileID: string } }) => state.auth.profileID);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const { toast } = useToast();
  const [currentToast, setCurrentToast] = useState<ToastReturn | null>(null);
  
  const showToast = (
    title: string,
    description: string,
    variant: 'default' | 'destructive' = 'default'
  ) => {
    // Dismiss previous toast if exists
    if (currentToast) {
      currentToast.dismiss();
    }
  
    const newToast = toast({
      title,
      description,
      variant,
    });
    
    setCurrentToast(newToast);
  };

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        setLoadingEstate(true);
        const response = await fetch(`${baseUrl}/admin/estates/`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch estates");
        }
        
        const data: Estate[] = await response.json();
        setEstateList(
          data.map((estate) => ({
            label: `${estate.name} - ${estate.address}`,
            value: `${estate.id}`,
          })),
        );
        
        showToast("Success", "Estates loaded successfully!");
      } catch (error) {
        console.error("Error fetching estates:", error);
        showToast("Error", "Failed to fetch estates. Please try again.", "destructive");
      } finally {
        setLoadingEstate(false);
      }
    };

    fetchEstates();
  }, []);

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned.startsWith("0")
      ? `234${cleaned.slice(1)}`
      : cleaned.startsWith("234")
        ? cleaned
        : `234${cleaned}`;

    return formatted.length > 3
      ? `+${formatted.slice(0, 3)} ${formatted.slice(3)}`
      : formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phoneNumber", formatted);
  };

  const [addSupermarket] = useAddSupermarketMutation();

  const onSubmit = async (data: FormData) => {
    const inspectionDate = new Date(data.inspectionDate);
    if (isNaN(inspectionDate.getTime())) {
      showToast("Error", "Please provide a valid inspection date.", "destructive");
      return;
    }

    // Prepare payload
    const payload = {
      contact_person_name: data.salesName,
      business_name: data.supermarketName,
      business_reg_number: data.regNumber,
      name: data.supermarketName,
      supermarket_photo: data.supermarketPhoto,
      business_address: data.supermarketAddress,
      contact_person_email: data.email,
      contact_person_phone_number: data.phoneNumber,
      can_run_online_store: true,
      has_internet_access: true,
      alternate_power_supply: true,
      inspection_date: inspectionDate.toISOString(),
      is_online: true,
      estate: data.supermarketLocation,
      shop_owner: profileID,
    };

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (data.supermarketPhoto && data.supermarketPhoto[0]) {
      formData.append("supermarket_photo", data.supermarketPhoto[0]);
    }

    try {
      setAddLoading(true);
      const result = await addSupermarket(formData).unwrap();

      if (result) {
        localStorage.setItem("storeCreated", "true");
        showToast("Success", "Supermarket added successfully");
        router.push("/select-supermarket");
      }
    } catch (error: any) {
      console.error("Error adding supermarket:", error);
      showToast(
        "Error", 
        error.data?.message || "Failed to add supermarket", 
        "destructive"
      );
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="h-full rounded-md bg-white p-6">
      <Flex className="h-full items-start">
        <div className="hideScroll h-full grow overflow-auto rounded-md border border-dashed bg-white px-6 py-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="flex flex-col gap-5"
          >
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                placeholder="Enter phone number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  onChange: handlePhoneChange,
                })}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="supermarketAddress" className="block mb-1 text-sm font-medium">
                Supermarket Address
              </label>
              <Input
                id="supermarketAddress"
                placeholder="Enter supermarket address"
                {...register("supermarketAddress", { 
                  required: "Address is required" 
                })}
              />
              {errors.supermarketAddress && (
                <p className="mt-1 text-sm text-red-500">{errors.supermarketAddress.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="supermarketPhoto" className="block mb-1 text-sm font-medium">
                Supermarket Photo
              </label>
              <Input
                id="supermarketPhoto"
                type="file"
                accept="image/*"
                {...register("supermarketPhoto", { 
                  required: "Photo is required" 
                })}
              />
              {errors.supermarketPhoto && (
                <p className="mt-1 text-sm text-red-500">{errors.supermarketPhoto.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="supermarketName" className="block mb-1 text-sm font-medium">
                Supermarket Name
              </label>
              <Input
                id="supermarketName"
                placeholder="Enter supermarket name"
                {...register("supermarketName", { 
                  required: "Name is required" 
                })}
              />
              {errors.supermarketName && (
                <p className="mt-1 text-sm text-red-500">{errors.supermarketName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="supermarketLocation" className="block mb-1 text-sm font-medium">
                Supermarket Location
              </label>
              <Select
                id="supermarketLocation"
                options={estateList}
                isLoading={loadingEstate}
                placeholder={loadingEstate ? "Loading locations..." : "Select supermarket location"}
                onChange={(selectedOption) => {
                  setValue("supermarketLocation", selectedOption?.value || "");
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "40px",
                  }),
                }}
              />
              {errors.supermarketLocation && (
                <p className="mt-1 text-sm text-red-500">Location is required</p>
              )}
            </div>

            <div>
              <label htmlFor="inspectionDate" className="block mb-1 text-sm font-medium">
                Date of Inspection
              </label>
              <Input
                id="inspectionDate"
                type="date"
                placeholder="Select date of inspection"
                {...register("inspectionDate", { 
                  required: "Inspection date is required" 
                })}
              />
              {errors.inspectionDate && (
                <p className="mt-1 text-sm text-red-500">{errors.inspectionDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="salesName" className="block mb-1 text-sm font-medium">
                Sales Name
              </label>
              <Input
                id="salesName"
                placeholder="Enter sales name"
                {...register("salesName", { 
                  required: "Sales name is required" 
                })}
              />
              {errors.salesName && (
                <p className="mt-1 text-sm text-red-500">{errors.salesName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="regNumber" className="block mb-1 text-sm font-medium">
                Registration Number
              </label>
              <Input
                id="regNumber"
                placeholder="Enter registration number"
                {...register("regNumber", { 
                  required: "Registration number is required" 
                })}
              />
              {errors.regNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.regNumber.message}</p>
              )}
            </div>

            <div className="flex justify-center py-4">
              <Button 
                type="submit" 
                size="lg" 
                disabled={addLoading || loadingEstate}
                className="min-w-[200px]"
              >
                {addLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Add Supermarket"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Flex>
    </div>
  );
};

export default Page;