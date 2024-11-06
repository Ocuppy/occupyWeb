import React from "react";
import Flex from "../Flex";
import { Button } from "@/components/ui/button";
import { useSteppedFormContext } from "@/contexts/SteppedFormContext";
import Router from "next/router";

const ActionButtons = () => {
  const { currentStep, goBack } = useSteppedFormContext();
  const isFirstStep = currentStep === 1;
  return (
    <div className="flex w-full justify-center">
      <Flex>
        <Button type="submit">{isFirstStep ? "Submit" : "Submit"}</Button>
        <Button
          onClick={() => {
            if (isFirstStep) {
              Router.push("/dashboard");
            } else {
              goBack();
            }
          }}
          type="button"
          variant={"outline"}
        >
          {isFirstStep ? "Cancel" : "Back"}
        </Button>
      </Flex>
    </div>
  );
};

export default ActionButtons;
