"use client";

import {
  AlertTriangle,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Factory,
  ListTodo,
  Plus,
  Search,
  Settings2,
  TimerReset,
} from "lucide-react";

const indicadores = [
  {
    titulo: "Ordens planejadas",
    valor: "26",
    descricao: "Para os próximos 7 dias",
    icon: ListTodo,
  },
  {
    titulo: "Capacidade ocupada",
    valor: "82%",
    descricao: "Média geral da fábrica",
    icon: Factory,
  },
  {
    titulo: "Ordens atrasadas",
    valor: "4",
    descricao: "Necessitam reprogramação",
    icon: AlertTriangle,
  },
  {
    titulo: "Eficiência média",
    valor: "91%",
    descricao: "Últimos 30 dias",
    icon: BarChart3,
  },
];

const planejamento = [
  {
    codigo: "OP-2026-0152",
    produto: "Cozinha Linea",
    cliente: "Fernanda Lima",
    inicio: "27/07/2026",
    entrega: "05/08/2026",
    setor: "Corte",
    prioridade: "Alta",
    status: "Programada",
  },
  {
    codigo: "OP-2026-0153",
    produto: "Dormitório Urban",
    cliente: "Ricardo Alves",
    inicio: "28/07/2026",
    entrega: "08/08/2026",
    setor: "Usinagem",
    prioridade: "Média",
    status: "Programada",
  },
  {
    codigo: "OP-2026-0154",
    produto: "Painel Essencial",
    cliente: "Paula Martins",
    inicio: "29/07/2026",
    entrega: "06/08/2026",
    setor: "Bordagem",
    prioridade: "Normal",
    status: "Aguardando",
  },
  {
    codigo: "OP-2026-0155",
    produto: "Home Office Prime",
    cliente: "Lucas Andrade",
    inicio: "30/07/2026",
    entrega: "12/08/2026",
    setor: "Montagem",
    prioridade: "Alta",
    status: "Aguardando",
  },
];

const capacidade = [
  {
    setor: "Corte",
    utilizacao: 88,
    ordens: 7,
  },
  {
    setor: "Usinagem",
    utilizacao: 92,
    ordens: 6,
  },
  {
    setor: "Bordagem",
    utilizacao: 74,
    ordens: 5,
  },
  {
    setor: "Montagem",
    utilizacao: 81,
    ordens: 6,
  },
  {
    setor: "Acabamento",
    utilizacao: 67,
    ordens: 2,
  },
];

const alertas = [
  {
    titulo: "Usinagem próxima do limite",
    descricao: "Capacidade prevista em 92% para amanhã.",
    tipo: "Atenção",
  },
  {
    titulo: "OP-2026-0149 com risco de atraso",
    descricao: "Montagem está 6 horas abaixo do previsto.",
    tipo: "Crítico",
  },
  {
    titulo: "Material confirmado",
    descricao: "MDF Branco TX disponível para OP-2026-0152.",
    tipo: "Resolvido",
  },
];

function prioridadeClasses(prioridade: string) {
  if (prioridade === "Alta") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-400";
  }

  if (prioridade === "Média") {
    return "border-amber-400/20 bg-amber-400/10 text-amber-400";
  }

  return "border-white/10 bg-white/5 text-zinc-400";
}

function statusClasses(status: string) {
  if (status === "Programada") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";
  }

  return "border-sky-400/20 bg-sky-400/10 text-sky-400";
}

export default function PcpPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-400">
              Infinity O.S.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              PCP
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Planejamento, programação e controle da capacidade produtiva.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
              <Settings2 size={18} />
              Configurar capacidade
            </button>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300">
              <Plus size={18} />
              Nova programação
            </button>
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {indicadores.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.titulo}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <Icon size={20} className="text-emerald-400" />
                  </div>

                  <Clock3 size={17} className="text-zinc-600" />
                </div>

                <p className="text-sm text-zinc-400">{item.titulo}</p>
                <p className="mt-2 text-3xl font-semibold">{item.valor}</p>
                <p className="mt-2 text-xs text-zinc-500">{item.descricao}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Programação da produção
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Ordens planejadas para os próximos dias.
                </p>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <Search size={17} className="text-zinc-500" />

                <input
                  type="search"
                  placeholder="Buscar ordem"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600 md:w-52"
                />
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-zinc-500">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 font-medium">Ordem</th>
                    <th className="px-5 py-4 font-medium">Período</th>
                    <th className="px-5 py-4 font-medium">Setor inicial</th>
                    <th className="px-5 py-4 font-medium">Prioridade</th>
                    <th className="px-5 py-4 text-right font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {planejamento.map((ordem) => (
                    <tr
                      key={ordem.codigo}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-zinc-100">
                          {ordem.codigo}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {ordem.produto}
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          {ordem.cliente}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-zinc-300">{ordem.inicio}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Entrega: {ordem.entrega}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        {ordem.setor}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${prioridadeClasses(
                            ordem.prioridade,
                          )}`}
                        >
                          {ordem.prioridade}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${statusClasses(
                            ordem.status,
                          )}`}
                        >
                          {ordem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                  <CalendarClock size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Capacidade por setor</h2>
                  <p className="text-sm text-zinc-500">
                    Ocupação planejada
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {capacidade.map((item) => (
                  <div key={item.setor}>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-zinc-300">
                          {item.setor}
                        </p>
                        <p className="mt-1 text-xs text-zinc-600">
                          {item.ordens} ordens
                        </p>
                      </div>

                      <span className="text-sm font-medium text-zinc-300">
                        {item.utilizacao}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${item.utilizacao}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                  <TimerReset size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Alertas do planejamento</h2>
                  <p className="text-sm text-zinc-500">
                    Pontos que exigem atenção
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {alertas.map((alerta) => (
                  <article
                    key={alerta.titulo}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={
                          alerta.tipo === "Resolvido"
                            ? "rounded-lg bg-emerald-400/10 p-2 text-emerald-400"
                            : alerta.tipo === "Crítico"
                              ? "rounded-lg bg-rose-400/10 p-2 text-rose-400"
                              : "rounded-lg bg-amber-400/10 p-2 text-amber-400"
                        }
                      >
                        {alerta.tipo === "Resolvido" ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <AlertTriangle size={16} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {alerta.titulo}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                          {alerta.descricao}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
