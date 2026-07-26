"use client";

import TransactionsTable from "./TransactionsTable";

type Transaction = {
  description: string;
  category: string;
  date: string;
  amount: string;
  type: string;
};

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6">
        <div>
          <h2 className="text-lg font-semibold">
            Movimentações recentes
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Entradas e saídas registradas no período.
          </p>
        </div>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
