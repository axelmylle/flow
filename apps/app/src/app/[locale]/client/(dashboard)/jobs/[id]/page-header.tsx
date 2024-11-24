"use client";

import { TabSelect } from "@gigflow/ui/tab-select";
import {
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

export default function LibraryHeader() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const selectedLayoutSegment = useSelectedLayoutSegment();
  const page = selectedLayoutSegment === null ? "" : selectedLayoutSegment;

  return (
    <div className="border-b border-gray-200">
      <h1 className="text-2xl font-semibold tracking-tight text-black">
        Job Detail
      </h1>
      <p className="mb-2 mt-2 text-base text-neutral-600">
        Manage and organize your Job.
      </p>
      <TabSelect
        variant="accent"
        options={[
          { id: "discover", label: "Discover" },
          { id: "interview", label: "Interview" },
          { id: "hired", label: "Hired" },
          { id: "settings", label: "Settings" },
        ]}
        selected={page}
        onSelect={(id) => {
          router.push(`/client/jobs/${jobId}/${id}`);
        }}
      />
    </div>
  );
}
