import { logger, schedules, task, wait } from "@trigger.dev/sdk/v3";
import { supabase } from "../client";

export const scrapeJob = schedules.task({
  id: "scrape-job",
  cron: {
    pattern: "0 9 * * 1-5",
    timezone: "Europe/London",
  },
  run: async () => {
    logger.log("Hello, world!", { payload, ctx });

    await wait.for({ seconds: 5 });

    return {
      message: "Hello, world!",
    };
  },
});

export const scrapeJobTask = task({
  id: "scrape-job-task",
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 10000,
    factor: 2,
    randomize: true,
  },
  run: async ({ title, link }: { title: string; link: string }) => {
    logger.info(`Summarizing ${title}`);

    logger.info(`Extracted content for article: ${title}`, { content });

    // Summarize the content using ChatGPT

    logger.info(`Generated summary for article: ${title}`);

    return {
      title,
      link,
      summary: response.choices[0].message.content,
    };
  },
});

export const transformJobTask = task({
  id: "transform-job-task",
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 5000,
    maxTimeoutInMs: 10000,
    factor: 2,
    randomize: true,
  },
  run: async ({ title, link }: { title: string; link: string }) => {
    logger.info(`Summarizing ${title}`);

    if (error) {
      throw new Error(`Error uploading video: ${error.message}`);
    }

    // Update the job with the new data

    logger.log(`Video uploaded to Supabase Storage bucket`, { objectKey });

    return {
      title,
      link,
      summary: response.choices[0].message.content,
    };
  },
});
