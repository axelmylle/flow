"use client";

import { Button } from "@gigflow/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gigflow/ui/card";
import { Icons } from "@gigflow/ui/icons";
import { Input } from "@gigflow/ui/input";
import Image from "next/image";
import { useState } from "react";

export function InviteClientCard() {
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    // Implement the invite logic here
    console.log("Inviting client:", email);
    setEmail("");
  };

  return (
    <Card className="relative">
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <Image
          src="/assets/tips/insights.jpg"
          alt="Freelancer"
          fill
          className="object-cover transition-transform duration-400 group-hover:scale-110"
        />
        <div className="absolute inset-0 " />
      </div>
      <CardHeader className="relative">
        <CardTitle className="text-xl font-semibold">
          Earn when you invite your clients
        </CardTitle>
      </CardHeader>
      <CardContent className=" relative">
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
              1
            </span>
            <span>
              Invite clients to Contra via email, projects, and invoices.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
              2
            </span>
            <span>
              Your client completes a $500+ project with any freelancer.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
              3
            </span>
            <span>You get rewarded. Every single time!</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="justify-end relative">
        <div className="flex items-center space-x-2">
          <Input
            type="email"
            placeholder="Client email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleInvite} className="whitespace-nowrap">
            Invite new client
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
