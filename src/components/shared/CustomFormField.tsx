import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { IFieldValue } from "@/types";
import { RenderFormType } from "./RenderFormType";

const CustomFormField = ({
  form,
  fieldValue,
}: {
  form: UseFormReturn<any, any, undefined>;
  fieldValue: IFieldValue;
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldValue.name as any}
      render={({ field }) => (
        <FormItem className="w-full">
          <RenderFormType field={field} fieldValue={fieldValue} form={form} />

          <div className="h-[21px]">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
