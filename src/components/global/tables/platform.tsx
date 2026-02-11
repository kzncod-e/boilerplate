import { cn } from "@/lib/utils";
import {
    Facebook,
    Instagram,
    MessageSquare,
    Newspaper,
    Twitter,
    Youtube,
} from "lucide-react";
import React from "react";

const PlatformIcon = ({
    platform,
    className,
}: {
    platform: string;
    className?: string;
}) => {
    switch (platform) {
        case "news":
            return (
                <Newspaper
                    className={cn("size-4.5 text-gray-500", className)}
                />
            );
        case "instagram":
            return (
                <Instagram
                    className={cn("size-4.5 text-pink-600", className)}
                />
            );
        case "twitter":
            return (
                <Twitter className={cn("size-4.5 text-blue-400", className)} />
            );
        case "tiktok":
            return (
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="tiktok"
                    className={cn(
                        "size-4.5 ml-0.5 text-black dark:text-gray-300",
                        className,
                    )}
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                    ></path>
                </svg>
            );
        case "facebook":
            return (
                <Facebook className={cn("size-4.5 text-blue-500", className)} />
            );
        case "youtube":
            return (
                <Youtube className={cn("size-4.5 text-red-500", className)} />
            );
        default:
            return <MessageSquare className={cn("size-4.5", className)} />;
    }
};

export default PlatformIcon;
