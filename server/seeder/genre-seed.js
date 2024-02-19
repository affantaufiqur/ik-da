import { faker } from "@faker-js/faker";
import prisma from "../app/prisma.js";

async function main() {
    await prisma.story.deleteMany();
    await prisma.genre.deleteMany();

    for (let i = 0; i <= 5; i++) {
        await prisma.genre.create({
            data: {
                name: faker.music.genre(),
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
