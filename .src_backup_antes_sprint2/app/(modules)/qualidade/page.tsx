"use client";

import {
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Eraser,
  FileSignature,
  Hammer,
  Home,
  ImagePlus,
  PackageCheck,
  PenLine,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  UserRound,
  Wrench,
  X,
  XCircle,
} from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  PointerEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import DashboardCards from "./components/DashboardCards";
type TipoChecklist = "Produção" | "Instalação" | "Fim de obra";

type ResultadoItem =
  | "Pendente"
  | "Aprovado"
  | "Reprovado"
  | "Não se aplica";

type StatusQualidade =
  | "Pendente"
  | "Em andamento"
  | "Com pendências"
  | "Aprovado"
  | "Entregue";

type ItemChecklist = {
  id: number;
  descricao: string;
  resultado: ResultadoItem;
  observacao: string;
};

type FotoQualidade = {
  id: number;
  nome: string;
  url: string;
};

type RegistroQualidade = {
  id: number;
  codigo: string;
  cliente: string;
  projeto: string;
  endereco: string;
  ambiente: string;
  responsavel: string;
  tipo: TipoChecklist;
  data: string;
  status: StatusQualidade;
  observacoesGerais: string;
  itens: ItemChecklist[];
  fotos: FotoQualidade[];
  assinaturaCliente: string | null;
  nomeAssinante: string;
  dataAssinatura: string;
};

const itensProducao = [
  "Medidas das peças conferidas",
  "Quantidade de peças conferida",
  "Cortes realizados corretamente",
  "Furações conferidas",
  "Fitas de borda aplicadas corretamente",
  "Acabamento sem riscos ou avarias",
  "Cor e padrão dos materiais conferidos",
  "Dobradiças e corrediças separadas",
  "Ferragens e acessórios completos",
  "Peças identificadas para montagem",
  "Portas e gavetas testadas",
  "Móveis limpos e embalados",
];

const itensInstalacao = [
  "Todas as peças chegaram ao local",
  "Ambiente protegido antes da montagem",
  "Módulos posicionados corretamente",
  "Móveis nivelados",
  "Móveis fixados com segurança",
  "Portas alinhadas",
  "Gavetas reguladas",
  "Dobradiças reguladas",
  "Corrediças funcionando corretamente",
  "Puxadores instalados",
  "Tampos e painéis instalados",
  "Recortes e acabamentos realizados",
  "Eletrodomésticos conferidos",
  "Ambiente sem danos causados pela instalação",
];

const itensFimObra = [
  "Todos os móveis foram instalados",
  "Portas abrem e fecham corretamente",
  "Gavetas abrem e fecham corretamente",
  "Ferragens estão funcionando",
  "Móveis estão nivelados e alinhados",
  "Não existem riscos ou avarias",
  "Todos os acessórios foram entregues",
  "Ambiente foi limpo",
  "Resíduos da instalação foram retirados",
  "Cliente recebeu orientações de uso",
  "Cliente conferiu todos os ambientes",
  "Pendências foram resolvidas",
  "Fotos finais foram registradas",
  "Cliente aprovou a entrega",
];

function criarItens(descricoes: string[]): ItemChecklist[] {
  return descricoes.map((descricao, index) => ({
    id: index + 1,
    descricao,
    resultado: "Pendente",
    observacao: "",
  }));
}

function itensPorTipo(tipo: TipoChecklist) {
  if (tipo === "Produção") {
    return criarItens(itensProducao);
  }

  if (tipo === "Instalação") {
    return criarItens(itensInstalacao);
  }

  return criarItens(itensFimObra);
}

function formatarData(data: string) {
  if (!data) {
    return "";
  }

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

function resultadoClasses(resultado: ResultadoItem) {
  if (resultado === "Aprovado") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-400";
  }

  if (resultado === "Reprovado") {
    return "border-rose-400/30 bg-rose-400/10 text-rose-400";
  }

  if (resultado === "Não se aplica") {
    return "border-violet-400/30 bg-violet-400/10 text-violet-400";
  }

  return "border-white/10 bg-white/5 text-zinc-500";
}

function statusClasses(status: StatusQualidade) {
  if (status === "Entregue") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-400";
  }

  if (status === "Aprovado") {
    return "border-sky-400/30 bg-sky-400/10 text-sky-400";
  }

  if (status === "Com pendências") {
    return "border-rose-400/30 bg-rose-400/10 text-rose-400";
  }

  if (status === "Em andamento") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-400";
  }

  return "border-white/10 bg-white/5 text-zinc-500";
}

function tipoIcone(tipo: TipoChecklist) {
  if (tipo === "Produção") {
    return <Hammer size={20} />;
  }

  if (tipo === "Instalação") {
    return <Wrench size={20} />;
  }

  return <Home size={20} />;
}

export default function QualidadePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const desenhandoRef = useRef(false);

  const [registros, setRegistros] = useState<RegistroQualidade[]>([]);
  const [registroAbertoId, setRegistroAbertoId] =
    useState<number | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const [cliente, setCliente] = useState("");
  const [projeto, setProjeto] = useState("");
  const [endereco, setEndereco] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [tipo, setTipo] = useState<TipoChecklist>("Produção");
  const [data, setData] = useState("");
  const [observacoesGerais, setObservacoesGerais] = useState("");

  const registroAberto = registros.find(
    (registro) => registro.id === registroAbertoId,
  );

  const totalPendentes = registros.filter(
    (registro) => registro.status === "Pendente",
  ).length;

  const totalEmAndamento = registros.filter(
    (registro) => registro.status === "Em andamento",
  ).length;

  const totalComPendencias = registros.filter(
    (registro) => registro.status === "Com pendências",
  ).length;

  const totalEntregues = registros.filter(
    (registro) => registro.status === "Entregue",
  ).length;

  const totalChecklists = registros.length;

  const totalConcluidos = totalEntregues;


  const progresso = useMemo(() => {
    if (!registroAberto) {
      return 0;
    }

    const avaliados = registroAberto.itens.filter(
      (item) => item.resultado !== "Pendente",
    ).length;

    return Math.round(
      (avaliados / registroAberto.itens.length) * 100,
    );
  }, [registroAberto]);

  const pendencias = useMemo(() => {
    if (!registroAberto) {
      return [];
    }

    return registroAberto.itens.filter(
      (item) => item.resultado === "Reprovado",
    );
  }, [registroAberto]);

  function criarChecklist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !cliente.trim() ||
      !projeto.trim() ||
      !responsavel.trim() ||
      !data
    ) {
      setMensagem(
        "Preencha cliente, projeto, responsável e data.",
      );
      return;
    }

    const numero = String(registros.length + 1).padStart(4, "0");

    const novoRegistro: RegistroQualidade = {
      id: Date.now(),
      codigo: `QLD-${numero}`,
      cliente: cliente.trim(),
      projeto: projeto.trim(),
      endereco: endereco.trim() || "Não informado",
      ambiente: ambiente.trim() || "Não informado",
      responsavel: responsavel.trim(),
      tipo,
      data,
      status: "Em andamento",
      observacoesGerais: observacoesGerais.trim(),
      itens: itensPorTipo(tipo),
      fotos: [],
      assinaturaCliente: null,
      nomeAssinante: "",
      dataAssinatura: "",
    };

    setRegistros((atuais) => [novoRegistro, ...atuais]);
    setRegistroAbertoId(novoRegistro.id);
    setMostrarFormulario(false);
    setMensagem(`${tipo} iniciado com sucesso.`);
  }

  function atualizarResultado(
    itemId: number,
    resultado: ResultadoItem,
  ) {
    if (!registroAbertoId) {
      return;
    }

    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === registroAbertoId
          ? {
              ...registro,
              status: "Em andamento",
              itens: registro.itens.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      resultado,
                    }
                  : item,
              ),
            }
          : registro,
      ),
    );
  }

  function atualizarObservacao(
    itemId: number,
    observacao: string,
  ) {
    if (!registroAbertoId) {
      return;
    }

    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === registroAbertoId
          ? {
              ...registro,
              itens: registro.itens.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      observacao,
                    }
                  : item,
              ),
            }
          : registro,
      ),
    );
  }

  function adicionarFotos(event: ChangeEvent<HTMLInputElement>) {
    if (!registroAbertoId) {
      return;
    }

    const arquivos = Array.from(event.target.files ?? []);

    if (arquivos.length === 0) {
      return;
    }

    const novasFotos: FotoQualidade[] = arquivos.map(
      (arquivo, index) => ({
        id: Date.now() + index,
        nome: arquivo.name,
        url: URL.createObjectURL(arquivo),
      }),
    );

    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === registroAbertoId
          ? {
              ...registro,
              fotos: [...registro.fotos, ...novasFotos],
            }
          : registro,
      ),
    );

    event.target.value = "";
  }

  function removerFoto(fotoId: number) {
    if (!registroAbertoId) {
      return;
    }

    setRegistros((atuais) =>
      atuais.map((registro) => {
        if (registro.id !== registroAbertoId) {
          return registro;
        }

        const foto = registro.fotos.find(
          (item) => item.id === fotoId,
        );

        if (foto) {
          URL.revokeObjectURL(foto.url);
        }

        return {
          ...registro,
          fotos: registro.fotos.filter(
            (item) => item.id !== fotoId,
          ),
        };
      }),
    );
  }

  function atualizarNomeAssinante(nome: string) {
    if (!registroAbertoId) {
      return;
    }

    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === registroAbertoId
          ? {
              ...registro,
              nomeAssinante: nome,
            }
          : registro,
      ),
    );
  }

  function prepararCanvas() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return null;
    }

    const retangulo = canvas.getBoundingClientRect();
    const proporcao = window.devicePixelRatio || 1;

    if (
      canvas.width !== Math.floor(retangulo.width * proporcao) ||
      canvas.height !== Math.floor(retangulo.height * proporcao)
    ) {
      const imagemAtual = canvas.toDataURL();

      canvas.width = Math.floor(retangulo.width * proporcao);
      canvas.height = Math.floor(retangulo.height * proporcao);

      const contexto = canvas.getContext("2d");

      if (!contexto) {
        return null;
      }

      contexto.scale(proporcao, proporcao);
      contexto.lineCap = "round";
      contexto.lineJoin = "round";
      contexto.lineWidth = 2.5;
      contexto.strokeStyle = "#ffffff";

      if (imagemAtual !== "data:,") {
        const imagem = new Image();

        imagem.onload = () => {
          contexto.drawImage(
            imagem,
            0,
            0,
            retangulo.width,
            retangulo.height,
          );
        };

        imagem.src = imagemAtual;
      }
    }

    return canvas.getContext("2d");
  }

  function iniciarAssinatura(
    event: PointerEvent<HTMLCanvasElement>,
  ) {
    const canvas = canvasRef.current;
    const contexto = prepararCanvas();

    if (!canvas || !contexto) {
      return;
    }

    desenhandoRef.current = true;
    canvas.setPointerCapture(event.pointerId);

    const retangulo = canvas.getBoundingClientRect();
    const x = event.clientX - retangulo.left;
    const y = event.clientY - retangulo.top;

    contexto.beginPath();
    contexto.moveTo(x, y);
  }

  function desenharAssinatura(
    event: PointerEvent<HTMLCanvasElement>,
  ) {
    if (!desenhandoRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const contexto = canvas?.getContext("2d");

    if (!canvas || !contexto) {
      return;
    }

    const retangulo = canvas.getBoundingClientRect();
    const x = event.clientX - retangulo.left;
    const y = event.clientY - retangulo.top;

    contexto.lineTo(x, y);
    contexto.stroke();
  }

  function pararAssinatura(
    event: PointerEvent<HTMLCanvasElement>,
  ) {
    const canvas = canvasRef.current;

    desenhandoRef.current = false;

    if (canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  }

  function limparAssinatura() {
    const canvas = canvasRef.current;
    const contexto = canvas?.getContext("2d");

    if (!canvas || !contexto) {
      return;
    }

    contexto.clearRect(0, 0, canvas.width, canvas.height);

    if (registroAbertoId) {
      setRegistros((atuais) =>
        atuais.map((registro) =>
          registro.id === registroAbertoId
            ? {
                ...registro,
                assinaturaCliente: null,
                dataAssinatura: "",
              }
            : registro,
        ),
      );
    }

    setMensagem("Assinatura apagada.");
  }

  function salvarAssinatura() {
    const canvas = canvasRef.current;

    if (!canvas || !registroAbertoId || !registroAberto) {
      return;
    }

    if (!registroAberto.nomeAssinante.trim()) {
      setMensagem(
        "Informe o nome do cliente antes de salvar a assinatura.",
      );
      return;
    }

    const contexto = canvas.getContext("2d");

    if (!contexto) {
      return;
    }

    const pixels = contexto.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    ).data;

    const possuiDesenho = pixels.some(
      (_, index) =>
        index % 4 === 3 && pixels[index] !== 0,
    );

    if (!possuiDesenho) {
      setMensagem("O cliente precisa assinar na tela.");
      return;
    }

    const assinatura = canvas.toDataURL("image/png");
    const dataAtual = new Date().toISOString();

    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === registroAbertoId
          ? {
              ...registro,
              assinaturaCliente: assinatura,
              dataAssinatura: dataAtual,
            }
          : registro,
      ),
    );

    setMensagem("Assinatura do cliente salva.");
  }

  function finalizarChecklist() {
    if (!registroAberto) {
      return;
    }

    const possuiPendente = registroAberto.itens.some(
      (item) => item.resultado === "Pendente",
    );

    if (possuiPendente) {
      setMensagem(
        "Avalie todos os itens antes de finalizar o checklist.",
      );
      return;
    }

    const possuiReprovacao = registroAberto.itens.some(
      (item) => item.resultado === "Reprovado",
    );

    if (possuiReprovacao) {
      setRegistros((atuais) =>
        atuais.map((registro) =>
          registro.id === registroAberto.id
            ? {
                ...registro,
                status: "Com pendências",
              }
            : registro,
        ),
      );

      setMensagem(
        "Checklist salvo com pendências. Resolva os itens reprovados antes da aprovação.",
      );
      return;
    }

    if (
      registroAberto.tipo === "Fim de obra" &&
      !registroAberto.assinaturaCliente
    ) {
      setMensagem(
        "A assinatura do cliente é obrigatória para entregar a obra.",
      );
      return;
    }

    const novoStatus: StatusQualidade =
      registroAberto.tipo === "Fim de obra"
        ? "Entregue"
        : "Aprovado";

    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === registroAberto.id
          ? {
              ...registro,
              status: novoStatus,
            }
          : registro,
      ),
    );

    setMensagem(
      registroAberto.tipo === "Fim de obra"
        ? "Obra finalizada e entregue ao cliente."
        : "Checklist aprovado com sucesso.",
    );
  }

  function reabrirPendencias() {
    if (!registroAbertoId) {
      return;
    }

    setRegistros((atuais) =>
      atuais.map((registro) =>
        registro.id === registroAbertoId
          ? {
              ...registro,
              status: "Em andamento",
              itens: registro.itens.map((item) =>
                item.resultado === "Reprovado"
                  ? {
                      ...item,
                      resultado: "Pendente",
                    }
                  : item,
              ),
            }
          : registro,
      ),
    );

    setMensagem(
      "Itens reprovados foram reabertos para nova conferência.",
    );
  }

  function novoChecklist() {
    setCliente("");
    setProjeto("");
    setEndereco("");
    setAmbiente("");
    setResponsavel("");
    setTipo("Produção");
    setData("");
    setObservacoesGerais("");
    setRegistroAbertoId(null);
    setMostrarFormulario(true);
    setMensagem("");
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
              Qualidade
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Checklists de produção, instalação e fim de obra,
              com registro de pendências, fotos e assinatura do cliente.
            </p>
          </div>

          <button
            type="button"
            onClick={novoChecklist}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
          >
            <Plus size={18} />
            Novo checklist
          </button>
        </header>
      <div className="mb-8">
  <DashboardCards
    total={totalChecklists}
    pendentes={totalPendentes}
    emAndamento={totalEmAndamento}
    concluidos={totalConcluidos}
  />
</div>
        {mensagem && (
          <div className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
              <p>{mensagem}</p>
            </div>

            <button
              type="button"
              onClick={() => setMensagem("")}
              aria-label="Fechar mensagem"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <ClipboardCheck
              size={21}
              className="mb-5 text-zinc-400"
            />

            <p className="text-sm text-zinc-400">Pendentes</p>
            <p className="mt-2 text-3xl font-semibold">
              {totalPendentes}
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <Hammer
              size={21}
              className="mb-5 text-amber-400"
            />

            <p className="text-sm text-zinc-400">Em andamento</p>
            <p className="mt-2 text-3xl font-semibold">
              {totalEmAndamento}
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <AlertTriangle
              size={21}
              className="mb-5 text-rose-400"
            />

            <p className="text-sm text-zinc-400">Com pendências</p>
            <p className="mt-2 text-3xl font-semibold">
              {totalComPendencias}
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <PackageCheck
              size={21}
              className="mb-5 text-emerald-400"
            />

            <p className="text-sm text-zinc-400">Obras entregues</p>
            <p className="mt-2 text-3xl font-semibold">
              {totalEntregues}
            </p>
          </article>
        </section>

        {mostrarFormulario && (
          <form
            onSubmit={criarChecklist}
            className="mb-8 rounded-2xl border border-emerald-400/20 bg-white/[0.035] p-5 md:p-6"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Criar checklist
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Escolha a etapa que será conferida.
              </p>
            </div>

            <div className="mb-6 grid gap-3 md:grid-cols-3">
              {(
                [
                  "Produção",
                  "Instalação",
                  "Fim de obra",
                ] as TipoChecklist[]
              ).map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  onClick={() => setTipo(opcao)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                    tipo === opcao
                      ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
                      : "border-white/10 bg-black/20 text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  {tipoIcone(opcao)}

                  <div>
                    <p className="font-medium">{opcao}</p>

                    <p className="mt-1 text-xs opacity-70">
                      {opcao === "Produção" &&
                        "Conferência antes de sair da fábrica."}

                      {opcao === "Instalação" &&
                        "Conferência durante a montagem."}

                      {opcao === "Fim de obra" &&
                        "Revisão final e entrega ao cliente."}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Cliente
                </span>

                <input
                  type="text"
                  value={cliente}
                  onChange={(event) =>
                    setCliente(event.target.value)
                  }
                  placeholder="Nome do cliente"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Projeto
                </span>

                <input
                  type="text"
                  value={projeto}
                  onChange={(event) =>
                    setProjeto(event.target.value)
                  }
                  placeholder="Ex.: Cozinha planejada"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Ambiente
                </span>

                <input
                  type="text"
                  value={ambiente}
                  onChange={(event) =>
                    setAmbiente(event.target.value)
                  }
                  placeholder="Ex.: Cozinha"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Endereço
                </span>

                <input
                  type="text"
                  value={endereco}
                  onChange={(event) =>
                    setEndereco(event.target.value)
                  }
                  placeholder="Endereço da instalação"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Responsável
                </span>

                <input
                  type="text"
                  value={responsavel}
                  onChange={(event) =>
                    setResponsavel(event.target.value)
                  }
                  placeholder="Nome do responsável"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Data
                </span>

                <input
                  type="date"
                  value={data}
                  onChange={(event) =>
                    setData(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm text-zinc-300">
                Observações gerais
              </span>

              <textarea
                rows={4}
                value={observacoesGerais}
                onChange={(event) =>
                  setObservacoesGerais(event.target.value)
                }
                placeholder="Informações importantes para esta conferência..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300 sm:w-auto"
            >
              <ClipboardCheck size={18} />
              Iniciar checklist
            </button>
          </form>
        )}

        {registroAberto && (
          <section className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="border-b border-white/10 p-5 md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-emerald-400">
                    {tipoIcone(registroAberto.tipo)}

                    <p className="text-sm uppercase tracking-wider">
                      Checklist de {registroAberto.tipo}
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold">
                    {registroAberto.projeto}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    {registroAberto.cliente} •{" "}
                    {registroAberto.ambiente}
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    {registroAberto.codigo} •{" "}
                    {formatarData(registroAberto.data)}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border px-3 py-1.5 text-xs ${statusClasses(
                    registroAberto.status,
                  )}`}
                >
                  {registroAberto.status}
                </span>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">
                    Progresso da conferência
                  </span>

                  <span className="text-zinc-300">
                    {progresso}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 md:p-6">
              {registroAberto.itens.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-zinc-200">
                        {item.id}. {item.descricao}
                      </p>

                      <span
                        className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs ${resultadoClasses(
                          item.resultado,
                        )}`}
                      >
                        {item.resultado}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          atualizarResultado(
                            item.id,
                            "Aprovado",
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2.5 text-xs text-emerald-400 transition hover:bg-emerald-400/20"
                      >
                        <Check size={16} />
                        OK
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          atualizarResultado(
                            item.id,
                            "Reprovado",
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2.5 text-xs text-rose-400 transition hover:bg-rose-400/20"
                      >
                        <X size={16} />
                        Falhou
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          atualizarResultado(
                            item.id,
                            "Não se aplica",
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-violet-400/20 bg-violet-400/10 px-3 py-2.5 text-xs text-violet-400 transition hover:bg-violet-400/20"
                      >
                        N/A
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={item.observacao}
                    onChange={(event) =>
                      atualizarObservacao(
                        item.id,
                        event.target.value,
                      )
                    }
                    placeholder="Observação, problema encontrado ou solução aplicada..."
                    className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                  />
                </article>
              ))}
            </div>

            <div className="border-t border-white/10 p-5 md:p-6">
              <div className="mb-5">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <ImagePlus
                    size={20}
                    className="text-emerald-400"
                  />
                  Fotos
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Registre problemas, correções e o resultado final.
                </p>
              </div>

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-4 text-sm text-zinc-400 transition hover:border-emerald-400/40 hover:text-emerald-400">
                <Camera size={18} />
                Tirar ou anexar fotos

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  onChange={adicionarFotos}
                  className="hidden"
                />
              </label>

              {registroAberto.fotos.length > 0 && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {registroAberto.fotos.map((foto) => (
                    <article
                      key={foto.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                    >
                      <img
                        src={foto.url}
                        alt={foto.nome}
                        className="h-48 w-full object-cover"
                      />

                      <div className="flex items-center justify-between gap-3 p-3">
                        <p className="truncate text-xs text-zinc-500">
                          {foto.nome}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removerFoto(foto.id)
                          }
                          className="rounded-lg p-2 text-zinc-500 transition hover:bg-rose-400/10 hover:text-rose-400"
                          aria-label="Remover foto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {pendencias.length > 0 && (
              <div className="border-t border-white/10 bg-rose-400/[0.04] p-5 md:p-6">
                <h3 className="flex items-center gap-2 font-semibold text-rose-400">
                  <AlertTriangle size={19} />
                  Pendências encontradas
                </h3>

                <div className="mt-4 space-y-3">
                  {pendencias.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-4"
                    >
                      <p className="text-sm font-medium text-rose-300">
                        {item.descricao}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-rose-200/60">
                        {item.observacao ||
                          "Nenhuma observação foi informada."}
                      </p>
                    </div>
                  ))}
                </div>

                {registroAberto.status ===
                  "Com pendências" && (
                  <button
                    type="button"
                    onClick={reabrirPendencias}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-400 transition hover:bg-amber-400/20"
                  >
                    <Wrench size={17} />
                    Conferir correções
                  </button>
                )}
              </div>
            )}

            {registroAberto.tipo === "Fim de obra" && (
              <div className="border-t border-white/10 p-5 md:p-6">
                <div className="mb-5">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <FileSignature
                      size={20}
                      className="text-emerald-400"
                    />
                    Assinatura do cliente
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    O cliente deve conferir os móveis e assinar
                    diretamente na tela.
                  </p>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-300">
                    Nome completo do cliente
                  </span>

                  <input
                    type="text"
                    value={registroAberto.nomeAssinante}
                    onChange={(event) =>
                      atualizarNomeAssinante(
                        event.target.value,
                      )
                    }
                    placeholder="Nome de quem está assinando"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                  />
                </label>

                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white">
                  <div className="flex items-center gap-2 border-b border-black/10 bg-zinc-100 px-4 py-3 text-sm text-zinc-600">
                    <PenLine size={17} />
                    Assine no espaço abaixo
                  </div>

                  <canvas
                    ref={canvasRef}
                    onPointerDown={iniciarAssinatura}
                    onPointerMove={desenharAssinatura}
                    onPointerUp={pararAssinatura}
                    onPointerCancel={pararAssinatura}
                    onPointerLeave={(event) => {
                      if (desenhandoRef.current) {
                        pararAssinatura(event);
                      }
                    }}
                    className="h-56 w-full touch-none bg-zinc-950"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={salvarAssinatura}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
                  >
                    <Save size={17} />
                    Salvar assinatura
                  </button>

                  <button
                    type="button"
                    onClick={limparAssinatura}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/10"
                  >
                    <Eraser size={17} />
                    Limpar
                  </button>
                </div>

                {registroAberto.assinaturaCliente && (
                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-400" />

                      <div>
                        <p className="text-sm font-medium text-emerald-300">
                          Assinatura registrada
                        </p>

                        <p className="mt-1 text-xs text-emerald-300/60">
                          {registroAberto.nomeAssinante} •{" "}
                          {new Date(
                            registroAberto.dataAssinatura,
                          ).toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <img
                      src={registroAberto.assinaturaCliente}
                      alt="Assinatura do cliente"
                      className="mt-4 h-32 w-full rounded-xl bg-zinc-950 object-contain"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-white/10 p-5 md:p-6">
              <button
                type="button"
                onClick={finalizarChecklist}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-medium text-black transition hover:bg-emerald-300"
              >
                {registroAberto.tipo === "Fim de obra" ? (
                  <>
                    <FileSignature size={18} />
                    Finalizar e entregar obra
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Finalizar checklist
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-zinc-600">
                O checklist não poderá ser aprovado enquanto
                existirem itens pendentes ou reprovados.
              </p>
            </div>
          </section>
        )}

        {registros.length > 0 && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-lg font-semibold">
                Histórico de checklists
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Produção, instalação e entregas realizadas.
              </p>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-2">
              {registros.map((registro) => {
                const aprovados = registro.itens.filter(
                  (item) => item.resultado === "Aprovado",
                ).length;

                const reprovados = registro.itens.filter(
                  (item) => item.resultado === "Reprovado",
                ).length;

                return (
                  <article
                    key={registro.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          {tipoIcone(registro.tipo)}

                          <span className="text-xs uppercase tracking-wider">
                            {registro.tipo}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-semibold">
                          {registro.projeto}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                          {registro.cliente}
                        </p>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs ${statusClasses(
                          registro.status,
                        )}`}
                      >
                        {registro.status}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-white/[0.03] p-3 text-center">
                        <CheckCircle2
                          size={17}
                          className="mx-auto text-emerald-400"
                        />
                        <p className="mt-2 font-semibold">
                          {aprovados}
                        </p>
                        <p className="text-xs text-zinc-600">
                          Aprovados
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/[0.03] p-3 text-center">
                        <XCircle
                          size={17}
                          className="mx-auto text-rose-400"
                        />
                        <p className="mt-2 font-semibold">
                          {reprovados}
                        </p>
                        <p className="text-xs text-zinc-600">
                          Reprovados
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/[0.03] p-3 text-center">
                        <Camera
                          size={17}
                          className="mx-auto text-sky-400"
                        />
                        <p className="mt-2 font-semibold">
                          {registro.fotos.length}
                        </p>
                        <p className="text-xs text-zinc-600">
                          Fotos
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <UserRound
                        size={18}
                        className="text-emerald-400"
                      />

                      <div>
                        <p className="text-sm text-zinc-300">
                          {registro.responsavel}
                        </p>
                        <p className="mt-1 text-xs text-zinc-600">
                          {formatarData(registro.data)}
                        </p>
                      </div>
                    </div>

                    {registro.assinaturaCliente && (
                      <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                        <FileSignature
                          size={18}
                          className="text-emerald-400"
                        />

                        <div>
                          <p className="text-sm text-emerald-300">
                            Assinado por{" "}
                            {registro.nomeAssinante}
                          </p>
                          <p className="mt-1 text-xs text-emerald-300/60">
                            Entrega confirmada pelo cliente
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setRegistroAbertoId(registro.id);
                        setMostrarFormulario(false);
                      }}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/10"
                    >
                      <ClipboardCheck size={17} />
                      Abrir checklist
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
