CREATE TABLE `payment_events` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`provider` enum('mercadopago') NOT NULL,
	`provider_event_key` varchar(191) NOT NULL,
	`provider_payment_id` varchar(160) NOT NULL,
	`event_type` varchar(64) NOT NULL,
	`action` varchar(96) NOT NULL,
	`processed_status` varchar(96) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`processed_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `payment_events_id` PRIMARY KEY(`id`),
	CONSTRAINT `payment_events_provider_event_unique` UNIQUE(`provider`,`provider_event_key`)
);
--> statement-breakpoint
CREATE INDEX `payment_events_provider_payment_idx` ON `payment_events` (`provider`,`provider_payment_id`);
