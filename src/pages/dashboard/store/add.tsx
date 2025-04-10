import { withSteppedFormContextProvider } from "@/contexts/SteppedFormContext";
import { NextPageWithLayout } from "@/pages/_app";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Flex from "@/components/shared/Flex";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { InformationIcon } from "@/assets/icon/icons";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/store/redux/hooks";
import { useForm } from "react-hook-form";
import { useAddSupermarketMutation } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import Router from "next/router";

const baseUrl = "https://backend.occupymart.com/api";

const Page: NextPageWithLayout = () => {
  const [estateList, setEstateList] = useState([]);
  const [loadingEstate, setLoadingEstate] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  const userID = useAppSelector((state) => state.auth.userID);
  const profileID = useAppSelector(
    (state: { auth: { profileID: string } }) => state.auth.profileID,
  );

  const userData = useAppSelector((state) => state.auth);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/estates/`);
        if (!response.ok) {
          throw new Error("Failed to fetch estates");
        }
        const data = await response.json();
        setEstateList(
          data.map((estate: { name: string; address: string; id: number }) => ({
            label: `${estate.name} - ${estate.address}`,
            value: `${estate.id}`,
          })),
        );
        toast.toast({
          title: "Success",
          description: "Estates loaded successfully!",
          variant: "default",
        });
      } catch (error) {
        console.error("Error fetching estates:", error);
        toast.toast({
          title: "Error",
          description: "Failed to fetch estates. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingEstate(false);
      }
    };

    fetchEstates();
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // If the number starts with 0, replace it with 234
    let formatted = cleaned.startsWith("0")
      ? `234${cleaned.slice(1)}`
      : cleaned.startsWith("234")
        ? cleaned
        : `234${cleaned}`;

    // Format for display
    return formatted.length > 3
      ? `+${formatted.slice(0, 3)} ${formatted.slice(3)}`
      : formatted;
  };

  // In your component
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phoneNumber", formatted);
  };

  const [addSupermarket] = useAddSupermarketMutation();
  const onSubmit = async (data: any) => {
    // Validate inspection date
    const inspectionDate = new Date(data.inspectionDate);
    if (isNaN(inspectionDate.getTime())) {
      toast.toast({
        title: "Error",
        description: "Please provide a valid inspection date.",
        variant: "destructive",
      });
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

    // Handle file upload separately
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // if (data.supermarketPhoto && data.supermarketPhoto[0]) {
    //   formData.append("supermarket_photo", data.supermarketPhoto[0]);
    // }
    if (data.supermarketPhoto && data.supermarketPhoto[0]) {
      formData.append("supermarket_photo", data.supermarketPhoto[0]);
    }

    try {
      setAddLoading(true);
      const result = await addSupermarket(formData);

      if (result.data) {
        localStorage.setItem("storeCreated", "true");
        toast.toast({
          title: "Success",
          description: "Supermarket added successfully",
          variant: "default",
        });
        Router.push("/dashboard"); // Redirect to dashboard after successful submission
      } else {
        toast.toast({
          title: "Error",
          description: "Failed to add supermarket",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding supermarket:", error);
      toast.toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
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
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              {/* <Input
                id="phoneNumber"
                placeholder="Enter phone number"
                {...register("phoneNumber", { required: true })}
              /> */}
              <Input
                id="phoneNumber"
                placeholder="Enter phone number"
                {...register("phoneNumber", {
                  required: true,
                  onChange: handlePhoneChange,
                })}
              />
            </div>

            <div>
              <label htmlFor="supermarketAddress">Supermarket Address</label>
              <Input
                id="supermarketAddress"
                placeholder="Enter supermarket address"
                {...register("supermarketAddress", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="supermarketPhoto">Supermarket Photo</label>
              {/* <Input
                {...register("photo")}
                placeholder="Upload Image"
                type="file"
              /> */}
              <Input
                id="supermarketPhoto"
                type="file"
                accept="image/*"
                {...register("supermarketPhoto", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="supermarketName">Supermarket Name</label>
              <Input
                id="supermarketName"
                placeholder="Enter supermarket name"
                {...register("supermarketName", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="supermarketLocation">Supermarket Location</label>
              <Select
                id="supermarketLocation"
                options={estateList}
                placeholder="Select supermarket location"
                onChange={(selectedOption: { value: string } | null) => {
                  setValue("supermarketLocation", selectedOption?.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="inspectionDate">Date of Inspection</label>
              <Input
                id="inspectionDate"
                type="date"
                placeholder="Select date of inspection"
                {...register("inspectionDate", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="salesName">Sales Name</label>
              <Input
                id="salesName"
                placeholder="Enter sales name"
                {...register("salesName", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="regNumber">Registration Number</label>
              <Input
                id="regNumber"
                placeholder="Enter registration number"
                {...register("regNumber", { required: true })}
              />
            </div>

            <div className="flex justify-center py-4">
              <Button type="submit" size="lg" disabled={addLoading}>
                {addLoading ? "Submitting..." : "Add Supermarket"}
              </Button>
            </div>
          </form>
        </div>
      </Flex>
    </div>
  );
};

export default Page;
