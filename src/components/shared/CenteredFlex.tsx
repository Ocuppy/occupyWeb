import { ReactNode } from "react";

const CenteredFlex = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

export default CenteredFlex;
