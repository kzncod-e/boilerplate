"use client";

import { type LucideIcon, ChevronDown, List, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
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
    state: "expanded" | "collapsed";
}

function NavItemComponent({
    item,
    open,
    pathname,
    setOpenMobile,
    renderIcon = true,
    renderName = true,
    state,
}: NavItemProps) {
    let isActive = false;
    if (item.url) {
        if (item.items?.length) {
            isActive = Boolean(pathname?.startsWith(item.url));
        } else {
            isActive = Boolean(
                pathname === item.url || pathname?.startsWith(`${item.url}/`),
            );
        }
    }

    const hasItems = Boolean(item.items?.length);
    const [isExpanded, setIsExpanded] = useState(
        () => hasItems && Boolean(pathname?.startsWith(item.url)),
    );
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(
        null,
    );
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0 });
    const menuItemRef = useRef<HTMLLIElement>(null);

    const handleMouseEnter = () => {
        if (state === "collapsed") {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }

            // Update dropdown position based on menu item position
            if (menuItemRef.current) {
                const rect = menuItemRef.current.getBoundingClientRect();
                setDropdownPosition({ top: rect.top });
            }

            setIsExpanded(true);
        }
    };

    const handleMouseLeave = () => {
        if (state === "collapsed") {
            const timeout = setTimeout(() => {
                setIsExpanded(false);
            }, 100);
            setHoverTimeout(timeout);
        }
    };

    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, [hoverTimeout]);

    const shouldShowIcon =
        Boolean(item.icon) && (item.items?.length || renderIcon);

    if (hasItems) {
        return (
            <>
                <SidebarMenuItem
                    ref={menuItemRef}
                    className={cn(
                        "font-medium transition-all duration-150",
                        open && "px-2",
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {state === "collapsed" ? (
                        <SidebarMenuButton
                            isActive={false}
                            className={cn(
                                "flex w-full items-center gap-2.5 p-2",
                                (isExpanded || isActive) &&
                                    "text-primary bg-transparent",
                            )}
                        >
                            {shouldShowIcon && (
                                <item.icon className="!size-4.5 stroke-1.5" />
                            )}
                        </SidebarMenuButton>
                    ) : (
                        <SidebarMenuButton
                            isActive={false}
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={cn(
                                "flex w-full items-center gap-2.5 p-2",
                                (isExpanded || isActive) &&
                                    "text-primary bg-transparent",
                            )}
                        >
                            {shouldShowIcon && (
                                <item.icon className="!size-4.5 stroke-1.5" />
                            )}
                            {renderName && (
                                <span className="flex-1 text-start text-sm">
                                    {item.name}
                                </span>
                            )}
                            <ChevronDown
                                className={cn(
                                    "size-4 transition-transform",
                                    isExpanded && "rotate-180",
                                )}
                            />
                        </SidebarMenuButton>
                    )}
                </SidebarMenuItem>
                {state === "collapsed" && isExpanded && item.items && (
                    <div
                        className="fixed left-12 bg-popover border rounded-md shadow-lg z-50 min-w-max"
                        style={{ top: `${dropdownPosition.top}px` }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="p-1">
                            {item.items.map((subItem: any) => (
                                <div
                                    key={subItem.name}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground text-foreground",
                                        pathname === subItem.url &&
                                            "bg-accent text-accent-foreground",
                                    )}
                                    onClick={() => {
                                        window.location.href = subItem.url;
                                        setOpenMobile(false);
                                        setIsExpanded(false);
                                    }}
                                >
                                    {subItem.icon && (
                                        <subItem.icon className="!size-4 text-foreground" />
                                    )}
                                    <span className="text-foreground">
                                        {subItem.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {isExpanded && item.items && open && state !== "collapsed" && (
                    <div className="ml-6 border-l pl-1 space-y-1">
                        {item.items.map((subItem: any) => (
                            <NavItemComponent
                                renderIcon={open}
                                renderName={open}
                                key={subItem.name}
                                item={subItem}
                                open={open}
                                pathname={pathname}
                                setOpenMobile={setOpenMobile}
                                state={state}
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
            className={cn(
                "font-normal transition-all duration-150",
                open && "px-2",
            )}
        >
            {state === "collapsed" ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={isActive}>
                            <Link
                                href={item.url || "#"}
                                className="flex font-medium items-center gap-2.5"
                                onClick={() => setOpenMobile(false)}
                            >
                                {renderIcon && (
                                    <item.icon className="!size-4.5 stroke-1.5" />
                                )}
                            </Link>
                        </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p className="text-white dark:text-black">
                            {item.name}
                        </p>
                    </TooltipContent>
                </Tooltip>
            ) : (
                <SidebarMenuButton asChild isActive={isActive}>
                    <Link
                        href={item.url || "#"}
                        className="flex font-medium items-center gap-2.5"
                        onClick={() => setOpenMobile(false)}
                    >
                        {renderIcon && (
                            <item.icon className="!size-4.5 stroke-1.5" />
                        )}
                        {renderName && <span>{item.name}</span>}
                    </Link>
                </SidebarMenuButton>
            )}
        </SidebarMenuItem>
    );
}

export function NavItems({
    items,
    showIconParentMenu,
    isLoading,
}: {
    items: any[];
    showIconParentMenu: boolean;
    isLoading: boolean;
}) {
    const { open, setOpenMobile, state } = useSidebar();
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
                                "bg-primary/10 rounded-md",
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
            <TooltipProvider>
                <SidebarGroupLabel className="text-xs text-slate-300">
                    Menu
                </SidebarGroupLabel>
                <SidebarMenu className="gap-2">
                    {items.map((item) => (
                        <NavItemComponent
                            renderIcon={showIconParentMenu}
                            key={item.name}
                            item={item}
                            open={open}
                            pathname={pathname}
                            setOpenMobile={setOpenMobile}
                            state={state}
                        />
                    ))}
                </SidebarMenu>
            </TooltipProvider>
        </SidebarGroup>
    );
}
