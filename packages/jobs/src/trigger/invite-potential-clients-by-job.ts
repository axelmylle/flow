import { task } from "@trigger.dev/sdk/v3";
import SuggestedFreelancersEmail from "@v1/email/emails/suggested-freelancers";

import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import Papa from "papaparse";

import { Resend } from "resend";
import type { Database } from "../../../supabase/src/types/db";
import { Jobs } from "../constants";
import {
  composeSuggestedFreelancersEmail,
  createCompany,
  doesCompanyExist,
  getCompanyByName,
  inviteUserToCompany,
} from "../utils/suggest";

type JobLocation = {
  city: string;
  state_region: string;
  country: string;
  remote_on_site_hybrid: string;
};

type SalaryRange = {
  minimum_salary: number;
  maximum_salary: number;
  currency: string;
  frequency: string;
};

type JobDescription = {
  about_company: string;
  about_role: string;
};

type RequiredSkills = {
  technical_skills: string[];
  soft_skills: string[];
  years_of_experience: string;
};

export type JobData = {
  job_title: string;
  company_name: string;
  location: JobLocation;
  employment_type: string;
  salary_range: SalaryRange;
  job_description: JobDescription;
  required_skills: RequiredSkills;
  preferred_skills: string[];
  job_responsibilities: string[];
  technical_stack: string[];
  industry: string;
  company_culture: string;
  application_deadline: string | null;
  posted_date: string | null;
  job_benefits: string[];
  application_url: string;
  source_platform: string;
  job_id: string;
  contact_email: string | null; // Optional field for the email address
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient<Database>(
  // These details can be found in your Supabase project settings under `API`
  "http://127.0.0.1:54321" as string, // e.g. https://abc123.supabase.co - replace 'abc123' with your project ID
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU" as string, // Your service role secret key
);

const BATCH_LIMIT = 500;

export const invitePotentialClientsByJobTask = task({
  id: Jobs.INVITE_POTENTIAL_CLIENTS_BY_JOB,
  retry: {
    maxAttempts: 1,
  },
  //   cron: {
  //     //5am every day Tokyo time
  //     pattern: "0 3 * * *",
  //   },
  run: async (
    payload: {
      connectionId: string;
      teamId: string;
    },
    ctx,
  ) => {
    const { teamId, connectionId } = payload;

    const { data, error } = await supabase.storage
      .from("scraped_jobs")
      .download("jobs.csv");

    if (error) {
      throw new Error(`Failed to download CSV: ${error.message}`);
    }

    // Parse the CSV data
    const csvContent = await data.text();
    const { data: jobs } = Papa.parse(csvContent, { header: true });

    // Prepare an array to store processed job data for bulk insertion
    const parsedJobs: JobData[] = [
      {
        job_title: "Front end developer",
        company_name: "House of HR",
        location: {
          city: "Kortrijk",
          state_region: "West Flanders",
          country: "Belgium",
          remote_on_site_hybrid: "on_site",
        },
        employment_type: "fulltime",
        salary_range: {
          minimum_salary: 0,
          maximum_salary: 0,
          currency: "",
          frequency: "",
        },
        job_description: {
          about_company:
            "House of HR is a leading HR services group active all over Europe with a very dense presence in Belgium, the Netherlands, Germany and France. Over 50 companies in the group are active in 2 segments:  ‘Engineering & Consulting’ and ‘Specialized Talent Solutions’. ",
          about_role:
            "As a Front end engineer, you’ll gain valuable experience working on various projects, including improving our job satisfaction platform’s candidate journey and supporting the development of a SaaS product for hr sector.",
        },
        required_skills: {
          technical_skills: [
            "JavaScript (React)",
            "Basic knowledge of SQL databases",
            "Willingness to learn about RESTful APIs and their integration",
            "Eager to work with back-end technologies (Golang is a plus)",
            "Interest in learning about cloud providers (AWS preferred)",
          ],
          soft_skills: [
            "Eager to learn and work on new projects",
            "Adaptable and flexible in a startup environment",
            "Strong attention to detail and a proactive attitude",
            "Open to receiving feedback and improving continuously",
            "Good communication skills and empathy for others",
          ],
          years_of_experience: "",
        },
        preferred_skills: ["Interest in HR", "Speaks French"],
        job_responsibilities: [
          "Assist in designing, developing, and testing features on our platform",
          "Collaborate on building RESTful APIs to support our services",
          "Contribute to front-end and back-end tasks based on current needs",
          "Participate in expanding and maintaining our cloud infrastructure",
          "Support improvements to CI/CD pipelines for smoother deployments",
          "Help implement dashboards to understand customer behavior better",
          "Work closely with the marketing, operations, and scientific teams",
        ],
        technical_stack: [],
        industry: "Human Resources",
        company_culture: "Entrepreneurial, dynamic, and innovative",
        application_deadline: null,
        posted_date: "2024-10-24",
        job_benefits: [],
        application_url: "https://www.linkedin.com/jobs/view/4058474916",
        source_platform: "linkedin",
        job_id: "li-4058474916",
        contact_email: "info@houseofhr.com",
      },
      //   {
      //     job_title: "Full Stack Developer",
      //     company_name: "anyKrowd",
      //     location: {
      //       city: "",
      //       state_region: "",
      //       country: "Belgium",
      //       remote_on_site_hybrid: "",
      //     },
      //     employment_type: "Full-time",
      //     salary_range: {
      //       minimum_salary: 0,
      //       maximum_salary: 0,
      //       currency: "",
      //       frequency: "",
      //     },
      //     job_description: {
      //       about_company:
      //         "Join the vibrant team at anyKrowd, a young startup based in Brussels, Belgium, that aims to revolutionize the event entertainment and hospitality industry.",
      //       about_role:
      //         "Seeking a talented Full Stack Developer to work on the core infrastructure of the platform using Laravel, Livewire, Angular, Vue, and Ionic.",
      //     },
      //     required_skills: {
      //       technical_skills: [
      //         "Laravel",
      //         "Livewire",
      //         "Angular",
      //         "Vue.js",
      //         "Ionic",
      //         "Git",
      //       ],
      //       soft_skills: [],
      //       years_of_experience: "3+ years",
      //     },
      //     preferred_skills: [
      //       "AWS cloud platforms",
      //       "Event technology",
      //       "Security best practices for API development",
      //     ],
      //     job_responsibilities: [
      //       "Develop and maintain the platform using specified frameworks",
      //       "Collaborate with product, design, and QA teams",
      //       "Write efficient, maintainable code",
      //       "Troubleshoot and resolve issues",
      //       "Write and maintain unit tests",
      //     ],
      //     technical_stack: [],
      //     industry: "Events Services",
      //     company_culture:
      //       "Inclusive environment with opportunities for growth, remote work options, and fun workplace activities.",
      //     application_deadline: null,
      //     posted_date: "2024-10-23",
      //     job_benefits: [
      //       "Competitive salary and benefits",
      //       "Flexible remote work options",
      //       "Opportunities for growth and development",
      //       "Frequent offsite retreats and workplace activities",
      //     ],
      //     application_url: "https://www.linkedin.com/jobs/view/4055932452",
      //     source_platform: "linkedin",
      //     job_id: "li-4055932452",
      //     contact_email: "info@anykrowd.com",
      //   },
      //   {
      //     job_title: "Senior Software Engineer .NET C#",
      //     company_name: "Rydoo",
      //     location: {
      //       city: "Mechelen",
      //       state_region: "Flemish Region",
      //       country: "Belgium",
      //       remote_on_site_hybrid: "",
      //     },
      //     employment_type: "fulltime",
      //     salary_range: {
      //       minimum_salary: 0,
      //       maximum_salary: 0,
      //       currency: "",
      //       frequency: "",
      //     },
      //     job_description: {
      //       about_company:
      //         "Europe's fintech scale-up that makes spend management the easiest part of your day.",
      //       about_role:
      //         "As a software engineer, you will be part of a cross-functional and autonomous team. Responsible for several parts of the backend code, driving application core, and impacting company's growth.",
      //     },
      //     required_skills: {
      //       technical_skills: [
      //         ".NET",
      //         "C#",
      //         "Entity Framework",
      //         "SQL Server",
      //         "Service Oriented Architecture",
      //         "Azure Cloud",
      //       ],
      //       soft_skills: ["Problem-solving", "Collaborative mindset"],
      //       years_of_experience: "",
      //     },
      //     preferred_skills: ["Agile", "DevOps", "LLMs", "Angular"],
      //     job_responsibilities: [],
      //     technical_stack: [],
      //     industry:
      //       "Non-profit Organizations and Primary and Secondary Education",
      //     company_culture:
      //       "Celebrates diversity, inclusive environment, ongoing learning opportunities, career progression",
      //     application_deadline: null,
      //     posted_date: "2024-10-23",
      //     job_benefits: [
      //       "Competitive salary and benefits",
      //       "Meal vouchers",
      //       "Learning and development budget",
      //       "Hybrid work policy",
      //       "Professional freedom",
      //       "International mobility program",
      //       "Upskilling programs",
      //       "Company and team events",
      //       "Onboarding program",
      //       "Free drinks, fruits, snacks",
      //       "Permanent contract",
      //     ],
      //     application_url: "https://www.linkedin.com/jobs/view/4056415937",
      //     source_platform: "linkedin",
      //     job_id: "li-4056415937",
      //     contact_email: null,
      //   },
    ];

    const newCompanyEmails: string[] = [];

    for (const job of parsedJobs) {
      const existingCompany = await getCompanyByName(job.company_name);
      const companyId =
        existingCompany?.id ?? (await createCompany(job.company_name));
      //first time contacting the company
      if (job.contact_email) {
        const invitationCode = await inviteUserToCompany({
          id: companyId,
          email: job.contact_email,
          role: "owner",
        });
        const variables = await composeSuggestedFreelancersEmail(job, [
          {
            avatar_url: "",
            full_name: "Johnster McJohn",
            teaser: "I am a freelancer",
          },
          {
            avatar_url: "",
            full_name: "Levis Pistra",
            teaser: "Thanos snapper",
          },
          {
            avatar_url: "",
            full_name: "Amy Mcdonald",
            teaser: "Marketing Specialist",
          },
        ]);
        console.log(variables);

        const html = await render(
          SuggestedFreelancersEmail({
            description: variables.introduction,
            freelancers: variables.freelancers,
            outro: variables.outro,
            inviteCode: invitationCode,
          }),
        );

        const { error } = await resend.emails.send({
          from: "Gigflow <onboarding@resend.dev>",
          to: ["info@studiokompleks.be"],
          subject: `Need help with ${job.job_title}?`,
          html: html,
        });

        if (error) {
          console.error("Error sending email:", error);
        }
      }
    }

    // console.log(openai);
    // for (const job of jobs) {
    //   try {
    //     const completion = await openai.chat.completions.create({
    //       model: "gpt-3.5-turbo",
    //       messages: [
    //         {
    //           role: "system",
    //           content:
    //             "You are a helpful assistant that structures job postings in JSON format.",
    //         },
    //         {
    //           role: "user",
    //           content: `Analyze this job posting and return a JSON object in the following format: ${JSON.stringify(
    //             {
    //               job_title: "",
    //               company_name: "",
    //               location: {
    //                 city: "",
    //                 state_region: "",
    //                 country: "",
    //                 remote_on_site_hybrid: "",
    //               },
    //               employment_type: "",
    //               salary_range: {
    //                 minimum_salary: 0,
    //                 maximum_salary: 0,
    //                 currency: "",
    //                 frequency: "",
    //               },
    //               job_description: {
    //                 about_company: "",
    //                 about_role: "",
    //               },
    //               required_skills: {
    //                 technical_skills: [],
    //                 soft_skills: [],
    //                 years_of_experience: "",
    //               },
    //               preferred_skills: [],
    //               job_responsibilities: [],
    //               technical_stack: [],
    //               industry: "",
    //               company_culture: "",
    //               application_deadline: null,
    //               posted_date: null,
    //               job_benefits: [],
    //               application_url: "",
    //               source_platform: "",
    //               job_id: "",
    //               contact_email: null,
    //             },
    //           )}. Here is the job posting: ${JSON.stringify(job)}`,
    //         },
    //       ],
    //     });

    //     // Parse and validate the completion response
    //     const jobData: JobData = JSON.parse(
    //       completion.choices[0].message.content,
    //     );

    //     console.log(jobData);

    //     // Validate required fields
    //     if (jobData && jobData.job_title && jobData.company_name) {
    //       jobInsertArray.push({
    //         title: jobData.job_title,
    //         description: jobData.job_description.about_role,
    //         is_scraped: true,
    //         contact_email: jobData.contact_email,
    //         company_name: jobData.company_name,
    //       });
    //     }
    //   } catch (err) {
    //     console.error("Error processing job:", err);
    //   }
    //}

    // Bulk insert the processed jobs into the database
    // if (jobInsertArray.length > 0) {
    //   const { error: insertError } = await supabase
    //     .from("jobs")
    //     .insert(
    //       jobInsertArray.map((job) => ({
    //         title: job.job_title,
    //         is_scraped: true,
    //         contact_email: job.contact_email,
    //         company_name: job.company_name,
    //         about_company: job.job_description.about_company,
    //         about_role: job.job_description.about_role,
    //         required_skills: job.required_skills,
    //         preferred_skills: job.preferred_skills,
    //         job_responsibilities: job.job_responsibilities,
    //         technical_stack: job.technical_stack,
    //         industry: job.industry,
    //         company_culture: job.company_culture,
    //         application_deadline: job.application_deadline,
    //         posted_date: job.posted_date,
    //         job_benefits: job.job_benefits,
    //         application_url: job.application_url,
    //         source_platform: job.source_platform,
    //         job_id: job.job_id,
    //         location: job.location.city,
    //         employment_type: job.employment_type,
    //         salary_range: job.salary_range,
    //         location_city: job.location.city,
    //         location_state_region: job.location.state_region,
    //         location_country: job.location.country,
    //         location_remote_on_site_hybrid: job.location.remote_on_site_hybrid,
    //         source_url: job.application_url,
    //         technical_skills: job.required_skills.technical_skills,
    //         soft_skills: job.required_skills.soft_skills,
    //         years_of_experience: job.required_skills.years_of_experience,

    //       } as Database["public"]["Tables"]["jobs"]["Insert"])),
    //     );

    //   if (insertError) {
    //     console.error("Failed to insert jobs:", insertError.message);
    //   }
    // }

    return {
      success: true,
    };
  },
});
