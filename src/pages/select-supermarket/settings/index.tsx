import FormSteps from "@/components/select-supermarket/select-supermarket/FormSteps";
import BillingForm from "@/components/select-supermarket/settings/BillingForm";
import ContactCenter from "@/components/select-supermarket/settings/ContactCenter";
import GeneralInformation from "@/components/select-supermarket/settings/GeneralInformation";
import NotificationSettings from "@/components/select-supermarket/settings/NotificationSettings";
import SecurityForm from "@/components/select-supermarket/settings/SecurityForm";
import SupermarketInformation from "@/components/select-supermarket/settings/SupermarketInformation";
import WorkTimeActivities from "@/components/select-supermarket/settings/WorkTimeActivities";
import Flex from "@/components/shared/Flex";
import { Form } from "@/components/ui/form";
import { daysOfWeek } from "@/constants";
import { withSteppedFormContextProvider } from "@/contexts/SteppedFormContext";
import { IFieldValue } from "@/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InformationIcon } from "@/assets/icon/icons";
import {
  UserIcon,
  BillingIcon,
  DeactivateIcon,
  SecurityIcon,
  NotificationIcon,
  ContactIcon,
} from "@/assets/icon/settingsIcon";

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
      icon: UserIcon,
    },
    {
      title: "Supermarket Information",
      desc: "Supermarket/Partners Information",
      component: <SupermarketInformation {...form} />,
      icon: InformationIcon,
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
      icon: InformationIcon,
    },
    {
      title: "Security",
      desc: "Password & Security questions",
      component: <SecurityForm {...form} />,
      icon: SecurityIcon,
    },
    {
      title: "Billing",
      desc: "Setup Payment Methods",
      component: <BillingForm {...form} />,
      icon: BillingIcon,
    },
    {
      title: "Notification",
      desc: "Set your email notification",
      component: <NotificationSettings />,
      icon: NotificationIcon,
    },
    {
      title: "Contact Center",
      desc: "Help and Raise Ticket",
      component: <ContactCenter />,
      icon: ContactIcon,
    },
    {
      title: "Deactivate Account",
      desc: "Hide & disable current account",
      icon: DeactivateIcon,
    },
  ];

  const onSubmit = (data: any) => {
    // console.log(data);
  };
  return (
    <div className="h-full rounded-md bg-white p-6">
      <Flex className="h-full items-center gap-8 sm:items-start">
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
