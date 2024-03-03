-- 1. Create database

CREATE DATABASE IF NOT EXISTS todo_app;

-- 2. Create table todo_item

CREATE TABLE IF NOT EXISTS todo_app.todo_item (
  `item_id` varchar(100) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` varchar(4096) NULL,
  `status` int NOT NULL DEFAULT '0',
  `due_date` TIMESTAMP NULL,
  `priority` int NOT NULL DEFAULT 20,
  `created_by` varchar(255) NOT NULL,
  `creation_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `last_updated_by` varchar(255) NOT NULL,
  `last_updated_time` TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`item_id`),
  KEY `status` (`status`),
  KEY `priority` (`priority`),
  KEY `due_date` (`due_date`),
  KEY `creation_time` (`creation_time`),
  KEY `last_updated_time` (`last_updated_time`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COLLATE=UTF8_UNICODE_CI;

-- 3. Create table user

CREATE TABLE IF NOT EXISTS todo_app.user (
  `user_id` varchar(100) NOT NULL,
  `user_name` varchar(256) NULL,
  `email_address` varchar(2048) NULL,
  `status` int NOT NULL DEFAULT '1',
  `role` varchar(32) NOT NULL DEFAULT 'NORMAL',
  `password` varchar(256) NULL,
  `created_by` varchar(255) NOT NULL,
  `creation_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `last_updated_by` varchar(255) NOT NULL,
  `last_updated_time` TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email_address` (`email_address`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COLLATE=UTF8_UNICODE_CI;