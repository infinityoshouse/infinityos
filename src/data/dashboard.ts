import {
  Boxes,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  FolderKanban,
  Gauge,
  Ruler,
  Settings2,
  ShoppingCart,
  Users,
  WalletCards,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type DashboardModule = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  palette: {
    base: string;
    light: string;
    dark: string;
    border: string;
    glow: string;
    text: string;
  };
};

export const dashboardModules: DashboardModule[] = [
  {
    id: "financeiro",
    name: "Financeiro",
    description: "Fluxo de caixa, contas e resultados",
    href: "/financeiro",
    icon: WalletCards,
    palette: {
      base: "#684328",
      light: "#956746",
      dark: "#29180F",
      border: "#C78E56",
      glow: "rgba(149, 103, 70, 0.34)",
      text: "#FFE4BD",
    },
  },
  {
    id: "producao",
    name: "Produção",
    description: "Ordens, etapas e apontamentos",
    href: "/producao",
    icon: Settings2,
    palette: {
      base: "#B48852",
      light: "#D2AD78",
      dark: "#584025",
      border: "#E4BE7C",
      glow: "rgba(210, 173, 120, 0.3)",
      text: "#FFF0D2",
    },
  },
  {
    id: "clientes",
    name: "Clientes",
    description: "Relacionamento, contatos e histórico",
    href: "/clientes",
    icon: Users,
    palette: {
      base: "#9B8B77",
      light: "#C3B7A6",
      dark: "#4C4236",
      border: "#D6C9B5",
      glow: "rgba(195, 183, 166, 0.28)",
      text: "#FFF5E8",
    },
  },
  {
    id: "estoque",
    name: "Estoque",
    description: "Materiais, chapas e ferragens",
    href: "/estoque",
    icon: Boxes,
    palette: {
      base: "#59663A",
      light: "#788653",
      dark: "#29311C",
      border: "#9AA56D",
      glow: "rgba(120, 134, 83, 0.3)",
      text: "#F4EDC9",
    },
  },
  {
    id: "compras",
    name: "Compras",
    description: "Fornecedores, pedidos e cotações",
    href: "/compras",
    icon: ShoppingCart,
    palette: {
      base: "#AAA08E",
      light: "#D2C8B7",
      dark: "#51493D",
      border: "#E0D4C1",
      glow: "rgba(210, 200, 183, 0.28)",
      text: "#FFF8ED",
    },
  },
  {
    id: "pcp",
    name: "PCP",
    description: "Planejamento e controle da produção",
    href: "/pcp",
    icon: ClipboardCheck,
    palette: {
      base: "#373530",
      light: "#57534B",
      dark: "#141310",
      border: "#847A68",
      glow: "rgba(87, 83, 75, 0.28)",
      text: "#EEDCB9",
    },
  },
  {
    id: "projetos",
    name: "Projetos",
    description: "Design, 3D e detalhamento técnico",
    href: "/projetos",
    icon: FolderKanban,
    palette: {
      base: "#76502E",
      light: "#9B7047",
      dark: "#342014",
      border: "#BC895A",
      glow: "rgba(155, 112, 71, 0.3)",
      text: "#FFE7C5",
    },
  },
  {
    id: "medidas",
    name: "Medidas rápidas",
    description: "Levantamentos, ambientes e conferências",
    href: "/medidas",
    icon: Ruler,
    palette: {
      base: "#697052",
      light: "#92997A",
      dark: "#303522",
      border: "#B0B68E",
      glow: "rgba(146, 153, 122, 0.3)",
      text: "#F5F0D1",
    },
  },
  {
    id: "manutencao",
    name: "Manutenção",
    description: "Chamados, reparos e garantias",
    href: "/manutencao",
    icon: Wrench,
    palette: {
      base: "#393735",
      light: "#5D5954",
      dark: "#161513",
      border: "#817A70",
      glow: "rgba(93, 89, 84, 0.3)",
      text: "#EEE4D4",
    },
  },
  {
    id: "agenda",
    name: "Agenda",
    description: "Compromissos, visitas e entregas",
    href: "/agenda",
    icon: CalendarDays,
    palette: {
      base: "#496071",
      light: "#6F899A",
      dark: "#202C35",
      border: "#89A5B6",
      glow: "rgba(111, 137, 154, 0.3)",
      text: "#E7F4FA",
    },
  },
  {
    id: "equipe",
    name: "Equipe",
    description: "Colaboradores, funções e produtividade",
    href: "/equipe",
    icon: Gauge,
    palette: {
      base: "#845744",
      light: "#AD7961",
      dark: "#3D261E",
      border: "#C89578",
      glow: "rgba(173, 121, 97, 0.3)",
      text: "#FFE9DE",
    },
  },
  {
    id: "qualidade",
    name: "Qualidade",
    description: "Checklists, inspeções e acabamento",
    href: "/qualidade",
    icon: ChartNoAxesCombined,
    palette: {
      base: "#BDB4A7",
      light: "#E5DED3",
      dark: "#5B554D",
      border: "#F0E8DC",
      glow: "rgba(229, 222, 211, 0.28)",
      text: "#FFFDFC",
    },
  },
];