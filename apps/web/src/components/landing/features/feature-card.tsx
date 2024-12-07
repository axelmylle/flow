import { Button } from "@gigflow/ui/button";
import Link from "next/link";
import type React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
}

function FeatureCard({
  title,
  description,
  children,
  ctaText = "Learn more",
  ctaHref = "/",
}: FeatureCardProps) {
  return (
    <div className="relative flex flex-col gap-10 px-4 py-14 sm:px-12">
      <div className="relative h-64 overflow-hidden sm:h-[302px]">
        <div className="flex size-full flex-col justify-center">
          <div className="flex flex-col gap-2.5 [mask-image:linear-gradient(90deg,black_70%,transparent)]">
            {children}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col">
        <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
        <div className="mt-2 text-neutral-500 transition-colors [&_a]:font-medium [&_a]:text-neutral-600 [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-2 hover:[&_a]:text-neutral-800">
          <p>{description}</p>
        </div>
        {ctaHref && (
          <Button className="mt-6 w-fit" variant="outline">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default FeatureCard;
