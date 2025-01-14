"use client";

import { Card, CardContent } from "@gigflow/ui/card";
import { cn } from "@gigflow/ui/cn";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ChooseRole() {
  const router = useRouter();

  const handleRoleSelect = (role: "Freelancer" | "Company") => {
    router.push(`/login?user_type=${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="font-display text-3xl font-medium mb-8">
        What brings you to gigflow?
      </h1>
      <div className="grid md:grid-cols-2 gap-6  w-full">
        <Card
          className="group cursor-pointer min-w-52 relative overflow-hidden h-[300px] transition-transform duration-500 hover:scale-[1.02]"
          onClick={() => handleRoleSelect("Freelancer")}
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/3194518/pexels-photo-3194518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // You'll need to add these images
              alt="Freelancer"
              fill
              className="object-cover transition-transform duration-400 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <CardContent className="relative h-full flex flex-col justify-end p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">I'm a freelancer</h2>
            <p className="text-gray-200">
              Find work and manage your freelance career.
            </p>
          </CardContent>
        </Card>

        <Card
          className="group cursor-pointer min-w-52 relative overflow-hidden h-[300px] transition-transform duration-500 hover:scale-[1.02]"
          onClick={() => handleRoleSelect("Company")}
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/5989928/pexels-photo-5989928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // You'll need to add these images
              alt="Company"
              fill
              className="object-cover transition-transform duration-400 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <CardContent className="relative h-full flex flex-col justify-end p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">I'm hiring</h2>
            <p className="text-gray-200">Post jobs and manage freelancers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
