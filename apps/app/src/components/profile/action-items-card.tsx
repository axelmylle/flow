"use client";

import { Button } from "@gigflow/ui/button";
import { Card, CardContent, CardHeader } from "@gigflow/ui/card";
import { cn } from "@gigflow/ui/cn";
import { Icons } from "@gigflow/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export function ActionItemsCard() {
  const { slug } = useParams() as { slug: string };

  const tasks = useMemo(() => {
    return [
      {
        display: "Complete your profile",
        cta: `/onboarding`,
        checked: false, //linksCount > 0,
      },
      {
        display: "Apply on your first job",
        cta: `/settings/domains`,
        checked: true, //domainsCount && domainsCount > 0,
      },
      {
        display: "Complete your first assessment",
        cta: `/assessments`,
        checked: true, //(users && users.length > 1) || (invites && invites.length > 0),
      },
    ];
  }, [slug]);

  const [isOpen, setIsOpen] = useState(false);

  const uncompletedTasks = tasks.filter((task) => !task.checked).length;

  return (
    <Card>
      <CardHeader>
        Your action items{" "}
        <div className="bg-red-500 text-white flex justify-center items-center text-sm rounded-full size-5">
          {uncompletedTasks}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 w-full flex justify-center">
          <div className="grid divide-y divide-gray-200 ">
            {tasks.map(({ display, cta, checked }) => {
              return (
                <Link key={display} href={cta} onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center justify-between gap-4 py-4 sm:gap-10">
                    <div className="flex items-center gap-2">
                      {checked ? (
                        <Icons.CheckCircleFill className="size-5 text-green-500" />
                      ) : (
                        <Icons.CircleDotted className="size-5 text-gray-400" />
                      )}
                      <p
                        className={cn(
                          "text-sm text-gray-400",
                          !checked && " text-gray-800",
                        )}
                      >
                        {display}
                      </p>
                    </div>
                    {!checked && (
                      <div className="mr-5">
                        <Icons.ExpandingArrow className="text-gray-500" />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
