import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["image/png"];

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "png" || fileType === "jpg") return true;
  }
  return false;
}
export const AddStoreSchema = z
  .object({
    supermarketName: z.string().min(1, {
      message: "Supermarket Name must be added",
    }),
    supermarketImg: z
      .instanceof(File)
      .refine((file: File) => !file, "File is required")
      .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
      .refine(
        (file) => checkFileType(file),
        "Only .png, .jpg formats are supported.",
      ),
    regNumber: z.string({ message: "Please input the registration number" }),
    salesName: z.string({ message: "Please input the sale's person name" }),
    supermarketAddress: z.string().min(1, {
      message: "Address must be added",
    }),
    email: z.string().email({
      message: "Email must be added",
    }),
    phoneNumber: z
      .string()
      .min(13, {
        message: "Phone Number length can not be less than 13",
      })
      .startsWith("+234", {
        message:
          "Phone number should be in the international standard. I.e +2348089477826",
      })
      .nullable(),
    supermarketLocation: z.string().min(1, {
      message: "Supermarket location must be added",
    }),
    inspectionDate: z.date({ message: "Invalid date string!" }),
  })
  .required();
