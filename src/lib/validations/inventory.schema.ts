import { z } from "zod";

export const inventorySchema = z.object({
  id: z.string(),
  item_id: z.string(),
  item: z.string(),
  value: z.string(),
  availability: z.string(),
  title: z.string(),
  expiry_date: z.string(),
  imgSrc: z.string(),
  quantity: z.string(),
  buying_price: z.string(),
  status: z.string(),
});

export type InventoryType = z.infer<typeof inventorySchema>;
