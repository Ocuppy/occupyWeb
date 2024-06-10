import { addSpaceRemoveUnderscore, cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CustomDropdownIcon } from "./Icons";

const CustomSelect = ({
  selectValue,
  options,
  onChangeValue,
  selectTriggerClassName,
}: {
  selectValue: string;
  options: any[];
  onChangeValue: (val: string) => void;
  selectTriggerClassName?: string;
}) => {
  return (
    <Select onValueChange={onChangeValue} value={selectValue}>
      <SelectTrigger
        className={cn("border-none ", selectTriggerClassName)}
        Icon={CustomDropdownIcon}
      >
        <SelectValue className="capitalize" placeholder={selectValue} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((value, idx) => (
          <SelectItem key={idx} value={value}>
            {addSpaceRemoveUnderscore(value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
