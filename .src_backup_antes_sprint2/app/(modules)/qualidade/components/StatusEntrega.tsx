"use client";

import { CheckCircle2, Clock3, AlertTriangle } from "lucide-react";

export type EntregaStatus =
  | "concluida"
  | "andamento"
  | "pendente";

interface StatusEntregaProps {
  status: EntregaStatus;
  progresso: number;
}

const map = {
  concluida: {
    icon: CheckCircle2,
    title: "Entrega Concluída",
    color: "text-green-600",
  },
  andamento: {
    icon: Clock3,
    title: "Em Andamento",
    color: "text-yellow-600",
  },
  pendente: {
    icon: AlertTriangle,
    title: "Pendente",
    color: "text-red-600",
  },
};

export default function StatusEntrega({
  status,
  progresso,
}: StatusEntregaProps) {
  const cfg = map[status];
  const Icon = cfg.icon;

  return (
    <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Icon className={cfg.color} size={28} />
        <div>
          <h2 className="font-semibold text-lg">{cfg.title}</h2>
          <p className="text-sm text-zinc-500">
            Progresso geral: {progresso}%
          </p>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-yellow-500 transition-all"
          style={{ width: `${progresso}%` }}
        />
      </div>
    </div>
  );
}
