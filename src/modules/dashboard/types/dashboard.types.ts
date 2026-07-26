export interface DashboardCard {
  id: string;
  title: string;
  value: number;
  variation: number;
  icon: string;
  color: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface RecentActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  type:
    | "cliente"
    | "orcamento"
    | "financeiro"
    | "producao";
}
