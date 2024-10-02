import { z } from "zod";

export const manualSyncTransactionsSchema = z.object({
  connectionId: z.string().uuid(),
});
