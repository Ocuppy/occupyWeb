import FormSteps from "@/components/dashboard/dashboard/FormSteps";
import GeneralInformation from "@/components/dashboard/settings/GeneralInformation";
import WorkTimeActivities from "@/components/dashboard/settings/WorkTimeActivities";
import Flex from "@/components/shared/Flex";
import { Form } from "@/components/ui/form";
import { daysOfWeek } from "@/constants";
import { withSteppedFormContextProvider } from "@/context/SteppedFormContext";
import { IFieldValue } from "@/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Index = () => {
  const form = useForm<any>({
    // resolver: zodResolver(schemas[activetab]),
    defaultValues: {},
  });
  const [currentStep, setCurrentStep] = useState(1);
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
      title: "General Information",
      desc: "Profile Photo, Name and Location",
      component: <GeneralInformation {...form} />,
    },
    {
      title: "Supermarket Information",
      desc: "Supermarket/Partners Information",
    },
    {
      title: "Work Time Activities",
      desc: "You can set up the supermarket activity period",
      component: (
        <WorkTimeActivities
          addNewField={addNewField}
          step2FormField={step2FormField}
        />
      ),
    },
    {
      title: "Security",
      desc: "Password & Security questions",
    },
    {
      title: "Billing",
      desc: "Setup Payment Methods",
    },
    {
      title: "Notification",
      desc: "Set your email notification",
    },
    {
      title: "Contact Center",
      desc: "Help and Raise Ticket",
    },
    {
      title: "Deactivate Account",
      desc: "Hide & disable current account",
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="p-6 rounded-md h-full bg-white">
      <Flex className="items-start h-full gap-8">
        <div className="border w-full h-full border-dashed rounded-md p-6 flex justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div>{stepState[currentStep - 1]?.component}</div>
            </form>
          </Form>
        </div>
        <FormSteps
          onClickElement={(val) => setCurrentStep(val)}
          currentStep={currentStep}
          stepState={stepState}
        />
      </Flex>
    </div>
  );
};

export default withSteppedFormContextProvider(Index);
