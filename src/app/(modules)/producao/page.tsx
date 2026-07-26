"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Factory,
  ListChecks,
  PackageCheck,
  Play,
  Search,
  Settings2,
  Users,
} from "lucide-react";

const indicadores = [
  {
    titulo: "Ordens em produção",
    valor: "18",
    descricao: "6 com prioridade alta",
    icon: Factory,
  },
  {
    titulo: "Concluídas hoje",
    valor: "7",
    descricao: "Meta diária: 10",
    icon: CheckCircle2,
  },
  {
    titulo: "Aguardando material",
    valor: "4",
    descricao: "Pendências no estoque",
    icon: PackageCheck,
  },
  {
    titulo: "Atrasadas",
    valor: "3",
    descricao: "Requerem atenção",
    icon: AlertTriangle,
  },
];

const ordens = [
  {
    codigo: "OP-2026-0148",
    produto: "Cozinha Aurora",
    cliente: "Mariana Costa",
    etapa: "Usinagem",
    progresso: 72,
    prazo: "26/07/2026",
    responsavel: "Equipe A",
    status: "Em produção",
  },
  {
    codigo: "OP-2026-0149",
    produto: "Dormitório Essenza",
    cliente: "Carlos Mendes",
    etapa: "Montagem",
    progresso: 48,
    prazo: "28/07/2026",
    responsavel: "Equipe B",
    status: "Em produção",
  },
  {
    codigo: "OP-2026-0150",
    produto: "Painel Horizon",
    cliente: "Ana Ribeiro",
    etapa: "Acabamento",
    progresso: 91,
    prazo: "25/07/2026",
    responsavel: "Equipe C",
    status: "Finalizando",
  },
  {
    codigo: "OP-2026-0151",
    produto: "Home Office Linea",
    cliente: "Felipe Rocha",
    etapa: "Corte",
    progresso: 22,
    prazo: "30/07/2026",
    responsavel: "Equipe A",
    status: "Em produção",
  },
];

const etapas = [
  { nome: "Corte", quantidade: 5 },
  { nome: "Usinagem", quantidade: 4 },
  { nome: "Bordagem", quantidade: 3 },
  { nome: "Montagem", quantidade: 4 },
  { nome: "Acabamento", quantidade: 2 },
];

export default function ProducaoPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-400">
              Infinity O.S.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Produção
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Acompanhamento das ordens, etapas e capacidade produtiva.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
              <Settings2 size={18} />
              Configurar etapas
            </button>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300">
              <Play size={18} />
              Nova ordem
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

        <section className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Ordens de produção</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Acompanhe o andamento das ordens ativas.
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

            <div className="divide-y divide-white/5">
              {ordens.map((ordem) => (
                <article key={ordem.codigo} className="p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                          {ordem.codigo}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
                          {ordem.status}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-medium">
                        {ordem.produto}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        Cliente: {ordem.cliente}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-zinc-300">{ordem.etapa}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Prazo: {ordem.prazo}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        Responsável: {ordem.responsavel}
                      </span>
                      <span className="font-medium text-zinc-300">
                        {ordem.progresso}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${ordem.progresso}%` }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                  <ListChecks size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Etapas ativas</h2>
                  <p className="text-sm text-zinc-500">
                    Distribuição das ordens
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {etapas.map((etapa) => (
                  <div
                    key={etapa.nome}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-zinc-400">{etapa.nome}</span>

                    <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-1 text-sm font-medium">
                      {etapa.quantidade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                  <Users size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Capacidade da fábrica</h2>
                  <p className="text-sm text-zinc-500">Turno atual</p>
                </div>
              </div>

              <div className="mb-3 flex items-end justify-between">
                <span className="text-3xl font-semibold">78%</span>
                <span className="text-xs text-zinc-500">Em utilização</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[78%] rounded-full bg-emerald-400" />
              </div>

              <p className="mt-4 text-xs leading-5 text-zinc-500">
                A capacidade considera equipes, máquinas e ordens programadas
                para o turno.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
