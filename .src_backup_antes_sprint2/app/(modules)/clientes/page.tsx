"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { ModuleShell } from "@/components/layout/ModuleShell";
import { useCustomers } from "@/modules/clientes/hooks/useCustomers";
import type {
  CreateCustomerInput,
  Customer,
  CustomerPersonType,
  CustomerStatus,
} from "@/modules/clientes/types/customer.types";

const statusLabels: Record<CustomerStatus, string> = {
  ativo: "Ativo",
  prospecto: "Prospecto",
  inativo: "Inativo",
};

export default function ClientsPage() {
  const {
    customers,
    isLoading,
    isSaving,
    error,
    addCustomer,
    reload,
  } = useCustomers();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    CustomerStatus | "todos"
  >("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesStatus =
        statusFilter === "todos" || customer.status === statusFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        customer.name.toLowerCase().includes(normalizedSearch) ||
        customer.document.toLowerCase().includes(normalizedSearch) ||
        customer.email.toLowerCase().includes(normalizedSearch) ||
        customer.phone.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [customers, search, statusFilter]);

  const activeCustomers = customers.filter(
    (customer) => customer.status === "ativo",
  ).length;

  const prospects = customers.filter(
    (customer) => customer.status === "prospecto",
  ).length;

  const projects = customers.reduce(
    (total, customer) => total + customer.projects,
    0,
  );

  async function handleCreateCustomer(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setFormError(null);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const input: CreateCustomerInput = {
      name: String(form.get("name") ?? "").trim(),
      document: String(form.get("document") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      city: String(form.get("city") ?? "").trim(),
      type: String(form.get("type") ?? "PF") as CustomerPersonType,
    };

    if (!input.name || !input.document || !input.phone) {
      setFormError("Preencha nome, CPF/CNPJ e telefone.");
      return;
    }

    try {
      await addCustomer(input);
      formElement.reset();
      setIsModalOpen(false);
    } catch (saveError) {
      setFormError(
        saveError instanceof Error
          ? saveError.message
          : "Não foi possível salvar o cliente.",
      );
    }
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
            onClick={() => {
              setFormError(null);
              setIsModalOpen(true);
            }}
            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#4f8cff] px-5 text-sm font-medium text-white shadow-[0_12px_35px_rgba(79,140,255,0.25)] transition-transform active:scale-[0.98]"
          >
            <Plus size={17} />
            Novo cliente
          </button>
        </div>

        {error && (
          <div className="flex flex-col gap-3 rounded-[22px] border border-red-400/15 bg-red-400/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0 text-red-300"
              />
              <div>
                <strong className="block text-sm font-medium text-red-200">
                  Falha na conexão com o banco
                </strong>
                <span className="mt-1 block text-xs text-red-200/55">
                  {error}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void reload()}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-red-300/15 px-4 text-xs font-medium text-red-100"
            >
              <RefreshCw size={14} />
              Tentar novamente
            </button>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Clientes cadastrados"
            value={customers.length}
            icon={Users}
          />

          <MetricCard
            label="Clientes ativos"
            value={activeCustomers}
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
                  event.target.value as CustomerStatus | "todos",
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
            {isLoading ? (
              <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-[#4f8cff]"
                />
                <strong className="mt-4 text-sm font-medium text-white/60">
                  Carregando clientes
                </strong>
                <span className="mt-1 text-xs text-white/25">
                  Buscando os dados no Supabase.
                </span>
              </div>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
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
            onClick={() => !isSaving && setIsModalOpen(false)}
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
                  O cadastro será salvo diretamente no Supabase.
                </p>
              </div>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => setIsModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-white/45 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleCreateCustomer}
              className="mt-7 grid gap-4 sm:grid-cols-2"
            >
              <FormField
                name="name"
                label="Nome ou razão social"
                placeholder="Digite o nome completo"
                required
                disabled={isSaving}
                className="sm:col-span-2"
              />

              <label className="space-y-2">
                <span className="text-xs text-white/45">
                  Tipo de pessoa
                </span>

                <select
                  name="type"
                  disabled={isSaving}
                  className="h-12 w-full rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 text-sm text-white outline-none focus:border-[#4f8cff]/50 disabled:cursor-not-allowed disabled:opacity-50"
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
                disabled={isSaving}
              />

              <FormField
                name="phone"
                label="Telefone"
                placeholder="(00) 00000-0000"
                required
                disabled={isSaving}
              />

              <FormField
                name="email"
                label="E-mail"
                placeholder="cliente@exemplo.com"
                type="email"
                disabled={isSaving}
              />

              <FormField
                name="city"
                label="Cidade"
                placeholder="Cidade - UF"
                disabled={isSaving}
                className="sm:col-span-2"
              />

              {formError && (
                <div className="flex items-start gap-2 rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-3 text-xs text-red-200 sm:col-span-2">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="mt-3 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsModalOpen(false)}
                  className="h-11 rounded-2xl border border-white/[0.08] px-5 text-sm text-white/45 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#4f8cff] px-6 text-sm font-medium text-white disabled:cursor-wait disabled:opacity-65"
                >
                  {isSaving && (
                    <LoaderCircle size={16} className="animate-spin" />
                  )}
                  {isSaving ? "Salvando..." : "Salvar cliente"}
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

function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <button
      type="button"
      className="grid w-full gap-4 p-4 text-left transition-colors hover:bg-white/[0.025] sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] sm:items-center sm:p-5"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#4f8cff]/20 bg-[#4f8cff]/10 text-[#4f8cff]">
          {customer.type === "PJ" ? (
            <Building2 size={19} strokeWidth={1.6} />
          ) : (
            <UserRound size={19} strokeWidth={1.6} />
          )}
        </span>

        <span className="min-w-0">
          <strong className="block truncate text-sm font-medium text-white/85">
            {customer.name}
          </strong>

          <span className="mt-1 block text-[10px] text-white/25">
            {customer.type} · {customer.document || "Sem documento"}
          </span>
        </span>
      </div>

      <div className="space-y-1.5 text-[11px] text-white/35">
        <span className="flex items-center gap-2">
          <Phone size={12} />
          {customer.phone || "Telefone não informado"}
        </span>

        <span className="flex items-center gap-2 truncate">
          <Mail size={12} />
          {customer.email || "E-mail não informado"}
        </span>

        <span className="flex items-center gap-2">
          <MapPin size={12} />
          {customer.city || "Cidade não informada"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-medium ${
            customer.status === "ativo"
              ? "bg-emerald-400/10 text-emerald-300"
              : customer.status === "prospecto"
                ? "bg-amber-400/10 text-amber-300"
                : "bg-white/[0.05] text-white/30"
          }`}
        >
          {statusLabels[customer.status]}
        </span>

        <span className="text-[10px] text-white/25">
          {customer.projects}{" "}
          {customer.projects === 1 ? "projeto" : "projetos"}
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
  disabled?: boolean;
  className?: string;
};

function FormField({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
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
        disabled={disabled}
        className="h-12 w-full rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#4f8cff]/50 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </label>
  );
}
