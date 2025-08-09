import { PrismaClient } from '@prisma/client'

// グローバルなオブジェクトを使用して、PrismaClientのインスタンスをグローバルに保持する（開発環境の場合、ホットリロードでインスタンスが無駄に作られてしまう恐れがあるためシングルトンで管理）
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

// PrismaClientのインスタンスがなければ作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// 開発環境でのみ使用
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

