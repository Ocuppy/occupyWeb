import FormSteps from "@/components/dashboard/dashboard/FormSteps";
import Flex from "@/components/shared/Flex";
import React, { useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const stepState = [
    {
      title: "General Information",
      desc: "Profile Photo, Name and Location",
    },
    {
      title: "Supermarket Information",
      desc: "Supermarket/Partners Information",
    },
    {
      title: "Work Time Activities",
      desc: "You can set up the supermarket activity period",
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
  return (
    <div className="p-6 rounded-md h-full bg-white">
      <Flex className="items-start h-full gap-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore totam
          deserunt hic! Unde nisi fuga itaque nesciunt quae facere adipisci
          ducimus omnis quo natus a voluptate amet alias repellat dolorum
          expedita incidunt maiores nemo consequuntur nam, beatae recusandae
          temporibus officia? At labore numquam quos molestias ut perferendis
          nulla natus quaerat facilis molestiae tempore deserunt corporis beatae
          assumenda optio hic, quasi eveniet quae reprehenderit? Consequuntur
          quae nihil consequatur distinctio, quod tenetur veniam commodi
          quibusdam! Distinctio provident labore totam, eaque harum officia
          libero ipsam voluptatibus sapiente dolor facilis a sequi quos corrupti
          omnis consequatur eligendi magnam minus dolorum, ex veritatis. Vel,
          aliquam?
        </p>
        <FormSteps
          onClickElement={(val) => setCurrentStep(val)}
          currentStep={currentStep}
          stepState={stepState}
        />
      </Flex>
    </div>
  );
};

export default Index;
