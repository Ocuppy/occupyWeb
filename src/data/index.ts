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

export const APPROVALSTATUS = {
  pending: {
    classNames: "text-[#A5A5A5] bg-[#EBEBEB]",
    label: "Pending",
  },
  approved: {
    classNames: "text-[#06A561] bg-[#C4F8E2]",
    label: "Approved",
  },
};

export const GeneralInformationFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Your First Name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Your Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Your Email Address",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Your Phone Number",
    type: "number",
  },
];

export const SupermarketInformationFields = [
  [
    {
      name: "businessName",
      label: "Business Name",
      placeholder: "Enter Business Name",
      type: "text",
    },
    {
      name: "businessAddress",
      label: "Business Address",
      placeholder: "Enter Address",
      type: "text",
    },
  ],
  [
    {
      name: "businessEmail",
      label: "Business Email",
      placeholder: "Your Email Address",
      type: "text",
    },
    {
      name: "businessPhoneNumber",
      label: "Business Phone Number",
      placeholder: "Your Phone Number",
      type: "number",
    },
  ],
  [
    {
      name: "location",
      label: "Where do you stay? Select your Estate",
      placeholder: "Select an option...",
      type: "select",
      options: [{ label: "Something", value: "something" }],
    },
    {
      name: "location",
      label: "Where do you stay? Select your Estate",
      placeholder: "Select an option...",
      type: "select",
      options: [{ label: "Something", value: "something" }],
    },
    {
      name: "inspectiondate",
      label: "Date of Inspection",
      placeholder: "Select a preferred date for Physical Inspection",
      type: "date",
    },
  ],
];

export const SecurityFormFields = [
  {
    name: "password",
    label: "Old Password",
    placeholder: "Enter Old Password",
    type: "password",
  },
  {
    name: "newPassword",
    label: "New Password",
    placeholder: "Enter New Password",
    type: "password",
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    placeholder: "Confirm New Password",
    type: "password",
  },
];

export const BillingInformationFields = [
  {
    name: "paymentmethod",
    label: "Payment Method",
    placeholder: "Select Payment Method",
    type: "select",
    options: [{ label: "Something", value: "something" }],
  },
  {
    name: "bank",
    label: "Bank",
    placeholder: "Select Bank",
    type: "select",
    options: [{ label: "Something", value: "something" }],
  },
  {
    name: "accountNumber",
    label: "Account Number",
    placeholder: "Enter Account Number",
    type: "text",
  },
];

export const NotificationFormFields = [
  {
    name: "generalNotification",
    label: "General Notification",
    description: "Profile Photo, Name and Location",
  },
  {
    name: "supermarketVisibility",
    label: "Turn on Supermarket Visiblity",
    description: "Profile Photo, Name and Location",
  },
  {
    name: "orderingActivity",
    label: "Disable Ordering Activity",
    description: "Profile Photo, Name and Location",
  },
  {
    name: "activitydays",
    label: "Enable Activities Days",
    description: "Profile Photo, Name and Location",
  },
];
