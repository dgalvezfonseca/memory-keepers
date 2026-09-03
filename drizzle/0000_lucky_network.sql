CREATE TABLE `categories` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`name` varchar(160) NOT NULL,
	`description` text NOT NULL,
	`sort_order` int unsigned NOT NULL DEFAULT 0,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(140) NOT NULL,
	`email` varchar(254) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `order_folio_counters` (
	`year` int unsigned NOT NULL,
	`last_value` int unsigned NOT NULL,
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `order_folio_counters_year` PRIMARY KEY(`year`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int unsigned NOT NULL,
	`product_id` int unsigned NOT NULL,
	`product_variant_id` int unsigned,
	`product_name_snapshot` varchar(200) NOT NULL,
	`variant_name_snapshot` varchar(200),
	`unit_price` bigint unsigned NOT NULL,
	`quantity` int unsigned NOT NULL,
	`subtotal` bigint unsigned NOT NULL,
	`configuration_snapshot` json NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `order_items_quantity_positive` CHECK(`order_items`.`quantity` > 0),
	CONSTRAINT `order_items_unit_price_nonnegative` CHECK(`order_items`.`unit_price` >= 0),
	CONSTRAINT `order_items_subtotal_formula` CHECK(`order_items`.`subtotal` = `order_items`.`unit_price` * `order_items`.`quantity`)
);
--> statement-breakpoint
CREATE TABLE `order_status_history` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int unsigned NOT NULL,
	`status` enum('pedido_recibido','esperando_material','material_recibido','digitalizacion','control_calidad','preparando_entrega','enviado','entregado','cancelado') NOT NULL,
	`note` varchar(500),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `order_status_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`folio` varchar(24) NOT NULL,
	`customer_id` int unsigned NOT NULL,
	`order_status` enum('pedido_recibido','esperando_material','material_recibido','digitalizacion','control_calidad','preparando_entrega','enviado','entregado','cancelado') NOT NULL DEFAULT 'pedido_recibido',
	`payment_status` enum('pending','approved','rejected','cancelled','refunded') NOT NULL DEFAULT 'pending',
	`currency` char(3) NOT NULL DEFAULT 'MXN',
	`subtotal` bigint unsigned NOT NULL,
	`discount` bigint unsigned NOT NULL DEFAULT 0,
	`shipping` bigint unsigned NOT NULL DEFAULT 0,
	`total` bigint unsigned NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_folio_unique` UNIQUE(`folio`),
	CONSTRAINT `orders_subtotal_nonnegative` CHECK(`orders`.`subtotal` >= 0),
	CONSTRAINT `orders_discount_nonnegative` CHECK(`orders`.`discount` >= 0),
	CONSTRAINT `orders_discount_not_above_subtotal` CHECK(`orders`.`discount` <= `orders`.`subtotal`),
	CONSTRAINT `orders_shipping_nonnegative` CHECK(`orders`.`shipping` >= 0),
	CONSTRAINT `orders_total_formula` CHECK(`orders`.`total` = `orders`.`subtotal` - `orders`.`discount` + `orders`.`shipping`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int unsigned NOT NULL,
	`provider` enum('mercadopago') NOT NULL,
	`provider_preference_id` varchar(160),
	`provider_payment_id` varchar(160),
	`status` enum('pending','approved','rejected','cancelled','refunded') NOT NULL DEFAULT 'pending',
	`amount` bigint unsigned NOT NULL,
	`currency` char(3) NOT NULL DEFAULT 'MXN',
	`external_reference` varchar(64) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`),
	CONSTRAINT `payments_provider_preference_unique` UNIQUE(`provider`,`provider_preference_id`),
	CONSTRAINT `payments_provider_payment_unique` UNIQUE(`provider`,`provider_payment_id`),
	CONSTRAINT `payments_amount_nonnegative` CHECK(`payments`.`amount` >= 0)
);
--> statement-breakpoint
CREATE TABLE `product_variants` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int unsigned NOT NULL,
	`code` varchar(96) NOT NULL,
	`name` varchar(200) NOT NULL,
	`price` bigint unsigned NOT NULL,
	`metadata` json,
	`is_active` boolean NOT NULL DEFAULT true,
	`sort_order` int unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_variants_id` PRIMARY KEY(`id`),
	CONSTRAINT `product_variants_code_unique` UNIQUE(`code`),
	CONSTRAINT `product_variants_price_nonnegative` CHECK(`product_variants`.`price` >= 0)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`category_id` int unsigned NOT NULL,
	`slug` varchar(160) NOT NULL,
	`name` varchar(200) NOT NULL,
	`short_description` varchar(500) NOT NULL,
	`description` text NOT NULL,
	`base_price` bigint unsigned NOT NULL,
	`currency` char(3) NOT NULL DEFAULT 'MXN',
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_slug_unique` UNIQUE(`slug`),
	CONSTRAINT `products_base_price_nonnegative` CHECK(`products`.`base_price` >= 0)
);
--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_variant_id_product_variants_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_status_history` ADD CONSTRAINT `order_status_history_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `product_variants` ADD CONSTRAINT `product_variants_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `categories_active_sort_idx` ON `categories` (`is_active`,`sort_order`);--> statement-breakpoint
CREATE INDEX `order_items_order_idx` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE INDEX `order_items_product_idx` ON `order_items` (`product_id`);--> statement-breakpoint
CREATE INDEX `order_status_history_order_created_idx` ON `order_status_history` (`order_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `orders_customer_created_idx` ON `orders` (`customer_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `orders_status_created_idx` ON `orders` (`order_status`,`created_at`);--> statement-breakpoint
CREATE INDEX `orders_payment_status_created_idx` ON `orders` (`payment_status`,`created_at`);--> statement-breakpoint
CREATE INDEX `payments_order_created_idx` ON `payments` (`order_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `payments_external_reference_idx` ON `payments` (`external_reference`);--> statement-breakpoint
CREATE INDEX `product_variants_product_active_sort_idx` ON `product_variants` (`product_id`,`is_active`,`sort_order`);--> statement-breakpoint
CREATE INDEX `products_category_active_idx` ON `products` (`category_id`,`is_active`);