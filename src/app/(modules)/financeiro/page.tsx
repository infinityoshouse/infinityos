"use client";


import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CreditCard,
 Plus,
  ReceiptText,
  Search,
} from "lucide-react";

import DashboardCards from "./components/DashboardCards";
import FinanceFilters from "./components/FinanceFilters";
import RecentTransactions from "./components/RecentTransactions";
import MonthlySummary from "./components/MonthlySummary";
import QuickActions from "./components/QuickActions";
import FinanceHeader from "./components/FinanceHeader";
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
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:x-8">
      <div className="mx-auto max-w-7xl">

          <FinanceHeader />

<DashboardCards />

<FinanceFilters />

<section className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
  <RecentTransactions transactions={transactions} />

  <aside className="space-y-6">
    <MonthlySummary
      entradas="R$ 238.750,00"
      saidas="R$ 54.280,00"
      resultado="R$ 184.470,00"
    />

    <QuickActions />
  </aside>
</section>
      </div>
    </div>
  );
}
