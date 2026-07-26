"use client";

import {
  Banknote,
  ClipboardCheck,
  PackageCheck,
  UsersRound,
} from "lucide-react";
import { StatsCard } from "./StatsCard";

const stats = [
  {
    title: "Faturamento mensal",
    value: "R$ 128.450",
    description: "Receita consolidada no mês atual.",
    icon: Banknote,
    trend: "+12,4%",
  },
  {
    title: "Ordens em produção",
    value: "18",
    description: "Projetos atualmente no fluxo produtivo.",
    icon: ClipboardCheck,
    trend: "+3 hoje",
  },
  {
    title: "Entregas previstas",
    value: "07",
    description: "Pedidos programados para os próximos dias.",
    icon: PackageCheck,
  },
  {
    title: "Equipe ativa",
    value: "24",
    description: "Colaboradores em atividade neste momento.",
    icon: UsersRound,
  },
];

export function BottomCards() {
  return (
    <section className="relative z-20 mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-4 px-4 pb-28 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:pb-8">
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.title}
          {...stat}
          delay={0.08 * index}
        />
      ))}
    </section>
  );
}