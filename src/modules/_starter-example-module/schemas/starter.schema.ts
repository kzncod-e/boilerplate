import { z } from "zod";
import { STARTER_CATEGORIES } from "../constants/starter.constants";

/**
 * Zod schemas for validation
 */

export const createStarterSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be less than 500 characters"),
    category: z.enum(STARTER_CATEGORIES),
});

export const updateStarterSchema = createStarterSchema.partial();

export const starterFiltersSchema = z.object({
    category: z.enum(["all", ...STARTER_CATEGORIES]).optional(),
    status: z.enum(["all", "draft", "published", "archived"]).optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(12),
});

export const starterIdSchema = z.string().uuid("Invalid ID format");

// Type inference from schemas
export type CreateStarterInput = z.infer<typeof createStarterSchema>;
export type UpdateStarterInput = z.infer<typeof updateStarterSchema>;
export type StarterFiltersInput = z.infer<typeof starterFiltersSchema>;
export type StarterIdInput = z.infer<typeof starterIdSchema>;

/**
 * Validation helper functions
 */
export const validateCreateStarter = (data: unknown) => {
    return createStarterSchema.safeParse(data);
};

export const validateUpdateStarter = (data: unknown) => {
    return updateStarterSchema.safeParse(data);
};

export const validateStarterFilters = (data: unknown) => {
    return starterFiltersSchema.safeParse(data);
};

export const validateStarterId = (data: unknown) => {
    return starterIdSchema.safeParse(data);
};
