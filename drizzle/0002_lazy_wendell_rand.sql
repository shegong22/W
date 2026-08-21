ALTER TABLE `inquiries` ADD `status` varchar(24) DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `notes` text;