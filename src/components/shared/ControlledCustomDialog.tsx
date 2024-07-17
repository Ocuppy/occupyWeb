import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ControlledCustomDialog = ({
  children,
  className,
  isOpen,
  toggleOpenState,
  CloseIcon,
  showCloseButton,
}: {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  toggleOpenState: () => void;
  CloseIcon?: React.ElementType;
  showCloseButton?: boolean;
}) => {
  return (
    <Dialog onOpenChange={toggleOpenState} open={isOpen}>
      <DialogContent
        showCloseButton={showCloseButton}
        CloseIcon={CloseIcon}
        className={cn("", className)}
      >
        <ScrollArea className="max-h-[75vh] ">
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ControlledCustomDialog;
