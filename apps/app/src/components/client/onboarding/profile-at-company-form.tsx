"use client";

import type {
  createClientFormValues,
  updateClientFormValues,
  updateProfileAtCompanyFormValues,
} from "@/actions/client/schema";
import { updateClientAction } from "@/actions/client/update-client-action";
import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import { Combobox } from "@v1/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@v1/ui/form";
import { useMediaQuery } from "@v1/ui/hooks";
import { useAction } from "next-safe-action/hooks";

import { createProjectAction } from "@/actions/project/create-project-action";
import { createClient } from "@v1/supabase/client";
import { getClientsQuery, getTrackerProjectsQuery } from "@v1/supabase/queries";

import { toast, useToast } from "@v1/ui/use-toast";

import { useEffect, useState } from "react";

import { createClientAction } from "@/actions/client/create-client-action";
import { updateProfileAtCompanyAction } from "@/actions/client/update-profile-at-company-action";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { useForm } from "react-hook-form";

type FormData = updateProfileAtCompanyFormValues;

export function ProfileAtCompanyForm({
  onSuccess,

  className,
}: {
  onSuccess?: (data: FormData) => void;
  className?: string;
}) {
  const form = useForm<FormData>();
  const action = useAction(updateProfileAtCompanyAction, {
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });
  const [showCreateClient, setShowCreateClient] = useState<boolean>(false);

  const { isMobile } = useMediaQuery();

  const handleSubmit = async (data: FormData) => {
    await action.execute({
      ...data,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("flex flex-col space-y-6 text-left", className)}
      >
        <div className="mt-2 rounded-md shadow-sm">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  first name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  last name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Recruiter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  linkedin_url
                </FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2 rounded-md shadow-sm">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" loading={action.isExecuting}>
          Continue
        </Button>
      </form>
    </Form>
  );
}

type Props = {
  selectedId?: string;
  onSelect: (selected: Option) => void;
  onCreate: (project: { id: string; name: string }) => void;
};

type Option = {
  id: string;
  name: string;
};

export function TrackerSelectProject({
  selectedId,
  onSelect,
  onCreate,
}: Props) {
  const { toast } = useToast();
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState<Option | undefined>();

  useEffect(() => {
    const foundProject = data?.find((project) => project?.id === selectedId);

    if (foundProject) {
      setValue({ id: foundProject.id, name: foundProject.name });
    }
  }, [selectedId]);

  const handleSelect = (selected: Option) => {
    setValue(selected);
    onSelect(selected);
  };

  const createProject = useAction(createProjectAction, {
    onSuccess: ({ data: project }) => {
      onCreate?.(project);
      handleSelect(project);
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  const fetchProjects = async () => {
    setLoading(true);

    const { data: clientsData } = await getClientsQuery(supabase, {
      search: {
        query: "",
      },
    });
    console.log(clientsData);

    setLoading(false);
    setData(clientsData);

    const foundProject = clientsData?.find(
      (project) => project?.id === selectedId,
    );

    if (foundProject) {
      setValue({ id: foundProject.id, name: foundProject.name });
    }
  };

  useEffect(() => {
    if (!data.length && data.length !== 0) {
      fetchProjects();
    }
  }, [data]);

  return (
    <Combobox
      key={value?.id}
      placeholder="Search or create project"
      classNameList="-top-[4px] border-t-0 rounded-none rounded-b-md"
      className="w-full bg-transparent px-12 border py-3"
      onSelect={handleSelect}
      options={data}
      value={value}
      isLoading={isLoading}
      onCreate={(name) => createProject.execute({ name })}
    />
  );
}
