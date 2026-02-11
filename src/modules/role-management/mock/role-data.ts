export interface Role {
    id: string;
    name: string;
    description: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    totalUsers?: number;
}

export interface Permission {
    id: string;
    module: string;
    action: string;
    description: string;
}

export interface RolePermission {
    id: string;
    roleId: string;
    permissionId: string;
}

export interface AuditLog {
    id: string;
    actor: string;
    action: string;
    target: string;
    targetId?: string;
    oldValue?: string;
    newValue?: string;
    createdAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt: Date;
}

export const mockRoles: Role[] = [
    {
        id: "role-1",
        name: "Super Admin",
        description: "Full system access with all permissions",
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
    },
    {
        id: "role-2",
        name: "Admin",
        description: "Administrative access with most permissions",
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
    },
    {
        id: "role-3",
        name: "Editor",
        description: "Can edit content and manage users",
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
    },
    {
        id: "role-4",
        name: "Viewer",
        description: "Read-only access to most features",
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
    },
    {
        id: "role-5",
        name: "Guest",
        description: "Limited access for guest users",
        status: "inactive",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
    },
];

export const mockPermissions: Permission[] = [
    {
        id: "perm-1",
        module: "users",
        action: "read",
        description: "View users",
    },
    {
        id: "perm-2",
        module: "users",
        action: "create",
        description: "Create users",
    },
    {
        id: "perm-3",
        module: "users",
        action: "update",
        description: "Update users",
    },
    {
        id: "perm-4",
        module: "users",
        action: "delete",
        description: "Delete users",
    },
    {
        id: "perm-5",
        module: "posts",
        action: "read",
        description: "View posts",
    },
    {
        id: "perm-6",
        module: "posts",
        action: "create",
        description: "Create posts",
    },
    {
        id: "perm-7",
        module: "posts",
        action: "update",
        description: "Update posts",
    },
    {
        id: "perm-8",
        module: "posts",
        action: "delete",
        description: "Delete posts",
    },
    {
        id: "perm-9",
        module: "roles",
        action: "read",
        description: "View roles",
    },
    {
        id: "perm-10",
        module: "roles",
        action: "create",
        description: "Create roles",
    },
    {
        id: "perm-11",
        module: "roles",
        action: "update",
        description: "Update roles",
    },
    {
        id: "perm-12",
        module: "roles",
        action: "delete",
        description: "Delete roles",
    },
];

export const mockRolePermissions: RolePermission[] = [
    // Super Admin - all permissions
    { id: "rp-1", roleId: "role-1", permissionId: "perm-1" },
    { id: "rp-2", roleId: "role-1", permissionId: "perm-2" },
    { id: "rp-3", roleId: "role-1", permissionId: "perm-3" },
    { id: "rp-4", roleId: "role-1", permissionId: "perm-4" },
    { id: "rp-5", roleId: "role-1", permissionId: "perm-5" },
    { id: "rp-6", roleId: "role-1", permissionId: "perm-6" },
    { id: "rp-7", roleId: "role-1", permissionId: "perm-7" },
    { id: "rp-8", roleId: "role-1", permissionId: "perm-8" },
    { id: "rp-9", roleId: "role-1", permissionId: "perm-9" },
    { id: "rp-10", roleId: "role-1", permissionId: "perm-10" },
    { id: "rp-11", roleId: "role-1", permissionId: "perm-11" },
    { id: "rp-12", roleId: "role-1", permissionId: "perm-12" },

    // Admin - most permissions except role management
    { id: "rp-13", roleId: "role-2", permissionId: "perm-1" },
    { id: "rp-14", roleId: "role-2", permissionId: "perm-2" },
    { id: "rp-15", roleId: "role-2", permissionId: "perm-3" },
    { id: "rp-16", roleId: "role-2", permissionId: "perm-4" },
    { id: "rp-17", roleId: "role-2", permissionId: "perm-5" },
    { id: "rp-18", roleId: "role-2", permissionId: "perm-6" },
    { id: "rp-19", roleId: "role-2", permissionId: "perm-7" },
    { id: "rp-20", roleId: "role-2", permissionId: "perm-8" },

    // Editor - user and post management
    { id: "rp-21", roleId: "role-3", permissionId: "perm-1" },
    { id: "rp-22", roleId: "role-3", permissionId: "perm-3" },
    { id: "rp-23", roleId: "role-3", permissionId: "perm-5" },
    { id: "rp-24", roleId: "role-3", permissionId: "perm-6" },
    { id: "rp-25", roleId: "role-3", permissionId: "perm-7" },

    // Viewer - read only
    { id: "rp-26", roleId: "role-4", permissionId: "perm-1" },
    { id: "rp-27", roleId: "role-4", permissionId: "perm-5" },
    { id: "rp-28", roleId: "role-4", permissionId: "perm-9" },
];

export const mockAuditLogs: AuditLog[] = [
    {
        id: "audit-1",
        actor: "John Doe",
        action: "create",
        target: "role",
        targetId: "role-1",
        newValue: JSON.stringify({ name: "Super Admin", status: "active" }),
        createdAt: new Date("2024-01-15T10:30:00"),
    },
    {
        id: "audit-2",
        actor: "Jane Smith",
        action: "update",
        target: "permission",
        targetId: "perm-1",
        oldValue: JSON.stringify({ granted: false }),
        newValue: JSON.stringify({ granted: true }),
        createdAt: new Date("2024-01-14T14:20:00"),
    },
    {
        id: "audit-3",
        actor: "Bob Johnson",
        action: "assign",
        target: "user_role",
        targetId: "user-1",
        oldValue: JSON.stringify({ role: "Viewer" }),
        newValue: JSON.stringify({ role: "Editor" }),
        createdAt: new Date("2024-01-13T09:15:00"),
    },
    {
        id: "audit-4",
        actor: "Alice Brown",
        action: "delete",
        target: "role",
        targetId: "role-5",
        oldValue: JSON.stringify({ name: "Guest", status: "inactive" }),
        createdAt: new Date("2024-01-12T16:45:00"),
    },
    {
        id: "audit-5",
        actor: "Charlie Wilson",
        action: "update",
        target: "role",
        targetId: "role-3",
        oldValue: JSON.stringify({ description: "Can edit content" }),
        newValue: JSON.stringify({
            description: "Can edit content and manage users",
        }),
        createdAt: new Date("2024-01-11T11:00:00"),
    },
];
