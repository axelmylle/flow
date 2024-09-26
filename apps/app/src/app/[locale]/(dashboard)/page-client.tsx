"use client";

import { SearchBoxPersisted } from "@/components/shared/search-box";
import { Filter } from "@v1/ui/filter";
import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";

import { useLinkFilters } from "@/components/jobs/use-job-filters";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { useRouter } from "next/navigation";
import React from "react";

function PageClient() {
  const router = useRouter();

  // const { AddEditLinkModal, AddEditLinkButton } = useAddEditLinkModal();
  // const { AddEditTagModal, setShowAddEditTagModal } = useAddEditTagModal();

  // const { slug } = useWorkspace();

  const { filters, activeFilters, onSelect, onRemove, onRemoveAll } =
    useLinkFilters();

  return (
    <div className="mt-10 flex w-full items-center pt-3">
      <MaxWidthWrapper className="flex flex-col gap-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
          <h1 className="order-1 text-2xl font-semibold tracking-tight text-black">
            Links
          </h1>
          <div className="order-4 flex w-full grow flex-wrap justify-end gap-2 md:order-2 md:w-auto">
            <div className="w-full md:w-56 lg:w-64">
              <SearchBoxPersisted
                // loading={isValidating}
                inputClassName="h-10"
              />
            </div>
            <div className="grow basis-0 md:grow-0">
              <Filter.Select
                filters={filters}
                activeFilters={activeFilters}
                onSelect={onSelect}
                onRemove={onRemove}
                className="w-full"
                emptyState={{
                  tagId: (
                    <div className="flex flex-col items-center gap-2 p-2 text-center text-sm">
                      <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-3">
                        <Icons.Tag className="h-8 w-8 text-gray-700" />
                      </div>
                      <p className="mt-2 font-medium text-gray-950">
                        No tags found
                      </p>
                      <p className="mx-auto mt-1 w-full max-w-[180px] text-gray-700">
                        Add tags to organize your links
                      </p>
                      <div>
                        <Button
                          className="mt-1 h-8"
                          // onClick={() => setShowAddEditTagModal(true)}
                        >
                          add a tag
                        </Button>
                      </div>
                    </div>
                  ),
                  domain: (
                    <div className="flex flex-col items-center gap-2 p-2 text-center text-sm">
                      <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-3">
                        <Icons.Tag className="h-8 w-8 text-gray-700" />
                      </div>
                      <p className="mt-2 font-medium text-gray-950">
                        No domains found
                      </p>
                      <p className="mx-auto mt-1 w-full max-w-[180px] text-gray-700">
                        Add a custom domain to match your brand
                      </p>
                      <div>
                        <Button
                          className="mt-1 h-8"
                          // onClick={() =>
                          //   router.push(`/${slug}/settings/domains`)
                          // }
                        >
                          add a domain
                        </Button>
                      </div>
                    </div>
                  ),
                }}
              />
            </div>
            <div className="grow basis-0 md:grow-0">
              {/* <LinkDisplay /> */}LinkDisplay
            </div>
          </div>
          <div className="order-3 flex gap-x-2">
            <div className="grow-0">
              {/* <AddEditLinkButton /> */}AddEditLinkButton
            </div>
            {/* <MoreLinkOptions /> */}MoreLinkOptions
          </div>
        </div>
        <Filter.List
          filters={filters}
          activeFilters={activeFilters}
          onRemove={onRemove}
          onRemoveAll={onRemoveAll}
        />
      </MaxWidthWrapper>
    </div>
  );
}

export default PageClient;
