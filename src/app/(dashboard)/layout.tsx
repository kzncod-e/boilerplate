import { redirect } from "next/navigation";
import { getSession, getCurrentUser } from "@/modules/auth/utils/auth-utils";
import {
    getNovuPublicConfig,
    getNovuSubscriberId,
} from "@/modules/novu/server/novu.server";
import authRoutes from "@/modules/auth/routes/auth.route";
import DashboardLayout from "@/modules/dashboard/pages/dashboard.layout";

export default async function Layout({ children }) {
    const session = await getSession();
    if (!session) redirect(authRoutes.login);

    const user = await getCurrentUser();
    const novuConfig = await getNovuPublicConfig();
    const subscriberId = user ? await getNovuSubscriberId(user.id) : "";

    return (
        <DashboardLayout
            user={user}
            novuConfig={novuConfig}
            subscriberId={subscriberId}
        >
            {children}
        </DashboardLayout>
    );
}
