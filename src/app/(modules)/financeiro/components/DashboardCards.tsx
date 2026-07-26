"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  WalletCards,
} from "lucide-react";

export type SummaryCard = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
};

const defaultCards: SummaryCard[] = [
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

type DashboardCardsProps = {
  cards?: SummaryCard[];
};

export default function DashboardCards({
  cards = defaultCards,
}: DashboardCardsProps) {
  return (
    <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/5"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 transition group-hover:border-emerald-400/30">
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

            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              {card.value}
            </h3>
          </article>
        );
      })}
    </section>
  );
}
