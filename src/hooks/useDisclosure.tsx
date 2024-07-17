import { IDisclosureProps, IModalProps } from "@/types";
import { useState } from "react";

export const useDisclosure = (initialValue?: boolean) => {
  const [isOpen, setIsopen] = useState<boolean>(initialValue || false);
  const toggleOpenState = () => setIsopen(!isOpen);
  const onOpen = () => setIsopen(true);
  const onClose = () => setIsopen(false);
  const obj: IDisclosureProps = { isOpen, toggleOpenState, onOpen, onClose };
  return obj;
};
