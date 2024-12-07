"use client";

import { subscribeAction } from "@/actions/subscribe-action";
import { Button } from "@gigflow/ui/button";
import { Card } from "@gigflow/ui/card";
import { Icons } from "@gigflow/ui/icons";
import { Input } from "@gigflow/ui/input";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-48">
      {pending ? (
        <Icons.Loader className="size-4 animate-spin" />
      ) : (
        "Join waitlist"
      )}
    </Button>
  );
}

type Props = {
  group: string;
  placeholder: string;
  className?: string;
};

export function SubscribeForm({ group, placeholder, className }: Props) {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div>
      {isSubmitted ? (
        <p>Subscribed</p>
      ) : (
        <form
          className="flex flex-col sm:flex-row gap-2"
          action={async (formData) => {
            setSubmitted(true);
            await subscribeAction(formData, group);
          }}
        >
          <Input
            placeholder={placeholder}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            aria-label="Email address"
            required
            className={className}
          />

          <SubmitButton />
        </form>
      )}
    </div>
  );
}
