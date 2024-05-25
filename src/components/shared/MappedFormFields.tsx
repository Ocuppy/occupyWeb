import CustomFormField from "./CustomFormField";
import { UseFormReturn } from "react-hook-form";
import { IFieldValue } from "@/types";

const MappedFormFields = ({
  formFieldValues,
  form,
}: {
  readonly formFieldValues: IFieldValue[];
  form: UseFormReturn<any, any, undefined>;
}) => {
  return (
    <>
      {formFieldValues.map((field, index) => (
        <CustomFormField key={index} fieldValue={field} form={form} />
      ))}
    </>
  );
};

export default MappedFormFields;
