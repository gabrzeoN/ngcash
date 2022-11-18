import { Accounts, Prisma } from "@prisma/client";

export type AccountsData = Omit<Accounts, "id">

async function insert(prisma: Prisma.TransactionClient) {
  return await prisma.accounts.create({
    data: {
      balance: 10000
    }
  });
}

export const accountsRepository = {
  insert
};
