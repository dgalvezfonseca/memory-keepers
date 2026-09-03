ALTER TABLE `orders` ADD `checkout_request_id` varchar(64);--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_checkout_request_unique` UNIQUE(`checkout_request_id`);