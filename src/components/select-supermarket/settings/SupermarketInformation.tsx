import MappedFormFields from "@/components/shared/MappedFormFields";
import { SupermarketInformationFields } from "@/data";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import ActionButtons from "./ActionButtons";

const SupermarketInformation = (form: UseFormReturn<any, any, undefined>) => {
  return (
    <div className="flex flex-col  items-center">
      <MappedFormFields
        form={form}
        formFieldValues={SupermarketInformationFields[0]}
      />
      <div className="grid w-full lg:grid-cols-2 gap-x-2">
        <MappedFormFields
          form={form}
          formFieldValues={SupermarketInformationFields[1]}
        />
      </div>
      <MappedFormFields
        form={form}
        formFieldValues={SupermarketInformationFields[2]}
      />
      <ActionButtons
        onClickPrimaryBtn={() => {}}
        onClickSecondaryBtn={() => {}}
        primaryBtnTitle="Save Update"
        secondaryBtnTitle="Cancel"
      />
    </div>
  );
};

export default SupermarketInformation;
