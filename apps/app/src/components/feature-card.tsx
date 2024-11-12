import { Button } from "@gigflow/ui/button";
import { Card } from "@gigflow/ui/card";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
  imageSrc: string;
}

export function FeatureCard({
  title,
  description,
  action,
  imageSrc,
}: FeatureCardProps) {
  return (
    <Card className="relative overflow-hidden p-6">
      <div className="mb-4 w-full flex justify-center">
        <Image
          src={imageSrc}
          alt=""
          width={120}
          height={80}
          className="h-20 w-auto"
        />
      </div>
      {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <Button asChild variant="outline" className="w-full">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    </Card>
  );
}
