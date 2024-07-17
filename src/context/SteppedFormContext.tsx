import React, { createContext, useContext, useState } from "react";

interface SteppedFormContextType {
  savedFormValues: any;
  goBack: () => void;
  goNext: () => void;
  currentStep: number;
  onSaveFormValues: (data: any) => void;
}

const SteppedFormContext = createContext<SteppedFormContextType | null>(null);

const SteppedFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedFormValues, setSavedFormValues] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const goBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const goNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const onSaveFormValues = (data: any) => {
    setSavedFormValues({ ...savedFormValues, ...data });
  };

  return (
    <SteppedFormContext.Provider
      value={{
        savedFormValues,
        goBack,
        goNext,
        currentStep,
        onSaveFormValues,
      }}
    >
      {children}
    </SteppedFormContext.Provider>
  );
};

export const useSteppedFormContext = () => {
  const context = useContext(SteppedFormContext);
  if (context === null) {
    throw new Error(
      "useSteppedFormContext must be used within a SteppedFormProvider"
    );
  }
  return context;
};

export function withSteppedFormContextProvider<T extends {}>(
  Component: React.ComponentType<T>
) {
  return function WithSteppedFormContextProvider(props: T) {
    return (
      <SteppedFormProvider>
        <Component {...props} />
      </SteppedFormProvider>
    );
  };
}
