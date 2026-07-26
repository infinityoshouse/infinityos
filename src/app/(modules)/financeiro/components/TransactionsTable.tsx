"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export interface Transaction {
  description: string;
  category: string;
  date: string;
  amount: string;
  type: "Entrada" | "Saída";
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-zinc-500">
          <tr className="border-b border-white/10">
            <th className="px-5 py-4 font-medium">Descrição</th>
            <th className="px-5 py-4 font-medium">Categoria</th>
            <th className="px-5 py-4 font-medium">Data</th>
            <th className="px-5 py-4 text-right font-medium">Valor</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={`${transaction.description}-${transaction.date}`}
              className="border-b border-white/5 last:border-0"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      transaction.type === "Entrada"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {transaction.type === "Entrada" ? (
                      <ArrowDownRight size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>

                  <div>
                    <p className="font-medium">
                      {transaction.description}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {transaction.type}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 text-zinc-400">
                {transaction.category}
              </td>

              <td className="px-5 py-4 text-zinc-400">
                {transaction.date}
              </td>

              <td
                className={`px-5 py-4 text-right font-semibold ${
                  transaction.type === "Entrada"
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
