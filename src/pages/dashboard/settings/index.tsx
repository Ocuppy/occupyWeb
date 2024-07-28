import FormSteps from "@/components/dashboard/dashboard/FormSteps";
import BillingForm from "@/components/dashboard/settings/BillingForm";
import ContactCenter from "@/components/dashboard/settings/ContactCenter";
import GeneralInformation from "@/components/dashboard/settings/GeneralInformation";
import NotificationSettings from "@/components/dashboard/settings/NotificationSettings";
import SecurityForm from "@/components/dashboard/settings/SecurityForm";
import SupermarketInformation from "@/components/dashboard/settings/SupermarketInformation";
import WorkTimeActivities from "@/components/dashboard/settings/WorkTimeActivities";
import Flex from "@/components/shared/Flex";
import { Form } from "@/components/ui/form";
import { daysOfWeek } from "@/constants";
import { withSteppedFormContextProvider } from "@/contexts/SteppedFormContext";
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
      component: <SupermarketInformation {...form} />,
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
      component: <SecurityForm {...form} />,
    },
    {
      title: "Billing",
      desc: "Setup Payment Methods",
      component: <BillingForm {...form} />,
    },
    {
      title: "Notification",
      desc: "Set your email notification",
      component: <NotificationSettings />,
    },
    {
      title: "Contact Center",
      desc: "Help and Raise Ticket",
      component: <ContactCenter />,
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
    <div className="h-full rounded-md bg-white p-6">
      <Flex className="h-full items-start gap-8">
        <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="mx-auto max-w-[600px]">
                {stepState[currentStep - 1]?.component}
              </div>
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
