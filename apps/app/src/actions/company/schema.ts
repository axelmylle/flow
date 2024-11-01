import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().max(100),
  website: z.string().url().optional(),
  description: z.string().max(100).optional(),
  logo_url: z.string().url().optional(),
});

export type createCompanyFormValues = z.infer<typeof createCompanySchema>;

export const updateCompanySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().max(100),
  description: z.string().max(100).optional(),
  website: z.string().url().optional(),
  location: z.string().max(100).optional(),
  logo: z.string().url().optional(),
  vat_number: z.string().optional(),
});

export type updateCompanyFormValues = z.infer<typeof updateCompanySchema>;

export const updateUserAtCompanySchema = z.object({
  company_id: z.string().uuid().optional(),
  role: z.enum(["member", "owner"]).optional(),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  title: z.string().max(100),
  location: z.string().max(100),
  linkedin_url: z.string().url().optional(),
  phone_number: z.string().optional(),
});

export type updateUserAtCompanyFormValues = z.infer<
  typeof updateUserAtCompanySchema
>;

export const companySearchSchema = z.object({
  company_id: z.string().uuid().optional(),
});

export type companySearchFormValues = z.infer<typeof companySearchSchema>;
