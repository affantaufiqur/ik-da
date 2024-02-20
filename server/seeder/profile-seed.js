import prisma from "../app/prisma.js";

async function main() {
    await prisma.profile.deleteMany();

    const user = await prisma.user.findMany();
    for(let i = 0; i < user.length; i++) {
        await prisma.profile.create({
            data: {
                user_id: user[i].id,
            }
        })
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });