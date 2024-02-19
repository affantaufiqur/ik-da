import { uuidToULID } from "ulidx";
import prisma from "../app/prisma.js";

export const Role = {
    ADMIN: 'admin', 
    USER: 'user'
}
async function main() {
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    for (const role in Role) {
        await prisma.role.create({
            data: {
                name: Role[role]
            }
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