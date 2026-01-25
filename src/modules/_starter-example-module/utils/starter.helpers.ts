import { StarterItem, StarterCategory } from "../models/starter.types";
import { STARTER_STATUS } from "../constants/starter.constants";

/**
 * Utility functions for the starter module
 */

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  
  return formatDate(date);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

/**
 * Generate slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

/**
 * Get status color for UI
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case STARTER_STATUS.PUBLISHED:
      return "text-green-600 bg-green-50";
    case STARTER_STATUS.DRAFT:
      return "text-yellow-600 bg-yellow-50";
    case STARTER_STATUS.ARCHIVED:
      return "text-gray-600 bg-gray-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

/**
 * Get category color for UI
 */
export const getCategoryColor = (category: StarterCategory): string => {
  const colors: Record<StarterCategory, string> = {
    Technology: "text-blue-600 bg-blue-50",
    Business: "text-purple-600 bg-purple-50",
    Design: "text-pink-600 bg-pink-50",
    Marketing: "text-orange-600 bg-orange-50",
    Development: "text-green-600 bg-green-50",
    Other: "text-gray-600 bg-gray-50",
  };
  
  return colors[category] || colors.Other;
};

/**
 * Filter items by search term
 */
export const filterBySearch = (
  items: StarterItem[],
  searchTerm: string
): StarterItem[] => {
  if (!searchTerm.trim()) return items;
  
  const lowerSearch = searchTerm.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerSearch) ||
      item.description.toLowerCase().includes(lowerSearch) ||
      item.category.toLowerCase().includes(lowerSearch)
  );
};

/**
 * Sort items by different criteria
 */
export const sortItems = (
  items: StarterItem[],
  sortBy: "title" | "createdAt" | "updatedAt" | "category",
  order: "asc" | "desc" = "asc"
): StarterItem[] => {
  return [...items].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "createdAt":
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
        break;
      case "updatedAt":
        comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
    }
    
    return order === "desc" ? -comparison : comparison;
  });
};

/**
 * Group items by category
 */
export const groupByCategory = (
  items: StarterItem[]
): Record<StarterCategory, StarterItem[]> => {
  return items.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<StarterCategory, StarterItem[]>);
};

/**
 * Get statistics from items
 */
export const getStats = (items: StarterItem[]) => {
  const total = items.length;
  const byCategory = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byStatus = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const recentlyUpdated = items
    .filter(item => {
      const daysSinceUpdate = (Date.now() - item.updatedAt.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate <= 7;
    })
    .length;

  return {
    total,
    byCategory,
    byStatus,
    recentlyUpdated,
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate random ID (fallback)
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

/**
 * Download file from URL
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
