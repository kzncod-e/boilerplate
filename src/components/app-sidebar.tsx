// "use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  //   const { open } = useSidebar();
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/tren-berita-nasional"
          className={cn("flex flex-row gap-3 items-center pt-3 px-2", "px-0")}
        >
          <div className="flex aspect-square size-8 items-center justify-center object-contain bg-white text-primary">
            {/* <Image src={logo} alt="Logo" width={500} height={500} /> */}
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight text-primary dark:text-white">
            <span className="truncate text-[1.1rem] font-semibold">
              Optimasi
            </span>
            <span className="truncate text-xs text-[1.1rem] opacity-90">
              Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="text-[1rem]">Menu</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
