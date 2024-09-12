"use client";

import { Button } from "@v1/ui/button";
import { useLocalStorage, useMediaQuery } from "@v1/ui/hooks";
import { Icons } from "@v1/ui/icons";
import { Popover, ResponsivePopover } from "@v1/ui/popover";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  type HTMLAttributes,
  type Ref,
  forwardRef,
  useMemo,
  useState,
} from "react";

export function OnboardingButton() {
  const { isMobile } = useMediaQuery();
  const [hideForever, setHideForever] = useLocalStorage(
    "onboarding-hide-forever",
    false,
  );

  return !isMobile && !hideForever ? (
    <OnboardingButtonInner onHideForever={() => setHideForever(true)} />
  ) : null;
}

function OnboardingButtonInner({
  onHideForever,
}: {
  onHideForever: () => void;
}) {
  const { slug } = useParams() as { slug: string };

  // const { data: domainsCount, loading: domainsLoading } = useDomainsCount();
  // const { data: linksCount, loading: linksLoading } = useLinksCount({
  //   ignoreParams: true,
  // });
  // const { users, loading: usersLoading } = useUsers();
  // const { users: invites, loading: invitesLoading } = useUsers({
  //   invites: true,
  // });

  const loading = false;

  const tasks = useMemo(() => {
    return [
      {
        display: "Complete your profile",
        cta: `/onboarding`,
        checked: false, //linksCount > 0,
      },
      {
        display: "Apply on your first job",
        cta: `/${slug}/settings/domains`,
        checked: true, //domainsCount && domainsCount > 0,
      },
      {
        display: "Complete your first assessment",
        cta: `/${slug}/assessments`,
        checked: true, //(users && users.length > 1) || (invites && invites.length > 0),
      },
    ];
  }, [slug]);

  const [isOpen, setIsOpen] = useState(false);

  const completedTasks = tasks.filter((task) => task.checked).length;

  return loading || completedTasks === tasks.length ? null : (
    <ResponsivePopover
      align="end"
      popoverContentClassName="rounded-xl"
      content={
        <div>
          <div className="rounded-t-xl bg-black p-4 text-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-base font-medium">Getting Started</span>
                <p className="mt-1 text-sm text-gray-300">
                  Get familiar with Dub by completing the{" "}
                  <br className="hidden sm:block" />
                  following tasks
                </p>
              </div>
              <div className="flex items-center gap-1">
                <OnboardingMenu
                  onHideForever={() => {
                    onHideForever();
                    setIsOpen(false);
                  }}
                />
                <MiniButton onClick={() => setIsOpen(false)}>
                  <ChevronDown className="size-4" />
                </MiniButton>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="grid divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
              {tasks.map(({ display, cta, checked }) => {
                return (
                  <Link
                    key={display}
                    href={cta}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="group flex items-center justify-between gap-3 p-3 sm:gap-10">
                      <div className="flex items-center gap-2">
                        {checked ? (
                          <Icons.CheckCircleFill className="size-5 text-green-500" />
                        ) : (
                          <Icons.CircleDotted className="size-5 text-gray-400" />
                        )}
                        <p className="text-sm text-gray-800">{display}</p>
                      </div>
                      <div className="mr-5">
                        <Icons.ExpandingArrow className="text-gray-500" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      }
      openPopover={isOpen}
      setOpenPopover={setIsOpen}
    >
      <button
        type="button"
        className="animate-slide-up-fade -mt-1 flex h-12 flex-col items-center justify-center rounded-full border border-gray-950 bg-gray-950 px-6 text-xs font-medium leading-tight text-white shadow-md transition-all [--offset:10px] hover:bg-gray-800 hover:ring-4 hover:ring-gray-200"
      >
        <span>Getting Started</span>
        <span className="text-gray-400">
          {Math.round((completedTasks / tasks.length) * 100)}% complete
        </span>
      </button>
    </ResponsivePopover>
  );
}

const MiniButton = forwardRef(
  (props: HTMLAttributes<HTMLButtonElement>, ref: Ref<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className="rounded-md px-1 py-1 text-gray-400 transition-colors hover:bg-white/20 active:text-white"
      />
    );
  },
);

function OnboardingMenu({ onHideForever }: { onHideForever: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ResponsivePopover
      align="end"
      content={
        <div className="p-1">
          <Button
            onClick={onHideForever}
            variant="outline"
            text="Dismiss forever"
            className="h-9"
          />
        </div>
      }
      openPopover={isOpen}
      setOpenPopover={setIsOpen}
    >
      <MiniButton>
        <Icons.ThreeDots className="size-4" />
      </MiniButton>
    </ResponsivePopover>
  );
}
