import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().max(100),
  website: z.string().url().optional(),
  description: z.string().max(100).optional(),
  logo_url: z.string().url().optional(),
});

export type createClientFormValues = z.infer<typeof createClientSchema>;

export const updateClientSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  name: z.string().max(100).optional(),
  description: z.string().max(100).optional(),
  website: z.string().url().optional(),
  location: z.string().max(100).optional(),
  logo: z.string().url().optional(),
  vat_number: z.string().optional(),
});

export type updateClientFormValues = z.infer<typeof updateClientSchema>;

export const updateProfileAtCompanySchema = z.object({
  first_name: z.string().max(100).optional(),
  last_name: z.string().max(100).optional(),
  title: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  linkedin_url: z.string().url().optional(),
  phone_number: z.string().optional(),
});

export type updateProfileAtCompanyFormValues = z.infer<
  typeof updateProfileAtCompanySchema
>;
