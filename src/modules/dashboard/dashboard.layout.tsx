import { redirect } from "next/navigation";
import { getCurrentUser, getSession } from "@/modules/auth/utils/auth-utils";
import authRoutes from "../auth/auth.route";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "./components/dynamic-breadcrumb";
import {
  buildNovuSubscriberId,
  ensureNovuSubscriber,
  getNovuPublicConfig,
} from "@/modules/novu/novu.server";
import { NovuInbox } from "@/modules/novu/components/novu-inbox";
import { PushInitializer } from "@/modules/novu/components/push-initializer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect(authRoutes.login);
  }

  const user = await getCurrentUser();
  const novuConfig = await getNovuPublicConfig();

  if (user) {
    try {
      await ensureNovuSubscriber(user);
    } catch (error) {
      console.error("Novu subscriber sync failed:", error);
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-primary/3 w-full overflow-x-hidden">
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
                <PushInitializer vapidKey={novuConfig.fcmVapidKey} />
                <NovuInbox
                  appIdentifier={novuConfig.appIdentifier}
                  subscriberId={buildNovuSubscriberId(user.id)}
                  backendUrl={novuConfig.backendUrl}
                  socketUrl={novuConfig.socketUrl}
                />
              </div>
            ) : null}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pb-8 px-5 md:px-8 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
