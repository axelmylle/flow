import { Table } from "@/components/freelancers/tables";
import { JobDetail } from "@/components/jobs/job-detail";
import { PageContent } from "@/components/layout/page-content";
import { Card, CardContent } from "@gigflow/ui/card";
import { Icons } from "@gigflow/ui/icons";
import { MaxWidthWrapper } from "@gigflow/ui/max-width-wrapper";
import type { Metadata } from "next";
import JobDetailPageHeader from "./page-header";
import { PageViewsChartCard } from "./page-views-chart-card";

export const metadata: Metadata = {
  title: "Job Detail | Gigflow",
};

// Mock job data
const mockJob = {
  id: "1",
  title: "Senior Product Designer",
  company: "TechInnovate",
  companyLogo: "https://logo.clearbit.com/websolutions.com",
  description: `
    <h4><strong>About TechInnovate</strong></h4>
    <p>TechInnovate is a leading software company that's revolutionizing the way businesses interact with technology. We're on a mission to create intuitive, powerful tools that make work easier and more efficient for everyone.</p>
    
    <h4><strong>About the role</strong></h4>
    <p>We're seeking a Senior Product Designer to join our growing team. In this role, you'll be at the forefront of designing user-centric solutions that solve complex problems for our clients. You'll work closely with our product and engineering teams to bring innovative ideas to life.</p>
    
    <h4><strong>What you'll do</strong></h4>
    <ul>
      <li>Lead the design process from concept to execution for new features and products</li>
      <li>Conduct user research and usability testing to inform design decisions</li>
      <li>Create wireframes, prototypes, and high-fidelity designs</li>
      <li>Collaborate with cross-functional teams to ensure seamless implementation of designs</li>
      <li>Mentor junior designers and contribute to the growth of the design team</li>
    </ul>
    
    <h4><strong>What you bring</strong></h4>
    <ul>
      <li>5+ years of experience in product design, preferably in SaaS or enterprise software</li>
      <li>Strong portfolio showcasing your design process and problem-solving skills</li>
      <li>Expertise in design tools such as Figma, Sketch, or Adobe Creative Suite</li>
      <li>Experience with design systems and component-based design</li>
      <li>Excellent communication and collaboration skills</li>
    </ul>
    
    <h4><strong>Benefits</strong></h4>
    <ul>
      <li>Competitive salary and equity package</li>
      <li>Flexible work arrangements, including remote options</li>
      <li>Health, dental, and vision insurance</li>
      <li>401(k) with company match</li>
      <li>Professional development budget</li>
      <li>Generous paid time off and parental leave</li>
    </ul>
    
    <p>At TechInnovate, we're committed to creating an inclusive workplace that celebrates diversity and fosters innovation. We encourage applications from candidates of all backgrounds and experiences.</p>
  `,
  location: "San Francisco, CA (Hybrid)",
  salary: "$120,000 - $180,000 per year",
  contractType: "Full-time",
  postedDate: "2023-07-15",
  requiredSkills: [
    "UI/UX Design",
    "Figma",
    "User Research",
    "Prototyping",
    "Design Systems",
  ],
  companyRating: 4,
  applicationUrl: "https://techinnovate.com/careers/senior-product-designer",
};

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = mockJob;

  return (
    <PageContent>
      <MaxWidthWrapper className="flex flex-col gap-y-3">
        <JobDetailPageHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  All Applicants
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-semibold">240</span>
                  <span className="text-xs text-green-600 flex items-center">
                    <Icons.TrendingUp className="w-3 h-3 mr-1" />
                    16 vs. last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">In-Review</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-semibold">32</span>
                  <span className="text-xs text-green-600 flex items-center">
                    <Icons.TrendingUp className="w-3 h-3 mr-1" />6 vs. last
                    month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Interview</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-semibold">18</span>
                  <span className="text-xs text-red-600 flex items-center">
                    <Icons.TrendingDown className="w-3 h-3 mr-1" />
                    32 vs. last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Hired</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-semibold">4</span>
                  <span className="text-xs text-red-600 flex items-center">
                    <Icons.TrendingDown className="w-3 h-3 mr-1" />
                    20 vs. last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 ">
          <PageViewsChartCard />
        </div>
        <div>
          <Table filter={{}} page={1} sort={{}} query={""} />
        </div>
        {/* <JobDetail job={job} /> */}
      </MaxWidthWrapper>
    </PageContent>
  );
}
