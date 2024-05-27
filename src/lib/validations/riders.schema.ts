import { z } from "zod";

export const riderSchema = z.object({
  order_id: z.string(),
  item: z.string(),
  customer: z.string(),
  riders: z.string(),
  address: z.string(),
  quantities: z.string(),
  prices: z.string(),
  status: z.string(),
});

export type RiderType = z.infer<typeof riderSchema>;
