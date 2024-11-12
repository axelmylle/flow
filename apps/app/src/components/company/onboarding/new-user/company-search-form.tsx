"use client";

import {
  type companySearchFormValues,
  companySearchSchema,
} from "@/actions/company/schema";
import { createClient } from "@gigflow/supabase/client";
import { getCompaniesQuery } from "@gigflow/supabase/queries";
import type { Database } from "@gigflow/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@gigflow/ui/avatar";
import { Button } from "@gigflow/ui/button";
import { cn } from "@gigflow/ui/cn";
import { Combobox } from "@gigflow/ui/combobox";
import { Form, FormControl, FormField, FormItem } from "@gigflow/ui/form";
import { useMediaQuery } from "@gigflow/ui/hooks";
import { Icons } from "@gigflow/ui/icons";
import { toast, useToast } from "@gigflow/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type CompanySearchFormProps = {
  defaultValues: companySearchFormValues;
  onSuccess?: (companyId: string) => void;
  onCreate?: () => void;
};

export function CompanySearchForm({
  defaultValues,
  onSuccess,
  onCreate,
}: CompanySearchFormProps) {
  const form = useForm<companySearchFormValues>({
    resolver: zodResolver(companySearchSchema),
  });

  const handleSubmit = async (data: companySearchFormValues) => {
    console.log(data);
    if (data.company_id) {
      onSuccess?.(data.company_id);
    } else {
      toast({
        title: "Please select or create a company",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("flex flex-col space-y-6 text-left")}
      >
        <div>
          <FormField
            control={form.control}
            name="company_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AvailableCompaniesSelect
                    onCreate={onCreate}
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

        <Button type="submit">Continue</Button>
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

export function AvailableCompaniesSelect({
  selectedId,
  onSelect,
  onCreate,
}: Props) {
  const { toast } = useToast();
  const supabase = createClient();
  const [data, setData] = useState<
    Database["public"]["Tables"]["companies"]["Row"][]
  >([]);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState<Option | undefined>();

  useEffect(() => {
    const foundCompany = data?.find((company) => company?.id === selectedId);

    if (foundCompany) {
      setValue({ id: foundCompany.id, name: foundCompany.name });
    }
  }, [selectedId]);

  const handleSelect = (selected: Option) => {
    setValue(selected);
    onSelect(selected);
  };

  const fetchProjects = async () => {
    setLoading(true);
    console.log(value?.name);
    const { data: companiesData } = await getCompaniesQuery(supabase, {
      search: {
        query: value?.name,
      },
    });
    setLoading(false);
    setData(companiesData);

    const foundCompany = companiesData?.find(
      (company) => company?.id === selectedId,
    );

    if (foundCompany) {
      setValue({ id: foundCompany.id, name: foundCompany.name });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const options = data?.map((item) => ({
    id: item.id,
    name: item.name,
    component: () => (
      <div className="flex items-center gap-3 py-2 px-3 w-full">
        <Avatar className="h-10 w-10">
          <AvatarImage src={item.logo_url!} />
          <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm text-foreground truncate">
            {item.name}
          </span>
          {item.description && (
            <span className="text-xs text-muted-foreground truncate">
              {item.description}
            </span>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <Combobox
      key={value?.id}
      placeholder="Search or create project"
      classNameList="border-none rounded-md"
      className="w-full bg-transparent px-12 border py-3 rounded-md bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
      onSelect={handleSelect}
      options={options}
      CreateComponent={({ value }) => (
        <div
          className="flex items-center gap-2 py-2 px-3 w-full hover:bg-secondary/50 cursor-pointer"
          onClick={onCreate}
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary">
            <Icons.Plus className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-medium text-sm">
            Create &quot;{value}&quot;
          </span>
        </div>
      )}
      value={value}
      isLoading={isLoading}
      onCreate={() => {
        onCreate?.();
      }}
    />
  );
}
