import React from "react";

// <FormField
// control={form.control}
// name="photo"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>Photo</FormLabel>
//     <FormControl className="rounded-lg border-4 border-dashed bg-[#F9F9FC] p-6">
//       <div className="flex flex-col items-center justify-center gap-3">
//         <div className="rounded-full bg-[#DEDEFA] p-2">
//           {/* <Image src="" alt="" className="text-occupy-primary" /> */}
//         </div>
//         <span className="text-sm font-normal text-[#858D9D]">
//           Drag and drop image here, or click add image
//         </span>
//         <Button className="bg-[#DEDEFA] font-semibold text-occupy-primary">
//           Add Image
//         </Button>
//       </div>
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />

const FileUpload = () => {
  return <div>FileUpload</div>;
};

export default FileUpload;

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
