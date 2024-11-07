import { Badge } from "@/app/_components/ui/badge";
import { Transactions, TransactionType } from "@prisma/client";
import { Circle } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transactions;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <Circle className="mr-2 fill-primary" size={10} />
        Ganho
      </Badge>
    );
  }

  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-[#F6352E] bg-opacity-10 font-bold text-[#F6352E]">
        <Circle className="mr-2 fill-[#F6352E]" size={10} />
        Despesa
      </Badge>
    );
  }

  return (
    <Badge className="bg-blue-600 bg-opacity-10 font-bold text-blue-600 hover:bg-blue-600">
      <Circle className="mr-2 fill-current" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
