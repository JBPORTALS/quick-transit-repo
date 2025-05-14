import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StarIcon, User2Icon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@qt/ui/bread-crumbs";
import { Separator } from "@qt/ui/seperator";
import { HStack } from "@qt/ui/stack";

import { api } from "~/trpc/server";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = (partnerId: string) => {
  const basePath = `/partners/v/${partnerId}`;
  return [
    {
      title: "Profile",
      href: basePath,
    },
    {
      title: "Packages",
      href: basePath + "/packages",
    },
  ];
};

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Fully filled stars
      stars.push(
        <StarIcon key={i} className="size-4 fill-amber-600 text-amber-600" />,
      );
    } else if (i === fullStars && decimalPart > 0) {
      // Partially filled star
      const gradientStyle = {
        background: `linear-gradient(to right, #d97706 ${decimalPart * 100}%, #e5e7eb ${decimalPart * 100}%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      };
      stars.push(
        <StarIcon
          key={i}
          className="size-4 text-gray-400"
          style={gradientStyle}
        />,
      );
    } else {
      // Empty stars
      stars.push(<StarIcon key={i} className="size-4 text-gray-400" />);
    }
  }

  return stars;
};

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const partnerDetails = await api.auth.getUserById({ id: params.id });
  const ratings = await api.reviews.getAverageRatingForPartner({
    partner_id: params.id,
  });
  const averateRating = Number(ratings?.averageRating ?? 0).toFixed(1) ?? 0;

  return (
    <div className="hidden space-y-6 pb-16 md:block">
      <Breadcrumb className="mb-0.5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/dashboard"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/partners"}>Partners</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{partnerDetails.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <HStack className="items-center">
        <Avatar className="size-20 overflow-hidden border-2">
          <AvatarImage src={partnerDetails.picture ?? ""} />
          <AvatarFallback className="bg-primary/20">
            <User2Icon className="mt-4 size-full scale-105 fill-primary text-transparent " />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {partnerDetails.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {partnerDetails.email}
          </p>
          <p
            className={
              "inline-flex items-center gap-3 align-bottom text-sm text-amber-600"
            }
          >
            <span className="flex items-center">
              {renderStars(Number(averateRating))}
            </span>
            {averateRating} {`(${ratings?.totalReviews ?? 0})`}
          </p>
        </div>
      </HStack>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems(params.id)} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
