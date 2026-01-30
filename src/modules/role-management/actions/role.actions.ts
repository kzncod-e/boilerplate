"use server";

import { eq } from "drizzle-orm";
import { role, auditLog } from "../schemas/role.schema";
import { getDb } from "@/db";
import { type Role } from "../mock/role-data";

export const getRoles = async () => {
    try {
        const db = await getDb();
        const roles = await db.select().from(role);
        return {
            success: true,
            data: roles as Role[],
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};

export const createRole = async (data: { name: string; description?: string; status: "active" | "inactive" }) => {
    try {
        const db = await getDb();
        const newRole = {
            id: crypto.randomUUID(),
            name: data.name,
            description: data.description || null,
            status: data.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await db.insert(role).values(newRole);

        // Optional: Add audit log
        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: "system", // In real app, get from auth
            action: "create",
            targetType: "role",
            targetName: data.name,
            metadata: JSON.stringify(newRole),
            createdAt: new Date(),
        });

        return {
            success: true,
            data: newRole,
            message: "Role created successfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};

export const updateRole = async (id: string, data: { name?: string; description?: string; status?: string }) => {
    try {
        const db = await getDb();
        const updateData = {
            ...data,
            updatedAt: new Date(),
        };
        await db.update(role).set(updateData).where(eq(role.id, id));

        // Optional: Add audit log
        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: "system",
            action: "update",
            targetType: "role",
            targetName: data.name || "unknown",
            metadata: JSON.stringify({ id, ...updateData }),
            createdAt: new Date(),
        });

        return {
            success: true,
            message: "Role updated successfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};

export const deleteRole = async (id: string) => {
    try {
        const db = await getDb();
        // Get role name for audit
        const roleToDelete = await db.select().from(role).where(eq(role.id, id)).limit(1);
        const roleName = roleToDelete[0]?.name || "unknown";

        await db.delete(role).where(eq(role.id, id));

        // Optional: Add audit log
        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: "system",
            action: "delete",
            targetType: "role",
            targetName: roleName,
            metadata: JSON.stringify({ id }),
            createdAt: new Date(),
        });

        return {
            success: true,
            message: "Role deleted successfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};

export const duplicateRole = async (id: string) => {
    try {
        const db = await getDb();
        const existingRole = await db.select().from(role).where(eq(role.id, id)).limit(1);
        if (!existingRole[0]) {
            return {
                success: false,
                message: "Role not found",
            };
        }
        const original = existingRole[0];
        const newRole = {
            id: crypto.randomUUID(),
            name: `${original.name} Copy`,
            description: original.description,
            status: original.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await db.insert(role).values(newRole);

        // Optional: Add audit log
        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: "system",
            action: "create",
            targetType: "role",
            targetName: newRole.name,
            metadata: JSON.stringify(newRole),
            createdAt: new Date(),
        });

        return {
            success: true,
            data: newRole,
            message: "Role duplicated successfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};
