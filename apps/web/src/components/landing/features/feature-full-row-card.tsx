import React from "react";

function FeatureFullRowCard() {
  return (
    <div>
      <div className="absolute left-1/2 top-1/3 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[50px] bg-[conic-gradient(from_270deg,#F4950C,#EB5C0C,transparent,transparent)]" />
      <div className="relative h-64 overflow-hidden sm:h-96">
        <a
          href="https://d.to/stats/try"
          target="_blank"
          className="group block size-full"
          rel="noreferrer"
        >
          <div className="size-full transition-[filter,opacity] duration-300 group-hover:opacity-70 group-hover:blur-[3px]">
            <div
              aria-hidden="true"
              className="size-full select-none [mask-image:linear-gradient(black_60%,transparent)]"
            >
              <div className="relative mx-3.5 h-full overflow-hidden rounded-t-xl border-x border-t border-neutral-200 shadow-[0_20px_20px_0_#00000017]"></div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center text-sm font-medium text-slate-900">
              View live demo{" "}
              <div className="group relative flex items-center">
                <svg
                  className="absolute transition-all group-hover:translate-x-1 group-hover:opacity-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
                  ></path>
                </svg>
                <svg
                  className="size-4 absolute opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
                  ></path>
                </svg>
              </div>
            </span>
          </div>
        </a>
      </div>
      <div className="relative flex flex-col">
        <h3 className="text-lg font-medium text-neutral-900">
          Freelancing doesn’t mean going solo.
        </h3>
        <div className="mt-2 text-neutral-500 transition-colors [&amp;_a]:font-medium [&amp;_a]:text-neutral-600 [&amp;_a]:underline [&amp;_a]:decoration-dotted [&amp;_a]:underline-offset-2 hover:[&amp;_a]:text-neutral-800">
          <p>
            Offers a personalized guide for starting and scaling a freelance
            career, covering admin, taxes, and client acquisition.
          </p>
        </div>
        <a
          className="mt-6 w-fit whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium leading-none text-neutral-900 transition-colors duration-75 outline-none hover:bg-neutral-50 focus-visible:border-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-900 active:bg-neutral-100"
          href="/help/article/dub-analytics"
        >
          Explore analytics
        </a>
      </div>
    </div>
  );
}

export default FeatureFullRowCard;
