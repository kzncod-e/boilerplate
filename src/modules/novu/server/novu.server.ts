import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { AuthUser } from "@/modules/auth/models/user.model";

type NovuConfig = {
    appIdentifier: string;
    backendUrl: string;
    socketUrl: string;
    fcmVapidKey: string;
};

export async function getNovuPublicConfig(): Promise<NovuConfig> {
    const { env } = await getCloudflareContext();

    return {
        appIdentifier: env.NOVU_APP_IDENTIFIER,
        backendUrl: env.NOVU_BACKEND_URL,
        socketUrl: env.NOVU_SOCKET_URL,
        fcmVapidKey: env.FCM_VAPID_KEY,
    };
}

export function buildNovuSubscriberId(prefix: string, userId: string) {
    return `${prefix}-${userId}`;
}

export async function getNovuSubscriberId(userId: string) {
    const { env } = await getCloudflareContext();

    const prefix = env.NEXT_PUBLIC_NOVU_USERID_PREFIX || "parlemen-user";
    return buildNovuSubscriberId(prefix, userId);
}

export async function ensureNovuSubscriber(user: AuthUser) {
    const { env } = await getCloudflareContext();

    const subscriberId = await getNovuSubscriberId(user.id);
    const response = await fetch(`${env.NOVU_BACKEND_URL}/v2/subscribers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${env.NOVU_API_KEY}`,
        },
        body: JSON.stringify({
            subscriberId,
            email: user.email,
            firstName: user.name,
        }),
    });

    if (response.ok || response.status === 409) {
        return { subscriberId };
    }

    const text = await response.text().catch(() => "");
    throw new Error(
        `Failed to create Novu subscriber (${response.status}): ${text}`,
    );
}
