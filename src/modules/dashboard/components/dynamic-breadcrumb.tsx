"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROOT_NAVBAR } from "@/constants/sidebar";


export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Remove leading slash and split path into segments
  const segments = pathname.split("/").filter(Boolean);

  // Find the matching route from ROOT_NAVBAR
  const currentRoute = ROOT_NAVBAR.find(
    (route) => route.url === `/${segments[0]}`
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* {segments.length > 0 && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )} */}

        {currentRoute && (
          <>
            <BreadcrumbItem className="">
              <BreadcrumbLink href={currentRoute.url}>
                {currentRoute.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {segments.length > 1 && <BreadcrumbSeparator className="" />}
          </>
        )}

        {segments.length > 1 && (
          <BreadcrumbItem>
            <BreadcrumbPage>
              {segments[segments.length - 1]
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {segments.length === 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
