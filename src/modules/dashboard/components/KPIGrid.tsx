import { dashboardService } from "../services/dashboard.service";
import { KPIWidget } from "./KPIWidget";

export function KPIGrid() {
  const cards = dashboardService.getCards();

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <KPIWidget
          key={card.id}
          card={card}
        />
      ))}
    </section>
  );
}
