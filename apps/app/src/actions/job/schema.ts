import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string(),
  location: z.string().optional(),
  employment_type: z.string().optional(),
  status: z.enum(["active", "inactive", "filled", "expired"]).default("active"),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;
