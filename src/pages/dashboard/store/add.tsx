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
// import "react-select/dist/react-select.css";

const Page: NextPageWithLayout = () => {
  const { savedFormValues, onSaveFormValues, currentStep, goNext } =
    useSteppedFormContext();
  const isFirstStep = currentStep === 1;
  const [value, onChange] = useState("10:00");

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
    },
    {
      title: "Work Time Activities",
      desc: "You can set up the supermarket activity period",
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
                    phoneNumber: null,
                    supermarketAddress: "",
                    supermarketLocation: "",
                    supermarketName: "",
                  }
                }
                fields={AddStoreFormFields}
                onSubmit={(data) => {
                  console.log("data", data);
                  onSaveFormValues(data);
                  goNext();
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
