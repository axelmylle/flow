import { openai } from "@ai-sdk/openai";
import type { Transaction } from "@gigflow/import/src/types";
import { createClient } from "@supabase/supabase-js";
import { generateObject } from "ai";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import type { Database } from "../../../supabase/src/types/db";
import type { JobData } from "../trigger/invite-potential-clients-by-job";
import { processBatch } from "./process";

const supabase = createClient<Database>(
  // These details can be found in your Supabase project settings under `API`
  "http://127.0.0.1:54321" as string, // e.g. https://abc123.supabase.co - replace 'abc123' with your project ID
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU" as string, // Your service role secret key
);

type Freelancer = {
  avatar_url: string;
  full_name: string;
  teaser: string; // Short description or teaser for the freelancer
};

export const createCompany = async (companyName: string) => {
  const { data, error } = await supabase
    .from("companies")
    .upsert({ name: companyName }, { onConflict: "name" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

export const getCompanyByName = async (companyName: string) => {
  const { data, error } = await supabase
    .from("companies")
    .select("id")
    .eq("name", companyName)
    .single();

  return data;
};

export const inviteUserToCompany = async ({ id, email, role }) => {
  const { data, error } = await supabase
    .from("company_user_invites")
    .insert({
      company_id: id,
      email,
      role,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data.code;
};

export const composeSuggestedFreelancersEmail = async (
  job: JobData,
  freelancers: Freelancer[],
) => {
  const { object } = await generateObject({
    model: openai("gpt-3.5-turbo-0125"),
    schema: z.object({
      introduction: z.string(),
      freelancers: z.array(
        z.object({
          avatar_url: z.string(),
          full_name: z.string(),
          teaser: z.string(),
        }),
      ),
      outro: z.string(),
    }),
    prompt: `
You are an expert in writing warm, personalized, and persuasive emails targeted at companies in different industries with outstanding job postings. Here is the structured job data and a list of suggested freelancers who can provide an immediate solution to the company's hiring challenge.

Job Data:
{
  "job_title": "${job.job_title}",
  "company_name": "${job.company_name}",
  "industry": "${job.industry}", 
  "location": {
    "city": "${job.location.city}",
    "state_region": "${job.location.state_region}",
    "country": "${job.location.country}",
    "remote_on_site_hybrid": "${job.location.remote_on_site_hybrid}"
  },
  "employment_type": "${job.employment_type}",
  "job_description": {
    "about_company": "${job.job_description.about_company}",
    "about_role": "${job.job_description.about_role}"
  },
  "posted_date": "${job.posted_date}",
  "application_url": "${job.application_url}"
}

Suggested Freelancers:
${freelancers
  .map(
    (freelancer, index) => `
  ${index + 1}. ${freelancer.full_name} - ${freelancer.teaser}`,
  )
  .join("\n")}

Write a personalized and engaging email for the company "${job.company_name}", taking into account that they are in the "${job.industry}" industry. The email should be warm, persuasive, and should suggest the provided freelancers as excellent candidates to help solve their hiring challenge quickly. 

Emphasize that these freelancers have skills and experience that are particularly valuable for a company in the "${job.industry}" industry and can make an immediate impact on the ongoing projects. Reference the hiring challenges that companies in this industry might face (e.g., difficulty finding specialized talent) and show how these freelancers can help overcome those challenges. Use language that makes the email feel personalized and genuine.
Use jargon and industry-specific language to make the email feel more professional and credible.
The email should have:
1. A warm and personalized introduction that references the company, their industry, and the outstanding job posting.
2. A list of freelancers, each with:
   - 'avatar_url' 
   - 'full_name'
   - 'teaser' (description of how their skills align with the job or industry)
3. An encouraging outro that invites the recipient to visit our platform to explore these freelancers further and consider reaching out for more information.
    `,
  });

  return object;
};
