import { redirect } from "next/navigation";
import authRoutes from "@/modules/auth/routes/auth.route";
import { getCurrentUser, getSession } from "@/modules/auth/utils/auth-utils";
import {
    ensureNovuSubscriber,
    getNovuPublicConfig,
    getNovuSubscriberId,
} from "@/modules/novu/server/novu.server";
import { NovuWidgetPage } from "@/modules/novu/pages/novu-widget-page";

export default async function Page() {
    const session = await getSession();
    if (!session) {
        redirect(authRoutes.login);
    }

    const user = await getCurrentUser();
    if (!user) {
        redirect(authRoutes.login);
    }

    await ensureNovuSubscriber(user);

    const config = await getNovuPublicConfig();
    const subscriberId = await getNovuSubscriberId(user.id);

    return <NovuWidgetPage config={config} subscriberId={subscriberId} />;
}
