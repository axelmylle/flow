"use client";

import { Drawer, DrawerContent } from "@gigflow/ui/drawer";
import { useMediaQuery } from "@gigflow/ui/hooks";
import { Sheet, SheetContent } from "@gigflow/ui/sheet";

import { ProfileSidebarCard } from "@/components/profile/my-profile/profile-sidebar-card";
import type { Database } from "@gigflow/supabase/types";

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  user: Database["public"]["Tables"]["users"]["Row"];
  freelancer: Database["public"]["Tables"]["freelancers"]["Row"];
};

export function FreelancerDetailSheet({
  setOpen,
  isOpen,
  freelancer,
  user,
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent>
          {user && <ProfileSidebarCard user={user} {...freelancer} />}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          setOpen(false);
        }
      }}
    >
      <DrawerContent className="p-6">
        {user && <ProfileSidebarCard user={user} />}
      </DrawerContent>
    </Drawer>
  );
}
