import prisma from "../app/prisma.js";
import { faker } from "@faker-js/faker";
import { Role } from "./role-seed.js";

const bcryptRound = Number(process.env.BCRYPT_ROUND);

async function main() {
    await prisma.story.deleteMany();
    await prisma.user.deleteMany();
    const roles = await prisma.role.findMany();

    for (let i = 1; i <= 5; i++) {
        await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: `password ${i}`,
                role_id: roles[Math.floor(Math.random() * roles.length)].id,
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
