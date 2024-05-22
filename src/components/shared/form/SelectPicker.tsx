import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFieldValue } from "@/types";
const SelectPicker = ({
  field,
  fieldValue,
}: {
  field: ControllerRenderProps<any, any>;
  fieldValue: IFieldValue;
}) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={fieldValue.placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {fieldValue.options?.map(({ label, value }, idx) => (
          <SelectItem key={idx} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectPicker;
