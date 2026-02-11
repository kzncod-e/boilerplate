import { StarterCategory, StarterStatus } from "../constants/starter.constants";

// Re-export types for convenience
export type {
    StarterCategory,
    StarterStatus,
} from "../constants/starter.constants";

/**
 * Base interfaces for the starter module
 */

export interface StarterItem {
    id: string;
    title: string;
    description: string;
    category: StarterCategory;
    status: StarterStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateStarterData {
    title: string;
    description: string;
    category: StarterCategory;
}

export interface UpdateStarterData {
    title?: string;
    description?: string;
    category?: StarterCategory;
    status?: StarterStatus;
}

export interface StarterFilters {
    category?: StarterCategory;
    status?: StarterStatus;
    search?: string;
    page?: number;
    limit?: number;
}

export interface StarterPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface StarterListResponse {
    items: StarterItem[];
    pagination: StarterPagination;
}

// Form types
export interface StarterFormData {
    title: string;
    description: string;
    category: StarterCategory;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Component props types
export interface StarterCardProps {
    item: StarterItem;
    onEdit?: (item: StarterItem) => void;
    onDelete?: (id: string) => void;
    onView?: (item: StarterItem) => void;
}

export interface StarterListProps {
    items: StarterItem[];
    loading?: boolean;
    onEdit?: (item: StarterItem) => void;
    onDelete?: (id: string) => void;
    onView?: (item: StarterItem) => void;
}

export interface StarterFormProps {
    initialData?: Partial<StarterFormData>;
    onSubmit: (data: StarterFormData) => Promise<void>;
    loading?: boolean;
    onCancel?: () => void;
}
