-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('Admin', 'USER') NOT NULL DEFAULT 'USER';
