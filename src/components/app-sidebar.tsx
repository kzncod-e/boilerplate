"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import LogoutButton from "@/modules/auth/components/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavItems } from "@/components/nav-items";
import { ROOT_NAVBAR } from "@/constants/routes";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/modules/auth/utils/auth-utils";
import { AuthUser } from "@/modules/auth/models/user.model";

interface AppSidebarProps {
  collapsible?: "offcanvas" | "icon" | "none";
  isHidden?: boolean;
}

export function AppSidebar({ collapsible = "offcanvas", isHidden = false }: AppSidebarProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { state } = useSidebar();
  const getUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!isHidden && (
        <Sidebar 
          collapsible={collapsible}
          className="border-r-[1px]! border-border group"
        >
          <SidebarHeader>
            <Link
              href="/dashboard"
              className={`flex flex-row gap-3 items-center justify-center ${state === "collapsed" ? "pl-3" : "px-1"}`}
            >
              <div className="flex aspect-square size-8 items-center justify-center object-contain text-primary">
                <Image src="/logo.png" className="bg-transparent" alt="Logo" width={500} height={500} />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight text-primary dark:text-white">
                <span className="truncate text-[1.1rem] font-semibold">
                  Optimasi.ai
                </span>
                <span className="truncate text-xs opacity-90">
                  Starter Dashboard Boilerplate
                </span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className={`flex items-center ${state === "collapsed" ? "px-2" : "px-0"}`}>
            <NavItems 
              showIconParentMenu={true} 
              items={ROOT_NAVBAR} 
              isLoading={false} 
            />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="userAuth-[state=open]:bg-sidebar-accent userAuth-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="roundud">
                        <AvatarImage
                          className="object-cover! rounded-2xl"
                          height={20}
                          width={20}
                          src="/ava-default.png"
                          alt="default avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-normal">{user?.name}</span>
                        {/* <span className="truncate text-xs">{userAuth?.email}</span> */}
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className=" w-56 rounded-lg"
                    side="right"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={user?.name || "/ava-default.png"}
                            alt={user?.name}
                            className="!object-cover"
                          />
                          <AvatarFallback className="rounded-lg">{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-medium">{user?.name}</span>
                          <span className="truncate text-xs">{user?.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0">
                      <LogoutButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
