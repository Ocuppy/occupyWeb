import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon, WandSparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 bg-[#DEDEFA] text-occupy-primary hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "border-foreground/10 drop-shadow-md text-occupy-primary bg-[#DEDEFA]  ",
        secondary: "border-foreground/10 bg-[#DEDEFA] text-occupy-primary",
        destructive: "border-transparent bg-destructive text-occupy-primary ",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  asChild?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select a tag",
      animation = 0,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      if (defaultValue.length > 0) {
        setSelectedValues(defaultValue);
      }
    }, [defaultValue]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md border min-h-10 h-auto items-center text-slate-500 justify-between bg-[#F9F9FC]",
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(
                          isAnimating
                            ? "animate-bounce hover:bg-[#DEDEFA] text-occupy-primary"
                            : "",
                          multiSelectVariants({ variant, className })
                        )}
                        style={{
                          animationDuration: `${animation}s`,
                        }}
                      >
                        {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                        {option?.label}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full text-slate-500"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-slate-500" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-slate-500 mx-3">{placeholder}</span>
                <ChevronDown className="h-4 cursor-pointer text-slate-500 mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 drop-shadow-sm"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className={cn(
                        "cursor-pointer hover:bg-slate-100",
                        isSelected ? "bg-slate-100" : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm",
                          isSelected ? "" : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        style={{
                          pointerEvents: "auto",
                          opacity: 1,
                        }}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <Separator orientation="vertical" className="flex min-h-6 h-full" />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{
                      pointerEvents: "auto",
                      opacity: 1,
                    }}
                    className="flex-1 justify-center cursor-pointer"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "cursor-pointer my-2 text-occupy-primary  w-3 h-3",
              isAnimating ? "" : "text-muted-foreground"
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
