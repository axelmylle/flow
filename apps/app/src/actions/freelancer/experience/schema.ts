import { z } from "zod";

export const createExperienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().optional(),
  description: z.string().optional(),
  richtext: z.string().optional(),
  skills: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  thumbnail_url: z.string().url().optional(),
});

export const deleteExperienceSchema = z.object({
  id: z.string(),
});

export type CreateExperienceFormValues = z.infer<typeof createExperienceSchema>;
export type DeleteExperienceFormValues = z.infer<typeof deleteExperienceSchema>;
