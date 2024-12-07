import React from "react";
import Flex from "../Flex";
import { Button } from "@/components/ui/button";
import { useSteppedFormContext } from "@/contexts/SteppedFormContext";
import Router from "next/router";
import clsx from "clsx";

interface ActionButtonsProps {
  isLoading: boolean;
}

interface ActionButtonsProps {
  isLoading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isLoading }) => {
  const { currentStep, goBack } = useSteppedFormContext();
  const isFirstStep = currentStep === 1;
  return (
    <div className="flex w-full justify-center">
      <Flex>
        {/* <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : isFirstStep ? "Proceed" : "Submit"}
        </Button>
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
          disabled={isLoading}
        >
          {isFirstStep ? "Cancel" : "Back"}
        </Button> */}

        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? "submitting" : isFirstStep ? "Proceed" : "Submit"}
        </Button>
        <Button
          onClick={() => {
            if (isFirstStep) {
              Router.push("/dashboard");
            } else {
              goBack();
            }
          }}
          type="button"
          variant="outline"
          size="lg"
          disabled={isLoading}
        >
          {isFirstStep ? "Cancel" : "Back"}
        </Button>
      </Flex>
    </div>
  );
};

export default ActionButtons;
