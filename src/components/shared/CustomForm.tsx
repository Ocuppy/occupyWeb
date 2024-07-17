import { ReactNode, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "./CustomFormField";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFieldValue } from "@/types";
import { Form } from "../ui/form";

export interface FormProps<TSchema extends ZodType<any, any>> {
  fields: Array<IFieldValue>;
  FormSchema: TSchema;
  defaultValues: z.infer<TSchema>;
  onSubmit(data: z.infer<TSchema>): void;
  children?: ReactNode;
}

const CustomForm = <TSchema extends ZodType<any, any>>(
  props: FormProps<TSchema>
) => {
  const { fields, defaultValues, FormSchema, children, onSubmit } = props;

  const formInstance = useForm<z.infer<TSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });
  const { handleSubmit, reset } = formInstance;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Form {...formInstance}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <CustomFormField fieldValue={field} form={formInstance} key={index} />
        ))}
        {children}
      </form>
    </Form>
  );
};

export default CustomForm;
