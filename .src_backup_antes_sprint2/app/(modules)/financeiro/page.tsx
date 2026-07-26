"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CreditCard,
  Landmark,
  Plus,
  ReceiptText,
  Search,
  WalletCards,
} from "lucide-react";

const summaryCards = [
  {
    title: "Saldo disponível",
    value: "R$ 184.750,00",
    change: "+8,4%",
    positive: true,
    icon: Landmark,
  },
  {
    title: "Contas a receber",
    value: "R$ 96.320,00",
    change: "+12,7%",
    positive: true,
    icon: ArrowDownRight,
  },
  {
    title: "Contas a pagar",
    value: "R$ 58.940,00",
    change: "-4,2%",
    positive: false,
    icon: ArrowUpRight,
  },
  {
    title: "Fluxo projetado",
    value: "R$ 221.600,00",
    change: "+6,1%",
    positive: true,
    icon: WalletCards,
  },
];

const transactions = [
  {
    description: "Recebimento — Projeto Cozinha Aurora",
    category: "Vendas",
    date: "24/07/2026",
    amount: "R$ 18.500,00",
    type: "Entrada",
  },
  {
    description: "Compra de chapas MDF",
    category: "Matéria-prima",
    date: "23/07/2026",
    amount: "R$ 7.840,00",
    type: "Saída",
  },
  {
    description: "Pagamento de frete",
    category: "Logística",
    date: "22/07/2026",
    amount: "R$ 1.260,00",
    type: "Saída",
  },
  {
    description: "Entrada — Móveis planejados",
    category: "Vendas",
    date: "21/07/2026",
    amount: "R$ 12.900,00",
    type: "Entrada",
  },
];

export default function FinanceiroPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
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

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <Icon size={20} className="text-emerald-400" />
                  </div>

                  <span
                    className={
                      card.positive
                        ? "text-xs font-medium text-emerald-400"
                        : "text-xs font-medium text-rose-400"
                    }
                  >
                    {card.change}
                  </span>
                </div>

                <p className="text-sm text-zinc-400">{card.title}</p>
                <p className="mt-2 text-2xl font-semibold">{card.value}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Movimentações recentes</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Entradas e saídas registradas no período.
                </p>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <Search size={17} className="text-zinc-500" />
                <input
                  type="search"
                  placeholder="Buscar lançamento"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600 md:w-52"
                />
              </label>
            </div>

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
                            className={
                              transaction.type === "Entrada"
                                ? "rounded-lg bg-emerald-400/10 p-2 text-emerald-400"
                                : "rounded-lg bg-rose-400/10 p-2 text-rose-400"
                            }
                          >
                            {transaction.type === "Entrada" ? (
                              <ArrowDownRight size={17} />
                            ) : (
                              <ArrowUpRight size={17} />
                            )}
                          </div>

                          <div>
                            <p className="font-medium text-zinc-100">
                              {transaction.description}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
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
                        className={
                          transaction.type === "Entrada"
                            ? "px-5 py-4 text-right font-medium text-emerald-400"
                            : "px-5 py-4 text-right font-medium text-rose-400"
                        }
                      >
                        {transaction.type === "Entrada" ? "+" : "-"}{" "}
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                  <Banknote size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Resumo do mês</h2>
                  <p className="text-sm text-zinc-500">Julho de 2026</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Receitas</span>
                  <span className="font-medium text-emerald-400">
                    R$ 128.430,00
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Despesas</span>
                  <span className="font-medium text-rose-400">
                    R$ 76.280,00
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-300">Resultado</span>
                    <span className="text-lg font-semibold">
                      R$ 52.150,00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h2 className="mb-4 font-semibold">Acesso rápido</h2>

              <div className="grid gap-3">
                <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/5">
                  <ReceiptText size={19} className="text-emerald-400" />
                  <span className="text-sm">Contas a receber</span>
                </button>

                <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/5">
                  <CreditCard size={19} className="text-emerald-400" />
                  <span className="text-sm">Contas a pagar</span>
                </button>

                <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/5">
                  <WalletCards size={19} className="text-emerald-400" />
                  <span className="text-sm">Fluxo de caixa</span>
                </button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
