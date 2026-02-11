"use client";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/global/breadcrumbs/dynamic-breadcrumb";
import { NovuInbox } from "@/modules/novu/components/novu-inbox";
import { PushInitializer } from "@/modules/novu/components/push-initializer";
import { ThemeToggle } from "@/components/theme-toggle";

function DashboardContent({ user, novuConfig, subscriberId, children }) {
    return (
        <SidebarProvider>
            <AppSidebar collapsible="icon" />
            <SidebarInset className="bg-background w-full">
                <header className="flex h-auto items-center gap-3 py-3 px-4  backdrop-blur-xl sticky top-0 z-40">
                    <SidebarTrigger className="cursor-pointer" />
                    <Separator orientation="vertical" />
                    <DynamicBreadcrumb />

                    <div className="ml-auto flex gap-3">
                        <ThemeToggle />
                        <PushInitializer vapidKey={novuConfig.fcmVapidKey} />
                        <NovuInbox
                            appIdentifier={novuConfig.appIdentifier}
                            subscriberId={subscriberId}
                            backendUrl={novuConfig.backendUrl}
                            socketUrl={novuConfig.socketUrl}
                        />
                    </div>
                </header>

                <main className="px-5 pb-5 pt-1">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default function DashboardLayout({
    user,
    novuConfig,
    subscriberId,
    children,
}) {
    return (
        <SidebarProvider>
            <DashboardContent
                user={user}
                novuConfig={novuConfig}
                subscriberId={subscriberId}
            >
                {children}
            </DashboardContent>
        </SidebarProvider>
    );
}
