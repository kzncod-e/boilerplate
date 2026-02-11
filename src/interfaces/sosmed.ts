// api socmed

import { Platform, SentimentNumber, SentimentText } from ".";

// Mengambil daftar event social media dengan paginasi berdasarkan filter GET.
// METHOD: GET
// ENDPOINT: /socmed/events
// PARAMS: SocmedDefaultParams
// RESPONSE: PaginatedResponse<SocmedEventType[]>

export interface SocmedDefaultParams {
    keywords?: string; // multi keywords split by commas not array
    platforms?: Platform | string;
    type?: string;
    page?: number;
    size?: number;
    start_date?: string | Date | null;
    end_date?: string | Date | null;
    sentiment?: string; // multi sentiments split by commas ("1,0,-1")
    sort?: "desc" | "asc"; // default: desc
}

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

// Generate wordcloud dari keywords berdasarkan filter
// METHOD: GET
// ENDPOINT: /socmed/wordcloud
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<{wordclud: WordCloudType[]}>

export interface WordCloudType {
    text: string;
    value: number;
}

// Generate hashtags dari keywords berdasarkan filter
// METHOD: GET
// ENDPOINT: /socmed/hashtags
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<{hashtags: HashtagType[]}>

export interface HashtagType {
    tag: string;
    count: number;
}

// Get top most influential accounts berdasarkan keyword dan engagement
// METHOD: GET
// ENDPOINT: /socmed/influential
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<{accounts: InfluencerType[]}>

export interface InfluencerType extends SocmedAccountType {
    rank: number;
    event_count: number;
    engagement_score: number;
    influence_score: number;
}

// Menampilkan akun-akun yang paling sering mention/membicarakan 'keywords' (Top Most Active Accounts).
// METHOD: GET
// ENDPOINT: /socmed/active-accounts
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<{accounts: AccountType[]}>

export interface AccountType {
    sender_username: string;
    sender_name: string;
    platform: Platform;
    post_count: number;
    url?: string | null;
}

// Mencari/Mengambil detail profil akun (dari index 'senders')
// berdasarkan username (exact match) atau original_id (exact match).
// minimal: 1 of username or original_id must be provided (not both).
// METHOD: GET
// ENDPOINT: /socmed/account
// PARAMS: SocmedAccountParams
// RESPONSE: DefaultResponse<SocmedAccountType>

export type SocmedAccountParams = {
    platform?: Platform;
    username?: string;
    original_id?: string;
} & ({ original_id: string } | { username: string });
export interface SocmedAccountType {
    sender_id: string;
    username: string;
    fullname: string;
    platform: Platform;
    avatar: string;
    follower_count: number;
    following_count: number;
    is_verified?: boolean;
    bio?: string;
    url: string;
    location?: string;
    loc?: string;
    created_date: string | Date;
    last_activity?: string | Date;
}

// Mengambil agregasi 'get_mentions_aggregation'
// untuk menghitung mention, sentimen, dan pertumbuhan (growth rate).
// METHOD: GET
// ENDPOINT: /socmed/mentions
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<SocmedMetrics<SocmedMentionDataType[]>>

export interface SocmedMentionDataType {
    platform: Platform;
    total_mentions: 0;
    growth_summary: GrowthSummary;
    sentiment_breakdown: {
        sentiment: SentimentText;
        count: number;
    }[];
}

// Mengambil agregasi IMPRESI per platform dan pertumbuhan (growth rate).
// METHOD: GET
// ENDPOINT: /socmed/impressions
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<SocmedMetrics<SocmedImpressionDataType[]>>

export interface SocmedImpressionDataType {
    platform: string;
    total_impressions: number;
    growth_summary: GrowthSummary;
}

// Mengambil data TREN per platform per interval waktu.
// METHOD: GET
// ENDPOINT: /socmed/trends
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<SocmedTrendsType>

export interface SocmedTrendsType {
    keywords: string;
    interval: string;
    trends_data: TrendDataType[];
}

export interface TrendDataType {
    platform: Platform | string;
    trend: {
        date: string;
        count: number;
    }[];
}

// Menghitung Net Sentiment Score (NSS) berdasarkan filter.
// METHOD: GET
// ENDPOINT: /socmed/sentiment-score
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<SocmedSentimentScoreType>

export interface SocmedSentimentScoreType {
    keywords: string;
    total_mentions?: number;
    positive_count?: number;
    neutral_count?: number;
    negative_count?: number;
    net_sentiment_score?: number;
}

// Menghitung perbandingan cakupan Social Media vs News.
// METHOD: GET
// ENDPOINT: /socmed/media-coverage
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<SocmedMediaCoverageType>

export interface SocmedMediaCoverageType {
    keywords: string;
    total_mentions?: number;
    coverage: {
        category: string;
        count?: number;
        percentage: number;
    }[];
}

// Menghitung total dan rata-rata engagement.
// METHOD: GET
// ENDPOINT: /socmed/engagement-rate
// PARAMS: SocmedDefaultParams
// RESPONSE: DefaultResponse<SocmedEngagementRateType>

export interface SocmedEngagementRateType {
    keywords: string;
    total_mentions?: number;
    total_engagement?: number;
    average_engagement_rate?: number;
}

export interface SocmedMetrics<T> {
    keywords: string;
    growth_summary: GrowthSummary;
    platforms_data: T;
}

export interface GrowthSummary {
    current_count: number;
    previous_count: number;
    percentage_change: number;
}
