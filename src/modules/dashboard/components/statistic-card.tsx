import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatisticCardProps {
    title: string;
    subtitle: string;
    value: number;
    change: number; // bisa positif/negatif
}

export function StatisticCard({
    title,
    subtitle,
    value,
    change,
}: StatisticCardProps) {
    const isPositive = change >= 0;

    return (
        <Card className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-0">
                <div className="flex">
                    <h3 className="text-sm font-medium text-gray-600">
                        {title}
                    </h3>
                    {/* <p className="text-xs text-gray-400">{subtitle}</p> */}
                </div>
            </CardHeader>

            <CardContent className="">
                <div className="flex  -ml-5 items-start flex-col">
                    <div className="flex justify-between items-center  gap-4 text-sm mt-1">
                        <p className="text font-semibold">{value}</p>
                        <div className="">
                            <span
                                className={cn(
                                    "font-medium",
                                    isPositive
                                        ? "text-green-500"
                                        : "text-red-500",
                                )}
                            >
                                {isPositive ? "+" : ""}
                                {change}%
                            </span>
                            <span className="text-gray-400">•</span>
                        </div>
                    </div>
                    <div className="flex ">
                        <span className="text-xs text-gray-500">
                            {subtitle}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
