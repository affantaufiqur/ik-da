-- CreateTable
CREATE TABLE `chapter_read` (
    `id` VARCHAR(191) NOT NULL,
    `story_id` VARCHAR(191) NOT NULL,
    `chapter_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chapter_read` ADD CONSTRAINT `chapterReadStories` FOREIGN KEY (`story_id`) REFERENCES `stories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chapter_read` ADD CONSTRAINT `chapterReadUsers` FOREIGN KEY (`story_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chapter_read` ADD CONSTRAINT `chapter_read_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
