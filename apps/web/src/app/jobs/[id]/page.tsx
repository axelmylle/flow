import { getJobs } from "@gigflow/supabase/cached-queries";
import type { Metadata } from "next";
import { JobDetail } from "./job-detail";

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
  const { data: jobData } = await getJobs({ id: params.id, to: 1, from: 1 });
  const job = jobData[0];
  return <JobDetail job={job} />;
}
