export type Platform = "twitter" | "facebook" | "instagram" | "youtube" | "tiktok";

export type SnaCluster = "keyword" | "engagement";

export type SentimentNumber = -1 | 0 | 1;

export interface TopicType {
  id: number;
  name: string;
  description?: string;
  query: string;
  langs?: string[];
  platforms: Platform[] | string;
  crawl_start?: string | Date | null;
  crawl_stop?: string | Date;
  eventCount?: number;
  senderCount?: number;
  createdBy?: string;
  createdAt?: string | Date;
  updatedBy?: string | null;
  updatedAt?: string | Date;
  newsEnabled?: number | boolean;
  newsTopics?: null | string;
}

export interface AppliedFilter {
  topic: TopicType | null;
  keywords: string[] | null;
  cluster: SnaCluster | null;
  date: string[] | null;
  sentiment_selected: string; // e.g. 'linguistik' | 'prokontra'
  platforms: Platform[];
  prokontra: SentimentNumber[];
  sentiments: SentimentNumber[];
  size: number;
}

export default {} as const;
