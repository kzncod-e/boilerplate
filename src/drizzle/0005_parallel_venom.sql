PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_role` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`name` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_role`("id", "userId", "name", "description", "status", "created_at", "updated_at") SELECT "id", "userId", "name", "description", "status", "created_at", "updated_at" FROM `role`;--> statement-breakpoint
DROP TABLE `role`;--> statement-breakpoint
ALTER TABLE `__new_role` RENAME TO `role`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `role_name_unique` ON `role` (`name`);