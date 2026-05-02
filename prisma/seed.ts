// prisma/seed.ts
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding 2 sample courses...")

  await prisma.course.create({
    data: {
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript & Next.js from scratch.",
      youtubePlaylistId: "PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp",
      thumbnailUrl: "https://picsum.photos/seed/webdev/400/225",
      isPublished: true,
    },
  })

  await prisma.course.create({
    data: {
      title: "TypeScript Fundamentals",
      description: "Master types, interfaces, and generics for modern apps.",
      youtubePlaylistId: "PL4cUxeGkcC9hWzt8b4Gn1g6VQ3qYqZqZq",
      isPublished: true,
    },
  })

  console.log("✅ Done! Check your Neon dashboard.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })