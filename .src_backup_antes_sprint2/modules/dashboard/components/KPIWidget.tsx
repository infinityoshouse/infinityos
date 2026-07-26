import { DashboardCard } from "../types/dashboard.types";

interface Props {
  card: DashboardCard;
}

export function KPIWidget({ card }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">
        {card.title}
      </p>

      <h3 className="mt-3 text-3xl font-bold">
        {card.value}
      </h3>

      <span
        className={`mt-3 inline-block text-sm ${
          card.variation >= 0
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {card.variation > 0 ? "+" : ""}
        {card.variation}%
      </span>
    </div>
  );
}
