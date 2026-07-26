"use client";

import {
  AlertTriangle,
  Archive,
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Warehouse,
} from "lucide-react";

const indicadores = [
  {
    titulo: "Itens cadastrados",
    valor: "1.284",
    descricao: "Materiais e componentes",
    icon: Boxes,
  },
  {
    titulo: "Estoque crítico",
    valor: "18",
    descricao: "Abaixo do mínimo",
    icon: AlertTriangle,
  },
  {
    titulo: "Entradas no mês",
    valor: "246",
    descricao: "Movimentações registradas",
    icon: ArrowDownToLine,
  },
  {
    titulo: "Saídas no mês",
    valor: "198",
    descricao: "Consumo e expedição",
    icon: ArrowUpFromLine,
  },
];

const itens = [
  {
    codigo: "MAT-00148",
    nome: "MDF Branco TX 18 mm",
    categoria: "Chapas",
    quantidade: 42,
    minimo: 20,
    unidade: "un",
    localizacao: "A1-03",
    status: "Normal",
  },
  {
    codigo: "MAT-00231",
    nome: "Fita de borda branca 22 mm",
    categoria: "Fitas",
    quantidade: 8,
    minimo: 15,
    unidade: "rolos",
    localizacao: "B2-07",
    status: "Crítico",
  },
  {
    codigo: "MAT-00306",
    nome: "Corrediça telescópica 450 mm",
    categoria: "Ferragens",
    quantidade: 64,
    minimo: 30,
    unidade: "pares",
    localizacao: "C1-12",
    status: "Normal",
  },
  {
    codigo: "MAT-00419",
    nome: "Dobradiça curva com amortecimento",
    categoria: "Ferragens",
    quantidade: 21,
    minimo: 25,
    unidade: "un",
    localizacao: "C2-08",
    status: "Atenção",
  },
  {
    codigo: "MAT-00502",
    nome: "Cola de contato 2,8 kg",
    categoria: "Insumos",
    quantidade: 13,
    minimo: 10,
    unidade: "latas",
    localizacao: "D1-02",
    status: "Normal",
  },
];

const movimentacoes = [
  {
    tipo: "Entrada",
    descricao: "Recebimento de MDF Branco",
    quantidade: "+24 un",
    horario: "Hoje, 15:40",
  },
  {
    tipo: "Saída",
    descricao: "OP-2026-0148 — Cozinha Aurora",
    quantidade: "-6 un",
    horario: "Hoje, 14:15",
  },
  {
    tipo: "Saída",
    descricao: "OP-2026-0149 — Dormitório Essenza",
    quantidade: "-18 un",
    horario: "Hoje, 11:32",
  },
  {
    tipo: "Entrada",
    descricao: "Recebimento de ferragens",
    quantidade: "+80 un",
    horario: "Ontem, 17:10",
  },
];

export default function EstoquePage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-400">
              Infinity O.S.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Estoque
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Controle de materiais, movimentações e níveis de reposição.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
              <SlidersHorizontal size={18} />
              Ajustar estoque
            </button>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300">
              <Plus size={18} />
              Novo item
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

                  <Warehouse size={17} className="text-zinc-600" />
                </div>

                <p className="text-sm text-zinc-400">{item.titulo}</p>
                <p className="mt-2 text-3xl font-semibold">{item.valor}</p>
                <p className="mt-2 text-xs text-zinc-500">{item.descricao}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.65fr_0.75fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Materiais em estoque</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Posição atual dos itens cadastrados.
                </p>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <Search size={17} className="text-zinc-500" />

                <input
                  type="search"
                  placeholder="Buscar material"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600 md:w-52"
                />
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-zinc-500">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 font-medium">Material</th>
                    <th className="px-5 py-4 font-medium">Categoria</th>
                    <th className="px-5 py-4 font-medium">Local</th>
                    <th className="px-5 py-4 text-right font-medium">
                      Quantidade
                    </th>
                    <th className="px-5 py-4 text-right font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {itens.map((item) => (
                    <tr
                      key={item.codigo}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-emerald-400/10 p-2 text-emerald-400">
                            <Package size={17} />
                          </div>

                          <div>
                            <p className="font-medium text-zinc-100">
                              {item.nome}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                              {item.codigo}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        {item.categoria}
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        {item.localizacao}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <p className="font-medium text-zinc-200">
                          {item.quantidade} {item.unidade}
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          Mínimo: {item.minimo}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span
                          className={
                            item.status === "Normal"
                              ? "rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-400"
                              : item.status === "Atenção"
                                ? "rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-400"
                                : "rounded-full border border-rose-400/20 bg-rose-400/10 px-2.5 py-1 text-xs text-rose-400"
                          }
                        >
                          {item.status}
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
                  <Archive size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Ocupação</h2>
                  <p className="text-sm text-zinc-500">Capacidade do depósito</p>
                </div>
              </div>

              <div className="mb-3 flex items-end justify-between">
                <span className="text-3xl font-semibold">68%</span>
                <span className="text-xs text-zinc-500">Em uso</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[68%] rounded-full bg-emerald-400" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-zinc-500">Posições usadas</p>
                  <p className="mt-1 text-lg font-semibold">326</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-zinc-500">Disponíveis</p>
                  <p className="mt-1 text-lg font-semibold">154</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h2 className="mb-5 font-semibold">Últimas movimentações</h2>

              <div className="space-y-4">
                {movimentacoes.map((movimentacao) => (
                  <div
                    key={`${movimentacao.descricao}-${movimentacao.horario}`}
                    className="flex gap-3"
                  >
                    <div
                      className={
                        movimentacao.tipo === "Entrada"
                          ? "mt-0.5 rounded-lg bg-emerald-400/10 p-2 text-emerald-400"
                          : "mt-0.5 rounded-lg bg-rose-400/10 p-2 text-rose-400"
                      }
                    >
                      {movimentacao.tipo === "Entrada" ? (
                        <ArrowDownToLine size={16} />
                      ) : (
                        <ArrowUpFromLine size={16} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm text-zinc-200">
                          {movimentacao.descricao}
                        </p>

                        <span
                          className={
                            movimentacao.tipo === "Entrada"
                              ? "whitespace-nowrap text-xs font-medium text-emerald-400"
                              : "whitespace-nowrap text-xs font-medium text-rose-400"
                          }
                        >
                          {movimentacao.quantidade}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-zinc-600">
                        {movimentacao.horario}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
