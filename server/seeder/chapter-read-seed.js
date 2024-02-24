import prisma from "../app/prisma.js";

async function main() {
    await prisma.chapterRead.deleteMany();

    const users = await prisma.user.findMany();
    const stories = await prisma.story.findMany();

    for (let i = 0; i < 2000; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomStory = stories[Math.floor(Math.random() * stories.length)];
        const chapters = await prisma.chapter.findMany({
            where: { story_id: randomStory.id }
        });

        // Pengecekan apakah ada chapter yang tersedia
        if (chapters.length > 0) {
            const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
            const existingChapterId = await prisma.chapterRead.findFirst({
                where: {
                    chapter_id: randomChapter.id
                },
            });

            if (!existingChapterId) {
                await prisma.chapterRead.create({
                    data: {
                        user_id: randomUser.id,
                        story_id: randomStory.id,
                        chapter_id: randomChapter.id
                    },
                });
            }
        } else {
            console.log(`Tidak ada chapter untuk cerita dengan ID ${randomStory.id}`);
        }
    }
}


main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });