import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import DatePicker from "./form/DatePicker";
import SelectPicker from "./form/SelectPicker";
import TextInput from "./form/TextInput";
import { IFieldValue } from "@/types";

export const RenderFormType = ({
  field,
  fieldValue,
  form,
}: {
  field: ControllerRenderProps<any, any>;
  form: UseFormReturn<any, any, undefined>;
  fieldValue: IFieldValue;
}) => {
  switch (fieldValue.type) {
    case "text":
    case "password":
    case "number":
    case "email":
      return <TextInput form={form} field={field} fieldValue={fieldValue} />;
    case "select":
      return <SelectPicker field={field} fieldValue={fieldValue} />;
    case "date":
      return <DatePicker field={field} fieldValue={fieldValue} />;
    case "file":
      return <TextInput form={form} field={field} fieldValue={fieldValue} />;
  }
};
