import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactNode } from "react";

const Flex = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div onClick={onClick} className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  );
};

export default Flex;
