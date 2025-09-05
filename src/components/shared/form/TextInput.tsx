import { useState } from "react";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { IFieldValue } from "@/types";

const TextInput = ({
  field,
  fieldValue,
  form,
}: {
  field: ControllerRenderProps<any, any>;
  fieldValue: IFieldValue;
  form: UseFormReturn<any, any, undefined>;
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
    <>
      <FormLabel>{fieldValue.label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            error={form.formState.errors[fieldValue.name]}
            type={fieldType()}
            placeholder={fieldValue.placeholder || ""}
            {...field}
            className={`${fieldType() === "password" ? "pr-12" : ""} w-full`}
          />
          {fieldValue.type === "password" && (
            <span
              onClick={toggleHiddenState}
              className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
            >
              <EyeIcon />
            </span>
          )}
        </div>
      </FormControl>
    </>
  );
};

export default TextInput;
