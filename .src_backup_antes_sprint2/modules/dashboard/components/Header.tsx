"use client";

import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-zinc-400">
          Bem-vindo ao Infinity O.S.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Bell size={22} />

        <div className="text-right">
          <p className="font-semibold">
            Administrador
          </p>

          <span className="text-sm text-zinc-400">
            admin@infinityos.com
          </span>
        </div>
      </div>
    </header>
  );
}
