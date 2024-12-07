// import CustomForm from "@/components/shared/CustomForm";
// import ActionButtons from "@/components/shared/form/ActionButtons";
// import {
//   withSteppedFormContextProvider,
//   useSteppedFormContext,
// } from "@/contexts/SteppedFormContext";
// import { AddStoreFormFields } from "@/data";
// import { AddStoreSchema } from "@/formValidation";
// import { NextPageWithLayout } from "@/pages/_app";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import Flex from "@/components/shared/Flex";
// import Select from "react-select";
// import { IFieldValue } from "@/types";
// import { Button } from "@/components/ui/button";
// import { PlusIcon } from "lucide-react";
// import { InformationIcon } from "@/assets/icon/icons";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import FormSteps from "@/components/dashboard/dashboard/FormSteps";
// import WorkTimeActivities from "@/components/dashboard/settings/WorkTimeActivities";
// import { daysOfWeek } from "@/constants";
// import {
//   useAddSupermarketMutation,
//   useGetEstatesQuery,
// } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
// import { useAppSelector } from "@/store/redux/hooks";
// import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
// // import "react-select/dist/react-select.css";

// const Page: NextPageWithLayout = () => {
//   const {
//     data: estateList,
//     isLoading: loadingEstate,
//     error: estatesError,
//     isSuccess: estateLoaded,
//   } = useGetEstatesQuery("");

//   const userID = useAppSelector((state) => state.auth.userID);
//   const profileID = useAppSelector((state) => state.auth.profileID);
//   const {
//     data: userData,
//     error,
//     // isLoading,
//   } = useGetSupermarketProfileQuery(userID, {
//     skip: userID ? false : true,
//   });

//   const [
//     addSupermarket,
//     {
//       isLoading: addLoading,
//       isError,
//       isSuccess: addSuccess,
//       data: addData,
//       error: addError,
//     },
//   ] = useAddSupermarketMutation();

//   console.log(addData, addError, "adddddddddddd");

//   let modifiedStoreFormFields: IFieldValue[] = [];

//   if (estateLoaded) {
//     const options: { label: string; value: string }[] = [];
//     estateList.forEach(
//       (element: { name: string; address: string; id: number }) => {
//         options.push({
//           label: `${element.name} - ${element.address}`,
//           value: `${element.id}`,
//         });
//       },
//     );

//     modifiedStoreFormFields = AddStoreFormFields.map((item) => {
//       if (item.name === "supermarketLocation") {
//         item.options = options;
//       }
//       return item;
//     });
//   }

//   const { savedFormValues, onSaveFormValues, currentStep, goNext } =
//     useSteppedFormContext();
//   const isFirstStep = currentStep === 1;
//   const [value, onChange] = useState("10:00");

//   console.log(savedFormValues, "savedFormValues");

//   const defaultStep2Fields = [
//     { label: "Days of Activities", name: "activityDays", options: daysOfWeek },
//     { label: "Opening Time", name: "openingTime" },
//     { label: "Closing Time", name: "closingTime" },
//   ];
//   const [step2FormField, setFormField] = useState<IFieldValue[][]>([
//     defaultStep2Fields,
//   ]);

//   const addNewField = () => {
//     if (step2FormField.length === 3) return;
//     else setFormField([...step2FormField, defaultStep2Fields]);
//   };

//   const stepState = [
//     {
//       title: "Supermarket Information",
//       desc: "Supermarket/Partners Information",
//       icon: InformationIcon,
//     },
//     {
//       title: "Work Time Activities",
//       desc: "You can set up the supermarket activity period",
//       icon: InformationIcon,
//     },
//   ];

//   return (
//     <div className="h-full rounded-md bg-white p-6">
//       <Flex className="h-full items-start gap-8">
//         <div className="hideScroll h-full grow overflow-auto rounded-md border border-dashed bg-white px-6 py-6">
//           <>
//             {isFirstStep ? (
//               <CustomForm
//                 FormSchema={AddStoreSchema}
//                 defaultValues={
//                   savedFormValues || {
//                     inspectionDate: "",
//                     phoneNumber: "",
//                     supermarketAddress: "",
//                     supermarketLocation: "",
//                     supermarketName: "",
//                   }
//                 }
//                 fields={
//                   !estateLoaded ? AddStoreFormFields : modifiedStoreFormFields
//                 }
//                 onSubmit={(data) => {
//                   onSaveFormValues(data);
//                   addSupermarket({
//                     contact_person_name: data.salesName,
//                     business_name: data.supermarketName,
//                     business_reg_number: data.regNumber,
//                     name: `${userData.first_name} ${userData.last_name}`,
//                     contact_person_email: data.email,
//                     contact_person_phone_number: data.phoneNumber,
//                     can_run_online_store: true,
//                     has_internet_access: true,
//                     alternate_power_supply: true,
//                     inspection_date: data.inspectionDate.toISOString(),
//                     is_online: true,
//                     supermarket_photo: "",
//                     estate: data.supermarketLocation,
//                     shop_owner: profileID,
//                   });
//                   if (addSuccess) {
//                     goNext();
//                   }
//                 }}
//               >
//                 <ActionButtons />
//               </CustomForm>
//             ) : (
//               <WorkTimeActivities
//                 addNewField={addNewField}
//                 step2FormField={step2FormField}
//               />
//             )}
//           </>
//         </div>
//         <FormSteps currentStep={currentStep} stepState={stepState} />
//       </Flex>
//     </div>
//   );
// };

// export default withSteppedFormContextProvider(Page);

import CustomForm from "@/components/shared/CustomForm";
import ActionButtons from "@/components/shared/form/ActionButtons";
import {
  withSteppedFormContextProvider,
  useSteppedFormContext,
} from "@/contexts/SteppedFormContext";
import { Calendar } from "@/components/ui/calendar";
import { AddStoreFormFields } from "@/data";
import { AddStoreSchema } from "@/formValidation";
import { NextPageWithLayout } from "@/pages/_app";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Flex from "@/components/shared/Flex";
import Select from "react-select";
import { IFieldValue } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { InformationIcon } from "@/assets/icon/icons";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import FormSteps from "@/components/dashboard/dashboard/FormSteps";
import WorkTimeActivities from "@/components/dashboard/settings/WorkTimeActivities";
import { daysOfWeek } from "@/constants";
import { useAppSelector } from "@/store/redux/hooks";
import { useForm } from "react-hook-form";

const baseUrl = "https://backend.occupymart.com/api";

const Page: NextPageWithLayout = () => {
  const [estateList, setEstateList] = useState([]);
  const [loadingEstate, setLoadingEstate] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const userID = useAppSelector((state) => state.auth.userID);
  const profileID = useAppSelector((state) => state.auth.profileID);

  // const toast = useToast();
  const { savedFormValues, onSaveFormValues, currentStep, goNext } =
    useSteppedFormContext();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: savedFormValues || {},
  });
  const isFirstStep = currentStep === 1;

  const [step2FormField, setFormField] = useState<IFieldValue[][]>([
    [
      {
        label: "Days of Activities",
        name: "activityDays",
        options: daysOfWeek,
      },
      { label: "Opening Time", name: "openingTime" },
      { label: "Closing Time", name: "closingTime" },
    ],
  ]);

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

  // // Fetch Estates
  // useEffect(() => {
  //   const fetchEstates = async () => {
  //     try {
  //       const response = await fetch(`${baseUrl}/admin/estates/`);
  //       const data = await response.json();
  //       setEstateList(
  //         data.map((estate: { name: string; address: string; id: number }) => ({
  //           label: `${estate.name} - ${estate.address}`,
  //           value: `${estate.id}`,
  //         })),
  //       );
  //       setLoadingEstate(false);
  //     } catch (error) {
  //       console.error("Error fetching estates:", error);
  //       setLoadingEstate(false);
  //     }
  //   };

  //   fetchEstates();
  // }, []);

  const addNewField = () => {
    if (step2FormField.length === 3) return;
    setFormField((prevFields) => [...prevFields, step2FormField[0]]);
  };

  // const submitForm = async (data: any) => {
  //   setAddLoading(true);
  //   try {
  //     const response = await fetch(`${baseUrl}/store/supermarket`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         contact_person_name: data.salesName,
  //         business_name: data.supermarketName,
  //         business_reg_number: data.regNumber,
  //         name: "string",
  //         contact_person_email: data.email,
  //         contact_person_phone_number: data.phoneNumber,
  //         can_run_online_store: true,
  //         has_internet_access: true,
  //         alternate_power_supply: true,
  //         inspection_date: data.inspectionDate.toISOString(),
  //         is_online: true,
  //         supermarket_photo: "",
  //         estate: data.supermarketLocation,
  //         shop_owner: profileID,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add supermarket");
  //     }

  //     const result = await response.json();
  //     console.log("Supermarket added:", result);
  //     setAddSuccess(true);
  //     goNext();
  //   } catch (error) {
  //     console.error("Error adding supermarket:", error);
  //     setAddSuccess(false);
  //   } finally {
  //     setAddLoading(false);
  //   }
  // };

  const toast = useToast();

  const submitForm = async (data: any) => {
    setAddLoading(true);
    try {
      // Ensure inspectionDate is a valid Date object
      const inspectionDate =
        data.inspectionDate instanceof Date
          ? data.inspectionDate
          : new Date(data.inspectionDate);

      if (isNaN(inspectionDate.getTime())) {
        throw new Error("Invalid date selected for inspection");
      }

      const payload = {
        contact_person_name: data.salesName,
        business_name: data.supermarketName,
        business_reg_number: data.regNumber,
        name: "string",
        contact_person_email: data.email,
        contact_person_phone_number: data.phoneNumber,
        can_run_online_store: true,
        has_internet_access: true,
        alternate_power_supply: true,
        inspection_date: inspectionDate.toISOString(), // Convert to ISO string
        is_online: true,
        supermarket_photo: "",
        estate: data.supermarketLocation,
        shop_owner: profileID,
      };

      const response = await fetch(`${baseUrl}/store/supermarket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add supermarket");
      }

      // if (!response.ok) {
      //   const errorDetails = await response.text(); // This will get the raw response body
      //   throw new Error(`Failed to add supermarket: ${errorDetails}`);
      // }

      const result = await response.json();
      console.log("Supermarket added:", result);

      // Show success toast and proceed to the next step
      toast.toast({
        title: "Success",
        description: "Supermarket added successfully!",
        variant: "default",
      });
      setAddSuccess(true);
      goNext();
    } catch (error: any) {
      console.error("Error adding supermarket:", error);

      // Show error toast with detailed message
      toast.toast({
        title: "Error",
        description:
          error.message || "Failed to add supermarket. Please try again.",
        variant: "destructive",
      });
      setAddSuccess(false);
    } finally {
      setAddLoading(false);
    }
  };

  // const submitForm = async (data: any) => {
  //   setAddLoading(true);
  //   try {
  //     const response = await fetch(`${baseUrl}/store/supermarket`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         contact_person_name: data.salesName,
  //         business_name: data.supermarketName,
  //         business_reg_number: data.regNumber,
  //         name: "string",
  //         contact_person_email: data.email,
  //         contact_person_phone_number: data.phoneNumber,
  //         can_run_online_store: true,
  //         has_internet_access: true,
  //         alternate_power_supply: true,
  //         inspection_date: data.inspectionDate.toISOString(),
  //         is_online: true,
  //         supermarket_photo: "",
  //         estate: data.supermarketLocation,
  //         shop_owner: profileID,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add supermarket");
  //     }

  //     const result = await response.json();
  //     console.log("Supermarket added:", result);
  //     setAddSuccess(true);
  //     goNext();
  //   } catch (error) {
  //     console.error("Error adding supermarket:", error);
  //     setAddSuccess(false);
  //     toast.toast({
  //       title: "Error",
  //       description: "Failed to add supermarket",
  //       variant: "destructive",
  //       duration: 5000,
  //     });
  //   } finally {
  //     setAddLoading(false);
  //   }
  // };

  const stepState = [
    {
      title: "Supermarket Information",
      desc: "Supermarket/Partners Information",
      icon: InformationIcon,
    },
    {
      title: "Work Time Activities",
      desc: "You can set up the supermarket activity period",
      icon: InformationIcon,
    },
  ];

  const modifiedStoreFormFields = AddStoreFormFields.map((item) => {
    if (item.name === "supermarketLocation") {
      item.options = estateList;
    }
    return item;
  });

  return (
    <div className="h-full rounded-md bg-white p-6">
      <Flex className="h-full items-start gap-8">
        <div className="hideScroll h-full grow overflow-auto rounded-md border border-dashed bg-white px-6 py-6">
          <>
            {isFirstStep ? (
              <form
                onSubmit={handleSubmit(submitForm)}
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
                  <Input
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    {...register("phoneNumber", { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="supermarketAddress">
                    Supermarket Address
                  </label>
                  <Input
                    id="supermarketAddress"
                    placeholder="Enter supermarket address"
                    {...register("supermarketAddress", { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="supermarketPhoto">Supermarket Photo</label>
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
                  <label htmlFor="supermarketLocation">
                    Supermarket Location
                  </label>
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

                {/* Repeat for other fields */}
                <div className="py-4">
                  <ActionButtons isLoading={addLoading} />
                </div>
              </form>
            ) : (
              <WorkTimeActivities
                addNewField={addNewField}
                step2FormField={step2FormField}
              />
            )}
          </>
        </div>
        <FormSteps currentStep={currentStep} stepState={stepState} />
      </Flex>
    </div>
  );
};

export default withSteppedFormContextProvider(Page);
