import { PrismaClient } from '@prisma/client'
import mockData from './MOCK_DATA.json'
import mockBookmarks from './mock_bookmarks.json'
const prisma = new PrismaClient()

async function main() {
    mockData.forEach( async (user) => {
        const bookmark = mockBookmarks[Math.floor(Math.random()*100)]
        return await prisma.user.upsert({
            where: { email: user.email },
            create: {
                email: user.email,
                name: user.name,
                bookmarks: {
                    create: {
                        title:  bookmark.title,
                        url: bookmark.url,
                        preview: bookmark.preview
                    }
                }
            },
            update: {},
        })
    })
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