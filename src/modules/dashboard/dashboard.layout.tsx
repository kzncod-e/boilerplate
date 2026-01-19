import { redirect } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { getSession } from "@/modules/auth/utils/auth-utils";
import authRoutes from "../auth/auth.route";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "./components/dynamic-breadcrumb";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect(authRoutes.login);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
       <SidebarInset className="bg-primary/3 w-full overflow-x-hidden">
        <header className="flex h-12 max-sm:border-b max-sm:my-3 sm:h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 md:px-7">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pb-8 px-5 md:px-8 pt-0">
          {children}
        </div>
      </SidebarInset>
     
    </SidebarProvider>
  );
}
