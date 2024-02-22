import { faker } from "@faker-js/faker";
import prisma from "../app/prisma.js";

async function main() {
    await prisma.chapter.deleteMany();

    const stories = await prisma.story.findMany();

    for (const story in stories) {
        for (let i=0; i<=10; i++) {
            await prisma.chapter.create({
                data: {
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraph(40),
                    story_id: stories[story].id,
                    created_at: faker.date.past(),
                }
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