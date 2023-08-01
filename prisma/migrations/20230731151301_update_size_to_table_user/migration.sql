/*
  Warnings:

  - You are about to alter the column `cedula` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `lastname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `address` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- DropIndex
DROP INDEX `user_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `cedula` VARCHAR(50) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `lastname` VARCHAR(100) NOT NULL,
    MODIFY `address` VARCHAR(100) NOT NULL,
    MODIFY `phone` VARCHAR(20) NOT NULL,
    MODIFY `email` VARCHAR(50) NOT NULL;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_cedula_key` TO `cedula`;
