"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Factory,
  Boxes,
  ClipboardCheck,
  CalendarDays,
  Bot,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "CRM", href: "/crm" },
  { icon: Factory, label: "Produção", href: "/producao" },
  { icon: Wallet, label: "Financeiro", href: "/financeiro" },
  { icon: Boxes, label: "Estoque", href: "/estoque" },
  { icon: ClipboardCheck, label: "Qualidade", href: "/qualidade" },
  { icon: CalendarDays, label: "Agenda", href: "/agenda" },
  { icon: Bot, label: "Infinity AI", href: "/ai" },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-yellow-400">
          Infinity O.S.
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menu.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-zinc-900"
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
