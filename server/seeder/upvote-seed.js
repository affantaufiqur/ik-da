import prisma from "../app/prisma.js";

async function main() {
    await prisma.bookmark.deleteMany();

    const users = await prisma.user.findMany();
    const stories = await prisma.story.findMany();
    
    for (let i = 0; i < 1000; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomStory = stories[Math.floor(Math.random() * stories.length)];

        const existingUpvote = await prisma.upvote.findFirst({
            where: {
                user_id: randomUser.id,
                story_id: randomStory.id,
            },
        });

        if (!existingUpvote) {
            await prisma.upvote.create({
                data: {
                    user_id: randomUser.id,
                    story_id: randomStory.id,
                },
            });
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