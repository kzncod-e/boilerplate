export interface Location {
    code: string;
    name_globaleye: string;
}

export interface NewsItem {
    title: string;
    date: string;
    source: string;
    sentiment: "positive" | "negative" | "neutral";
    url?: string;
    commission?: number;
}

export interface CommissionNews {
    id: number;
    name: string;
    category: string;
    categories: string[];
    data: NewsItem[];
    pagination: {
        currentPage: number;
        totalPages: number;
        perPage: number;
        total: number;
    };
    total: number;
}

export interface MapData {
    // Add map data interface properties
}

export interface PaginationType {
    currentPage: number;
    totalPages: number;
    perPage: number;
    total: number;
    count: number;
}

export interface ObjectType {
    [key: string]: any;
}

export interface TrendingCategory {
    name: string;
    data: Array<ObjectType>;
    total: number;
    pagination: PaginationType;
    category: string;
    loading: boolean;
}

export interface TrendingList {
    name: string;
    icon: string | Array<string>;
    trending: TrendingCategory[];
    filter: any;
    per_page: number;
}

// location news marker
export interface LocationNewsTypes {
    data: LocationTypes[];
    status_code: number;
    status: boolean;
    message: any;
    pagination: Pagination;
    time: Time;
}

export interface Pagination {
    perPage: number;
    pageCurrent: number;
    pageLast: number;
    dataFrom: number;
    dataTo: number;
    dataTotal: number;
    navigation: Navigation;
    links: Link[];
}

export interface LocationTypes {
    id: number;
    code: string;
    type: string[];
    name: string;
    name_id: string;
    name_globaleye: string;
    nameDetails?: NameDetail[];
    woeid?: string;
    geometry?: Geometry;
    newsCount: any;
}

export interface NameDetail {
    long_name: string;
    short_name: string;
    types: string[];
}

export interface Geometry {
    bounds?: Bounds;
    location: Location;
    location_type: string;
    viewport: Viewport;
}

export interface Bounds {
    northeast: Northeast;
    southwest: Southwest;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast2;
    southwest: Southwest2;
}

export interface Northeast2 {
    lat: number;
    lng: number;
}

export interface Southwest2 {
    lat: number;
    lng: number;
}

export interface Navigation {
    nextUrl: any;
    prevUrl: any;
    firstUrl: string;
    lastUrl: string;
}

export interface Link {
    url?: string;
    label: string;
    active: boolean;
}

export interface Time {
    value: string;
    setTimeBeforeActions: boolean;
}
