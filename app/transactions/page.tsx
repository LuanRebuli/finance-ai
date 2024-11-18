import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transactions.findMany({
    where: {
      userId,
    },
  });
  return (
    <>
      <NavBar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <ScrollArea>
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
