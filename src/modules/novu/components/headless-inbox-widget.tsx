"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Novu } from "@novu/js";
import { Bell, CheckCheck, RefreshCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type HeadlessInboxWidgetProps = {
    appIdentifier: string;
    subscriberId: string;
    backendUrl: string;
    socketUrl: string;
    tags?: string[];
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

export function HeadlessInboxWidget({
    appIdentifier,
    subscriberId,
    backendUrl,
    socketUrl,
    tags,
}: HeadlessInboxWidgetProps) {
    const novu = useMemo(() => {
        return new Novu({
            applicationIdentifier: appIdentifier,
            subscriberId,
            backendUrl,
            socketUrl,
        });
    }, [appIdentifier, subscriberId, backendUrl, socketUrl]);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [notifications, setNotifications] = useState<AnyNotification[]>([]);

    const refresh = useCallback(async () => {
        setLoading(true);

        const list = await novu.notifications.list({
            limit: 30,
            ...(tags?.length ? { tags } : {}),
        } as any);

        const items = (list as any)?.data?.notifications;
        const next = Array.isArray(items) ? (items as AnyNotification[]) : [];

        setNotifications(next);
        setUnreadCount(next.filter((n) => !isNotificationRead(n)).length);
        setLoading(false);
    }, [novu, tags]);

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
            (novu as any).off?.("notifications.notification_received", onReceived);
            (novu as any).off?.("notifications.unread_count_changed", onUnread);
        };
    }, [novu, refresh]);

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="relative gap-2">
                    <Bell className="size-4" />
                    Headless
                    {unreadCount > 0 ? (
                        <span className="absolute -top-2 -right-2">
                            <Badge size="sm" rounded="full">
                                {unreadCount}
                            </Badge>
                        </span>
                    ) : null}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Headless Inbox</DialogTitle>
                    <DialogDescription>
                        Powered by @novu/js (custom UI)
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-between">
                    <div className="text-muted-foreground text-sm">
                        {unreadCount} unread
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

                <Separator />

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
                                No notifications yet
                            </div>
                        ) : (
                            notifications.map((n, idx) => {
                                const id = getNotificationId(n) ?? `idx-${idx}`;
                                const subject = getNotificationSubject(n);
                                const body = getNotificationBody(n);
                                const read = isNotificationRead(n);
                                const actionId = getNotificationId(n);

                                return (
                                    <div key={id} className="py-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <div className="truncate text-sm font-medium">
                                                        {subject}
                                                    </div>
                                                    {!read ? (
                                                        <Badge
                                                            size="sm"
                                                            variant="secondary"
                                                            rounded="full"
                                                        >
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
                                                        onClick={() =>
                                                            markRead(actionId)
                                                        }
                                                    >
                                                        Mark read
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            archive(actionId)
                                                        }
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            ) : null}
                                        </div>
                                        <Separator className="mt-3" />
                                    </div>
                                );
                            })
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

