import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  country: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  note: z.string().optional(),
  website: z.string().optional(),
  phone: z.string().optional(),
});
