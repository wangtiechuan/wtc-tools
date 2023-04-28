import Prisma1, * as Prisma2 from '@prisma/client'; // 解决 pnpm 和 prisma 同时使用时，获取不到 PrismaClient 问题

const Prisma = Prisma1 || Prisma2;
const _prismaClicent = new Prisma.PrismaClient();
// export const prismaClicent = new PrismaClient();
export const prismaClicent = _prismaClicent;
