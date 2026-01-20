"use client";

import { Inbox } from "@novu/react";

type NovuInboxProps = {
  appIdentifier: string;
  subscriberId: string;
  backendUrl: string;
  socketUrl: string;
};

export function NovuInbox({
  appIdentifier,
  subscriberId,
  backendUrl,
  socketUrl,
}: NovuInboxProps) {
  return (
    <Inbox
      applicationIdentifier={appIdentifier}
      subscriberId={subscriberId}
      backendUrl={backendUrl}
      socketUrl={socketUrl}
      tabs={[
        {
          label: "Notifications",
          filter: { tags: ["boilerplate-notification-system"] },
        },
      ]}
      preferencesFilter={{
        tags: ["boilerplate-notification-system"],
      }}
    />
  );
}
