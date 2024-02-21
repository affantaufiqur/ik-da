import { faker } from "@faker-js/faker";
import prisma from "../app/prisma.js";
import listGenre from "./list-genre.js";

async function main() {
    await prisma.bookmark.deleteMany();
    await prisma.upvote.deleteMany();
    await prisma.chapter.deleteMany();
    await prisma.story.deleteMany();
    await prisma.genre.deleteMany();

    for (const genre in listGenre) {
        await prisma.genre.create({
            data: {
                name: listGenre[genre],
            },
        });
    }

    for (let i = 0; i <= 5; i++) {
        let genreName;
        do {
            genreName = faker.music.genre();
        } while (await prisma.genre.findUnique({
            where: {
                name: genreName,
            },
        }));
    
        await prisma.genre.create({
            data: {
                name: genreName,
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
