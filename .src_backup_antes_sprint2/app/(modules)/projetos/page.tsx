"use client";

import {
  AlertTriangle,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Layers3,
  Plus,
  Search,
  Users,
} from "lucide-react";

const indicadores = [
  {
    titulo: "Projetos ativos",
    valor: "24",
    descricao: "Em diferentes etapas",
    icon: FolderKanban,
  },
  {
    titulo: "Em aprovação",
    valor: "7",
    descricao: "Aguardando cliente",
    icon: Clock3,
  },
  {
    titulo: "Atrasados",
    valor: "3",
    descricao: "Precisam de atenção",
    icon: AlertTriangle,
  },
  {
    titulo: "Concluídos no mês",
    valor: "11",
    descricao: "Projetos entregues",
    icon: CheckCircle2,
  },
];

const projetos = [
  {
    codigo: "PRJ-2026-0108",
    nome: "Cozinha Aurora",
    cliente: "Mariana Costa",
    ambiente: "Cozinha",
    responsavel: "Amanda Silva",
    prazo: "02/08/2026",
    progresso: 78,
    status: "Detalhamento",
  },
  {
    codigo: "PRJ-2026-0109",
    nome: "Dormitório Essenza",
    cliente: "Carlos Mendes",
    ambiente: "Dormitório",
    responsavel: "Bruno Lima",
    prazo: "05/08/2026",
    progresso: 52,
    status: "Aprovação",
  },
  {
    codigo: "PRJ-2026-0110",
    nome: "Home Office Linea",
    cliente: "Felipe Rocha",
    ambiente: "Escritório",
    responsavel: "Amanda Silva",
    prazo: "08/08/2026",
    progresso: 34,
    status: "Modelagem",
  },
  {
    codigo: "PRJ-2026-0111",
    nome: "Painel Horizon",
    cliente: "Ana Ribeiro",
    ambiente: "Sala",
    responsavel: "Juliana Reis",
    prazo: "30/07/2026",
    progresso: 91,
    status: "Finalização",
  },
];

const etapas = [
  {
    nome: "Levantamento",
    quantidade: 4,
  },
  {
    nome: "Modelagem",
    quantidade: 6,
  },
  {
    nome: "Aprovação",
    quantidade: 7,
  },
  {
    nome: "Detalhamento",
    quantidade: 5,
  },
  {
    nome: "Finalização",
    quantidade: 2,
  },
];

const atividades = [
  {
    projeto: "Cozinha Aurora",
    descricao: "Revisão do detalhamento técnico",
    horario: "Hoje, 16:30",
  },
  {
    projeto: "Dormitório Essenza",
    descricao: "Cliente solicitou alteração nas portas",
    horario: "Hoje, 14:10",
  },
  {
    projeto: "Painel Horizon",
    descricao: "Projeto liberado para produção",
    horario: "Hoje, 11:45",
  },
  {
    projeto: "Home Office Linea",
    descricao: "Nova versão do modelo adicionada",
    horario: "Ontem, 18:20",
  },
];

function statusClasses(status: string) {
  if (status === "Finalização") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";
  }

  if (status === "Aprovação") {
    return "border-amber-400/20 bg-amber-400/10 text-amber-400";
  }

  if (status === "Modelagem") {
    return "border-sky-400/20 bg-sky-400/10 text-sky-400";
  }

  return "border-violet-400/20 bg-violet-400/10 text-violet-400";
}

export default function ProjetosPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-400">
              Infinity O.S.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Projetos
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Gestão de ambientes, revisões, aprovações e detalhamento técnico.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
              <Layers3 size={18} />
              Gerenciar etapas
            </button>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300">
              <Plus size={18} />
              Novo projeto
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

                  <BriefcaseBusiness size={17} className="text-zinc-600" />
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
                <h2 className="text-lg font-semibold">Projetos em andamento</h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Acompanhe responsáveis, prazos e progresso.
                </p>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <Search size={17} className="text-zinc-500" />

                <input
                  type="search"
                  placeholder="Buscar projeto"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600 md:w-52"
                />
              </label>
            </div>

            <div className="divide-y divide-white/5">
              {projetos.map((projeto) => (
                <article key={projeto.codigo} className="p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                          {projeto.codigo}
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${statusClasses(
                            projeto.status,
                          )}`}
                        >
                          {projeto.status}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-medium">
                        {projeto.nome}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {projeto.cliente} · {projeto.ambiente}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-zinc-300">
                        {projeto.responsavel}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        Prazo: {projeto.prazo}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        Progresso do projeto
                      </span>

                      <span className="font-medium text-zinc-300">
                        {projeto.progresso}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${projeto.progresso}%` }}
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
                  <Layers3 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Etapas dos projetos</h2>
                  <p className="text-sm text-zinc-500">
                    Distribuição atual
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
                  <h2 className="font-semibold">Atividades recentes</h2>
                  <p className="text-sm text-zinc-500">
                    Atualizações da equipe
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {atividades.map((atividade) => (
                  <article
                    key={`${atividade.projeto}-${atividade.horario}`}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-emerald-400/10 p-2 text-emerald-400">
                        <CalendarDays size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {atividade.projeto}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                          {atividade.descricao}
                        </p>

                        <p className="mt-2 text-xs text-zinc-600">
                          {atividade.horario}
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
