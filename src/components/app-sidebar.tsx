"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import LogoutButton from "@/modules/auth/components/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {  ChevronsUpDown,  } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { NavProjects } from "@/modules/dashboard/components/nav-projects";
import { ROOT_NAVBAR } from "@/constants/dashboard";


export function AppSidebar() {
  //   const { open } = useSidebar();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/tren-berita-nasional"
          className={cn("flex flex-row gap-3 items-center pt-3 px-2", "px-0")}
        >
          <div className="flex aspect-square size-8 items-center justify-center object-contain bg-white text-primary">
            <Image src="" alt="Logo" width={500} height={500} />
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
        <NavProjects projects={ROOT_NAVBAR} isLoading={false} />
      </SidebarContent>
      <SidebarFooter >
        <SidebarMenu>

        <SidebarMenuItem>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="userAuth-[state=open]:bg-sidebar-accent userAuth-[state=open]:text-sidebar-accent-foreground"
            >
             <Avatar className="roundud">
        <AvatarImage className="object-cover! rounded-2xl" height={20} width={20} src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-normal">rehan</span>
                {/* <span className="truncate text-xs">{userAuth?.email}</span> */}
                <span className="truncate text-xs">rehan@gmail.com</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-60! ml-2 rounded-lg "
            side={"right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={"#"}
                    // alt={userAuth?.name}
                    className="!object-cover rounded-2xl! border-2"
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {/* <span className="truncate font-normal">{userAuth?.name}</span> */}
                  <span className="truncate font-normal">rehan</span>
                  {/* <span className="truncate text-xs">{userAuth?.email}</span> */}
                  <span className="truncate text-xs">rehan@gmail.com</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
        </SidebarMenu>  
      </SidebarFooter>
    </Sidebar>
  );
}
