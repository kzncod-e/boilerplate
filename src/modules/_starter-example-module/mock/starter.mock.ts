import { StarterItem, StarterCategory } from "../models/starter.types";
import { STARTER_STATUS } from "../constants/starter.constants";

/**
 * Mock data for development and testing
 */

export const mockStarterItems: StarterItem[] = [
    {
        id: "1",
        title: "Getting Started with React Server Components",
        description:
            "Learn the fundamentals of React Server Components and how they can improve your application performance.",
        category: "Technology" as StarterCategory,
        status: STARTER_STATUS.PUBLISHED,
        createdAt: new Date("2024-01-15T10:00:00Z"),
        updatedAt: new Date("2024-01-15T10:00:00Z"),
    },
    {
        id: "2",
        title: "Building Scalable Business Applications",
        description:
            "Best practices for designing and implementing business applications that can grow with your needs.",
        category: "Business" as StarterCategory,
        status: STARTER_STATUS.PUBLISHED,
        createdAt: new Date("2024-01-14T14:30:00Z"),
        updatedAt: new Date("2024-01-14T14:30:00Z"),
    },
    {
        id: "3",
        title: "Modern UI Design Principles",
        description:
            "Explore contemporary design principles and how to apply them to create beautiful user interfaces.",
        category: "Design" as StarterCategory,
        status: STARTER_STATUS.DRAFT,
        createdAt: new Date("2024-01-13T09:15:00Z"),
        updatedAt: new Date("2024-01-13T09:15:00Z"),
    },
    {
        id: "4",
        title: "Digital Marketing Strategies",
        description:
            "Effective marketing strategies for digital products and services in today's competitive landscape.",
        category: "Marketing" as StarterCategory,
        status: STARTER_STATUS.PUBLISHED,
        createdAt: new Date("2024-01-12T16:45:00Z"),
        updatedAt: new Date("2024-01-12T16:45:00Z"),
    },
    {
        id: "5",
        title: "Advanced TypeScript Patterns",
        description:
            "Deep dive into advanced TypeScript patterns and techniques for building type-safe applications.",
        category: "Development" as StarterCategory,
        status: STARTER_STATUS.PUBLISHED,
        createdAt: new Date("2024-01-11T11:20:00Z"),
        updatedAt: new Date("2024-01-11T11:20:00Z"),
    },
    {
        id: "6",
        title: "Project Management Best Practices",
        description:
            "Essential project management practices for successful software development teams.",
        category: "Other" as StarterCategory,
        status: STARTER_STATUS.ARCHIVED,
        createdAt: new Date("2024-01-10T13:00:00Z"),
        updatedAt: new Date("2024-01-10T13:00:00Z"),
    },
];

/**
 * Mock API functions for development
 */
export const mockStarterApi = {
    /**
     * Get all starter items with optional filtering
     */
    async getItems(filters?: {
        category?: StarterCategory;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        let filteredItems = [...mockStarterItems];

        // Apply filters
        if (filters?.category) {
            filteredItems = filteredItems.filter(
                (item) => item.category === filters.category,
            );
        }

        if (filters?.status) {
            filteredItems = filteredItems.filter(
                (item) => item.status === filters.status,
            );
        }

        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            filteredItems = filteredItems.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower),
            );
        }

        // Apply pagination
        const page = filters?.page || 1;
        const limit = filters?.limit || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedItems = filteredItems.slice(startIndex, endIndex);

        return {
            items: paginatedItems,
            pagination: {
                page,
                limit,
                total: filteredItems.length,
                totalPages: Math.ceil(filteredItems.length / limit),
            },
        };
    },

    /**
     * Get a single starter item by ID
     */
    async getItem(id: string) {
        return mockStarterItems.find((item) => item.id === id) || null;
    },

    /**
     * Create a new starter item
     */
    async createItem(data: {
        title: string;
        description: string;
        category: StarterCategory;
    }) {
        const newItem: StarterItem = {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description,
            category: data.category,
            status: STARTER_STATUS.DRAFT,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        mockStarterItems.push(newItem);
        return newItem;
    },

    /**
     * Update an existing starter item
     */
    async updateItem(id: string, data: Partial<StarterItem>) {
        const index = mockStarterItems.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Item not found");
        }

        mockStarterItems[index] = {
            ...mockStarterItems[index],
            ...data,
            updatedAt: new Date(),
        };

        return mockStarterItems[index];
    },

    /**
     * Delete a starter item
     */
    async deleteItem(id: string) {
        const index = mockStarterItems.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Item not found");
        }

        mockStarterItems.splice(index, 1);
    },
};
