import prisma from "../app/prisma.js";
import { faker } from "@faker-js/faker";

async function main() {
    await prisma.chapter.deleteMany();
    await prisma.story.deleteMany();

    const user = await prisma.user.findMany();
    const genre = await prisma.genre.findMany();

    for (let i = 1; i <= 5; i++) {
        await prisma.story.create({
            data: {
                title: faker.lorem.sentence(),
                synopsis: faker.lorem.paragraph(),
                author_id: user[Math.floor(Math.random() * user.length)].id,
                genre_id: genre[Math.floor(Math.random() * genre.length)].id,
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
