/**
 * Constants for the starter module
 */

// Categories
export const STARTER_CATEGORIES = [
    "Technology",
    "Business",
    "Design",
    "Marketing",
    "Development",
    "Other",
] as const;

export type StarterCategory = (typeof STARTER_CATEGORIES)[number];

// Status
export const STARTER_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
    ARCHIVED: "archived",
} as const;

export type StarterStatus =
    (typeof STARTER_STATUS)[keyof typeof STARTER_STATUS];

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// Validation messages
export const VALIDATION_MESSAGES = {
    TITLE_REQUIRED: "Title is required",
    TITLE_TOO_LONG: "Title must be less than 100 characters",
    DESCRIPTION_REQUIRED: "Description is required",
    DESCRIPTION_TOO_LONG: "Description must be less than 500 characters",
    CATEGORY_REQUIRED: "Category is required",
} as const;

// API endpoints
export const API_ENDPOINTS = {
    STARTERS: "/api/starter-example",
    STARTER_BY_ID: (id: string) => `/api/starter-example/${id}`,
} as const;

// Cache keys
export const CACHE_KEYS = {
    STARTERS: "starter-example:items",
    STARTER_BY_ID: (id: string) => `starter-example:item:${id}`,
    STARTERS_BY_CATEGORY: (category: string) =>
        `starter-example:category:${category}`,
} as const;
