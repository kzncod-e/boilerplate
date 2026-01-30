"use server";

import { role } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface Role {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Get all roles
export async function getRoles() {
  const db = await import("@/db").then((m) => m.getDb());

  try {
    const roles = await db
      .select()
      .from(role)
      .orderBy(role.name);

    return { success: true, data: roles };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return { success: false, error: "Failed to fetch roles" };
  }
}

// Get a single role by ID
export async function getRoleById(id: string) {
  try {
    const db = await import("@/db").then((m) => m.getDb());

    const roles = await db
      .select()
      .from(role)
      .where(eq(role.id, id))
      .limit(1);

    if (roles.length === 0) {
      return { success: false, error: "Role not found" };
    }

    return { success: true, data: roles[0] };
  } catch (error) {
    console.error("Error fetching role:", error);
    return { success: false, error: "Failed to fetch role" };
  }
}

// Get roles by status
export async function getRolesByStatus(status: string) {
  try {
    const db = await import("@/db").then((m) => m.getDb());

    const roles = await db
      .select()
      .from(role)
      .where(eq(role.status, status))
      .orderBy(role.name);

    return { success: true, data: roles };
  } catch (error) {
    console.error("Error fetching roles by status:", error);
    return { success: false, error: "Failed to fetch roles" };
  }
}
