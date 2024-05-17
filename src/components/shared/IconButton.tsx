import React, { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
interface IButtonProps extends ButtonProps {
  Icon: any;
}
const IconButton = ({ Icon, ...props }: IButtonProps) => {
  return <Button {...props}>{<Icon />}</Button>;
};

export default IconButton;
