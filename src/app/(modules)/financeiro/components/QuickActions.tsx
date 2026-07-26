"use client";

import { Banknote, CreditCard, ReceiptText } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-lg font-semibold">Ações rápidas</h2>

      <div className="mt-5 space-y-3">
        <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:bg-white/5">
          <ReceiptText size={18} />
          Novo recebimento
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:bg-white/5">
          <CreditCard size={18} />
          Nova despesa
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition hover:bg-white/5">
          <Banknote size={18} />
          Fluxo de caixa
        </button>
      </div>
    </div>
  );
}
