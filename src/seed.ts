import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function main() {

  const test = await prisma.user.upsert({
    where: { user: 'test' },
    update: {},
    create: {
        user: 'test',
        level: 0,
        password: '$2b$10$g.0hrYjW9vJBakKSeKNQ2OjnNChVMc0riMzXT.UG.3IDoPBzO4gcS' //12345
    },
  })
  return test;
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
  })
