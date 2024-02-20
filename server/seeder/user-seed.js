import prisma from "../app/prisma.js";
import { faker, ro } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const Role = {
    ADMIN: "admin",
    USER: "user",
};

async function main() {
    await prisma.story.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    for (const role in Role) {
        await prisma.role.create({
            data: {
                name: Role[role],
            },
        });
    }
    const roles = await prisma.role.findMany();
    for (let i = 1; i <= 5; i++) {
        const role = roles[Math.floor(Math.random() * roles.length)].id;
        await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync(`password${i}`, Number(process.env.BCRYPT_ROUND)),
                role_id: role,
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
