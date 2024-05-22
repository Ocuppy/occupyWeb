import { IFieldValue } from "@/types";

export const AddStoreFormFields: IFieldValue[] = [
  {
    name: "supermarketName",
    label: "Supermarket Name",
    placeholder: "Enter Supermarket Name",
    type: "text",
  },
  {
    name: "supermarketAddress",
    label: "Supermarket Address",
    placeholder: "Enter Supermarket Address",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Sales Person Phone Number",
    placeholder: "Phone Number",
    type: "number",
  },
  {
    name: "supermarketLocation",
    label: "Select Estate Supermarket is Located in",
    placeholder: "Select an option...",
    type: "select",
    options: [
      { label: "something-1", value: "something1" },
      { label: "something-2", value: "something2" },
    ],
  },
  {
    name: "inspectionDate",
    label: "Date of Inspection",
    placeholder: "Select a preferred date for Physical Inspection",
    type: "date",
  },
];
