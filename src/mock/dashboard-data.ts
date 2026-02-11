import { SocmedMentionDataType } from "@/interfaces";

export const dummySocmedMentionData: SocmedMentionDataType[] = [
    {
        platform: "twitter",
        total_mentions: 120,
        growth_summary: {
            current_count: 120,
            previous_count: 80,
            percentage_change: 50,
        },
        sentiment_breakdown: [
            { sentiment: "positive", count: 60 },
            { sentiment: "negative", count: 20 },
            { sentiment: "neutral", count: 40 },
        ],
    },
    {
        platform: "instagram",
        total_mentions: 90,
        growth_summary: {
            current_count: 90,
            previous_count: 100,
            percentage_change: -10,
        },
        sentiment_breakdown: [
            { sentiment: "positive", count: 40 },
            { sentiment: "negative", count: 30 },
            { sentiment: "neutral", count: 20 },
        ],
    },
    {
        platform: "facebook",
        total_mentions: 60,
        growth_summary: {
            current_count: 60,
            previous_count: 50,
            percentage_change: 20,
        },
        sentiment_breakdown: [
            { sentiment: "positive", count: 25 },
            { sentiment: "negative", count: 15 },
            { sentiment: "neutral", count: 20 },
        ],
    },
    {
        platform: "youtube",
        total_mentions: 45,
        growth_summary: {
            current_count: 45,
            previous_count: 30,
            percentage_change: 50,
        },
        sentiment_breakdown: [
            { sentiment: "positive", count: 20 },
            { sentiment: "negative", count: 10 },
            { sentiment: "neutral", count: 15 },
        ],
    },
    {
        platform: "news",
        total_mentions: 10,
        growth_summary: {
            current_count: 10,
            previous_count: 20,
            percentage_change: -50,
        },
        sentiment_breakdown: [
            { sentiment: "positive", count: 3 },
            { sentiment: "negative", count: 5 },
            { sentiment: "neutral", count: 2 },
        ],
    },
];
