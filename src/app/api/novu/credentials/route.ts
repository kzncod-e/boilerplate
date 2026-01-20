import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/utils/auth-utils";
import { getNovuSubscriberId } from "@/modules/novu/novu.server";

export async function POST(request: Request) {
  const user = await requireAuth();
  const subscriberId = await getNovuSubscriberId(user.id);

  const body = (await request.json().catch(() => null)) as
    | { token?: unknown }
    | null;
  const token = typeof body?.token === "string" ? body.token : null;

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  const response = await fetch(
    `${env.NOVU_BACKEND_URL}/v1/subscribers/${encodeURIComponent(subscriberId)}/credentials`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${env.NOVU_API_KEY}`,
      },
      body: JSON.stringify({
        providerId: "fcm",
        credentials: { deviceTokens: [token] },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return NextResponse.json(
      { error: `Novu credential update failed (${response.status}): ${text}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const user = await requireAuth();
  const subscriberId = await getNovuSubscriberId(user.id);

  const { env } = await getCloudflareContext();
  const response = await fetch(
    `${env.NOVU_BACKEND_URL}/v1/subscribers/${encodeURIComponent(subscriberId)}/credentials`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${env.NOVU_API_KEY}`,
      },
      body: JSON.stringify({
        providerId: "fcm",
        credentials: { deviceTokens: [] },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return NextResponse.json(
      { error: `Novu credential clear failed (${response.status}): ${text}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
