import {
  Boxes,
  ClipboardCheck,
  PackageCheck,
  TriangleAlert,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

const summaryItems = [
  {
    label: "Projetos ativos",
    value: "12",
    icon: ClipboardCheck,
  },
  {
    label: "Em produção",
    value: "08",
    icon: Boxes,
  },
  {
    label: "Entregas hoje",
    value: "06",
    icon: PackageCheck,
  },
  {
    label: "Pendências",
    value: "04",
    icon: TriangleAlert,
  },
];

export function DailySummary() {
  return (
    <GlassPanel className="mx-auto w-full max-w-[980px] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#D89D32]">
            Visão operacional
          </p>

          <h2 className="mt-1 text-lg font-medium text-white">
            Resumo do dia
          </h2>
        </div>

        <span className="rounded-full border border-[#D59A32]/25 bg-[#D59A32]/[0.06] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#E6AE45]">
          Atualizado agora
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="flex min-h-[92px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-[#D39A35]/25 hover:bg-white/[0.04]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D39A35]/25 bg-[#D39A35]/[0.06] text-[#E1A63C]">
                <Icon size={20} strokeWidth={1.6} />
              </span>

              <span>
                <strong className="block text-xl font-medium text-white">
                  {item.value}
                </strong>

                <small className="text-[10px] leading-4 text-white/42 sm:text-xs">
                  {item.label}
                </small>
              </span>
            </article>
          );
        })}
      </div>
    </GlassPanel>
  );
}