import prisma from "../config/database.js";
import { Prisma, User } from "@prisma/client";

export type UserData = Omit<User, "id">
export type UserDataInput = Omit<User, "id" | "accountId">

async function getByUsername(username: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  return user;
}

async function insert(prisma: Prisma.TransactionClient, user: UserData) {
  return await prisma.user.create({ data: user });
}

export const authRepository = {
  getByUsername,
  insert
};
