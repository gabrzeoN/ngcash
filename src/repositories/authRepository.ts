import prisma from "../config/database.js";
import { User } from "@prisma/client";

export type UserData = Omit<User, "id" | "createdAt">

async function getByUsername(username: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  return user;
}

async function insert(user: UserData) {
  return await prisma.user.create({ data: user });
}

export const authRepository = {
  getByUsername,
  insert
};
