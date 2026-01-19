import { redirect } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { getSession } from "@/modules/auth/utils/auth-utils";
import authRoutes from "../auth/auth.route";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
      <main className="flex w-full relative flex-col">
        <Navigation />
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
