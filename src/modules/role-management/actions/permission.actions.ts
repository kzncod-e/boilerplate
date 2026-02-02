"use server";

import { eq, and, inArray } from "drizzle-orm";
import { permission, role, rolePermission, auditLog } from "../schemas/role.schema";
import { getDb } from "@/db";
import { requireAuth } from "@/modules/auth/utils/auth-utils";

export interface Permission {
  id: string;
  name: string;
  action: string;
  module: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Get all permissions
export async function getPermissions() {
  try {
    const db = await getDb();
    const permissions = await db
      .select()
      .from(permission)
      .orderBy(permission.module, permission.action);

    return { success: true, data: permissions as Permission[] };
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return { success: false, error: "Failed to fetch permissions" };
  }
}

// Get permissions by module
export async function getPermissionsByModule(module: string) {
  try {
    const db = await getDb();
    const permissions = await db
      .select()
      .from(permission)
      .where(eq(permission.module, module))
      .orderBy(permission.action);

    return { success: true, data: permissions as Permission[] };
  } catch (error) {
    console.error("Error fetching permissions by module:", error);
    return { success: false, error: "Failed to fetch permissions" };
  }
}

// Get role permissions
export async function getRolePermissions(roleId?: string) {
  try {
    const db = await getDb();
    const query = roleId
      ? db.select().from(rolePermission).where(eq(rolePermission.roleId, roleId))
      : db.select().from(rolePermission);

    const rolePerms = await query;
    return { success: true, data: rolePerms as RolePermission[] };
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    return { success: false, error: "Failed to fetch role permissions" };
  }
}

// Assign permission to role
export async function assignPermissionToRole(roleId: string, permissionId: string, actor: string = "system") {
  try {
    const db = await getDb();
 const currentUser = await requireAuth();
    // Check if already exists
    const existing = await db
      .select()
      .from(rolePermission)
      .where(and(eq(rolePermission.roleId, roleId), eq(rolePermission.permissionId, permissionId)))
      .limit(1);

    if (existing.length > 0) {
      return { success: true, message: "Permission already assigned" };
    }

    const newRolePerm = {
      id: crypto.randomUUID(),
      roleId,
      permissionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(rolePermission).values(newRolePerm);

    // Audit log
    await db.insert(auditLog).values({
      id: crypto.randomUUID(),
      actor: currentUser.name,
      action: "assign",
      targetType: "permission",
      targetName: permissionId,
      metadata: JSON.stringify({ roleId, permissionId }),
      createdAt: new Date(),
    });

    return { success: true, data: newRolePerm, message: "Permission assigned successfully" };
  } catch (error) {
    console.error("Error assigning permission:", error);
    return { success: false, error: "Failed to assign permission" };
  }
}

// Revoke permission from role
export async function revokePermissionFromRole(roleId: string, permissionId: string, actor: string = "system") {
  try {
    const db = await getDb();
    const currentUser = await requireAuth();
    await db
      .delete(rolePermission)
      .where(and(eq(rolePermission.roleId, roleId), eq(rolePermission.permissionId, permissionId)));

    // Audit log
    await db.insert(auditLog).values({
      id: crypto.randomUUID(),
      actor: currentUser.name,
      action: "revoke",
      targetType: "permission",
      targetName: permissionId,
      metadata: JSON.stringify({ roleId, permissionId }),
      createdAt: new Date(),
    });

    return { success: true, message: "Permission revoked successfully" };
  } catch (error) {
    console.error("Error revoking permission:", error);
    return { success: false, error: "Failed to revoke permission" };
  }
}

// Update role permissions (bulk)
export async function updateRolePermissions(roleId: string,roleName:string, permissionIds: string[], actor: string = "system") {
  try {
    const db = await getDb();
    const currentUser = await requireAuth();
    // Get current permissions
    const currentPerms = await db
      .select()
      .from(rolePermission)
      .where(eq(rolePermission.roleId, roleId));

    const currentIds = currentPerms.map(p => p.permissionId);

    // Permissions to add
    const toAdd = permissionIds.filter(id => !currentIds.includes(id));
    // Permissions to remove
    const toRemove = currentIds.filter(id => !permissionIds.includes(id));

    // Add new permissions
    if (toAdd.length > 0) {
      const newRolePerms = toAdd.map(permId => ({
        id: crypto.randomUUID(),
        roleId,
        permissionId: permId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await db.insert(rolePermission).values(newRolePerms);
    }

    // Remove old permissions
    if (toRemove.length > 0) {
      await db
        .delete(rolePermission)
        .where(and(eq(rolePermission.roleId, roleId), inArray(rolePermission.permissionId, toRemove)));
    }

    // Audit log
    await db.insert(auditLog).values({
      id: crypto.randomUUID(),
        actor: currentUser.name,
      action: "update",
      targetType: "role_permissions",
      targetName: roleName,
      metadata: JSON.stringify({ added: toAdd, removed: toRemove }),
      createdAt: new Date(),
    });

    return { success: true, message: "Role permissions updated successfully" };
  } catch (error) {
    console.error("Error updating role permissions:", error);
    return { success: false, error: "Failed to update role permissions" };
  }
}

// Seed default permissions
export async function seedPermissions() {
  try {
    const db = await getDb();

    const defaultPermissions = [
      // Users
      { name: "read_users", action: "read", module: "users", description: "View users" },
      { name: "create_users", action: "create", module: "users", description: "Create users" },
      { name: "update_users", action: "update", module: "users", description: "Update users" },
      { name: "delete_users", action: "delete", module: "users", description: "Delete users" },
      // Posts
      { name: "read_posts", action: "read", module: "posts", description: "View posts" },
      { name: "create_posts", action: "create", module: "posts", description: "Create posts" },
      { name: "update_posts", action: "update", module: "posts", description: "Update posts" },
      { name: "delete_posts", action: "delete", module: "posts", description: "Delete posts" },
      // Roles
      { name: "read_roles", action: "read", module: "roles", description: "View roles" },
      { name: "create_roles", action: "create", module: "roles", description: "Create roles" },
      { name: "update_roles", action: "update", module: "roles", description: "Update roles" },
      { name: "delete_roles", action: "delete", module: "roles", description: "Delete roles" },
    ];

    for (const perm of defaultPermissions) {
      const existing = await db
        .select()
        .from(permission)
        .where(eq(permission.name, perm.name))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(permission).values({
          id: crypto.randomUUID(),
          ...perm,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    return { success: true, message: "Permissions seeded successfully" };
  } catch (error) {
    console.error("Error seeding permissions:", error);
    return { success: false, error: "Failed to seed permissions" };
  }
}

// Assign default permissions to roles for seeding
export async function assignDefaultPermissionsToRoles() {
  try {
    const db = await getDb();

    // Get all permissions
    const allPerms = await db.select().from(permission);
    const permIds = allPerms.map(p => p.id);

    // Get all roles
    const allRoles = await db.select().from(role);

    for (const r of allRoles) {
      let assignedPerms: string[] = [];

      if (r.name.toLowerCase().includes("super admin")) {
        // All permissions
        assignedPerms = permIds;
      } else if (r.name.toLowerCase().includes("admin")) {
        // All except role management
        assignedPerms = allPerms
          .filter(p => p.module !== "roles")
          .map(p => p.id);
      } else if (r.name.toLowerCase().includes("editor")) {
        // Users read/update, posts all
        assignedPerms = allPerms
          .filter(p => (p.module === "users" && (p.action === "read" || p.action === "update")) || p.module === "posts")
          .map(p => p.id);
      } else if (r.name.toLowerCase().includes("viewer")) {
        // Read only
        assignedPerms = allPerms
          .filter(p => p.action === "read")
          .map(p => p.id);
      }

      // Update permissions for this role
      await updateRolePermissions(r.id,"", assignedPerms);
    }

    return { success: true, message: "Default permissions assigned to roles successfully" };
  } catch (error) {
    console.error("Error assigning default permissions:", error);
    return { success: false, error: "Failed to assign default permissions" };
  }
}
