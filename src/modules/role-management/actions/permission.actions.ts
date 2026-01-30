"use server";


import { permission } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface Permission {
  id: string;
  name: string;
  description: string | null;
  resource: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;
}

// Get all permissions
export async function getPermissions() {
        const db = await import("@/db").then((m) => m.getDb());

  try {
    const permissions = await db
      .select()
      .from(permission)
      .orderBy(permission.name, permission.action);

    return { success: true, data: permissions };
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return { success: false, error: "Failed to fetch permissions" };
  }
}

// Get a single permission by ID
export async function getPermissionById(id: string) {
  try {
        const db = await import("@/db").then((m) => m.getDb());

    const permissions = await db
      .select()
      .from(permission)
      .where(eq(permission.id, id))
      .limit(1);

    if (permissions.length === 0) {
      return { success: false, error: "Permission not found" };
    }

    return { success: true, data: permissions[0] };
  } catch (error) {
    console.error("Error fetching permission:", error);
    return { success: false, error: "Failed to fetch permission" };
  }
}

// Get permissions by resource
export async function getPermissionsByResource(resource: string) {
  try {
        const db = await import("@/db").then((m) => m.getDb());

    const permissions = await db
      .select()
      .from(permission)
      .where(eq(permission.name, resource))
      .orderBy(permission.action);

    return { success: true, data: permissions };
  } catch (error) {
    console.error("Error fetching permissions by resource:", error);
    return { success: false, error: "Failed to fetch permissions" };
  }
}
