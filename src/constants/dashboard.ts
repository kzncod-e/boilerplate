

import { SocmedMentionDataType } from "@/interfaces";
import {
  BarChart3,

  User,
  GitCompare,
  FileText,
  Database,
  BookmarkCheck,
  TrendingUp,
  Plus,
  ChartNoAxesColumn,
  Flame,
  ChartColumn,
  FormInput,
  IdCard,
  ChartColumnDecreasing,
  ShieldUser,
  Users2,
  Link,
} from "lucide-react";
export const ROOT_NAVBAR = [
  {
    name: "Elements",
    description: "",
    url: "/dashboard",
    icon: BarChart3,
    items: [
      {
        name: "card",
        description: "Monitoring ARS",
        url: "/dashboard/card",
        icon: IdCard,
      },
      {
        name: "forms",
        description: "Analisis kompetitor",
        url: "/dashboard/forms",
        icon: FormInput,
      },
      {
        name: "charts",
        description: "Bandingkan data",
        url: "/dashboard/charts",
        icon: ChartColumnDecreasing,
      },
    ],
  },
  {
    name: "Widgets",
    description: "Manajemen dan pembuatan digest harian",
    url: "/widget",
    icon: FileText,
    items: [
      {
        name: "Gmaps",
        description: "Buat digest baru",
        url: "/widget/gmaps",
        icon: User,
      },
      {
        name: "wordcloud",
        description: "Lihat data widget",
        url: "/widget/wordcloud",
        icon: ShieldUser,
      },
      {
        name: "novu",
        description: "Lihat data widget",
        url: "/widget/novu",
        icon: Users2,
      },
      {
        name: "sna",
        description: "Lihat data widget",
        url: "/widget/sna",
        icon: Link,
      },
    ],
  },
  {
    name: "Authorization",
    description: "Manajemen dan pembuatan digest harian",
    url: "/digest",
    icon: FileText,
    items: [
      {
        name: "role",
        description: "Buat digest baru",
        url: "/digest/create",
        icon: User,
      },
      {
        name: "permission",
        description: "Lihat data digest",
        url: "/digest/data",
        icon: ShieldUser,
      },
      {
        name: "user",
        description: "Lihat data digest",
        url: "/digest/data",
        icon: Users2,
      },
    ],
  },

];
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
