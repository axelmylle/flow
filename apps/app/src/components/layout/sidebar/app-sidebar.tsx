"use client";

import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  Code2,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
} from "lucide-react";

import { NavMain } from "@v1/ui/nav-main";
import { NavSecondary } from "@v1/ui/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@v1/ui/sidebar";

import { NavUser } from "./nav-user";
import { SkillsProgressCard } from "./skills-card";
const data = {
  navMain: [
    {
      title: "Jobs",
      url: "/jobs",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Starred",
          url: "#",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
};

export function AppSidebar({ user }: { user: any }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <svg
          className="my-2 mx-1.5"
          width="46"
          height="24"
          viewBox="0 0 46 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 2H14V13.9332L14.0003 13.9731L14.0003 14C14.0003 14.0223 14.0002 14.0445 14 14.0668V21H11V19.7455C9.86619 20.5362 8.48733 21 7.00016 21C3.13408 21 0 17.866 0 14C0 10.134 3.13408 7 7.00016 7C8.48733 7 9.86619 7.46375 11 8.25452V2ZM7 17.9998C9.20914 17.9998 11 16.209 11 13.9999C11 11.7908 9.20914 10 7 10C4.79086 10 3 11.7908 3 13.9999C3 16.209 4.79086 17.9998 7 17.9998ZM32 2H35V8.25474C36.1339 7.46383 37.5128 7 39.0002 7C42.8662 7 46.0003 10.134 46.0003 14C46.0003 17.866 42.8662 21 39.0002 21C35.1341 21 32 17.866 32 14V2ZM39 17.9998C41.2091 17.9998 43 16.209 43 13.9999C43 11.7908 41.2091 10 39 10C36.7909 10 35 11.7908 35 13.9999C35 16.209 36.7909 17.9998 39 17.9998ZM19 7H16V14C16 14.9192 16.1811 15.8295 16.5329 16.6788C16.8846 17.5281 17.4003 18.2997 18.0503 18.9497C18.7003 19.5997 19.472 20.1154 20.3213 20.4671C21.1706 20.8189 22.0809 21 23.0002 21C23.9194 21 24.8297 20.8189 25.679 20.4671C26.5283 20.1154 27.3 19.5997 27.95 18.9497C28.6 18.2997 29.1157 17.5281 29.4675 16.6788C29.8192 15.8295 30.0003 14.9192 30.0003 14H30V7H27V14C27 15.0608 26.5785 16.0782 25.8284 16.8283C25.0783 17.5784 24.0609 17.9998 23 17.9998C21.9391 17.9998 20.9217 17.5784 20.1716 16.8283C19.4215 16.0782 19 15.0608 19 14V7Z"
            fill="black"
          />
        </svg>
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} searchResults={data.searchResults} />
        </SidebarItem>
        <SidebarItem>
          <SkillsProgressCard />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
