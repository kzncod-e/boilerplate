import { StarterItem, CreateStarterData, UpdateStarterData } from "../models/starter.types";
import { API_ENDPOINTS, CACHE_KEYS } from "../constants/starter.constants";

/**
 * Client-side service for external API integrations
 * This handles communication with external services and APIs
 */

export class StarterService {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch all starter items from API
   */
  async getItems(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }): Promise<{
    items: StarterItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.category) searchParams.set("category", params.category);
    if (params?.status) searchParams.set("status", params.status);
    if (params?.search) searchParams.set("search", params.search);

    const response = await fetch(`${API_ENDPOINTS.STARTERS}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get a single starter item by ID
   */
  async getItem(id: string): Promise<StarterItem> {
    const response = await fetch(API_ENDPOINTS.STARTER_BY_ID(id));
    
    if (!response.ok) {
      throw new Error(`Failed to fetch item: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Create a new starter item
   */
  async createItem(data: CreateStarterData): Promise<StarterItem> {
    const response = await fetch(API_ENDPOINTS.STARTERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create item: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update an existing starter item
   */
  async updateItem(id: string, data: UpdateStarterData): Promise<StarterItem> {
    const response = await fetch(API_ENDPOINTS.STARTER_BY_ID(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update item: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a starter item
   */
  async deleteItem(id: string): Promise<void> {
    const response = await fetch(API_ENDPOINTS.STARTER_BY_ID(id), {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.statusText}`);
    }
  }

  /**
   * Upload file for starter item
   */
  async uploadFile(file: File, itemId: string): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("itemId", itemId);

    const response = await fetch(`${API_ENDPOINTS.STARTERS}/${itemId}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Export starter items to CSV
   */
  async exportToCSV(filters?: {
    category?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<Blob> {
    const searchParams = new URLSearchParams();
    
    if (filters?.category) searchParams.set("category", filters.category);
    if (filters?.status) searchParams.set("status", filters.status);
    if (filters?.dateFrom) searchParams.set("dateFrom", filters.dateFrom);
    if (filters?.dateTo) searchParams.set("dateTo", filters.dateTo);

    const response = await fetch(`${API_ENDPOINTS.STARTERS}/export?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`Failed to export data: ${response.statusText}`);
    }

    return response.blob();
  }

  /**
   * Import starter items from CSV
   */
  async importFromCSV(file: File): Promise<{
    imported: number;
    errors: string[];
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_ENDPOINTS.STARTERS}/import`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to import data: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get analytics data for starter items
   */
  async getAnalytics(timeRange: "7d" | "30d" | "90d" = "30d"): Promise<{
    totalViews: number;
    totalItems: number;
    itemsByCategory: Record<string, number>;
    itemsByStatus: Record<string, number>;
    recentlyViewed: StarterItem[];
  }> {
    const response = await fetch(`${API_ENDPOINTS.STARTERS}/analytics?range=${timeRange}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const starterService = new StarterService();

// Export individual functions for convenience
export const getStarterItems = (params?: any) => starterService.getItems(params);
export const getStarterItem = (id: string) => starterService.getItem(id);
export const createStarterItem = (data: CreateStarterData) => starterService.createItem(data);
export const updateStarterItem = (id: string, data: UpdateStarterData) => starterService.updateItem(id, data);
export const deleteStarterItem = (id: string) => starterService.deleteItem(id);
export const uploadStarterFile = (file: File, itemId: string) => starterService.uploadFile(file, itemId);
export const exportStarterToCSV = (filters?: any) => starterService.exportToCSV(filters);
export const importStarterFromCSV = (file: File) => starterService.importFromCSV(file);
export const getStarterAnalytics = (timeRange?: "7d" | "30d" | "90d") => starterService.getAnalytics(timeRange);
