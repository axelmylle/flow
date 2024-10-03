import { z } from "zod";

export const manualSyncTransactionsSchema = z.object({
  connectionId: z.string().uuid(),
});

export const deleteTransactionSchema = z.object({
  ids: z.array(z.string()),
});

export const updateTransactionSchema = z.object({
  id: z.string().uuid(),
  note: z.string().optional().nullable(),
  category_slug: z.string().optional(),
  assigned_id: z.string().uuid().optional(),
  recurring: z.boolean().optional().nullable(),
  frequency: z.enum(["weekly", "monthly", "annually"]).optional().nullable(),
  status: z.enum(["deleted", "excluded", "posted", "completed"]).optional(),
});

export type UpdateTransactionValues = z.infer<typeof updateTransactionSchema>;
