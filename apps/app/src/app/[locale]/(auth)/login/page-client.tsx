"use client";

import { cn } from "@gigflow/ui/cn";
import { useRouterStuff } from "@gigflow/ui/hooks";
import { useSearchParams } from "next/navigation";
import ChooseRole from "./choose-role";
import { RegisterProvider, useRegisterContext } from "./context";
import LoginForm from "./form";

export default function LoginPageClient() {
  return (
    <RegisterProvider>
      <LoginFlow />
    </RegisterProvider>
  );
}

const LoginFlow = () => {
  const { step } = useRegisterContext();
  const searchParams = useSearchParams();

  const user_type = searchParams.get("user_type");

  if (user_type === null) {
    return (
      <div
        className={cn(
          "mx-auto flex w-full max-w-sm flex-col items-center",
          "animate-slide-up-fade [--offset:10px] [animation-duration:1s] [animation-fill-mode:both]",
        )}
      >
        <ChooseRole />
      </div>
    );
  }

  if (user_type?.includes("Freelancer") || user_type?.includes("Company")) {
    return (
      <div
        className={cn(
          "mx-auto flex w-full max-w-sm flex-col items-center",
          "animate-slide-up-fade [--offset:10px] [animation-duration:1s] [animation-fill-mode:both]",
        )}
      >
        <LoginForm />
      </div>
    );
  }
};
