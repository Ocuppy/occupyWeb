import { useState } from "react";

const useSteps = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const goBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const goNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const isFirstStep = currentStep === 1;

  return {
    currentStep,
    goBack,
    goNext,
    isFirstStep,
  };
};

export default useSteps;
