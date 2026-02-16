"use client";

import { useState, useEffect } from "react";
import type {
    AppliedFilter,
    TopicType,
    Platform as SnaPlatform,
    SnaCluster,
    SentimentNumber,
} from "@/modules/micro-sna/types";
// Use Popover instead of Dialog so the settings panel appears below the trigger
// (behaves like a dropdown/popover).
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings, Database, Calendar, CheckSquare, Check } from "lucide-react";
import { DatePicker } from "@/components/global/forms/date-picker-form";
import { FormField } from "@/components/global/forms/basic-form";
import { Input } from "@/components/ui/input";

// If you have a canonical source of topics (API or store), replace this local list
// with a fetch/selector. Each item has a name and query (keywords) used by the SNA.
const TOPICS: TopicType[] = [
    {
        id: 1,
        name: "Demo DPR",
        query: "DPR",
        platforms: ["twitter", "facebook"],
    },
    {
        id: 2,
        name: "Climate Change",
        query: "climate change,global warming",
        platforms: ["twitter", "facebook", "instagram"],
    },
    {
        id: 3,
        name: "Elections 2026",
        query: "election,vote,campaign",
        platforms: ["twitter", "facebook"],
    },
];

export default function SNASettingModal() {
    const [open, setOpen] = useState(false);
    const [snaReady, setSnaReady] = useState<boolean>(false);

    const [cluster, setCluster] = useState<SnaCluster>("engagement");
    const [platforms, setPlatforms] = useState<SnaPlatform[]>([
        "facebook",
        "twitter",
    ]);

    // topic selected/entered by the user. We'll use the entered text for both name and query
    const [topic, setTopic] = useState<TopicType | null>(null);

    const [date, setDate] = useState<[Date | null, Date | null]>([
        new Date("2026-01-05"),
        new Date("2026-02-05"),
    ]);
    const [sentimentSelected, setSentimentSelected] = useState<
        "linguistik" | "prokontra"
    >("prokontra");

    const [prokontra, setProkontra] = useState<SentimentNumber[]>([]);
    const [sentiments, setSentiments] = useState<SentimentNumber[]>([]);
    const [size] = useState(100);

    const toggle = (val: any, list: any[], set: any) =>
        set(
            list.includes(val) ? list.filter((v) => v !== val) : [...list, val],
        );

    const handleApply = () => {
        // ensure we send keywords the SNA expects. Use topic.query or topic.name as fallback
        const topicQuery = topic?.query ?? null;
        const keywordsFromTopic: string[] = topicQuery
            ? Array.isArray(topicQuery)
                ? topicQuery.map(String)
                : [String(topicQuery)]
            : topic?.name
              ? [topic.name]
              : [];

        // convert date range Date objects to YYYY-MM-DD strings for the iframe
        const dateStrings: (string | null)[] = [
            date[0] ? date[0].toISOString().slice(0, 10) : null,
            date[1] ? date[1].toISOString().slice(0, 10) : null,
        ];

        const filter = {
            topic: topic,
            keywords: keywordsFromTopic,
            cluster,
            date: dateStrings,
            sentiment_selected: sentimentSelected,
            platforms,
            prokontra: sentimentSelected === "prokontra" ? prokontra : [],
            sentiments: sentimentSelected === "linguistik" ? sentiments : [],
            size,
        };

        const postFilter = () => {
            const iframe = document.querySelector("iframe");
            iframe?.contentWindow?.postMessage(
                {
                    type: "APPLY_FILTER",
                    filter,
                },
                "*",
            );
        };

        // If the iframe has already signaled readiness, post immediately.
        if ((window as any).__SNA_READY__ || snaReady) {
            postFilter();
        } else {
            // Otherwise wait for a one-time SNA_READY message from iframe, then post
            const handler = (ev: MessageEvent) => {
                if (ev.data && ev.data.type === "SNA_READY") {
                    postFilter();
                    window.removeEventListener("message", handler);
                }
            };
            window.addEventListener("message", handler);
            // Also post immediately as a best-effort (the iframe may already be listening)
            postFilter();
        }

        setOpen(false);
    };

    useEffect(() => {
        const readyListener = (ev: MessageEvent) => {
            if (ev.data && ev.data.type === "SNA_READY") {
                setSnaReady(true);
            }
        };

        window.addEventListener("message", readyListener);
        return () => window.removeEventListener("message", readyListener);
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="p-1 rounded-sm border hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                    <Settings className="w-4 h-4" />
                </button>
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                align="end"
                className="bg-card rounded-xl w-fit p-4"
            >
                <div className="flex flex-col gap-2 text-left">
                    <div className="text-gray-900 dark:text-white text-xl font-semibold">
                        SNA Setting
                    </div>
                </div>

                <form className="grid grid-cols-2 w-full gap-6 mt-4">
                    {/* TOPIC (user input) */}
                    <FormField className="w-full">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic</p>
                        <Select
                            value={topic ? String(topic.id) : ""}
                            onValueChange={(v) => {
                                const found = TOPICS.find(
                                    (t) => String(t.id) === v,
                                );
                                setTopic(found ?? null);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select topic" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {TOPICS.map((t) => (
                                    <SelectItem key={t.id} value={String(t.id)}>
                                        {t.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    {/* CLUSTER */}
                    <div className="min-w-40 w-full">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Cluster</p>
                        <Select
                            value={cluster}
                            onValueChange={(v) => setCluster(v as SnaCluster)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="keyword">Keyword</SelectItem>
                                <SelectItem value="engagement">
                                    Engagement
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* PLATFORM MULTI */}
                    <div className="w-full">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform</p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                >
                                    {platforms.join(", ")}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full">
                                {[
                                    "facebook",
                                    "twitter",
                                    "instagram",
                                    "youtube",
                                    "tiktok",
                                ].map((p) => (
                                    <div
                                        key={p}
                                        className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() =>
                                            toggle(
                                                p as SnaPlatform,
                                                platforms,
                                                setPlatforms,
                                            )
                                        }
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) =>
                                            (e.key === "Enter" ||
                                                e.key === " ") &&
                                            toggle(
                                                p as SnaPlatform,
                                                platforms,
                                                setPlatforms,
                                            )
                                        }
                                    >
                                        <span className="capitalize">{p}</span>
                                        <span className="ml-2">
                                            {platforms.includes(
                                                p as SnaPlatform,
                                            ) ? (
                                                <Check className="w-4 h-4 text-blue-600" />
                                            ) : (
                                                <span className="w-4 h-4" />
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* DATE */}
                    <FormField className="min-w-[29rem] w-full">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</p>
                        <DatePicker
                            mode="range"
                            value={date}
                            onChange={(v) => {
                                if (Array.isArray(v)) {
                                    setDate([v[0], v[1]]);
                                }
                            }}
                            showTwoCalendars
                        />
                    </FormField>

                    {/* EMOTIONAL */}
                    <div className="w-full">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Emotional Perception
                        </p>
                        <Select
                            value={sentimentSelected}
                            onValueChange={(v) =>
                                setSentimentSelected(
                                    v as "linguistik" | "prokontra",
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="linguistik">
                                    Linguistik
                                </SelectItem>
                                <SelectItem value="prokontra">
                                    Prokontra
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* SENTIMENT MULTI */}
                    <div className="w-full">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Sentiments</p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                >
                                    <span className="truncate">
                                        {(sentimentSelected === "prokontra"
                                            ? prokontra
                                            : sentiments
                                        )
                                            .map((v) =>
                                                v === 1
                                                    ? "Positive"
                                                    : v === 0
                                                      ? "Neutral"
                                                      : "Negative",
                                            )
                                            .join(", ") || "Select sentiments"}
                                    </span>
                                    <CheckSquare className="w-4 h-4 opacity-80" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full">
                                {[
                                    { label: "Positive", val: 1 },
                                    { label: "Neutral", val: 0 },
                                    { label: "Negative", val: -1 },
                                ].map((s) => (
                                    <div
                                        key={s.val}
                                        className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() =>
                                            toggle(
                                                s.val as SentimentNumber,
                                                sentimentSelected ===
                                                    "prokontra"
                                                    ? prokontra
                                                    : sentiments,
                                                sentimentSelected ===
                                                    "prokontra"
                                                    ? setProkontra
                                                    : setSentiments,
                                            )
                                        }
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) =>
                                            (e.key === "Enter" ||
                                                e.key === " ") &&
                                            toggle(
                                                s.val as SentimentNumber,
                                                sentimentSelected ===
                                                    "prokontra"
                                                    ? prokontra
                                                    : sentiments,
                                                sentimentSelected ===
                                                    "prokontra"
                                                    ? setProkontra
                                                    : setSentiments,
                                            )
                                        }
                                    >
                                        <span>{s.label}</span>
                                        <span className="ml-2">
                                            {(sentimentSelected === "prokontra"
                                                ? prokontra
                                                : sentiments
                                            ).includes(
                                                s.val as SentimentNumber,
                                            ) ? (
                                                <Check className="w-4 h-4 text-blue-600" />
                                            ) : (
                                                <span className="w-4 h-4" />
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>
                </form>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t bg-gray-50 dark:bg-primary/10 -mx-4 px-4 -mb-4 pb-4 rounded-b-xl">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleApply} className="bg-primary">
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
