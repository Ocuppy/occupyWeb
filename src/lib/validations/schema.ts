import { z } from "zod";

// export const statuses = ["canceled", "done", "in-progress", "todo", "backlog"] as const;
// export const labels = ["bug", "feature", "documentation"] as const;
// export const priorities = ["low", "medium", "high"] as const;

// Define the schema for the product
export const productSchema = z.object({
  name: z.string(),
  image: z.string(), // assuming image is a URL
  additionalDetails: z.string().optional(),
});

// Define the schema for the customer
export const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const orderSchema = z.object({
  order_id: z.string(),
  product: productSchema,
  status: z.string(),
  customer: customerSchema,
  total: z.string(),
  payment: z.string(),
  date: z.date().transform((value) => new Date(value)),
});

export type OrderType = z.infer<typeof orderSchema>;
