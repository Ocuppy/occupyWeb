import { z } from "zod";

export const statuses = ["canceled", "done", "in-progress", "todo", "backlog"] as const;
export const labels = ["bug", "feature", "documentation"] as const;
export const priorities = ["low", "medium", "high"] as const;

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const orderSchema = z.object({
  order_id: z.string(),
  product: z.string(),
  status: z.string(),
  customer: z.string(),
  total: z.string(),
  payment: z.string(),
  date: z.date().transform((value) => new Date(value)),
});

export type OrderType = z.infer<typeof orderSchema>;
