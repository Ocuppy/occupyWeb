import { useMemo, useState } from "react";
import Form from "./CustomForm";
import { IFieldValue } from "@/types";

export interface SteppedFormStepProps {
  id: string;
  fields: IFieldValue[];
}

export interface SteppedFormProps {
  steps: SteppedFormStepProps[];
  defaultValues: Record<string, any>;
  onSubmit(values: Record<string, any>): void;
}

const SteppedForm: React.FC<Readonly<SteppedFormProps>> = (props) => {
  const { steps, defaultValues, onSubmit } = props;
  const [values, setValues] = useState<Record<string, any>>({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = useMemo(
    () => steps[activeStepIndex],
    [activeStepIndex, steps]
  );
  const isLastStep = useMemo(
    () => activeStepIndex === steps.length - 1,
    [activeStepIndex, steps.length]
  );

  const goNextStep = () => {
    setActiveStepIndex((index) => (index += 1));
  };

  const goPrevStep = () => {
    setActiveStepIndex((index) => (index -= 1));
  };

  const handleNextStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);

    if (isLastStep) {
      onSubmit(newValues);
    } else {
      goNextStep();
    }
  };

  const handleBackStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);
    goPrevStep();
  };

  if (!activeStep) {
    return null;
  }

  return (
    <div>
      <Form
        FormSchema={{} as any}
        key={activeStep.id}
        fields={activeStep.fields}
        defaultValues={{ ...defaultValues, ...values }}
        // showBackButton={!!activeStepIndex}
        onSubmit={handleNextStep}
        // onBack={handleBackStep}
      />
    </div>
  );
};

export default SteppedForm;
