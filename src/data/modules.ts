import {
  BadgeDollarSign,
  Boxes,
  CalendarDays,
  ClipboardList,
  Factory,
  Hammer,
  PackageSearch,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  UsersRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type SystemModule = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
};

export const systemModules: SystemModule[] = [
  {
    id: "financeiro",
    label: "Financeiro",
    description: "Fluxo de caixa, contas e faturamento.",
    href: "/financeiro",
    icon: BadgeDollarSign,
    color: "#D8A13B",
  },
  {
    id: "producao",
    label: "Produção",
    description: "Ordens, etapas e acompanhamento da fábrica.",
    href: "/producao",
    icon: Factory,
    color: "#C88A32",
  },
  {
    id: "clientes",
    label: "Clientes",
    description: "Cadastro, histórico e relacionamento.",
    href: "/clientes",
    icon: UsersRound,
    color: "#D7B26D",
  },
  {
    id: "estoque",
    label: "Estoque",
    description: "Materiais, movimentações e inventário.",
    href: "/estoque",
    icon: Boxes,
    color: "#A99160",
  },
  {
    id: "compras",
    label: "Compras",
    description: "Pedidos, fornecedores e cotações.",
    href: "/compras",
    icon: ShoppingCart,
    color: "#C99A51",
  },
  {
    id: "pcp",
    label: "PCP",
    description: "Planejamento e controle da produção.",
    href: "/pcp",
    icon: ClipboardList,
    color: "#E0B356",
  },
  {
    id: "projetos",
    label: "Projetos",
    description: "Projetos técnicos e acompanhamento.",
    href: "/projetos",
    icon: Hammer,
    color: "#B8873B",
  },
  {
    id: "medidas",
    label: "Medidas",
    description: "Levantamentos e conferências de medidas.",
    href: "/medidas",
    icon: Ruler,
    color: "#D7A965",
  },
  {
    id: "manutencao",
    label: "Manutenção",
    description: "Máquinas, equipamentos e ocorrências.",
    href: "/manutencao",
    icon: Wrench,
    color: "#A87938",
  },
  {
    id: "agenda",
    label: "Agenda",
    description: "Compromissos, instalações e visitas.",
    href: "/agenda",
    icon: CalendarDays,
    color: "#DBB878",
  },
  {
    id: "qualidade",
    label: "Qualidade",
    description: "Inspeções, checklists e não conformidades.",
    href: "/qualidade",
    icon: ShieldCheck,
    color: "#C79D5C",
  },
  {
    id: "expedicao",
    label: "Expedição",
    description: "Separação, carregamento e entregas.",
    href: "/expedicao",
    icon: PackageSearch,
    color: "#B98B48",
  },
];