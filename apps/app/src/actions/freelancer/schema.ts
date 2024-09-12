import { z } from "zod";

export const updateFreelancerSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  hourly_rate: z.number().positive(),
  experience_years: z.number().int().nonnegative(),
  bio: z.string().max(1000), // Assuming a reasonable max length for the bio
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type UpdateFreelancerFormValues = z.infer<typeof updateFreelancerSchema>;
