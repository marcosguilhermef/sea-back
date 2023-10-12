import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    
  const test = await prisma.user.upsert({
    where: { user: 'test' },
    update: {},
    create: {
        user: 'test',
        level: 0,
        password: '$2b$10$dk9b.M/L9KtKhAjL4FLf7eCX8XFVsPIqNkD93lul0.J/R8VZe3InW'
    },
  })
  console.log({ test })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
