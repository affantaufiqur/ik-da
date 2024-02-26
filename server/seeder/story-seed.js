import prisma from "../app/prisma.js";
import { faker } from "@faker-js/faker";

async function main() {
    await prisma.chapterRead.deleteMany();
    await prisma.bookmark.deleteMany();
    await prisma.upvote.deleteMany();
    await prisma.chapter.deleteMany();
    await prisma.story.deleteMany();

    const user = await prisma.user.findMany();
    const genre = await prisma.genre.findMany();

    const status = [
        "completed",
        "ongoing",
    ]

    for (let i = 1; i <= 1000; i++) {
        await prisma.story.create({
            data: {
                title: faker.lorem.sentence(),
                synopsis: faker.lorem.paragraph(),
                author_id: user[Math.floor(Math.random() * user.length)].id,
                genre_id: genre[Math.floor(Math.random() * genre.length)].id,
                upvote: Math.floor(Math.random() * 100000),
                status: status[Math.floor(Math.random() * status.length)],
                cover_img: faker.image.url(),
                created_at: faker.date.past()
            },
        });
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
