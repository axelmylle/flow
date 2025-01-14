import { Resend } from "@trigger.dev/resend";
import { TriggerClient } from "@trigger.dev/sdk";
import { Supabase } from "@trigger.dev/supabase";
import type { Database } from "../../supabase/src/types/db";

export const client = new TriggerClient({
  id: "proj_raxmqnsxepndhqkztsnt",
  apiKey: "tr_dev_fURvUQshkWNAJnpPqPbZ",
  apiUrl: "https://api.trigger.dev",
  ioLogLocalEnabled: true,
  logLevel: "debug",
  verbose: true,
});

export const supabase = new Supabase<Database>({
  id: "gigflow",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

export const resend = new Resend({
  id: "resend",
  apiKey: process.env.RESEND_API_KEY!,
});
