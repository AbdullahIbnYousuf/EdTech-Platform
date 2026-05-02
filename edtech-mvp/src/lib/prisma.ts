// src/lib/prisma.ts
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"], // Shows DB queries in terminal (helpful for debugging)
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}