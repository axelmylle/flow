import { Resend } from "@trigger.dev/resend";
import { TriggerClient } from "@trigger.dev/sdk";

export const client = new TriggerClient({
  id: "proj_raxmqnsxepndhqkztsnt",
  apiKey: "tr_dev_fURvUQshkWNAJnpPqPbZ",
  apiUrl: "https://api.trigger.dev",
  ioLogLocalEnabled: true,
  logLevel: "debug",
  verbose: true,
});

// export const supabase = new Supabase<Database>({
//   id: "create-v1",

//   supabaseUrl: "http://127.0.0.1:54321",
//   supabaseKey:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
// });

// const supabaseManagement = new SupabaseManagement({
//   id: "gigflow-supabase-management",
// });

// export const db = supabaseManagement.db(`http://127.0.0.1:54323`);

export const resend = new Resend({
  id: "resend",
  apiKey: process.env.RESEND_API_KEY!,
});
