import { FormControl, FormLabel } from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { IFieldValue } from "@/types";

const DatePicker = ({
  field,
  fieldValue,
}: {
  field: ControllerRenderProps<any, any>;
  fieldValue: IFieldValue;
}) => {
  return (
    <>
      <FormLabel>{fieldValue.label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            {/* <p>{fieldValue.label}</p> */}
            <Button
              variant={"outline"}
              className={cn(
                "pl-3 text-left font-normal w-full",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>{fieldValue.placeholder || "Pick a date"}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
