/**
 * Route definitions for the starter module
 */

export const STARTER_ROUTES = {
    // Main pages
    HOME: "/starter-example",
    CREATE: "/starter-example/create",
    EDIT: (id: string) => `/starter-example/edit/${id}`,
    VIEW: (id: string) => `/starter-example/view/${id}`,

    // API routes
    API: {
        BASE: "/api/starter-example",
        BY_ID: (id: string) => `/api/starter-example/${id}`,
        CREATE: "/api/starter-example",
        UPDATE: (id: string) => `/api/starter-example/${id}`,
        DELETE: (id: string) => `/api/starter-example/${id}`,
    },

    // Navigation items for sidebar/menu
    NAVIGATION: {
        MAIN: {
            href: "/starter-example",
            label: "Starter Example",
            description: "Example module for development",
            icon: "📋",
        },
    },
} as const;

/**
 * Route helpers
 */
export const isStarterRoute = (path: string): boolean => {
    return path.startsWith("/starter-example");
};

export const getStarterRouteType = (
    path: string,
): "home" | "create" | "edit" | "view" | "unknown" => {
    if (path === "/starter-example") return "home";
    if (path === "/starter-example/create") return "create";
    if (path.startsWith("/starter-example/edit/")) return "edit";
    if (path.startsWith("/starter-example/view/")) return "view";
    return "unknown";
};

export const extractStarterId = (path: string): string | null => {
    const editMatch = path.match(/^\/starter-example\/edit\/(.+)$/);
    const viewMatch = path.match(/^\/starter-example\/view\/(.+)$/);

    return editMatch?.[1] || viewMatch?.[1] || null;
};
