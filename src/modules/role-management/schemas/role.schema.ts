import { user } from "@/db";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import z from "zod";

export const role = sqliteTable("role", {
    id: text("id").primaryKey(),
    userId: text("userId").references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    name: text("name").notNull().unique(),
    description: text("description"),
    status: text("status").notNull().default("active"), // active, inactive
    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const permission = sqliteTable("permission", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    action: text("action").notNull(), // e.g., "create", "read", "update", "delete"
    module: text("module").notNull(), // e.g., "users", "roles", "permissions"
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});



export const rolePermission = sqliteTable(
  "role_permission",
  {
    id: text("id").primaryKey(),

    roleId: text("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),

    permissionId: text("permission_id")
      .notNull()
      .references(() => permission.id, { onDelete: "cascade" }),

    createdAt: integer("created_at", { mode: "timestamp" })
      .defaultNow()
      .notNull(),

    updatedAt: integer("updated_at", { mode: "timestamp" })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    uniqueRolePermission: uniqueIndex("unique_role_permission")
      .on(table.roleId, table.permissionId),
  })
);
export const roleSchema = z.object({
  name: z
    .string()
    .min(1, "Role name is required")
    .max(50, "Role name too long"),
  description: z.string().max(200, "Description too long").optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

export type RoleFormData = z.infer<typeof roleSchema>;

export const auditLog = sqliteTable("audit_log", {
    id: text("id").primaryKey(),
    actor: text("actor").notNull(), // user who performed the action
    action: text("action").notNull(), // create, update, delete, assign, revoke
    targetType: text("target_type").notNull(), // role, permission, user
    targetName: text("target_name").notNull(), // name of the target
    metadata: text("metadata"), // JSON string with old/new values
    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
});
