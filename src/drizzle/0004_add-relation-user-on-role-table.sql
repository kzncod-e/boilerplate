ALTER TABLE `role` ADD `userId` integer REFERENCES user(id);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_role_permission` ON `role_permission` (`role_id`,`permission_id`);