import { z } from "zod";

export const updateFreelancerSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  headline: z.string().max(100).optional(),
  daily_rate: z.number().positive().optional(),
  preferred_work_style: z.enum(["remote", "hybrid"]).optional(),
  officeDays: z.number().min(1).max(5).optional().nullable(),
  vat_number: z.string().optional().nullable(),
  experience_years: z.number().int().nonnegative().optional(),
  bio: z.string().max(1000).optional(), // Assuming a reasonable max length for the bio
});

export type UpdateFreelancerFormValues = z.infer<typeof updateFreelancerSchema>;
