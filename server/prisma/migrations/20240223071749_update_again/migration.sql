-- DropForeignKey
ALTER TABLE `chapter_read` DROP FOREIGN KEY `chapterReadStories`;

-- DropForeignKey
ALTER TABLE `chapter_read` DROP FOREIGN KEY `chapterReadUsers`;

-- AddForeignKey
ALTER TABLE `chapter_read` ADD CONSTRAINT `chapter_read_story_id_fkey` FOREIGN KEY (`story_id`) REFERENCES `stories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chapter_read` ADD CONSTRAINT `chapter_read_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
