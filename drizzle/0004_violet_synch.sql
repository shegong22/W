CREATE TABLE `site_copy` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentKey` varchar(160) NOT NULL,
	`page` varchar(80) NOT NULL,
	`section` varchar(120) NOT NULL,
	`field` varchar(80) NOT NULL,
	`label` varchar(180) NOT NULL,
	`value` text NOT NULL,
	`valueType` varchar(24) NOT NULL DEFAULT 'text',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_copy_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_copy_contentKey_unique` UNIQUE(`contentKey`)
);
