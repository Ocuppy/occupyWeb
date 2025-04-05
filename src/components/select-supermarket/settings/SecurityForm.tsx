import { UseFormReturn } from "react-hook-form";
import ActionButtons from "./ActionButtons";
import MappedFormFields from "@/components/shared/MappedFormFields";
import { SecurityFormFields } from "@/data";

const SecurityForm = (form: UseFormReturn<any, any, undefined>) => {

  
  return (
    <div className="flex flex-col  items-center">
      <MappedFormFields form={form} formFieldValues={SecurityFormFields} />
      <ActionButtons
        onClickPrimaryBtn={() => {}}
        onClickSecondaryBtn={() => {}}
        primaryBtnTitle="Save Update"
        secondaryBtnTitle="Cancel"
      />
    </div>
  );
};

export default SecurityForm;
