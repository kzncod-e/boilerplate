import { LucideIcon } from "lucide-react";
import { Youtube, Facebook, Instagram, Twitter } from "lucide-react";

export const getPlatformIcon = (platform: string): LucideIcon => {
  switch (platform) {
    case "youtube":
      return Youtube;
    case "facebook":
      return Facebook;
    case "instagram":
      return Instagram;
    case "twitter":
      return Twitter;
    default:
      return Youtube;
  }
};

export const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "youtube":
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
    case "facebook":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
    case "instagram":
      return "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800";
    case "twitter":
      return "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
  }
};

export const formatViews = (views: number) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export const formatEngagement = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};
