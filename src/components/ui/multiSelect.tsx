// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Command, CommandItem, CommandEmpty, CommandList } from "@/components/ui/command";
// import { cn } from "@/lib/utils";
// import { Command as CommandPrimitive } from "cmdk";
// import { X as RemoveIcon, Check } from "lucide-react";
// import React, {
//   KeyboardEvent,
//   createContext,
//   forwardRef,
//   useCallback,
//   useContext,
//   useState,
// } from "react";

// type MultiSelectorProps = {
//   values: string[];
//   onValuesChange: (value: string[]) => void;
//   loop?: boolean;
// } & React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

// interface MultiSelectContextProps {
//   value: string[];
//   onValueChange: (value: any) => void;
//   open: boolean;
//   setOpen: (value: boolean) => void;
//   inputValue: string;
//   setInputValue: React.Dispatch<React.SetStateAction<string>>;
//   activeIndex: number;
//   setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
// }

// const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

// const useMultiSelect = () => {
//   const context = useContext(MultiSelectContext);
//   if (!context) {
//     throw new Error("useMultiSelect must be used within MultiSelectProvider");
//   }
//   return context;
// };

// const MultiSelector = ({
//   values: value,
//   onValuesChange: onValueChange,
//   loop = false,
//   className,
//   children,
//   dir,
//   ...props
// }: MultiSelectorProps) => {
//   const [inputValue, setInputValue] = useState("");
//   const [open, setOpen] = useState<boolean>(false);
//   const [activeIndex, setActiveIndex] = useState<number>(-1);

//   const onValueChangeHandler = useCallback(
//     (val: string) => {
//       if (value.includes(val)) {
//         onValueChange(value.filter((item) => item !== val));
//       } else {
//         onValueChange([...value, val]);
//       }
//     },
//     [value]
//   );

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent<HTMLDivElement>) => {
//       const moveNext = () => {
//         const nextIndex = activeIndex + 1;
//         setActiveIndex(nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex);
//       };

//       const movePrev = () => {
//         const prevIndex = activeIndex - 1;
//         setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
//       };

//       if ((e.key === "Backspace" || e.key === "Delete") && value.length > 0) {
//         if (inputValue.length === 0) {
//           if (activeIndex !== -1 && activeIndex < value.length) {
//             onValueChange(value.filter((item) => item !== value[activeIndex]));
//             const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
//             setActiveIndex(newIndex);
//           } else {
//             onValueChange(value.filter((item) => item !== value[value.length - 1]));
//           }
//         }
//       } else if (e.key === "Enter") {
//         setOpen(true);
//       } else if (e.key === "Escape") {
//         if (activeIndex !== -1) {
//           setActiveIndex(-1);
//         } else {
//           setOpen(false);
//         }
//       } else if (dir === "rtl") {
//         if (e.key === "ArrowRight") {
//           movePrev();
//         } else if (e.key === "ArrowLeft" && (activeIndex !== -1 || loop)) {
//           moveNext();
//         }
//       } else {
//         if (e.key === "ArrowLeft") {
//           movePrev();
//         } else if (e.key === "ArrowRight" && (activeIndex !== -1 || loop)) {
//           moveNext();
//         }
//       }
//     },
//     [value, inputValue, activeIndex, loop]
//   );

//   return (
//     <MultiSelectContext.Provider
//       value={{
//         value,
//         onValueChange: onValueChangeHandler,
//         open,
//         setOpen,
//         inputValue,
//         setInputValue,
//         activeIndex,
//         setActiveIndex,
//       }}
//     >
//       <Command
//         onKeyDown={handleKeyDown}
//         className={cn("overflow-visible  flex flex-col space-y-2", className)}
//         dir={dir}
//         {...props}
//       >
//         {children}
//       </Command>
//     </MultiSelectContext.Provider>
//   );
// };

// const MultiSelectorTrigger = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, children, ...props }, ref) => {
//     const { value, onValueChange, activeIndex } = useMultiSelect();

//     const mousePreventDefault = useCallback((e: React.MouseEvent) => {
//       e.preventDefault();
//       e.stopPropagation();
//     }, []);

//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "flex flex-wrap gap-1 p-1 py-2 border border-muted rounded-lg bg-background",
//           className
//         )}
//         {...props}
//       >
//         {value.map((item, index) => (
//           <Badge
//             key={item}
//             className={cn(
//               "p-2 rounded-md flex items-center gap-1",
//               activeIndex === index && "ring-2 ring-muted-foreground "
//             )}
//             variant={"secondary"}
//           >
//             <span className="text-xs text-occupy-primary">{item}</span>
//             <button
//               aria-label={`Remove ${item} option`}
//               aria-roledescription="button to remove option"
//               type="button"
//               onMouseDown={mousePreventDefault}
//               onClick={() => onValueChange(item)}
//             >
//               <span className="sr-only">Remove {item} option</span>
//               <RemoveIcon className="h-4 w-4 text-occupy-primary" />
//             </button>
//           </Badge>
//         ))}
//         {children}
//       </div>
//     );
//   }
// );

// MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

// const MultiSelectorInput = forwardRef<
//   React.ElementRef<typeof CommandPrimitive.Input>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
// >(({ className, ...props }, ref) => {
//   const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } = useMultiSelect();
//   return (
//     <CommandPrimitive.Input
//       {...props}
//       ref={ref}
//       value={inputValue}
//       onValueChange={activeIndex === -1 ? setInputValue : undefined}
//       onBlur={() => setOpen(false)}
//       onFocus={() => setOpen(true)}
//       onClick={() => setActiveIndex(-1)}
//       className={cn(
//         "ml-2  outline-none placeholder:text-muted-foreground flex-1",
//         className,
//         activeIndex !== -1 && "caret-transparent"
//       )}
//     />
//   );
// });

// MultiSelectorInput.displayName = "MultiSelectorInput";

// const MultiSelectorContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ children }, ref) => {
//     const { open } = useMultiSelect();
//     return (
//       <div ref={ref} className="relative">
//         {open && children}
//       </div>
//     );
//   }
// );

// MultiSelectorContent.displayName = "MultiSelectorContent";

// const MultiSelectorList = forwardRef<
//   React.ElementRef<typeof CommandList>,
//   React.ComponentPropsWithoutRef<typeof CommandList>
// >(({ className, children }, ref) => {
//   const { open } = useMultiSelect();
//   return (
//     <CommandList
//       ref={ref}
//       className={cn(
//         "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 text-slate-950 shadow-md",
//         className,
//         {
//           "animate-in fade-in-0 zoom-in-95": open,
//           "animate-out fade-out-0 zoom-out-95": !open,
//         }
//       )}
//     >
//       {children}
//       <CommandEmpty>
//         <span className="text-muted-foreground">No results found</span>
//       </CommandEmpty>
//     </CommandList>
//   );
// });

// MultiSelectorList.displayName = "MultiSelectorList";

// const MultiSelectorItem = forwardRef<
//   React.ElementRef<typeof CommandItem>,
//   { value: string } & React.ComponentPropsWithoutRef<typeof CommandItem>
// >(({ className, value, children, ...props }, ref) => {
//   const {
//     value: selectedValues,
//     onValueChange,
//     setActiveIndex,
//     setInputValue,
//   } = useMultiSelect();

//   const isSelected = selectedValues.includes(value);

//   return (
//     <CommandItem
//       ref={ref}
//       {...props}
//       onSelect={() => {
//         onValueChange(value);
//         setActiveIndex(-1);
//         setInputValue("");
//       }}
//       className={cn(
//         "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between",
//         className,
//         isSelected && "opacity-50 cursor-default",
//         props.disabled && "opacity-50 cursor-not-allowed"
//       )}
//     >
//       {children}
//       {isSelected && <Check className="h-4 w-4" />}
//     </CommandItem>
//   );
// });

// MultiSelectorItem.displayName = "MultiSelectorItem";

// export {
//   MultiSelector,
//   MultiSelectorTrigger,
//   MultiSelectorInput,
//   MultiSelectorContent,
//   MultiSelectorList,
//   MultiSelectorItem,
// };

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
