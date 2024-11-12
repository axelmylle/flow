"use client";

import { TabSelect } from "@gigflow/ui/tab-select";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

export default function MyProfileHeader() {
  const router = useRouter();

  const selectedLayoutSegment = useSelectedLayoutSegment();
  const page = selectedLayoutSegment === null ? "" : selectedLayoutSegment;

  return (
    <div className="border-b border-gray-200">
      {/* <h1 className="text-2xl font-semibold tracking-tight text-black">
        Library
      </h1>
      <p className="mb-2 mt-2 text-base text-neutral-600">
        Manage and organize your links with customizable tags and UTM templates.
      </p> */}
      <TabSelect
        variant="accent"
        className="text-lg"
        options={[
          { id: "experiences", label: "Experiences" },
          { id: "services", label: "Services" },
          { id: "educations", label: "Educations" },
        ]}
        selected={page}
        onSelect={(id) => {
          router.push(`/my-profile/${id}`);
        }}
      />
    </div>
  );
}
