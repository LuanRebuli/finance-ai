import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrenctMonthTransactions } from "../get-currenct-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const currenctMonthTransaction = await getCurrenctMonthTransactions();
  if (currenctMonthTransaction >= 10) {
    return false;
  }
  return true;
};
