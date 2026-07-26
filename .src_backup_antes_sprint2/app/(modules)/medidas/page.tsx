"use client";

import {
  Camera,
  CheckCircle2,
  ClipboardList,
  ImagePlus,
  MapPin,
  Plus,
  Ruler,
  Save,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

type Medicao = {
  id: number;
  ambiente: string;
  altura: string;
  largura: string;
  profundidade: string;
  observacoes: string;
  fotoUrl: string | null;
  fotoNome: string | null;
};

const ambientesSugeridos = [
  "Cozinha",
  "Dormitório",
  "Sala",
  "Banheiro",
  "Lavanderia",
  "Escritório",
  "Closet",
  "Área gourmet",
];

export default function MedidasPage() {
  const [cliente, setCliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [altura, setAltura] = useState("");
  const [largura, setLargura] = useState("");
  const [profundidade, setProfundidade] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [fotoNome, setFotoNome] = useState<string | null>(null);
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    return () => {
      if (fotoUrl) {
        URL.revokeObjectURL(fotoUrl);
      }

      medicoes.forEach((medicao) => {
        if (medicao.fotoUrl) {
          URL.revokeObjectURL(medicao.fotoUrl);
        }
      });
    };
  }, []);

  const medicoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return medicoes;
    }

    return medicoes.filter((medicao) =>
      medicao.ambiente.toLowerCase().includes(termo),
    );
  }, [busca, medicoes]);

  function selecionarFoto(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    if (fotoUrl) {
      URL.revokeObjectURL(fotoUrl);
    }

    const novaFotoUrl = URL.createObjectURL(arquivo);

    setFotoUrl(novaFotoUrl);
    setFotoNome(arquivo.name);
    setMensagem("");
  }

  function removerFotoAtual() {
    if (fotoUrl) {
      URL.revokeObjectURL(fotoUrl);
    }

    setFotoUrl(null);
    setFotoNome(null);
  }

  function limparFormulario() {
    setAmbiente("");
    setAltura("");
    setLargura("");
    setProfundidade("");
    setObservacoes("");
    setFotoUrl(null);
    setFotoNome(null);
  }

  function adicionarMedicao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ambiente.trim()) {
      setMensagem("Informe o nome do ambiente.");
      return;
    }

    if (!altura.trim() && !largura.trim() && !profundidade.trim()) {
      setMensagem("Informe pelo menos uma medida.");
      return;
    }

    const novaMedicao: Medicao = {
      id: Date.now(),
      ambiente: ambiente.trim(),
      altura: altura.trim(),
      largura: largura.trim(),
      profundidade: profundidade.trim(),
      observacoes: observacoes.trim(),
      fotoUrl,
      fotoNome,
    };

    setMedicoes((medicoesAtuais) => [novaMedicao, ...medicoesAtuais]);
    setMensagem("Medição adicionada com sucesso.");

    setAmbiente("");
    setAltura("");
    setLargura("");
    setProfundidade("");
    setObservacoes("");
    setFotoUrl(null);
    setFotoNome(null);
  }

  function excluirMedicao(id: number) {
    const medicao = medicoes.find((item) => item.id === id);

    if (medicao?.fotoUrl) {
      URL.revokeObjectURL(medicao.fotoUrl);
    }

    setMedicoes((medicoesAtuais) =>
      medicoesAtuais.filter((item) => item.id !== id),
    );
  }

  function finalizarLevantamento() {
    if (!cliente.trim()) {
      setMensagem("Informe o nome do cliente antes de finalizar.");
      return;
    }

    if (medicoes.length === 0) {
      setMensagem("Adicione pelo menos uma medição.");
      return;
    }

    setMensagem(
      `Levantamento de ${cliente.trim()} pronto para ser salvo no sistema.`,
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-400">
              Infinity O.S.
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Medidas
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Registre fotos, dimensões e observações técnicas durante a visita
              ao cliente.
            </p>
          </div>

          <button
            type="button"
            onClick={finalizarLevantamento}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
          >
            <Save size={18} />
            Finalizar levantamento
          </button>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-2">
          <label className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <span className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-200">
              <UserRound size={17} className="text-emerald-400" />
              Cliente
            </span>

            <input
              type="text"
              value={cliente}
              onChange={(event) => setCliente(event.target.value)}
              placeholder="Nome do cliente"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60"
            />
          </label>

          <label className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <span className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-200">
              <MapPin size={17} className="text-emerald-400" />
              Local da medição
            </span>

            <input
              type="text"
              value={endereco}
              onChange={(event) => setEndereco(event.target.value)}
              placeholder="Endereço ou referência"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60"
            />
          </label>
        </section>

        {mensagem && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p>{mensagem}</p>
          </div>
        )}

        <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <form
            onSubmit={adicionarMedicao}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                <Ruler size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Nova medição</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Adicione um ambiente por vez.
                </p>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm text-zinc-300">
                Ambiente
              </label>

              <input
                type="text"
                list="ambientes"
                value={ambiente}
                onChange={(event) => setAmbiente(event.target.value)}
                placeholder="Ex.: Cozinha principal"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60"
              />

              <datalist id="ambientes">
                {ambientesSugeridos.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>

            <div className="mb-5 grid gap-4 sm:grid-cols-3">
              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Altura
                </span>

                <div className="flex overflow-hidden rounded-xl border border-white/10 bg-black/30 focus-within:border-emerald-400/60">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={altura}
                    onChange={(event) => setAltura(event.target.value)}
                    placeholder="0,00"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-600"
                  />

                  <span className="flex items-center border-l border-white/10 px-3 text-xs text-zinc-500">
                    cm
                  </span>
                </div>
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Largura
                </span>

                <div className="flex overflow-hidden rounded-xl border border-white/10 bg-black/30 focus-within:border-emerald-400/60">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={largura}
                    onChange={(event) => setLargura(event.target.value)}
                    placeholder="0,00"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-600"
                  />

                  <span className="flex items-center border-l border-white/10 px-3 text-xs text-zinc-500">
                    cm
                  </span>
                </div>
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Profundidade
                </span>

                <div className="flex overflow-hidden rounded-xl border border-white/10 bg-black/30 focus-within:border-emerald-400/60">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={profundidade}
                    onChange={(event) => setProfundidade(event.target.value)}
                    placeholder="0,00"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-600"
                  />

                  <span className="flex items-center border-l border-white/10 px-3 text-xs text-zinc-500">
                    cm
                  </span>
                </div>
              </label>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm text-zinc-300">
                Foto do ambiente
              </label>

              {fotoUrl ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <img
                    src={fotoUrl}
                    alt="Pré-visualização do ambiente"
                    className="h-64 w-full object-cover"
                  />

                  <div className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-zinc-300">
                        {fotoNome}
                      </p>
                      <p className="mt-1 text-xs text-zinc-600">
                        Foto pronta para anexar
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removerFotoAtual}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-400 transition hover:bg-rose-400/20"
                    >
                      <Trash2 size={15} />
                      Remover
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-5 py-8 text-center transition hover:border-emerald-400/40 hover:bg-emerald-400/[0.03]">
                  <div className="mb-4 rounded-full bg-emerald-400/10 p-4 text-emerald-400">
                    <Camera size={26} />
                  </div>

                  <p className="text-sm font-medium text-zinc-200">
                    Tirar foto ou selecionar imagem
                  </p>

                  <p className="mt-2 max-w-sm text-xs leading-5 text-zinc-500">
                    No celular, a câmera poderá ser aberta diretamente.
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={selecionarFoto}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm text-zinc-300">
                Observações técnicas
              </label>

              <textarea
                value={observacoes}
                onChange={(event) => setObservacoes(event.target.value)}
                rows={5}
                placeholder="Ex.: parede fora de esquadro, tomada a 65 cm do piso, tubulação no lado direito..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
              >
                <Plus size={18} />
                Adicionar medição
              </button>

              <button
                type="button"
                onClick={limparFormulario}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/10"
              >
                Limpar
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="border-b border-white/10 p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                    <ClipboardList size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      Medições registradas
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      {medicoes.length} ambiente
                      {medicoes.length === 1 ? "" : "s"} adicionado
                      {medicoes.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <Search size={17} className="text-zinc-500" />

                <input
                  type="search"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Buscar ambiente"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
                />
              </label>
            </div>

            {medicoesFiltradas.length === 0 ? (
              <div className="flex min-h-96 flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-4 rounded-full bg-white/5 p-5 text-zinc-500">
                  <ImagePlus size={28} />
                </div>

                <h3 className="text-base font-medium text-zinc-300">
                  Nenhuma medição adicionada
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
                  Preencha os dados do primeiro ambiente e toque em adicionar
                  medição.
                </p>
              </div>
            ) : (
              <div className="max-h-[900px] space-y-4 overflow-y-auto p-5 md:p-6">
                {medicoesFiltradas.map((medicao) => (
                  <article
                    key={medicao.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                  >
                    {medicao.fotoUrl && (
                      <img
                        src={medicao.fotoUrl}
                        alt={`Foto de ${medicao.ambiente}`}
                        className="h-48 w-full object-cover"
                      />
                    )}

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-emerald-400">
                            Ambiente
                          </p>

                          <h3 className="mt-1 text-lg font-medium">
                            {medicao.ambiente}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => excluirMedicao(medicao.id)}
                          aria-label={`Excluir medição de ${medicao.ambiente}`}
                          className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-500 transition hover:border-rose-400/20 hover:bg-rose-400/10 hover:text-rose-400"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-xs text-zinc-600">Altura</p>
                          <p className="mt-1 text-sm font-medium text-zinc-200">
                            {medicao.altura
                              ? `${medicao.altura} cm`
                              : "Não informada"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-xs text-zinc-600">Largura</p>
                          <p className="mt-1 text-sm font-medium text-zinc-200">
                            {medicao.largura
                              ? `${medicao.largura} cm`
                              : "Não informada"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-xs text-zinc-600">Profundidade</p>
                          <p className="mt-1 text-sm font-medium text-zinc-200">
                            {medicao.profundidade
                              ? `${medicao.profundidade} cm`
                              : "Não informada"}
                          </p>
                        </div>
                      </div>

                      {medicao.observacoes && (
                        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-xs text-zinc-600">Observações</p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-400">
                            {medicao.observacoes}
                          </p>
                        </div>
                      )}

                      {medicao.fotoNome && (
                        <p className="mt-3 truncate text-xs text-zinc-600">
                          Foto: {medicao.fotoNome}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
