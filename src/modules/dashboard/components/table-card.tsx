import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import React from "react";
import {
    Newspaper,
    Twitter,
    Youtube,
    Facebook,
    Instagram,
    Send,
} from "lucide-react";
import { SocmedMentionDataType } from "@/interfaces";
import GlobalCard from "@/components/global/cards/global-card";

const SocmedTable = ({
    className,
    data,
}: {
    className?: string;
    data?: SocmedMentionDataType[];
}) => {
    const platformIcon: Record<string, React.ReactNode> = {
        news: (
            <Newspaper className="h-4 w-4 mr-2 text-[#2F2F2F] dark:text-white" />
        ),
        twitter: <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />,
        youtube: <Youtube className="h-4 w-4 mr-2 text-[#FF0000]" />,
        facebook: <Facebook className="h-4 w-4 mr-2 text-[#1877F2]" />,
        instagram: <Instagram className="h-4 w-4 mr-2 text-[#E4405F]" />,
        tiktok: (
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="tiktok"
                className="w-3.5 ml-0.5 mr-2 text-black dark:text-gray-300"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
            >
                <path
                    fill="currentColor"
                    d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                ></path>
            </svg>
        ),
        telegram: (
            <div className="bg-[#1DA1F2] p-1 rounded-full flex items-center justify-center mr-[4px]">
                <Send className="size-2.5 text-white" />
            </div>
        ),
    };

    const rows = (data || [])
        .filter((item) => !!item?.platform)
        .map((item) => {
            const key = String(item.platform).toLowerCase();
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return {
                key,
                label,
                icon: platformIcon[key] ?? null,
                mentions: item.total_mentions ?? 0,
                total_mentions: item.total_mentions ?? 0,
            };
        });

    return (
        <GlobalCard title="Total Mention per Channel" className={className}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Channel</TableHead>
                        <TableHead className="text-right">
                            Jumlah Mention
                        </TableHead>
                        <TableHead className="text-right">Reach</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.label}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {row.icon}
                                    <span className="font-medium">
                                        {row.label}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                                {row.mentions}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                                {row.total_mentions * 1000}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </GlobalCard>
    );
};

export default SocmedTable;
