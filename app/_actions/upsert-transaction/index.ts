"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: AddTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const transactionData = { ...params, userId };

  if (params.id) {
    // Se o ID estiver presente, tenta atualizar
    await db.transactions.upsert({
      where: { id: params.id },
      update: transactionData,
      create: transactionData,
    });
  } else {
    // Caso contrário, apenas cria uma nova transação
    await db.transactions.create({
      data: transactionData,
    });
  }

  revalidatePath("/transactions");
};
