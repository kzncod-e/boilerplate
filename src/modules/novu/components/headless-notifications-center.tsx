"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Novu } from "@novu/js";
import { Archive, CheckCheck, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type HeadlessNotificationsCenterProps = {
    appIdentifier: string;
    subscriberId: string;
    backendUrl: string;
    socketUrl: string;
};

type AnyNotification = Record<string, unknown>;

function getNotificationId(n: AnyNotification) {
    const id = n.id;
    return typeof id === "string" ? id : null;
}

function getNotificationSubject(n: AnyNotification) {
    const subject = n.subject;
    if (typeof subject === "string" && subject.trim()) return subject;
    return "Notification";
}

function getNotificationBody(n: AnyNotification) {
    const body = n.body;
    if (typeof body === "string" && body.trim()) return body;
    return null;
}

function isNotificationRead(n: AnyNotification) {
    const candidates = [n.read, n.isRead, n?.readAt];
    const read = candidates[0];
    if (typeof read === "boolean") return read;
    const isRead = candidates[1];
    if (typeof isRead === "boolean") return isRead;
    const readAt = candidates[2];
    return typeof readAt === "string" && readAt.length > 0;
}

const DEFAULT_TAGS = ["boilerplate-notification-system"];

export function HeadlessNotificationsCenter({
    appIdentifier,
    subscriberId,
    backendUrl,
    socketUrl,
}: HeadlessNotificationsCenterProps) {
    const novu = useMemo(() => {
        return new Novu({
            applicationIdentifier: appIdentifier,
            subscriberId,
            backendUrl,
            socketUrl,
        });
    }, [appIdentifier, subscriberId, backendUrl, socketUrl]);

    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [notifications, setNotifications] = useState<AnyNotification[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setLoading(true);

        const list = await novu.notifications.list({
            limit: 50,
            tags: DEFAULT_TAGS,
        } as any);

        const items = (list as any)?.data?.notifications;
        const next = Array.isArray(items) ? (items as AnyNotification[]) : [];

        setNotifications(next);
        setUnreadCount(next.filter((n) => !isNotificationRead(n)).length);

        const firstId = next.length ? getNotificationId(next[0]) : null;
        setSelectedId((prev) => prev ?? firstId);

        setLoading(false);
    }, [novu]);

    useEffect(() => {
        refresh().catch((error) => {
            console.error("Failed to load Novu notifications:", error);
            setLoading(false);
        });
    }, [refresh]);

    useEffect(() => {
        const onReceived = () => {
            refresh().catch(() => null);
        };
        const onUnread = (payload: any) => {
            const count = payload?.unreadCount;
            if (typeof count === "number") {
                setUnreadCount(count);
            }
        };

        (novu as any).on?.("notifications.notification_received", onReceived);
        (novu as any).on?.("notifications.unread_count_changed", onUnread);

        return () => {
            (novu as any).off?.(
                "notifications.notification_received",
                onReceived,
            );
            (novu as any).off?.("notifications.unread_count_changed", onUnread);
        };
    }, [novu, refresh]);

    const selected = useMemo(() => {
        if (!selectedId) return null;
        return (
            notifications.find((n) => getNotificationId(n) === selectedId) ??
            null
        );
    }, [notifications, selectedId]);

    const markAllSeen = async () => {
        await novu.notifications.seenAll();
        await refresh();
    };

    const markRead = async (notificationId: string) => {
        await novu.notifications.read({ notificationId } as any);
        await refresh();
    };

    const archive = async (notificationId: string) => {
        await novu.notifications.archive({ notificationId } as any);
        await refresh();
    };

    return (
        <Card className="py-0">
            <CardHeader className="px-6 pt-6 pb-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle>Headless Notifications Center</CardTitle>
                        <CardDescription>
                            Full-page template powered by @novu/js
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refresh()}
                        >
                            <RefreshCcw className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAllSeen()}
                        >
                            <CheckCheck className="size-4" />
                            Mark all seen
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between">
                    <div className="text-muted-foreground text-sm">
                        {unreadCount} unread
                    </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_1fr]">
                    <Card className="py-0">
                        <CardHeader className="px-4 pt-4 pb-0">
                            <CardTitle className="text-base">
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <ScrollArea className="h-[420px]">
                                <div className="flex flex-col">
                                    {loading ? (
                                        <div className="flex flex-col gap-3 py-2">
                                            <Skeleton className="h-14 w-full" />
                                            <Skeleton className="h-14 w-full" />
                                            <Skeleton className="h-14 w-full" />
                                        </div>
                                    ) : notifications.length === 0 ? (
                                        <div className="text-muted-foreground py-10 text-center text-sm">
                                            No notifications
                                        </div>
                                    ) : (
                                        notifications.map((n, idx) => {
                                            const id =
                                                getNotificationId(n) ??
                                                `idx-${idx}`;
                                            const subject =
                                                getNotificationSubject(n);
                                            const body = getNotificationBody(n);
                                            const read = isNotificationRead(n);
                                            const actionId =
                                                getNotificationId(n);

                                            const selected =
                                                selectedId === actionId;

                                            return (
                                                <button
                                                    key={id}
                                                    type="button"
                                                    className="hover:bg-muted/60 flex w-full items-start justify-between gap-3 rounded-md px-3 py-3 text-left"
                                                    onClick={() =>
                                                        setSelectedId(
                                                            actionId ?? id,
                                                        )
                                                    }
                                                    data-selected={
                                                        selected
                                                            ? "true"
                                                            : "false"
                                                    }
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="truncate text-sm font-medium">
                                                                {subject}
                                                            </div>
                                                            {!read ? (
                                                                <Badge variant="secondary">
                                                                    New
                                                                </Badge>
                                                            ) : null}
                                                        </div>
                                                        {body ? (
                                                            <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                                                {body}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    {actionId ? (
                                                        <div className="flex shrink-0 items-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    markRead(
                                                                        actionId,
                                                                    ).catch(
                                                                        () =>
                                                                            null,
                                                                    );
                                                                }}
                                                            >
                                                                Read
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    archive(
                                                                        actionId,
                                                                    ).catch(
                                                                        () =>
                                                                            null,
                                                                    );
                                                                }}
                                                            >
                                                                <Archive className="size-4" />
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    <Card className="py-0">
                        <CardHeader className="px-4 pt-4 pb-0">
                            <CardTitle className="text-base">Detail</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <div className="text-sm">
                                {selected ? (
                                    <div className="space-y-3">
                                        <div className="text-base font-semibold">
                                            {getNotificationSubject(selected)}
                                        </div>
                                        {getNotificationBody(selected) ? (
                                            <div className="text-muted-foreground whitespace-pre-wrap">
                                                {getNotificationBody(selected)}
                                            </div>
                                        ) : (
                                            <div className="text-muted-foreground">
                                                No body
                                            </div>
                                        )}
                                        <Separator />
                                        {getNotificationId(selected) ? (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        markRead(
                                                            getNotificationId(
                                                                selected,
                                                            )!,
                                                        )
                                                    }
                                                >
                                                    Mark read
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        archive(
                                                            getNotificationId(
                                                                selected,
                                                            )!,
                                                        )
                                                    }
                                                >
                                                    Archive
                                                </Button>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="text-muted-foreground py-10 text-center text-sm">
                                        Select a notification
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
