"use client";

import { CalendarDays, Plus } from "lucide-react";

export default function FinanceHeader() {
  return (
    <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-400">
          Infinity O.S.
        </p>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Financeiro
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Controle de caixa, pagamentos, recebimentos e projeções.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
          <CalendarDays size={18} />
          Período
        </button>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300">
          <Plus size={18} />
          Novo lançamento
        </button>
      </div>
    </header>
  );
}
