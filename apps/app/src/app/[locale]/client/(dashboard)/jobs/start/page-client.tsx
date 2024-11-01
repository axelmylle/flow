"use client";

import { CreateJobForm } from "@/components/jobs/forms/create-job-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@v1/ui/accordion";
import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import { ComboboxDropdown } from "@v1/ui/combobox-dropdown";
import { Editor } from "@v1/ui/editor";
import { Icons } from "@v1/ui/icons";
import Image from "next/image";
import React from "react";

const defaultContent = `
<h2>Job title</h2>

<p>We have developed a text editor based on Tiptap, which is a core component of our Invoicing feature. This editor has been enhanced with AI capabilities using the Vercel AI SDK, allowing for intelligent text processing and generation. After extensive internal use and refinement, we have now released this editor as an open-source tool for the wider developer community.</p>

<br />

<strong>Easy Integration</strong>

<p>To ensure seamless integration and consistency within your codebase, we've made it easy to add the Midday Editor to your project. You can simply copy and paste the necessary code from our dedicated documentation. This method allows you to quickly incorporate all required dependencies and components directly into your project repository.</p>
`;

function PageClient() {
  return (
    <div className="max-w-[1200px] pt-0 pb-4 md:py-6 px-6 min-h-[100vh]">
      <Accordion className="w-full" type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Opportunity Detail</AccordionTrigger>
          <AccordionContent className="w-full text-left">
            <div className="my-3 flex flex-wrap pr-2">fds</div>

            <div className="mt-8 mb-4 md:grid md:grid-cols-[120px_auto] md:gap-[36px] flex flex-col gap-3">
              <p className="text-[#888] text-sm font-normal">Duration</p>
              <p className="text-[#111111] text-sm font-normal ml-4 md:ml-0">
                <ComboboxDropdown
                  placeholder="Select duration"
                  items={[
                    { id: "1", label: "Less than 1 week" },
                    { id: "2", label: "1-2 weeks" },
                    { id: "3", label: "2-4 weeks" },
                  ]}
                  onSelect={() => {}}
                />
              </p>
            </div>

            <div className="my-4 md:grid md:grid-cols-[120px_auto] md:gap-[36px] flex flex-col gap-3">
              <p className="text-[#888] text-sm font-normal">Salary range</p>
              <p className="text-[#111111] text-sm font-normal ml-4 md:ml-0">
                {"job.salary"}
              </p>
            </div>

            <div className="my-4 md:grid md:grid-cols-[120px_auto] md:gap-[36px] flex flex-col gap-3 max-w-2xl">
              <p className="text-[#888] text-sm font-normal">Tech stack</p>
              <div className="flex flex-wrap items-center gap-1.5 ml-4 md:ml-0"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-24">Budget</span>
                <ComboboxDropdown
                  placeholder="Select rate"
                  items={[
                    { id: "1", label: "$25 - $50/hr" },
                    { id: "2", label: "$50 - $100/hr" },
                    { id: "3", label: "$100+/hr" },
                  ]}
                  onSelect={() => {}}
                />
                <ComboboxDropdown
                  placeholder="Select hours"
                  items={[
                    { id: "1", label: "5 hrs/wk" },
                    { id: "2", label: "10 hrs/wk" },
                    { id: "3", label: "20 hrs/wk" },
                  ]}
                  onSelect={() => {}}
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-24">Skills</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    Article Writer
                    <button className="ml-1 text-xs">&times;</button>
                  </Badge>
                  <Badge variant="secondary">
                    Ghostwriter
                    <button className="ml-1 text-xs">&times;</button>
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-24">Tools</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    <Image
                      src="https://logo.clearbit.com/wordpress.org"
                      alt="WordPress"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    WordPress
                    <button className="ml-1 text-xs">&times;</button>
                  </Badge>
                  <Badge variant="secondary">
                    <Image
                      src="/https://logo.clearbit.com/notion.so"
                      alt="Notion"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    notion.so
                    <button className="ml-1 text-xs">&times;</button>
                  </Badge>
                  <Badge variant="secondary">
                    <Image
                      src="https://logo.clearbit.com/google.com"
                      alt="Google Drive"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    Google Drive
                    <button className="ml-1 text-xs">&times;</button>
                  </Badge>
                  <Badge variant="secondary">
                    <Image
                      src="https://logo.clearbit.com/grammarly.com"
                      alt="Grammarly"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    Grammarly
                    <button className="ml-1 text-xs">&times;</button>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center justify-center"
                  >
                    <Image
                      src="https://logo.clearbit.com/canva.com"
                      alt="Canva"
                      width={16}
                      height={16}
                      className="mr-1 rounded-full"
                    />
                    Canva
                  </Badge>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Job Description</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-x-3">
              <Button variant="outline">
                <Icons.Linkedin className="size-4 mr-2" />
                Import job from Linkedin
              </Button>
              <Button variant="outline">
                <Icons.Attachments className="size-4 mr-2" />
                Import job from document
              </Button>
            </div>
            <Editor content={defaultContent} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Job Description</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  What type of job is this?
                </h3>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 justify-start">
                    <Icons.Clock className="mr-2 h-4 w-4" />
                    Ongoing
                  </Button>
                  <Button variant="outline" className="flex-1 justify-start">
                    <Icons.DollarSign className="mr-2 h-4 w-4" />
                    One-time
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  How do you want to pay for this ongoing job?
                </h3>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    Hourly
                  </Button>
                  <Button variant="default" className="flex-1">
                    Weekly
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Monthly
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="min-budget"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Min. weekly budget
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="min-budget"
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="2,000"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      / wk
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="max-budget"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Max. weekly budget
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="max-budget"
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="4,000"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      / wk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Job Description</AccordionTrigger>
          <AccordionContent>
            <CreateJobForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default PageClient;
