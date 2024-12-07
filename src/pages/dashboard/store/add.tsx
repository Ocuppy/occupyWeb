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
import { useAddSupermarketMutation } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";

const baseUrl = "https://backend.occupymart.com/api";

const Page: NextPageWithLayout = () => {
  const [estateList, setEstateList] = useState([]);
  const [loadingEstate, setLoadingEstate] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const userID = useAppSelector((state) => state.auth.userID);
  const profileID = useAppSelector(
    (state: { auth: { profileID: string } }) => state.auth.profileID,
  );

  const userData = useAppSelector((state) => state.auth);

  // const toast = useToast();
  const { savedFormValues, onSaveFormValues, currentStep, goNext } =
    useSteppedFormContext();

  // const { register, handleSubmit, setValue, watch } = useForm({
  //   defaultValues: savedFormValues || {},
  // });
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

  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: savedFormValues || {},
  });

  const inspectionDateRaw = watch("inspectionDate");
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

    // const phoneRegex = /^(\+?234|0)?[7][0-9]{8}$/; // Example for Kenyan phone numbers

    // if (!phoneRegex.test(data.phoneNumber)) {
    //   toast.toast({
    //     title: "Error",
    //     description:
    //       "Please enter a valid phone number (e.g., +234712345678 or 0712345678)",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // // Normalize phone number
    // let normalizedPhoneNumber = data.phoneNumber;

    // // If it doesn't start with +254, add the country code
    // if (!normalizedPhoneNumber.startsWith("+254")) {
    //   // Remove any leading 0 and prepend +254
    //   normalizedPhoneNumber = "+254" + normalizedPhoneNumber.replace(/^0/, "");
    // }

    // Prepare payload
    const payload = {
      contact_person_name: data.salesName,
      business_name: data.supermarketName,
      business_reg_number: data.regNumber,

      name: userData.userID,
      contact_person_email: data.email,
      contact_person_phone_number: data.phoneNumber,
      // contact_person_phone_number: normalizedPhoneNumber,
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

    if (data.supermarketPhoto && data.supermarketPhoto[0]) {
      formData.append("supermarket_photo", data.supermarketPhoto[0]);
    }

    try {
      setAddLoading(true);
      const result = await addSupermarket(formData);

      if (result.data) {
        toast.toast({
          title: "Success",
          description: "Supermarket added successfully",
          variant: "default",
        });
        setAddSuccess(true);
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
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data" // Ensure correct encoding type for file uploads
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

                <div className="py-4">
                  <ActionButtons isLoading={addLoading} />
                </div>
              </form>
            ) : (
              // <form
              //   onSubmit={handleSubmit(onSubmit)}
              //   className="flex flex-col gap-5"
              // >
              //   <div>
              //     <label htmlFor="email">Email</label>
              //     <Input
              //       id="email"
              //       placeholder="Enter email"
              //       {...register("email", { required: true })}
              //     />
              //   </div>
              //   <div>
              //     <label htmlFor="phoneNumber">Phone Number</label>
              //     <Input
              //       id="phoneNumber"
              //       placeholder="Enter phone number"
              //       {...register("phoneNumber", { required: true })}
              //     />
              //   </div>
              //   <div>
              //     <label htmlFor="supermarketAddress">
              //       Supermarket Address
              //     </label>
              //     <Input
              //       id="supermarketAddress"
              //       placeholder="Enter supermarket address"
              //       {...register("supermarketAddress", { required: true })}
              //     />
              //   </div>
              //   <div>
              //     <label htmlFor="supermarketPhoto">Supermarket Photo</label>
              //     <Input
              //       id="supermarketPhoto"
              //       type="file"
              //       accept="image/*"
              //       {...register("supermarketPhoto", { required: true })}
              //     />
              //   </div>
              //   <div>
              //     <label htmlFor="supermarketName">Supermarket Name</label>
              //     <Input
              //       id="supermarketName"
              //       placeholder="Enter supermarket name"
              //       {...register("supermarketName", { required: true })}
              //     />
              //   </div>
              //   <div>
              //     <label htmlFor="supermarketLocation">
              //       Supermarket Location
              //     </label>
              //     <Select
              //       id="supermarketLocation"
              //       options={estateList}
              //       placeholder="Select supermarket location"
              //       onChange={(selectedOption: { value: string } | null) => {
              //         setValue("supermarketLocation", selectedOption?.value);
              //       }}
              //     />
              //   </div>
              //   <div>
              //     <label htmlFor="inspectionDate">Date of Inspection</label>
              //     {/* <Input
              //       id="inspectionDate"
              //       type="date"
              //       placeholder="Select date of inspection"
              //       {...register("inspectionDate", { required: true })}
              //     /> */}
              //     <Input
              //       id="inspectionDate"
              //       type="date" // Ensure type is "date"
              //       placeholder="Select date of inspection"
              //       {...register("inspectionDate", { required: true })}
              //     />
              //     ``
              //   </div>
              //   <div>
              //     <label htmlFor="salesName">Sales Name</label>
              //     <Input
              //       id="salesName"
              //       placeholder="Enter sales name"
              //       {...register("salesName", { required: true })}
              //     />
              //   </div>
              //   <div>
              //     <label htmlFor="regNumber">Registration Number</label>
              //     <Input
              //       id="regNumber"
              //       placeholder="Enter registration number"
              //       {...register("regNumber", { required: true })}
              //     />
              //   </div>

              //   {/* Repeat for other fields */}
              //   <div className="py-4">
              //     <ActionButtons isLoading={addLoading} />
              //   </div>
              // </form>
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
