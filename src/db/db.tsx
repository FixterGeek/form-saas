import { default as Prisma } from "@prisma/client";

const { PrismaClient } = Prisma;

export const prisma = new PrismaClient();

export default new PrismaClient();
