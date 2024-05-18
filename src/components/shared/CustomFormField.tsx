import { HTMLInputTypeAttribute, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

const CustomFormField = ({
  form,
  fieldValue,
}: {
  form: UseFormReturn<any, any, undefined>;
  fieldValue: {
    label: string;
    placeholder?: string;
    name: string;
    type?: HTMLInputTypeAttribute | undefined;
  };
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleHiddenState = () => setShowPassword(!showPassword);
  const fieldType = () => {
    if (fieldValue.type === "password") {
      if (showPassword) return "text";
      else return "password";
    }
    return fieldValue.type;
  };
  return (
    <FormField
      control={form.control}
      name={fieldValue.name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldValue.label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                error={form.formState.errors[fieldValue.name]}
                type={fieldType()}
                placeholder={fieldValue.placeholder || ""}
                {...field}
                className={`${fieldType() === "password" ? "pr-12" : ""}`}
              />
              {fieldValue.type === "password" && (
                <span
                  onClick={toggleHiddenState}
                  className="absolute cursor-pointer right-4 top-[50%] translate-y-[-50%]"
                >
                  <EyeIcon />
                </span>
              )}
            </div>
          </FormControl>

          <div className="h-[36px]">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
