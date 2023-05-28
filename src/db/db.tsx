import { z } from "zod";
import { default as Prisma } from "@prisma/client";

const { PrismaClient } = Prisma;

export const prisma = new PrismaClient();

export default new PrismaClient();

export const userSchema = z.object({
  name: z.string().optional(),
  picture: z.string().optional(),
  email: z.string().email(),
  avatar: z.string().optional(),
  id: z.number().optional(),
  provider: z.string().optional(),
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
});
export type UserType = z.infer<typeof userSchema>;

export const projectSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  userId: z.string(),
});
export type ProjectType = z.infer<typeof projectSchema>;
