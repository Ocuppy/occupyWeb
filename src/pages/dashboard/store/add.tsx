import CustomForm from "@/components/shared/CustomForm";
import ActionButtons from "@/components/shared/form/ActionButtons";
import {
  withSteppedFormContextProvider,
  useSteppedFormContext,
} from "@/contexts/SteppedFormContext";
import { AddStoreFormFields } from "@/data";
import { AddStoreSchema } from "@/formValidation";
import { NextPageWithLayout } from "@/pages/_app";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Flex from "@/components/shared/Flex";
import Select from "react-select";
import { IFieldValue } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { InformationIcon } from "@/assets/icon/icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import FormSteps from "@/components/dashboard/dashboard/FormSteps";
import WorkTimeActivities from "@/components/dashboard/settings/WorkTimeActivities";
import { daysOfWeek } from "@/constants";
import {
  useAddSupermarketMutation,
  useGetEstatesQuery,
} from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { useAppSelector } from "@/store/redux/hooks";
import { useGetSupermarketProfileQuery } from "@/store/redux/services/profileSlice/profileApiSlice";
// import "react-select/dist/react-select.css";

const Page: NextPageWithLayout = () => {
  const {
    data: estateList,
    isLoading: loadingEstate,
    error: estatesError,
    isSuccess: estateLoaded,
  } = useGetEstatesQuery("");

  const userID = useAppSelector((state) => state.auth.userID);
  const profileID = useAppSelector((state) => state.auth.profileID);
  const {
    data: userData,
    error,
    // isLoading,
  } = useGetSupermarketProfileQuery(userID, {
    skip: userID ? false : true,
  });

  const [
    addSupermarket,
    {
      isLoading: addLoading,
      isError,
      isSuccess: addSuccess,
      data: addData,
      error: addError,
    },
  ] = useAddSupermarketMutation();

  console.log(addData, addError, "adddddddddddd");

  let modifiedStoreFormFields: IFieldValue[] = [];

  if (estateLoaded) {
    const options: { label: string; value: string }[] = [];
    estateList.forEach(
      (element: { name: string; address: string; id: number }) => {
        options.push({
          label: `${element.name} - ${element.address}`,
          value: `${element.id}`,
        });
      },
    );

    modifiedStoreFormFields = AddStoreFormFields.map((item) => {
      if (item.name === "supermarketLocation") {
        item.options = options;
      }
      return item;
    });
  }

  const { savedFormValues, onSaveFormValues, currentStep, goNext } =
    useSteppedFormContext();
  const isFirstStep = currentStep === 1;
  const [value, onChange] = useState("10:00");

  console.log(savedFormValues, "savedFormValues");

  const defaultStep2Fields = [
    { label: "Days of Activities", name: "activityDays", options: daysOfWeek },
    { label: "Opening Time", name: "openingTime" },
    { label: "Closing Time", name: "closingTime" },
  ];
  const [step2FormField, setFormField] = useState<IFieldValue[][]>([
    defaultStep2Fields,
  ]);

  const addNewField = () => {
    if (step2FormField.length === 3) return;
    else setFormField([...step2FormField, defaultStep2Fields]);
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

  return (
    <div className="h-full rounded-md bg-white p-6">
      <Flex className="h-full items-start gap-8">
        <div className="hideScroll h-full grow overflow-auto rounded-md border border-dashed bg-white px-6 py-6">
          <>
            {isFirstStep ? (
              <CustomForm
                FormSchema={AddStoreSchema}
                defaultValues={
                  savedFormValues || {
                    inspectionDate: "",
                    phoneNumber: "",
                    supermarketAddress: "",
                    supermarketLocation: "",
                    supermarketName: "",
                  }
                }
                fields={
                  !estateLoaded ? AddStoreFormFields : modifiedStoreFormFields
                }
                onSubmit={(data) => {
                  onSaveFormValues(data);
                  addSupermarket({
                    contact_person_name: data.salesName,
                    business_name: data.supermarketName,
                    business_reg_number: data.regNumber,
                    name: `${userData.first_name} ${userData.last_name}`,
                    contact_person_email: data.email,
                    contact_person_phone_number: data.phoneNumber,
                    can_run_online_store: true,
                    has_internet_access: true,
                    alternate_power_supply: true,
                    inspection_date: data.inspectionDate.toISOString(),
                    is_online: true,
                    supermarket_photo: "",
                    estate: data.supermarketLocation,
                    shop_owner: profileID,
                  });
                  if (addSuccess) {
                    goNext();
                  }
                }}
              >
                <ActionButtons />
              </CustomForm>
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
