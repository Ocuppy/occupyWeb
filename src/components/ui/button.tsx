import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex px-6 py-6 items-center justify-center whitespace-nowrap rounded-md text-[16px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2  disabled:pointer-events-none disabled:bg-[#E0E0E0]",
  {
    variants: {
      variant: {
        default:
          "bg-occupy-primary text-white hover:opacity-[75%] dark:bg-occupy-primary dark:text-white dark:hover:opacity-[75%]",
        primary:
          "bg-[#174534] text-white hover:opacity-[75%] dark:bg-[#174534] dark:text-white dark:hover:opacity-[75%]",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-occupy-secondary text-white hover:opacity-[75%] dark:bg-secondary dark:text-white dark:hover:opacity-[75%]",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10",
        sm: "h-9 rounded-md ",
        lg: "h-11 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
