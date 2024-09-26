import { CardList } from "@v1/ui/card-list";
import { useMediaQuery } from "@v1/ui/hooks";
import { JobTitleColumn } from "./job-title-column";
// import { useContext } from "react";
// import { useAddEditLinkModal } from "../modals/add-edit-link-modal";
// import { LinkTitleColumn } from "./job-title-column";
// import { LinkDetailsColumn } from "./link-details-column";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
}

export function JobCard({ job }: { job: Job }) {
  const { isMobile } = useMediaQuery();

  //   const { showHoverStates } = useContext(LinksListContext);

  //   const { setShowAddEditLinkModal, AddEditLinkModal } = useAddEditLinkModal({
  //     props: link,
  //   });

  return (
    <>
      {/* <AddEditLinkModal /> */}
      <CardList.Card
        key={job.id}
        // onClick={isMobile ? undefined : () => setShowAddEditLinkModal(true)}
        innerClassName="flex items-center gap-5 sm:gap-8 md:gap-12 text-sm"
        hoverStateEnabled={false}
      >
        <div className="min-w-0 grow">
          <JobTitleColumn job={job} />
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-gray-900">{job.salary}</p>
        </div>
      </CardList.Card>
    </>
  );
}
