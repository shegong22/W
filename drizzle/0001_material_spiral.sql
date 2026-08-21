CREATE TABLE `media_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slot` varchar(120) NOT NULL,
	`category` varchar(80) NOT NULL,
	`title` varchar(180) NOT NULL,
	`altText` varchar(320) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`url` varchar(768) NOT NULL,
	`mimeType` varchar(120) NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`),
	CONSTRAINT `media_assets_slot_unique` UNIQUE(`slot`)
);
