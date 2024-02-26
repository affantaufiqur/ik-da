import { faker } from "@faker-js/faker";
import prisma from "../app/prisma.js";

async function main() {
    await prisma.chapterRead.deleteMany();
    await prisma.chapter.deleteMany();

    const stories = await prisma.story.findMany();
    const chapter = {
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "text": faker.lorem.paragraph(10),
                "type": "text"
              },
              {
                "text": faker.lorem.paragraph(10),
                "type": "text"
              },
              {
                "text": faker.lorem.paragraph(10),
                "type": "text"
              }
            ]
          }
        ]
    }

    for (const story in stories) {
        for (let i=0; i<=10; i++) {
            await prisma.chapter.create({
                data: {
                    title: faker.lorem.sentence(),
                    content: chapter,
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