"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface DashboardCardsProps {
  total: number;
  pendentes: number;
  emAndamento: number;
  concluidos: number;
}

interface CardProps {
  titulo: string;
  valor: number;
  icon: React.ElementType;
  cor: string;
}

function Card({
  titulo,
  valor,
  icon: Icon,
  cor,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {titulo}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {valor}
          </h2>
        </div>

        <div
          className={`rounded-xl p-3 ${cor}`}
        >
          <Icon size={26} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardCards({
  total,
  pendentes,
  emAndamento,
  concluidos,
}: DashboardCardsProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card
        titulo="Total"
        valor={total}
        icon={ClipboardCheck}
        cor="bg-blue-600"
      />

      <Card
        titulo="Pendentes"
        valor={pendentes}
        icon={AlertTriangle}
        cor="bg-red-600"
      />

      <Card
        titulo="Em andamento"
        valor={emAndamento}
        icon={Clock3}
        cor="bg-yellow-500"
      />

      <Card
        titulo="Concluídos"
        valor={concluidos}
        icon={CheckCircle2}
        cor="bg-green-600"
      />
    </div>
  );
}