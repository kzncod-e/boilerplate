"use client";

import type { getNovuPublicConfig } from "@/modules/novu/server/novu.server";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { NovuInbox } from "@/modules/novu/components/novu-inbox";
import { PushInitializer } from "@/modules/novu/components/push-initializer";
import { HeadlessInboxWidget } from "@/modules/novu/components/headless-inbox-widget";
import { HeadlessNotificationsCenter } from "@/modules/novu/components/headless-notifications-center";
import PageHeader from "@/components/global/page-header";

type NovuWidgetPageProps = {
    config: Awaited<ReturnType<typeof getNovuPublicConfig>>;
    subscriberId: string;
};

export function NovuWidgetPage({ config, subscriberId }: NovuWidgetPageProps) {
    return (
        <>
            <PushInitializer vapidKey={config.fcmVapidKey} />

            <div className="space-y-2">
                {/* <div className="text-2xl font-semibold">Novu Widgets</div>
        <div className="text-muted-foreground text-sm">
          Boilerplate templates: default Inbox UI, headless widget, and headless
          full-page notifications center.
        </div> */}
                <PageHeader
                    title="Novu widgets"
                    description=" Boilerplate templates: default Inbox UI, headless widget, and headless
          full-page notifications center."
                />
                <div className="text-muted-foreground text-xs">
                    subscriberId: {subscriberId}
                </div>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="default">
                <TabsList>
                    <TabsTrigger value="default">Default Inbox</TabsTrigger>
                    <TabsTrigger value="headless-widget">
                        Headless Widget
                    </TabsTrigger>
                    <TabsTrigger value="headless-page">
                        Headless Full Page
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="default">
                    <Card className="py-0">
                        <CardHeader className="px-6 pt-6 pb-0">
                            <CardTitle>Default Novu Inbox</CardTitle>
                            <CardDescription>
                                Drop-in Inbox component from @novu/nextjs
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="mt-4 flex justify-end">
                                <NovuInbox
                                    appIdentifier={config.appIdentifier}
                                    subscriberId={subscriberId}
                                    backendUrl={config.backendUrl}
                                    socketUrl={config.socketUrl}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="headless-widget">
                    <Card className="py-0">
                        <CardHeader className="px-6 pt-6 pb-0">
                            <CardTitle>Custom Headless Inbox Widget</CardTitle>
                            <CardDescription>
                                Bell + dialog inbox built with @novu/js (fully
                                custom UI)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="mt-4 flex justify-end">
                                <HeadlessInboxWidget
                                    appIdentifier={config.appIdentifier}
                                    subscriberId={subscriberId}
                                    backendUrl={config.backendUrl}
                                    socketUrl={config.socketUrl}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="headless-page">
                    <HeadlessNotificationsCenter
                        appIdentifier={config.appIdentifier}
                        subscriberId={subscriberId}
                        backendUrl={config.backendUrl}
                        socketUrl={config.socketUrl}
                    />
                </TabsContent>
            </Tabs>
        </>
    );
}
