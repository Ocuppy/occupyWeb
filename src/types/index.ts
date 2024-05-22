import { HTMLInputTypeAttribute } from "react";

export interface IModalProps {
  isOpen: boolean;
  toggleOpenState?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
}

export interface IDisclosureProps {
  isOpen: boolean;
  toggleOpenState: () => void;
  onClose: () => void;
  onOpen: () => void;
}

export interface IFieldValue {
  label: string;
  placeholder?: string;
  name: string;
  type?: HTMLInputTypeAttribute | undefined;
  options?: { label: string; value: string }[];
}
