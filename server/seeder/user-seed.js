import prisma from "../app/prisma.js";

const bcryptRound = Number(process.env.BCRYPT_ROUND);

async function main() {
    await prisma.user.deleteMany();
    
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });