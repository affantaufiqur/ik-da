/*
  Warnings:

  - You are about to alter the column `content` on the `chapters` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `chapters` MODIFY `content` JSON NOT NULL;
