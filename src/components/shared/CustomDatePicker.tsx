import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Flex from "./Flex";
import { Matcher } from "react-day-picker";

export function CustomDatePicker({
  children,
  onSelectDate,
  disabled,
}: {
  children: React.ReactNode;
  onSelectDate: (val: Date | undefined) => void;
  disabled?: Matcher | Matcher[] | undefined;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger>
        <Flex className="">
          {children}
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left text-black-900 border-grey-500 font-medium w-full",
              !date && "text-grey-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>dd-mm-yyyy</span>}
          </Button>
        </Flex>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          today={date}
          onSelect={(val) => {
            setDate(val);
            onSelectDate(val);
          }}
          disabled={disabled}
          initialFocus
          captionLayout="dropdown-buttons"
        />
      </PopoverContent>
    </Popover>
  );
}
