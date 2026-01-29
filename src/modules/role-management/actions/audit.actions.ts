"use server";


import { auditLog } from "../schemas/role.schema";
import { desc, and, gte, lte, like, eq, sql } from "drizzle-orm";

export interface AuditLogFilters {
  actor?: string;
  action?: string;
  targetType?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export async function getAuditLogs(filters: AuditLogFilters = {}, page = 1, limit = 50) {
  const db = await import("@/db").then((m) => m.getDb());
  try {
    let whereConditions: any[] = [];

    if (filters.actor) {
      whereConditions.push(like(auditLog.actor, `%${filters.actor}%`));
    }

    if (filters.action) {
      whereConditions.push(eq(auditLog.action, filters.action));
    }

    if (filters.targetType) {
      whereConditions.push(eq(auditLog.targetType, filters.targetType));
    }

    if (filters.dateFrom) {
      whereConditions.push(gte(auditLog.createdAt, filters.dateFrom));
    }

    if (filters.dateTo) {
      whereConditions.push(lte(auditLog.createdAt, filters.dateTo));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(auditLog)
      .where(whereClause);

    const totalCount = totalCountResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;

    // Get paginated results
    const logs = await db
      .select()
      .from(auditLog)
      .where(whereClause)
      .orderBy(desc(auditLog.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      success: true,
      data: {
        logs,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return { success: false, error: "Failed to fetch audit logs" };
  }
}

export async function getAuditLogById(id: string) {
  const db = await import("@/db").then((m) => m.getDb());
  try {
    const logs = await db
      .select()
      .from(auditLog)
      .where(eq(auditLog.id, id))
      .limit(1);

    if (logs.length === 0) {
      return { success: false, error: "Audit log not found" };
    }

    return { success: true, data: logs[0] };
  } catch (error) {
    console.error("Error fetching audit log:", error);
    return { success: false, error: "Failed to fetch audit log" };
  }
}

export async function createAuditLog(data: {
  actor: string;
  action: string;
  targetType: string;
  targetName: string;
  metadata?: string;
}) {
  const db = await import("@/db").then((m) => m.getDb());
  try {
    const newLog = await db
      .insert(auditLog)
      .values({
        id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        actor: data.actor,
        action: data.action,
        targetType: data.targetType,
        targetName: data.targetName,
        metadata: data.metadata,
      })
      .returning();

    return { success: true, data: newLog[0] };
  } catch (error) {
    console.error("Error creating audit log:", error);
    return { success: false, error: "Failed to create audit log" };
  }
}

export async function getAuditStats() {
  const db = await import("@/db").then((m) => m.getDb());
  try {
    // Get action counts
    const actionStats = await db
      .select({
        action: auditLog.action,
        count: sql<number>`count(*)`,
      })
      .from(auditLog)
      .groupBy(auditLog.action);

    // Get recent activity (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const recentActivity = await db
      .select()
      .from(auditLog)
      .where(gte(auditLog.createdAt, yesterday))
      .orderBy(desc(auditLog.createdAt))
      .limit(10);

    return {
      success: true,
      data: {
        actionStats,
        recentActivity,
      },
    };
  } catch (error) {
    console.error("Error fetching audit stats:", error);
    return { success: false, error: "Failed to fetch audit stats" };
  }
}
