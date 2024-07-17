import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";

const CustomDialog = ({
  BtnComponent,
  children,
  className,
}: {
  children: ReactNode;
  BtnComponent: React.JSX.Element;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{BtnComponent}</DialogTrigger>
      <DialogContent className={cn("", className)}>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
