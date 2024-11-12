"use client";

import type { CreateExperienceFormValues } from "@/actions/freelancer/experience/schema";
import { useExperienceForm } from "@/app/[locale]/(configurators)/experiences/new/experience-form-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gigflow/ui/accordion";
import { Button } from "@gigflow/ui/button";
import { Editor } from "@gigflow/ui/editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gigflow/ui/form";
import { Icons } from "@gigflow/ui/icons";
import { Input } from "@gigflow/ui/input";
import { SubmitButton } from "@gigflow/ui/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(32),
  skills: z.array(z.string()),
  tools: z.array(z.string()),
});

export function NewExperienceForm() {
  const form = useFormContext<CreateExperienceFormValues>();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    router.push("/experiences/new/details");
  };

  return (
    <div>
      <div className="h-[calc(100vh-180px)] scrollbar-hide overflow-auto">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  autoFocus
                  autoComplete="off"
                  placeholder="Untitled project"
                  className="text-3xl leading-10 tracking-[-0.5px] h-20 w-auto font-semibold border-none bg-transparent focus-visible:ring-0 px-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Accordion type="multiple" className="space-y-6">
            <AccordionItem defaultChecked value="general">
              <AccordionTrigger>General</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg">
                      <span className="mr-2">
                        <Icons.Plus className="size-4" />
                      </span>
                      Skills
                    </Button>
                    <Button variant="outline" size="lg">
                      <span className="mr-2">
                        <Icons.Plus className="size-4" />
                      </span>
                      Tools
                    </Button>
                    <Button variant="outline" size="lg">
                      <span className="mr-2">
                        <Icons.Plus className="size-4" />
                      </span>
                      Client
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills">
              <AccordionTrigger>Skills</AccordionTrigger>
              <AccordionContent>
                <div className="h-full">
                  <Editor content="Enter text or type '/' for commands" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Button onClick={() => onSubmit(form.getValues())}>Next</Button>
    </div>
  );
}
