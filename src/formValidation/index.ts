// import { z } from "zod";

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_FILE_TYPES = ["image/png"];

// function checkFileType(file: File) {
//   if (file?.name) {
//     const fileType = file.name.split(".").pop();
//     if (fileType === "png" || fileType === "jpg") return true;
//   }
//   return false;
// }
// export const AddStoreSchema = z
//   .object({
//     supermarketName: z.string().min(1, {
//       message: "Supermarket Name must be added",
//     }),
//     supermarketImg: z
//       .instanceof(File)
//       .refine((file: File) => !file, "File is required")
//       .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
//       .refine(
//         (file) => checkFileType(file),
//         "Only .png, .jpg formats are supported.",
//       ),
//     regNumber: z.string({ message: "Please input the registration number" }),
//     salesName: z.string({ message: "Please input the sale's person name" }),
//     supermarketAddress: z.string().min(1, {
//       message: "Address must be added",
//     }),
//     email: z.string().email({
//       message: "Email must be added",
//     }),
//     phoneNumber: z
//       .string()
//       .min(13, {
//         message: "Phone Number length can not be less than 13",
//       })
//       .startsWith("+234", {
//         message:
//           "Phone number should be in the international standard. I.e +2348089477826",
//       })
//       .nullable(),
//     supermarketLocation: z.string().min(1, {
//       message: "Supermarket location must be added",
//     }),
//     inspectionDate: z.date({ message: "Invalid date string!" }),
//   })
//   .required();

import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

function checkFileType(file: File) {
  const fileType = file.type; // Use `file.type` for MIME type checking.
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

// export const AddStoreSchema = z.object({
//   supermarketName: z.string().min(1, {
//     message: "Supermarket Name must be added",
//   }),
//   supermarketImg: z
//     .instanceof(File, {
//       message: "Uploaded file must be a valid image file.",
//     })
//     .refine((file) => file.size <= MAX_FILE_SIZE, {
//       message: "File size must not exceed 5MB.",
//     })
//     .refine((file) => checkFileType(file), {
//       message: "Only .png, .jpg, or .jpeg formats are supported.",
//     }),
//   regNumber: z.string({ message: "Please input the registration number" }),
//   salesName: z.string({ message: "Please input the sale's person name" }),
//   supermarketAddress: z.string().min(1, {
//     message: "Address must be added",
//   }),
//   email: z.string().email({
//     message: "Email must be added",
//   }),
//   phoneNumber: z
//     .string()
//     .min(13, {
//       message: "Phone Number length cannot be less than 13",
//     })
//     .startsWith("+234", {
//       message:
//         "Phone number should follow the international format, e.g., +2348089477826",
//     })
//     .nullable(),
//   supermarketLocation: z.string().min(1, {
//     message: "Supermarket location must be added",
//   }),
//   inspectionDate: z.preprocess(
//     (val) => (val instanceof Date ? val : new Date(val as any)),
//     z.date({
//       message: "Invalid date string!",
//     }),
//   ),
// });

export const AddStoreSchema = z.object({
  supermarketName: z.string().min(1, "Supermarket Name must be added"),
  supermarketImg: z
    .instanceof(File, { message: "An image file is required" })
    .optional() // Allow it to be optional initially
    .nullable(),
  regNumber: z.string().min(1, "Registration number is required"),
  salesName: z.string().min(1, "Salesperson name is required"),
  supermarketAddress: z.string().min(1, "Address must be added"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z
    .string()
    .min(13, "Phone Number must be at least 13 characters")
    .startsWith("+234", "Phone number must start with +234"),
  supermarketLocation: z.string().min(1, "Supermarket location is required"),
  inspectionDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((date) => !isNaN(date.getTime()), "Invalid date"),
  ),
});
