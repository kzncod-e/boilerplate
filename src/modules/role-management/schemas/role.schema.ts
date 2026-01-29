import { integer, sqliteTable, text ,} from "drizzle-orm/sqlite-core";
export const role = sqliteTable("role", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
 role: text("role").notNull().default("user"),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" })
        .default(false)
        .notNull(),
    image: text("image"),
     banned: integer("banned", { mode: "boolean" }) // <-- pakai mode boolean
    .default(false)
    .notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});