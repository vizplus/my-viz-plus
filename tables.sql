CREATE TABLE `accounts_on_sale` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`time` int(11) NOT NULL,
	`account` varchar(255) NOT NULL,
	`length` tinyint(2) NOT NULL,
	`level` tinyint(1) NOT NULL,
	`seller` varchar(255) NOT NULL,
	`price` int(11) NOT NULL,
	`status` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`),
	KEY `level_length_price` (`level`,`length`,`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `paid_subscriptions` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`time` int(11) NOT NULL,
	`creator` varchar(255) NOT NULL,
	`period` int(11) NOT NULL,
	`levels` int(11) NOT NULL,
	`url` varchar(255) NOT NULL,
	`amount` int(11) NOT NULL,
	`available` tinyint(1) NOT NULL,
	`sub_count` int(11) NOT NULL,
	`sub_amount` int(11) NOT NULL,
	`sub_auto_count` int(11) NOT NULL,
	`sub_auto_amount` int(11) NOT NULL,
	`status` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`),
	KEY `available_sub_count_sub_amount` (`available`,`sub_count`,`sub_amount`),
	KEY `available_sub_auto_count_sub_auto_amount` (`available`,`sub_auto_count`,`sub_auto_amount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `subaccounts_on_sale` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`time` int(11) NOT NULL,
	`account` varchar(255) NOT NULL,
	`length` tinyint(2) NOT NULL,
	`level` tinyint(1) NOT NULL,
	`seller` varchar(255) NOT NULL,
	`price` int(11) NOT NULL,
	`status` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`),
	KEY `level_length_price` (`level`,`length`,`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;