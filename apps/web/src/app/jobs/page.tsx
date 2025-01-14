import { getJobs } from "@gigflow/supabase/cached-queries";
import { JobList } from "./list";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Join our team to build modern web applications using React and TypeScript",
    company: "Tech Corp",
    companyLogo: "https://logo.clearbit.com/barco.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    category: "Engineering",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: new Date("2024-03-01").toISOString(),
    deadline: new Date("2024-04-01").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/1",
  },
  {
    id: 2,
    title: "Product Designer",
    requiredSkills: ["Figma", "UI/UX", "Design Systems"],
    description:
      "Create beautiful and intuitive user experiences for our products",
    company: "Design Studio",
    companyLogo: "https://logo.clearbit.com/kbc.be",
    location: "Remote",
    salary: "$90,000 - $140,000",
    type: "Full-time",
    experience: "3+ years",
    category: "Design",
    skills: ["Figma", "UI/UX", "Design Systems"],
    postedAt: new Date("2024-03-02").toISOString(),
    deadline: new Date("2024-04-02").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/2",
  },
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Join our team to build modern web applications using React and TypeScript",
    company: "Tech Corp",
    companyLogo: "https://logo.clearbit.com/barco.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    category: "Engineering",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: new Date("2024-03-01").toISOString(),
    deadline: new Date("2024-04-01").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/1",
  },
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Join our team to build modern web applications using React and TypeScript",
    company: "Tech Corp",
    companyLogo: "https://logo.clearbit.com/barco.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    category: "Engineering",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: new Date("2024-03-01").toISOString(),
    deadline: new Date("2024-04-01").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/1",
  },
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Join our team to build modern web applications using React and TypeScript",
    company: "Tech Corp",
    companyLogo: "https://logo.clearbit.com/barco.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    category: "Engineering",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: new Date("2024-03-01").toISOString(),
    deadline: new Date("2024-04-01").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/1",
  },
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Join our team to build modern web applications using React and TypeScript",
    company: "Tech Corp",
    companyLogo: "https://logo.clearbit.com/barco.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    category: "Engineering",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: new Date("2024-03-01").toISOString(),
    deadline: new Date("2024-04-01").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/1",
  },
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Join our team to build modern web applications using React and TypeScript",
    company: "Tech Corp",
    companyLogo: "https://logo.clearbit.com/barco.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    category: "Engineering",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: new Date("2024-03-01").toISOString(),
    deadline: new Date("2024-04-01").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/1",
  },
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "Join our team to build modern web applications using React and TypeScript",
    company: "Tech Corp",
    companyLogo: "https://logo.clearbit.com/barco.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "5+ years",
    requiredSkills: ["React", "TypeScript", "Next.js"],
    category: "Engineering",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: new Date("2024-03-01").toISOString(),
    deadline: new Date("2024-04-01").toISOString(),
    status: "active",
    applicationUrl: "https://example.com/jobs/1",
  },
];

export default async function BlogPage() {
  const { data: jobsData } = await getJobs({
    from: 0,
    to: 10,
  });

  console.log(jobsData);
  return (
    <div className="mx-auto w-full px-3 relative max-w-screen-lg lg:px-4 xl:px-0">
      {/* Background SVG Pattern */}
      <svg
        className="pointer-events-none absolute inset-[unset] left-1/2 top-0 h-80 w-full -translate-x-1/2 text-neutral-300 [mask-image:radial-gradient(70%_60%_at_50%_60%,black_30%,transparent)] max-sm:opacity-50"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="35"
            y="43"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect fill="url(#grid-pattern)" width="100%" height="100%" />
      </svg>

      {/* Content */}
      <div className="relative pb-9 pt-16 sm:pb-20">
        <h1 className="mt-5 flex items-center font-display animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in [animation-delay:100ms] text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15] text-left">
          Jobs
          <span className="ml-4 inline-grid rounded-md bg-[#f0f0f0] text-[#192226] items-center px-2 py-1 sm:text-2xl sm:leading-[1.15] font-semibold">
            25,000+
          </span>
        </h1>
        <p className="mt-5 text-neutral-500 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
          Find the best jobs for you
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative min-h-[50vh] border-t border-neutral-200 bg-gradient-to-b from-neutral-50">
        <div className="mx-auto w-full max-w-screen-lg py-10 ">
          <JobList jobs={jobsData} />
        </div>
      </div>
    </div>
  );
}
