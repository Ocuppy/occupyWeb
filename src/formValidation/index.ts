import { z } from "zod";

export const AddStoreSchema = z
  .object({
    supermarketName: z.string().min(1, {
      message: "Supermarket Name must be added",
    }),
    supermarketAddress: z.string().min(1, {
      message: "Address must be added",
    }),
    phoneNumber: z
      .string()
      .min(10, {
        message: "Phone Number lesngth can not be less than 10",
      })
      .nullable(),
    supermarketLocation: z.string().min(1, {
      message: "Supermarket location must be added",
    }),
    inspectionDate: z.date({ message: "Invalid date string!" }),
  })
  .required();
