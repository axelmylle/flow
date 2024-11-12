"use client";

import type { updateClientFormValues } from "@/actions/client/schema";
import { updateClientAction } from "@/actions/client/update-client-action";
import { Button } from "@gigflow/ui/button";
import { cn } from "@gigflow/ui/cn";
import { Combobox } from "@gigflow/ui/combobox";
import { Form, FormControl, FormField, FormItem } from "@gigflow/ui/form";
import { useMediaQuery } from "@gigflow/ui/hooks";
import { useAction } from "next-safe-action/hooks";

import { createProjectAction } from "@/actions/project/create-project-action";
import { createClient } from "@gigflow/supabase/client";
import {
  getClientsQuery,
  getTrackerProjectsQuery,
} from "@gigflow/supabase/queries";

import { useToast } from "@gigflow/ui/use-toast";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

type FormData = updateClientFormValues;

export function SearchMyCompany({
  onSuccess,
  onCreate,
  className,
}: {
  onSuccess?: (data: FormData) => void;
  onCreate?: () => void;
  className?: string;
}) {
  const form = useForm<FormData>();
  const action = useAction(updateClientAction);
  const [showCreateClient, setShowCreateClient] = useState<boolean>(false);

  const { isMobile } = useMediaQuery();

  const handleSubmit = async (data: FormData) => {
    await action.execute({
      ...data,
    });
    onSuccess?.(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("flex flex-col space-y-6 text-left", className)}
      >
        <div>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <TrackerSelectProject
                    onCreate={onCreate}
                    selectedId={field.value}
                    onSelect={(selected) => {
                      if (selected) {
                        field.onChange(selected.id);
                        // onSelectProject(selected);
                      }
                    }}
                  />
                </FormControl>
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
  onCreate?: () => void;
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
      onCreate={() => {
        onCreate?.();
      }}
    />
  );
}
