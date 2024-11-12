"use client";

import { deleteExperienceAction } from "@/actions/freelancer/experience/delete-experience-action";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@gigflow/ui/alert-dialog";
import { Button } from "@gigflow/ui/button";
import { DropdownMenuItem } from "@gigflow/ui/dropdown-menu";
import { toast } from "@gigflow/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";

function DeleteExperienceButton({ experienceId }: { experienceId: string }) {
  const deleteExperience = useAction(deleteExperienceAction, {
    onSuccess: () =>
      toast({
        title: "Experience removed.",
        duration: 3500,
        variant: "success",
      }),
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Experience</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete this experience.
              <p className="mt-4">Are you sure you want to continue?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteExperience.status === "executing"}
              onClick={() =>
                deleteExperience.execute({
                  id: experienceId,
                })
              }
            >
              {deleteExperience.status === "executing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Confirm"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteExperienceButton;
