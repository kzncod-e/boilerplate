export interface SocmedEventType {
  original_id: string;
  conversation_id: string;
  platform: Platform;
  type: string;
  time: number;
  title: string;
  time_iso: string;
  sender_id: string;
  sender_username: string;
  sender_name: string;
  sender_avatar: string;
  url: string;
  estimated_impression: number;
  estimated_reach: number;
  estimated_traffic: number;
  post: string;
  engagement: number;
  sentiment: SentimentNumber;
  sentiment_text: SentimentText;
}
export type SentimentNumber = -1 | 0 | 1;
export type SentimentText = "positive" | "negative" | "neutral";
export const PLATFORMS = [
  "twitter",
  "x",
  "instagram",
  "facebook",
  "youtube",
  "tiktok",
  "telegram",
  "darkweb",
  "news",
  "whatsapp",
  "github",
] as const;
export const SOCMED_PLATFORMS = PLATFORMS.filter(
  (platform) => platform !== "news"
);

export type Platform = (typeof PLATFORMS)[number];
export type SocmedPlatform = (typeof SOCMED_PLATFORMS)[number];
// api socmed






export interface SocmedMentionDataType {
  platform: Platform;
  total_mentions: number;
  growth_summary: GrowthSummary;
  sentiment_breakdown: {
    sentiment: SentimentText;
    count: number;
  }[];
}






export interface GrowthSummary {
  current_count: number;
  previous_count: number;
  percentage_change: number;
}
