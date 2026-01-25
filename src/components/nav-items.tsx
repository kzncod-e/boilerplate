"use client";

import { type LucideIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
  item: any;
  open: boolean;
  pathname: string;
  setOpenMobile: (open: boolean) => void;
  renderIcon?: boolean;
  renderName?: boolean;
}

function NavItemComponent({
  item,
  open,
  pathname,
  setOpenMobile,
  renderIcon = true,
  renderName = true,
}: NavItemProps) {
  let isActive = false;
  if (item.url) {
    if (item.items?.length) {
      isActive = Boolean(pathname?.startsWith(item.url));
    } else {
      isActive = Boolean(
        pathname === item.url || pathname?.startsWith(`${item.url}/`)
      );
    }
  }

  const hasItems = Boolean(item.items?.length);
  const [isExpanded, setIsExpanded] = useState(
    () => hasItems && Boolean(pathname?.startsWith(item.url))
  );

  if (hasItems) {
    return (
      <>
        <SidebarMenuItem
          className={cn(
            "font-medium transition-all duration-150",
            open && "px-2"
          )}
        >
          <SidebarMenuButton
            isActive={false}
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex w-full items-center gap-2.5 p-2",
              (isExpanded || isActive) && "text-primary bg-transparent"
            )}
          >
            {renderIcon && (
              <item.icon stroke={1} className="!size-4.5 stroke-1!" />
            )}
            {renderName && (
              <span className="flex-1 text-start text-sm">{item.name}</span>
            )}
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                isExpanded && "rotate-180"
              )}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
        {isExpanded && item.items && open && (
          <div className="ml-6 border-l pl-1 space-y-1">
            {item.items.map((subItem: any) => (
              <NavItemComponent
                // renderIcon={false}
                renderName={open}
                key={subItem.name}
                item={subItem}
                open={open}
                pathname={pathname}
                setOpenMobile={setOpenMobile}
              />
            ))}
          </div>
        )}
      </>
    );
  }

  if (!renderName) return;

  return (
    <SidebarMenuItem
      className={cn("font-normal transition-all duration-150", open && "px-2")}
    >
      <SidebarMenuButton asChild isActive={isActive}>
        <Link
          href={item.url || "#"}
          className="flex font-medium items-center gap-2.5"
          onClick={() => setOpenMobile(false)}
        >
          {renderIcon && <item.icon className="!size-4.5 stroke-1.5" />}
          {renderName && <span>{item.name}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function NavItems({
  items,
  isLoading,
}: {
  items: any[];
  isLoading: boolean;
}) {
  const { open, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-sm">Menu</SidebarGroupLabel>
        <SidebarMenu className="gap-2 px-2">
          {[...Array(7)].map((_, index) => (
            <SidebarMenuItem
              key={index}
              className={cn(
                "font-medium transition-all duration-150",
                open && "p-2",
                "bg-primary/10 rounded-md"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-5 rounded" />
                <Skeleton className="h-5 w-full" />
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel className="text-sm font-bold text-primary">Menu</SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {items.map((item) => (
          <NavItemComponent
            renderIcon={false}
            key={item.name}
            item={item}
            open={open}
            pathname={pathname}
            setOpenMobile={setOpenMobile}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
