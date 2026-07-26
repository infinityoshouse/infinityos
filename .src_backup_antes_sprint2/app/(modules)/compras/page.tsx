"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileText,
  PackageSearch,
  Plus,
  Search,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

const indicadores = [
  {
    titulo: "Pedidos em aberto",
    valor: "14",
    descricao: "Aguardando recebimento",
    icon: ShoppingCart,
  },
  {
    titulo: "Cotações pendentes",
    valor: "6",
    descricao: "Necessitam aprovação",
    icon: FileText,
  },
  {
    titulo: "Entregas atrasadas",
    valor: "3",
    descricao: "Contatar fornecedores",
    icon: AlertCircle,
  },
  {
    titulo: "Fornecedores ativos",
    valor: "48",
    descricao: "Homologados no sistema",
    icon: Users,
  },
];

const pedidos = [
  {
    codigo: "PC-2026-0087",
    fornecedor: "Madeiras Brasil",
    descricao: "MDF Branco TX 18 mm",
    valor: "R$ 18.460,00",
    previsao: "26/07/2026",
    status: "Em trânsito",
  },
  {
    codigo: "PC-2026-0088",
    fornecedor: "Ferragens Premium",
    descricao: "Dobradiças e corrediças",
    valor: "R$ 7.920,00",
    previsao: "27/07/2026",
    status: "Confirmado",
  },
  {
    codigo: "PC-2026-0089",
    fornecedor: "Química Industrial Sul",
    descricao: "Colas e produtos de acabamento",
    valor: "R$ 4.380,00",
    previsao: "25/07/2026",
    status: "Atrasado",
  },
  {
    codigo: "PC-2026-0090",
    fornecedor: "Acessórios Design",
    descricao: "Puxadores e perfis metálicos",
    valor: "R$ 6.740,00",
    previsao: "30/07/2026",
    status: "Aguardando",
  },
];

const requisicoes = [
  {
    material: "MDF Carvalho Natural 18 mm",
    quantidade: "32 chapas",
    setor: "Produção",
    prioridade: "Alta",
  },
  {
    material: "Fita de borda 22 mm",
    quantidade: "12 rolos",
    setor: "Bordagem",
    prioridade: "Média",
  },
  {
    material: "Corrediça oculta 450 mm",
    quantidade: "40 pares",
    setor: "Montagem",
    prioridade: "Alta",
  },
  {
    material: "Lixa grão 220",
    quantidade: "100 un",
    setor: "Acabamento",
    prioridade: "Normal",
  },
];

function statusClasses(status: string) {
  if (status === "Confirmado") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";
  }

  if (status === "Em trânsito") {
    return "border-sky-400/20 bg-sky-400/10 text-sky-400";
  }

  if (status === "Atrasado") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-400";
  }

  return "border-amber-400/20 bg-amber-400/10 text-amber-400";
}

export default function ComprasPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-400">
              Infinity O.S.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Compras
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Gestão de solicitações, cotações, pedidos e fornecedores.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
              <PackageSearch size={18} />
              Nova cotação
            </button>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300">
              <Plus size={18} />
              Novo pedido
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
                <h2 className="text-lg font-semibold">Pedidos de compra</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Acompanhe pedidos e previsões de entrega.
                </p>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <Search size={17} className="text-zinc-500" />

                <input
                  type="search"
                  placeholder="Buscar pedido"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600 md:w-52"
                />
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-zinc-500">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 font-medium">Pedido</th>
                    <th className="px-5 py-4 font-medium">Fornecedor</th>
                    <th className="px-5 py-4 font-medium">Previsão</th>
                    <th className="px-5 py-4 text-right font-medium">Valor</th>
                    <th className="px-5 py-4 text-right font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.map((pedido) => (
                    <tr
                      key={pedido.codigo}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-zinc-100">
                            {pedido.codigo}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {pedido.descricao}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        {pedido.fornecedor}
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        {pedido.previsao}
                      </td>

                      <td className="px-5 py-4 text-right font-medium text-zinc-200">
                        {pedido.valor}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${statusClasses(
                            pedido.status,
                          )}`}
                        >
                          {pedido.status}
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
                  <Truck size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Entregas da semana</h2>
                  <p className="text-sm text-zinc-500">Pedidos confirmados</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                  <p className="text-2xl font-semibold">8</p>
                  <p className="mt-1 text-xs text-zinc-500">Previstas</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                  <p className="text-2xl font-semibold text-emerald-400">5</p>
                  <p className="mt-1 text-xs text-zinc-500">No prazo</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                  <p className="text-2xl font-semibold text-rose-400">3</p>
                  <p className="mt-1 text-xs text-zinc-500">Atrasadas</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Requisições internas</h2>
                  <p className="text-sm text-zinc-500">
                    Materiais aguardando compra
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {requisicoes.map((requisicao) => (
                  <article
                    key={`${requisicao.material}-${requisicao.setor}`}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {requisicao.material}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {requisicao.quantidade} · {requisicao.setor}
                        </p>
                      </div>

                      <span
                        className={
                          requisicao.prioridade === "Alta"
                            ? "rounded-full bg-rose-400/10 px-2 py-1 text-xs text-rose-400"
                            : requisicao.prioridade === "Média"
                              ? "rounded-full bg-amber-400/10 px-2 py-1 text-xs text-amber-400"
                              : "rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-400"
                        }
                      >
                        {requisicao.prioridade}
                      </span>
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
