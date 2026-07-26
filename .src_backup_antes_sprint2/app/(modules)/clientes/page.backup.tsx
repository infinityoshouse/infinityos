"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { ModuleShell } from "@/components/layout/ModuleShell";

type ClientStatus = "ativo" | "prospecto" | "inativo";
type ClientType = "PF" | "PJ";

type Client = {
  id: string;
  name: string;
  document: string;
  type: ClientType;
  phone: string;
  email: string;
  city: string;
  status: ClientStatus;
  projects: number;
};

const initialClients: Client[] = [
  {
    id: "cli-001",
    name: "Carlos Henrique Almeida",
    document: "123.456.789-00",
    type: "PF",
    phone: "(11) 99999-1001",
    email: "carlos@exemplo.com",
    city: "São Paulo - SP",
    status: "ativo",
    projects: 2,
  },
  {
    id: "cli-002",
    name: "Arquitetura Essencial Ltda.",
    document: "12.345.678/0001-90",
    type: "PJ",
    phone: "(11) 98888-2040",
    email: "contato@arquiteturaessencial.com",
    city: "Campinas - SP",
    status: "prospecto",
    projects: 1,
  },
  {
    id: "cli-003",
    name: "Mariana Souza",
    document: "987.654.321-00",
    type: "PF",
    phone: "(19) 97777-3020",
    email: "mariana@exemplo.com",
    city: "Jundiaí - SP",
    status: "ativo",
    projects: 3,
  },
];

const statusLabels: Record<ClientStatus, string> = {
  ativo: "Ativo",
  prospecto: "Prospecto",
  inativo: "Inativo",
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    ClientStatus | "todos"
  >("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesStatus =
        statusFilter === "todos" || client.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        client.name.toLowerCase().includes(normalizedSearch) ||
        client.document.toLowerCase().includes(normalizedSearch) ||
        client.email.toLowerCase().includes(normalizedSearch) ||
        client.phone.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [clients, search, statusFilter]);

  const activeClients = clients.filter(
    (client) => client.status === "ativo",
  ).length;

  const prospects = clients.filter(
    (client) => client.status === "prospecto",
  ).length;

  const projects = clients.reduce(
    (total, client) => total + client.projects,
    0,
  );

  function handleCreateClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") ?? "").trim();
    const document = String(form.get("document") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const type = String(form.get("type") ?? "PF") as ClientType;

    if (!name || !document || !phone) {
      return;
    }

    const newClient: Client = {
      id: crypto.randomUUID(),
      name,
      document,
      type,
      phone,
      email,
      city,
      status: "prospecto",
      projects: 0,
    };

    setClients((currentClients) => [
      newClient,
      ...currentClients,
    ]);

    setIsModalOpen(false);
    event.currentTarget.reset();
  }

  return (
    <ModuleShell
      title="Clientes"
      description="Cadastro, relacionamento e histórico comercial"
      color="#4f8cff"
    >
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#4f8cff]">
              CRM
            </span>

            <h2 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Central de clientes
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/35">
              Gerencie clientes, contatos, projetos e todo o histórico
              comercial da marcenaria.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#4f8cff] px-5 text-sm font-medium text-white shadow-[0_12px_35px_rgba(79,140,255,0.25)] transition-transform active:scale-[0.98]"
          >
            <Plus size={17} />
            Novo cliente
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Clientes cadastrados"
            value={clients.length}
            icon={Users}
          />

          <MetricCard
            label="Clientes ativos"
            value={activeClients}
            icon={UserRound}
          />

          <MetricCard
            label="Prospectos"
            value={prospects}
            icon={Search}
          />

          <MetricCard
            label="Projetos vinculados"
            value={projects}
            icon={Building2}
          />
        </div>

        <div className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-white/[0.025] shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
          <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nome, CPF, CNPJ, telefone..."
                className="h-11 w-full rounded-2xl border border-white/[0.07] bg-black/25 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#4f8cff]/50"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as ClientStatus | "todos",
                )
              }
              className="h-11 rounded-2xl border border-white/[0.07] bg-[#0c0c0c] px-4 text-sm text-white/60 outline-none"
            >
              <option value="todos">Todos os status</option>
              <option value="ativo">Ativos</option>
              <option value="prospecto">Prospectos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))
            ) : (
              <div className="flex min-h-52 flex-col items-center justify-center px-4 text-center">
                <Users size={30} className="text-white/15" />

                <strong className="mt-4 text-sm font-medium text-white/60">
                  Nenhum cliente encontrado
                </strong>

                <span className="mt-1 text-xs text-white/25">
                  Altere os filtros ou cadastre um novo cliente.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-5">
          <button
            type="button"
            aria-label="Fechar cadastro"
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0"
          />

          <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-[30px] border border-white/[0.08] bg-[#0b0b0b] p-5 shadow-2xl sm:max-w-2xl sm:rounded-[30px] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#4f8cff]">
                  Novo cadastro
                </span>

                <h3 className="mt-2 text-xl font-medium text-white">
                  Adicionar cliente
                </h3>

                <p className="mt-1 text-xs text-white/30">
                  Os dados poderão ser complementados posteriormente.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-white/45"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleCreateClient}
              className="mt-7 grid gap-4 sm:grid-cols-2"
            >
              <FormField
                name="name"
                label="Nome ou razão social"
                placeholder="Digite o nome completo"
                required
                className="sm:col-span-2"
              />

              <label className="space-y-2">
                <span className="text-xs text-white/45">
                  Tipo de pessoa
                </span>

                <select
                  name="type"
                  className="h-12 w-full rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 text-sm text-white outline-none focus:border-[#4f8cff]/50"
                >
                  <option value="PF">Pessoa física</option>
                  <option value="PJ">Pessoa jurídica</option>
                </select>
              </label>

              <FormField
                name="document"
                label="CPF ou CNPJ"
                placeholder="Documento"
                required
              />

              <FormField
                name="phone"
                label="Telefone"
                placeholder="(00) 00000-0000"
                required
              />

              <FormField
                name="email"
                label="E-mail"
                placeholder="cliente@exemplo.com"
                type="email"
              />

              <FormField
                name="city"
                label="Cidade"
                placeholder="Cidade - UF"
                className="sm:col-span-2"
              />

              <div className="mt-3 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-11 rounded-2xl border border-white/[0.08] px-5 text-sm text-white/45"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="h-11 rounded-2xl bg-[#4f8cff] px-6 text-sm font-medium text-white"
                >
                  Salvar cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModuleShell>
  );
}

type MetricCardProps = {
  label: string;
  value: number;
  icon: typeof Users;
};

function MetricCard({
  label,
  value,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="rounded-[22px] border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-2xl">
      <div className="flex items-start justify-between">
        <span className="text-xs text-white/30">{label}</span>

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4f8cff]/10 text-[#4f8cff]">
          <Icon size={17} strokeWidth={1.6} />
        </span>
      </div>

      <strong className="mt-5 block text-3xl font-medium tracking-tight text-white">
        {value}
      </strong>
    </div>
  );
}

function ClientRow({ client }: { client: Client }) {
  return (
    <button
      type="button"
      className="grid w-full gap-4 p-4 text-left transition-colors hover:bg-white/[0.025] sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] sm:items-center sm:p-5"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#4f8cff]/20 bg-[#4f8cff]/10 text-[#4f8cff]">
          {client.type === "PJ" ? (
            <Building2 size={19} strokeWidth={1.6} />
          ) : (
            <UserRound size={19} strokeWidth={1.6} />
          )}
        </span>

        <span className="min-w-0">
          <strong className="block truncate text-sm font-medium text-white/85">
            {client.name}
          </strong>

          <span className="mt-1 block text-[10px] text-white/25">
            {client.type} · {client.document}
          </span>
        </span>
      </div>

      <div className="space-y-1.5 text-[11px] text-white/35">
        <span className="flex items-center gap-2">
          <Phone size={12} />
          {client.phone}
        </span>

        <span className="flex items-center gap-2 truncate">
          <Mail size={12} />
          {client.email || "E-mail não informado"}
        </span>

        <span className="flex items-center gap-2">
          <MapPin size={12} />
          {client.city || "Cidade não informada"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-medium ${
            client.status === "ativo"
              ? "bg-emerald-400/10 text-emerald-300"
              : client.status === "prospecto"
                ? "bg-amber-400/10 text-amber-300"
                : "bg-white/[0.05] text-white/30"
          }`}
        >
          {statusLabels[client.status]}
        </span>

        <span className="text-[10px] text-white/25">
          {client.projects}{" "}
          {client.projects === 1 ? "projeto" : "projetos"}
        </span>
      </div>
    </button>
  );
}

type FormFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
};

function FormField({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  className = "",
}: FormFieldProps) {
  return (
    <label className={`space-y-2 ${className}`}>
      <span className="text-xs text-white/45">{label}</span>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/18 focus:border-[#4f8cff]/50"
      />
    </label>
  );

}
