"use client";

import { Badge } from "@gigflow/ui/badge";
import { Button } from "@gigflow/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@gigflow/ui/card";
import { Icons } from "@gigflow/ui/icons";
import Image from "next/image";

function PageClient() {
  return (
    <div>
      {/* Profile Header Card */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800"
            >
              INCOMPLETE
            </Badge>
            <div>
              <h2 className="text-2xl font-semibold">Axel Mylle</h2>
              <p className="text-muted-foreground">Frontend Engineer</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">$100 - $150/Hr</Badge>
              <Badge variant="secondary">Ypres, Belgium</Badge>
            </div>
            <Button variant="default" className="gap-2">
              <Icons.Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Skills Card */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="secondary">Frontend Engineer</Badge>
            <Badge variant="secondary">Web Developer</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">UI/UX</Badge>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Icons.CubeSettings className="h-4 w-4 text-muted-foreground" />
              <span>contact@axelmylle.dev</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Globe className="h-4 w-4 text-muted-foreground" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Ypres, Belgium</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">E-commerce Platform Redesign</h3>
            <p className="text-sm text-muted-foreground">
              Led the frontend overhaul of an e-commerce platform, enhancing
              UI/UX with meticulous attention to detail, resulting in improved
              user engagement.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Frontend Engineer</Badge>
              <Badge variant="secondary">Web Developer</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Responsive Portfolio Website</h3>
            <p className="text-sm text-muted-foreground">
              Designed and developed a sleek, responsive portfolio website that
              showcased their ability to create detailed and visually appealing
              user interfaces.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Frontend Engineer</Badge>
              <Badge variant="secondary">Web Developer</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PageClient;
