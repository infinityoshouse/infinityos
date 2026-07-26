import {
  DashboardCard,
  QuickAction,
  RecentActivity,
} from "../types/dashboard.types";

export const dashboardCards: DashboardCard[] = [
  {
    id: "1",
    title: "Faturamento",
    value: 87540,
    variation: 14,
    icon: "DollarSign",
    color: "#FACC15",
  },
  {
    id: "2",
    title: "Produção",
    value: 32,
    variation: 8,
    icon: "Factory",
    color: "#22C55E",
  },
  {
    id: "3",
    title: "Clientes",
    value: 146,
    variation: 5,
    icon: "Users",
    color: "#3B82F6",
  },
  {
    id: "4",
    title: "Orçamentos",
    value: 19,
    variation: -2,
    icon: "ClipboardList",
    color: "#FB923C",
  },
];

export const quickActions: QuickAction[] = [
  {
    id: "1",
    title: "Novo Cliente",
    description: "Cadastrar cliente",
    href: "/crm/clientes/novo",
    icon: "UserPlus",
  },
  {
    id: "2",
    title: "Novo Orçamento",
    description: "Criar orçamento",
    href: "/orcamentos/novo",
    icon: "FilePlus",
  },
  {
    id: "3",
    title: "Nova Ordem",
    description: "Abrir produção",
    href: "/producao/nova",
    icon: "Hammer",
  },
];

export const recentActivities: RecentActivity[] = [
  {
    id: "1",
    title: "Novo Cliente",
    description: "João Silva cadastrado.",
    date: "Hoje",
    type: "cliente",
  },
  {
    id: "2",
    title: "Pagamento",
    description: "Entrada confirmada.",
    date: "Hoje",
    type: "financeiro",
  },
];
