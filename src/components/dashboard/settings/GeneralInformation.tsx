import MappedFormFields from "@/components/shared/MappedFormFields";
import { GeneralInformationFields } from "@/data";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import ActionButtons from "./ActionButtons";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { Button } from "@/components/ui/button";

const GeneralInformation = (form: UseFormReturn<any, any, undefined>) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex gap-6 items-center">
        <CustomAvatar className="size-[60px]" alt="" src="" fallback="SM" />
        <Button className="px-4 rounded-full !py-[3px] text-black bg-[#F0EFFA]">
          Upload Photo
        </Button>
      </div>

      <div className="grid w-full lg:grid-cols-2 gap-x-2">
        <MappedFormFields
          form={form}
          formFieldValues={GeneralInformationFields}
        />
      </div>
      <ActionButtons
        onClickPrimaryBtn={() => {}}
        onClickSecondaryBtn={() => {}}
        primaryBtnTitle="Save Update"
        secondaryBtnTitle="Cancel"
      />
    </div>
  );
};

export default GeneralInformation;
