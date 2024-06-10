import MappedFormFields from "@/components/shared/MappedFormFields";
import ActionButtons from "./ActionButtons";
import { UseFormReturn } from "react-hook-form";
import { BillingInformationFields } from "@/data";

const BillingForm = (form: UseFormReturn<any, any, undefined>) => {
  return (
    <div className="flex flex-col  items-center">
      <MappedFormFields
        form={form}
        formFieldValues={BillingInformationFields}
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

export default BillingForm;
