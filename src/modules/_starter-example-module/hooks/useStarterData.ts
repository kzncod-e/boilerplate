"use client";

import { useState, useEffect, useCallback } from "react";
import {
    StarterItem,
    StarterFilters,
    StarterListResponse,
} from "../models/starter.types";
import { DEFAULT_PAGE_SIZE } from "../constants/starter.constants";

interface UseStarterDataOptions {
    initialFilters?: StarterFilters;
    pageSize?: number;
}

interface UseStarterDataReturn {
    items: StarterItem[];
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    filters: StarterFilters;
    setFilters: (filters: StarterFilters) => void;
    setPage: (page: number) => void;
    refetch: () => Promise<void>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export function useStarterData({
    initialFilters = {},
    pageSize = DEFAULT_PAGE_SIZE,
}: UseStarterDataOptions = {}): UseStarterDataReturn {
    const [items, setItems] = useState<StarterItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<StarterFilters>(initialFilters);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: pageSize,
        total: 0,
        totalPages: 0,
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Build query string
            const params = new URLSearchParams({
                page: page.toString(),
                limit: pageSize.toString(),
                ...Object.fromEntries(
                    Object.entries(filters).filter(
                        ([_, value]) => value !== undefined && value !== "",
                    ),
                ),
            });

            const response = await fetch(`/api/starter-example?${params}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }

            const data: StarterListResponse = await response.json();
            setItems(data.items);
            setPagination(data.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [page, filters, pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const hasNextPage = page < pagination.totalPages;
    const hasPreviousPage = page > 1;

    return {
        items,
        loading,
        error,
        pagination,
        filters,
        setFilters,
        setPage,
        refetch: fetchData,
        hasNextPage,
        hasPreviousPage,
    };
}
