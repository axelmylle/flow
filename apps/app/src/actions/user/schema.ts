import { z } from "zod";

export const updateUserSchema = z.object({
  full_name: z.string().min(2).max(32).optional(),
  first_name: z.string().min(2).max(32).optional(),
  last_name: z.string().min(2).max(32).optional(),
  avatar_url: z.string().url().optional(),
  locale: z.string().optional(),
  week_starts_on_monday: z.boolean().optional(),
  timezone: z.string().optional(),
  time_format: z.number().optional(),
  revalidatePath: z.string().optional(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
export const verifyOtpSchema = z.object({
  token: z.string(),
  email: z.string(),
});
