"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getSession } from "@/modules/auth/utils/auth-utils";
import authRoutes from "@/modules/auth/auth.route";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/global/breadcrumbs/dynamic-breadcrumb";
import {
  ensureNovuSubscriber,
  getNovuPublicConfig,
  getNovuSubscriberId,
} from "@/modules/novu/novu.server";
import { NovuInbox } from "@/modules/novu/components/novu-inbox";
import { PushInitializer } from "@/modules/novu/components/push-initializer";
import { ModeToggle } from "@/components/darkMode-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [novuConfig, setNovuConfig] = useState<any>(null);
  const [subscriberId, setSubscriberId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessionData = await getSession();
        if (!sessionData) {
          router.push(authRoutes.login);
          return;
        }
        
        setSession(sessionData);
        
        const userData = await getCurrentUser();
        setUser(userData);
        
        const novuConfigData = await getNovuPublicConfig();
        setNovuConfig(novuConfigData);
        
        // if (userData) {
        //   const subId = await getNovuSubscriberId(userData.id);
        //   setSubscriberId(subId);
          
        //   try {
        //     await ensureNovuSubscriber(userData);
        //   } catch (error) {
        //     console.error("Novu subscriber sync failed:", error);
        //   }
        // }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // router.push(authRoutes.login);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background w-full overflow-x-hidden">
        <header className="flex h-12 max-sm:border-b max-sm:my-3 sm:h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between px-4 md:px-7">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <DynamicBreadcrumb />
            </div>
            {user ? (
              <div className="flex items-center gap-3">
                <ModeToggle />
                {novuConfig && (
                  <>
                    <PushInitializer vapidKey={novuConfig.fcmVapidKey} />
                    <NovuInbox
                      appIdentifier={novuConfig.appIdentifier}
                      subscriberId={subscriberId}
                      backendUrl={novuConfig.backendUrl}
                      socketUrl={novuConfig.socketUrl}
                    />
                  </>
                )}
              </div>
            ) : null}
          </div>
        </header>
        <div className="flex bg-background flex-1 flex-col gap-4 pb-8 px-5 md:px-8 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
