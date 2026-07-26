"use client";

import {
  AlertCircle,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Plus,
  Search,
  UserRound,
  X,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

type Prioridade = "Baixa" | "Normal" | "Alta" | "Urgente";

type StatusAgenda =
  | "Agendado"
  | "Em andamento"
  | "Concluído"
  | "Cancelado";

type Compromisso = {
  id: number;
  titulo: string;
  tipo: string;
  cliente: string;
  endereco: string;
  responsavel: string;
  data: string;
  horario: string;
  duracao: string;
  prioridade: Prioridade;
  status: StatusAgenda;
  observacoes: string;
  notificar: boolean;
};

const compromissosIniciais: Compromisso[] = [
  {
    id: 1,
    titulo: "Levantamento de medidas",
    tipo: "Medidas",
    cliente: "Mariana Costa",
    endereco: "Rua das Palmeiras, 240",
    responsavel: "Carlos Souza",
    data: "2026-07-24",
    horario: "09:00",
    duracao: "01:30",
    prioridade: "Alta",
    status: "Agendado",
    observacoes: "Medir cozinha, lavanderia e área gourmet.",
    notificar: true,
  },
  {
    id: 2,
    titulo: "Reunião de aprovação",
    tipo: "Reunião",
    cliente: "Ana Ribeiro",
    endereco: "Showroom Infinity",
    responsavel: "Juliana Martins",
    data: "2026-07-24",
    horario: "14:00",
    duracao: "01:00",
    prioridade: "Normal",
    status: "Agendado",
    observacoes: "Apresentar revisão final do projeto.",
    notificar: true,
  },
  {
    id: 3,
    titulo: "Manutenção de guarda-roupa",
    tipo: "Manutenção",
    cliente: "Felipe Rocha",
    endereco: "Rua dos Ipês, 52",
    responsavel: "Bruno Lima",
    data: "2026-07-25",
    horario: "10:30",
    duracao: "02:00",
    prioridade: "Urgente",
    status: "Agendado",
    observacoes: "Troca de roldanas e alinhamento das portas.",
    notificar: true,
  },
];

function prioridadeClasses(prioridade: Prioridade) {
  if (prioridade === "Urgente") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-400";
  }

  if (prioridade === "Alta") {
    return "border-orange-400/20 bg-orange-400/10 text-orange-400";
  }

  if (prioridade === "Normal") {
    return "border-sky-400/20 bg-sky-400/10 text-sky-400";
  }

  return "border-zinc-400/20 bg-zinc-400/10 text-zinc-400";
}

function statusClasses(status: StatusAgenda) {
  if (status === "Concluído") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";
  }

  if (status === "Em andamento") {
    return "border-sky-400/20 bg-sky-400/10 text-sky-400";
  }

  if (status === "Cancelado") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-400";
  }

  return "border-violet-400/20 bg-violet-400/10 text-violet-400";
}

function formatarData(data: string) {
  if (!data) {
    return "";
  }

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

function obterDataHora(compromisso: Compromisso) {
  return new Date(`${compromisso.data}T${compromisso.horario}:00`);
}

export default function AgendaPage() {
  const [agora, setAgora] = useState(new Date());
  const [compromissos, setCompromissos] =
    useState<Compromisso[]>(compromissosIniciais);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [mensagem, setMensagem] = useState("");

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Reunião");
  const [cliente, setCliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [duracao, setDuracao] = useState("01:00");
  const [prioridade, setPrioridade] =
    useState<Prioridade>("Normal");
  const [observacoes, setObservacoes] = useState("");
  const [notificar, setNotificar] = useState(true);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setAgora(new Date());
    }, 60000);

    return () => window.clearInterval(intervalo);
  }, []);

  const compromissosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return [...compromissos]
      .filter((compromisso) => {
        const correspondeBusca =
          !termo ||
          [
            compromisso.titulo,
            compromisso.tipo,
            compromisso.cliente,
            compromisso.endereco,
            compromisso.responsavel,
          ].some((campo) => campo.toLowerCase().includes(termo));

        const correspondeStatus =
          filtroStatus === "Todos" ||
          compromisso.status === filtroStatus;

        return correspondeBusca && correspondeStatus;
      })
      .sort(
        (a, b) =>
          obterDataHora(a).getTime() - obterDataHora(b).getTime(),
      );
  }, [busca, compromissos, filtroStatus]);

  const notificacoesProximas = compromissos.filter((compromisso) => {
    if (
      !compromisso.notificar ||
      compromisso.status === "Concluído" ||
      compromisso.status === "Cancelado"
    ) {
      return false;
    }

    const diferenca =
      obterDataHora(compromisso).getTime() - agora.getTime();

    return diferenca > 0 && diferenca <= 30 * 60 * 1000;
  });

  const atrasados = compromissos.filter((compromisso) => {
    if (
      compromisso.status === "Concluído" ||
      compromisso.status === "Cancelado"
    ) {
      return false;
    }

    return obterDataHora(compromisso).getTime() < agora.getTime();
  });

  const hojeISO = agora.toISOString().slice(0, 10);

  const compromissosHoje = compromissos.filter(
    (compromisso) => compromisso.data === hojeISO,
  ).length;

  const concluidos = compromissos.filter(
    (compromisso) => compromisso.status === "Concluído",
  ).length;

  function limparFormulario() {
    setTitulo("");
    setTipo("Reunião");
    setCliente("");
    setEndereco("");
    setResponsavel("");
    setData("");
    setHorario("");
    setDuracao("01:00");
    setPrioridade("Normal");
    setObservacoes("");
    setNotificar(true);
  }

  function criarCompromisso(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !titulo.trim() ||
      !responsavel.trim() ||
      !data ||
      !horario
    ) {
      setMensagem(
        "Preencha título, responsável, data e horário.",
      );
      return;
    }

    const novoCompromisso: Compromisso = {
      id: Date.now(),
      titulo: titulo.trim(),
      tipo,
      cliente: cliente.trim() || "Não informado",
      endereco: endereco.trim() || "Não informado",
      responsavel: responsavel.trim(),
      data,
      horario,
      duracao,
      prioridade,
      status: "Agendado",
      observacoes: observacoes.trim(),
      notificar,
    };

    setCompromissos((atuais) => [...atuais, novoCompromisso]);
    setMensagem("Compromisso adicionado à agenda.");
    setMostrarFormulario(false);
    limparFormulario();
  }

  function alterarStatus(id: number, status: StatusAgenda) {
    setCompromissos((atuais) =>
      atuais.map((compromisso) =>
        compromisso.id === id
          ? {
              ...compromisso,
              status,
            }
          : compromisso,
      ),
    );

    setMensagem(`Compromisso marcado como ${status.toLowerCase()}.`);
  }

  function excluirCompromisso(id: number) {
    setCompromissos((atuais) =>
      atuais.filter((compromisso) => compromisso.id !== id),
    );

    setMensagem("Compromisso removido da agenda.");
  }

  function obterSituacaoHorario(compromisso: Compromisso) {
    if (
      compromisso.status === "Concluído" ||
      compromisso.status === "Cancelado"
    ) {
      return null;
    }

    const diferenca =
      obterDataHora(compromisso).getTime() - agora.getTime();

    if (diferenca < 0) {
      return {
        texto: "Horário ultrapassado",
        classe: "text-rose-400",
      };
    }

    if (diferenca <= 30 * 60 * 1000) {
      const minutos = Math.max(
        1,
        Math.ceil(diferenca / (60 * 1000)),
      );

      return {
        texto: `Começa em ${minutos} min`,
        classe: "text-amber-400",
      };
    }

    return null;
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
              Agenda
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Organize visitas, reuniões, instalações, entregas,
              manutenções e tarefas da equipe.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMostrarFormulario((estado) => !estado)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
          >
            <Plus size={18} />
            Novo compromisso
          </button>
        </header>

        {mensagem && (
          <div className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
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

        {notificacoesProximas.length > 0 && (
          <section className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-amber-400/15 p-3 text-amber-400">
                <Bell size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-amber-300">
                  Compromisso próximo
                </h2>

                {notificacoesProximas.map((compromisso) => (
                  <p
                    key={compromisso.id}
                    className="mt-2 text-sm leading-6 text-amber-200/80"
                  >
                    {compromisso.titulo}, às {compromisso.horario},
                    com {compromisso.cliente}.
                  </p>
                ))}

                <p className="mt-2 text-xs text-amber-300/60">
                  Aviso automático de 30 minutos de antecedência.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-5 rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
              <CalendarDays size={20} />
            </div>

            <p className="text-sm text-zinc-400">Compromissos hoje</p>
            <p className="mt-2 text-3xl font-semibold">
              {compromissosHoje}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Atividades programadas
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-5 rounded-xl bg-amber-400/10 p-3 text-amber-400">
              <Bell size={20} />
            </div>

            <p className="text-sm text-zinc-400">Alertas próximos</p>
            <p className="mt-2 text-3xl font-semibold">
              {notificacoesProximas.length}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Dentro de 30 minutos
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-5 rounded-xl bg-rose-400/10 p-3 text-rose-400">
              <AlertCircle size={20} />
            </div>

            <p className="text-sm text-zinc-400">Atrasados</p>
            <p className="mt-2 text-3xl font-semibold">
              {atrasados.length}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Precisam de atenção
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-5 rounded-xl bg-sky-400/10 p-3 text-sky-400">
              <CheckCircle2 size={20} />
            </div>

            <p className="text-sm text-zinc-400">Concluídos</p>
            <p className="mt-2 text-3xl font-semibold">
              {concluidos}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Atividades finalizadas
            </p>
          </article>
        </section>

        {mostrarFormulario && (
          <form
            onSubmit={criarCompromisso}
            className="mb-8 rounded-2xl border border-emerald-400/20 bg-white/[0.035] p-5 md:p-6"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Novo compromisso
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Cadastre uma atividade e defina sua prioridade.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Título
                </span>

                <input
                  type="text"
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                  placeholder="Ex.: Visita para medição"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Tipo
                </span>

                <select
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
                >
                  <option>Reunião</option>
                  <option>Medidas</option>
                  <option>Instalação</option>
                  <option>Manutenção</option>
                  <option>Entrega</option>
                  <option>Produção</option>
                  <option>Tarefa interna</option>
                </select>
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Prioridade
                </span>

                <select
                  value={prioridade}
                  onChange={(event) =>
                    setPrioridade(event.target.value as Prioridade)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Cliente
                </span>

                <input
                  type="text"
                  value={cliente}
                  onChange={(event) => setCliente(event.target.value)}
                  placeholder="Nome do cliente"
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
                  Local
                </span>

                <input
                  type="text"
                  value={endereco}
                  onChange={(event) => setEndereco(event.target.value)}
                  placeholder="Endereço ou local"
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
                  onChange={(event) => setData(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Horário
                </span>

                <input
                  type="time"
                  value={horario}
                  onChange={(event) => setHorario(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm text-zinc-300">
                  Duração estimada
                </span>

                <input
                  type="time"
                  value={duracao}
                  onChange={(event) => setDuracao(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm text-zinc-300">
                Observações
              </span>

              <textarea
                rows={4}
                value={observacoes}
                onChange={(event) =>
                  setObservacoes(event.target.value)
                }
                placeholder="Materiais necessários, instruções, contatos ou detalhes importantes..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
              />
            </label>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
              <input
                type="checkbox"
                checked={notificar}
                onChange={(event) =>
                  setNotificar(event.target.checked)
                }
                className="h-4 w-4 accent-emerald-400"
              />

              <Bell size={18} className="text-emerald-400" />

              <div>
                <p className="text-sm text-zinc-200">
                  Avisar 30 minutos antes
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Exibe um alerta quando o horário estiver próximo.
                </p>
              </div>
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
              >
                <Plus size={18} />
                Adicionar à agenda
              </button>

              <button
                type="button"
                onClick={limparFormulario}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300 transition hover:bg-white/10"
              >
                Limpar formulário
              </button>
            </div>
          </form>
        )}

        <section className="rounded-2xl border border-white/10 bg-white/[0.035]">
          <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Próximos compromissos
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Acompanhe horários, prioridades e responsáveis.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <Search size={17} className="text-zinc-500" />

                <input
                  type="search"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Buscar compromisso"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600 sm:w-56"
                />
              </label>

              <select
                value={filtroStatus}
                onChange={(event) =>
                  setFiltroStatus(event.target.value)
                }
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Agendado">Agendados</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluídos</option>
                <option value="Cancelado">Cancelados</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 p-5 lg:grid-cols-2">
            {compromissosFiltrados.map((compromisso) => {
              const situacaoHorario =
                obterSituacaoHorario(compromisso);

              return (
                <article
                  key={compromisso.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-emerald-400">
                        {compromisso.tipo}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold">
                        {compromisso.titulo}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs ${prioridadeClasses(
                          compromisso.prioridade,
                        )}`}
                      >
                        {compromisso.prioridade}
                      </span>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs ${statusClasses(
                          compromisso.status,
                        )}`}
                      >
                        {compromisso.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <CalendarDays
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <div>
                        <p className="text-sm text-zinc-300">
                          {formatarData(compromisso.data)}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {compromisso.horario} • duração{" "}
                          {compromisso.duracao}
                        </p>

                        {situacaoHorario && (
                          <p
                            className={`mt-2 text-xs font-medium ${situacaoHorario.classe}`}
                          >
                            {situacaoHorario.texto}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <UserRound
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <div>
                        <p className="text-sm text-zinc-300">
                          {compromisso.responsavel}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Responsável
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <UserRound
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <div>
                        <p className="text-sm text-zinc-300">
                          {compromisso.cliente}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Cliente
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <p className="text-sm leading-6 text-zinc-400">
                        {compromisso.endereco}
                      </p>
                    </div>
                  </div>

                  {compromisso.observacoes && (
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-zinc-600">
                        Observações
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {compromisso.observacoes}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    {compromisso.status === "Agendado" && (
                      <button
                        type="button"
                        onClick={() =>
                          alterarStatus(
                            compromisso.id,
                            "Em andamento",
                          )
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-400 transition hover:bg-sky-400/20"
                      >
                        <Clock3 size={17} />
                        Iniciar
                      </button>
                    )}

                    {compromisso.status !== "Concluído" &&
                      compromisso.status !== "Cancelado" && (
                        <button
                          type="button"
                          onClick={() =>
                            alterarStatus(
                              compromisso.id,
                              "Concluído",
                            )
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-400 transition hover:bg-emerald-400/20"
                        >
                          <CheckCircle2 size={17} />
                          Concluir
                        </button>
                      )}

                    <button
                      type="button"
                      onClick={() =>
                        excluirCompromisso(compromisso.id)
                      }
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400 transition hover:border-rose-400/20 hover:bg-rose-400/10 hover:text-rose-400"
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
