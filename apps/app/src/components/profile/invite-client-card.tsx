"use client";

import { Button } from "@v1/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@v1/ui/card";
import { Icons } from "@v1/ui/icons";
import { Input } from "@v1/ui/input";
import { useState } from "react";

export function InviteClientCard() {
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    // Implement the invite logic here
    console.log("Inviting client:", email);
    setEmail("");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Earn when you invite your clients
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="link" className="text-purple-600">
          Learn more <Icons.ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
