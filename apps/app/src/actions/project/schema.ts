import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  estimate: z.number().optional(),
  billable: z.boolean().optional().default(false),
  rate: z.number().min(1).optional(),
  currency: z.string().optional(),
  status: z.enum(["in_progress", "completed"]).optional(),
});

export const updateProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  estimate: z.number().optional(),
  billable: z.boolean().optional().default(false),
  rate: z.number().min(1).optional(),
  currency: z.string().optional(),
  status: z.enum(["in_progress", "completed"]).optional(),
});

export const deleteProjectSchema = z.object({
  id: z.string().uuid(),
});

export const deleteEntriesSchema = z.object({
  id: z.string().uuid(),
});

// export const createReportSchema = z.object({
//   baseUrl: z.string().url(),
//   from: z.string(),
//   to: z.string(),
//   type: changeChartTypeSchema,
//   expiresAt: z.string().datetime().optional(),
// });

export const createProjectReportSchema = z.object({
  baseUrl: z.string().url(),
  projectId: z.string().uuid(),
});

export const updateEntriesSchema = z.object({
  id: z.string().uuid().optional(),
  action: z.enum(["update", "create", "delete"]),
  date: z.string().optional(),
  duration: z.number().optional(),
  assigned_id: z.string().optional(),
  project_id: z.string().optional(),
  description: z.string().optional(),
  start: z.string().datetime().optional(),
  stop: z.string().datetime().optional(),
});
