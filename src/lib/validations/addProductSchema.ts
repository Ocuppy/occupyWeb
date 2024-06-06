import { z } from "zod";

export const productSchema = z.object({
  category: z.string({
    required_error: "Please select a category.",
  }),
  tag: z.array(z.string()).min(1, {
    message: "Please select at least one product tag.",
  }),
  supermarket: z.string({
    required_error: "Please select a supermarket.",
  }),
  productName: z.string({
    required_error: "Please type a name.",
  }),
  description: z.string().optional(),
  price: z.string({
    required_error: "Please type a price.",
  }),
  quantity: z.string({
    required_error: "Please type a quantity.",
  }),
  // photo: z.string({
  //   required_error: "Please upload a photo.",
  // }),
  photo: z.string().optional(),
});

export type productSchemaType = z.infer<typeof productSchema>;
