import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  placeholder?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        placeholder={props.placeholder}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-7 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          error && "border-red-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
