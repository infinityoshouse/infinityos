"use client";

import {
  Bell,
  ChevronDown,
  Clock3,
  PackageOpen,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";

const deliveries = [
  {
    title: "Cozinha — Ana Paula",
    detail: "Entrega agendada",
    status: "Em produção",
  },
  {
    title: "Dormitório — Ricardo",
    detail: "Montagem programada",
    status: "Em montagem",
  },
  {
    title: "Escritório — Fernando",
    detail: "Aguardando acabamento",
    status: "Finalização",
  },
];

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(date);
}

export function RightPanel() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(() => formatTime(now), [now]);
  const date = useMemo(() => formatDate(now), [now]);

  return (
    <aside className="hidden min-h-screen border-l border-white/[0.07] bg-black/30 px-5 py-6 backdrop-blur-2xl xl:block">
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          aria-label="Notificações"
          className="relative mt-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-[#DDA23B]"
        >
          <Bell size={19} strokeWidth={1.6} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#F0B747]" />
        </button>

        <button
          type="button"
          className="flex min-w-[210px] items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-left"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CE9633]/55 bg-[#CE9633]/[0.06] text-xs font-semibold text-[#E7B24A]">
              IH
            </span>

            <span>
              <strong className="block text-sm font-medium text-white">
                Infinite House
              </strong>
              <small className="text-white/38">Administrativo</small>
            </span>
          </span>

          <ChevronDown size={16} className="text-[#D49A35]" />
        </button>
      </div>

      <div className="mt-8 text-right">
        <strong className="block text-4xl font-light text-[#D89D32]">
          {time}
        </strong>

        <span className="mt-1 block text-xs capitalize text-white/42">
          {date}
        </span>
      </div>

      <GlassPanel className="mt-7 p-6">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D59B31]/45 bg-[#D59B31]/[0.05] text-[#E1A83E]">
          <Sparkles size={27} strokeWidth={1.6} />
        </span>

        <h2 className="mt-5 text-center text-lg uppercase tracking-[0.2em] text-[#DC9F36]">
          Infinity AI
        </h2>

        <p className="mt-4 text-center text-sm leading-6 text-white/48">
          Sua assistente inteligente para decisões mais rápidas, precisas e
          conectadas.
        </p>

        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-[#D49A31]/40 bg-gradient-to-r from-[#5E3E13] to-[#94651C] px-4 py-3 text-sm text-[#FFF0CF] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
        >
          Abrir Infinity AI
          <Sparkles size={17} />
        </button>
      </GlassPanel>

      <GlassPanel className="mt-6 p-5">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#D79B32]">
            Próximas entregas
          </h2>

          <Clock3 size={17} className="text-[#CF9430]" />
        </div>

        <div className="divide-y divide-white/[0.07]">
          {deliveries.map((delivery) => (
            <article key={delivery.title} className="py-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-[#D69B34]">
                  <PackageOpen size={15} />
                </span>

                <span className="min-w-0 flex-1">
                  <strong className="block truncate text-xs font-medium text-white">
                    {delivery.title}
                  </strong>

                  <small className="mt-1 block text-[10px] text-white/38">
                    {delivery.detail}
                  </small>

                  <span className="mt-2 inline-flex rounded-full bg-[#6F4A17]/45 px-3 py-1 text-[9px] text-[#E9B755]">
                    {delivery.status}
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="mt-2 flex w-full items-center justify-between text-xs text-[#D89C32] transition hover:text-[#F0BA54]"
        >
          Ver todas
          <span aria-hidden>→</span>
        </button>
      </GlassPanel>
    </aside>
  );
}