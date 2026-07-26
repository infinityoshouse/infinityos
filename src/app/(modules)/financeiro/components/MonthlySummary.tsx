"use client";

interface MonthlySummaryProps {
  entradas: string;
  saidas: string;
  resultado: string;
}

export default function MonthlySummary({
  entradas,
  saidas,
  resultado,
}: MonthlySummaryProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-lg font-semibold">
        Resumo do mês
      </h2>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Entradas
          </span>

          <span className="font-semibold text-emerald-400">
            {entradas}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Saídas
          </span>

          <span className="font-semibold text-rose-400">
            {saidas}
          </span>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              Resultado
            </span>

            <span className="text-xl font-bold text-emerald-400">
              {resultado}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
