"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  CalendarPlus,
  LoaderCircle,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Trash2,
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

const emptyForm: CreateCustomerInput = {
  name: "",
  document: "",
  type: "PF",
  phone: "",
  email: "",
  city: "",
  state: "",
  status: "prospecto",
};


function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export default function ClientsPage() {
  const {
    customers,
    dashboard,
    isLoading,
    isSaving,
    deletingId,
    error,
    addCustomer,
    editCustomer,
    removeCustomer,
    reload,
  } = useCustomers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "todos">(
    "todos",
  );
  const [typeFilter, setTypeFilter] = useState<CustomerPersonType | "todos">(
    "todos",
  );
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = normalizeSearchValue(search);

    return customers.filter((customer) => {
      const searchableContent = normalizeSearchValue(
        [
          customer.name,
          customer.document,
          customer.email,
          customer.phone,
          customer.city,
          customer.state,
        ].join(" "),
      );

      const matchesSearch =
        !normalizedSearch || searchableContent.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "todos" || customer.status === statusFilter;
      const matchesType = typeFilter === "todos" || customer.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [customers, search, statusFilter, typeFilter]);

  function openCreateForm() {
    setEditingCustomer(null);
    setFormError(null);
    setIsFormOpen(true);
  }

  function openEditForm(customer: Customer) {
    setEditingCustomer(customer);
    setFormError(null);
    setIsFormOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const form = new FormData(event.currentTarget);
    const input: CreateCustomerInput = {
      name: String(form.get("name") ?? "").trim(),
      document: String(form.get("document") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      city: String(form.get("city") ?? "").trim(),
      state: String(form.get("state") ?? "").trim().toUpperCase(),
      type: String(form.get("type") ?? "PF") as CustomerPersonType,
      status: String(form.get("status") ?? "prospecto") as CustomerStatus,
    };

    if (!input.name || !input.document || !input.phone) {
      setFormError("Preencha nome, CPF/CNPJ e telefone.");
      return;
    }

    const documentDigits = onlyDigits(input.document);
    const phoneDigits = onlyDigits(input.phone);

    if (input.type === "PF" && documentDigits.length !== 11) {
      setFormError("O CPF deve conter 11 números.");
      return;
    }

    if (input.type === "PJ" && documentDigits.length !== 14) {
      setFormError("O CNPJ deve conter 14 números.");
      return;
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setFormError("Informe um telefone válido com DDD.");
      return;
    }

    if (input.state && input.state.length !== 2) {
      setFormError("A UF deve conter exatamente 2 letras.");
      return;
    }

    try {
      if (editingCustomer) {
        await editCustomer({ id: editingCustomer.id, ...input });
      } else {
        await addCustomer(input);
      }

      setIsFormOpen(false);
      setEditingCustomer(null);
    } catch (submitError) {
      setFormError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível concluir o cadastro.",
      );
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      await removeCustomer(deleteTarget.id);
      setDeleteTarget(null);
    } catch {
      // O erro global do hook já é exibido na tela.
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
              Cadastre, pesquise, edite e acompanhe os clientes da Infinity
              House em um único lugar.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#4f8cff] px-5 text-sm font-medium text-white shadow-[0_12px_35px_rgba(79,140,255,0.25)] transition-transform active:scale-[0.98]"
          >
            <Plus size={17} />
            Novo cliente
          </button>
        </div>

        {error && (
          <div className="flex flex-col gap-3 rounded-[22px] border border-red-400/15 bg-red-400/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-300" />
              <div>
                <strong className="block text-sm font-medium text-red-200">
                  Operação não concluída
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
              Recarregar
            </button>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Cadastrados" value={dashboard.total} icon={Users} />
          <MetricCard label="Ativos" value={dashboard.active} icon={UserRound} />
          <MetricCard label="Prospectos" value={dashboard.prospects} icon={Search} />
          <MetricCard label="Inativos" value={dashboard.inactive} icon={Building2} />
          <MetricCard
            label="Novos no mês"
            value={dashboard.newThisMonth}
            icon={CalendarPlus}
          />
        </div>

        <div className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-white/[0.025] shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
          <div className="grid gap-3 border-b border-white/[0.06] p-4 lg:grid-cols-[minmax(0,1fr)_190px_170px_auto]">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar nome, documento, telefone, e-mail ou cidade..."
                className="h-11 w-full rounded-2xl border border-white/[0.07] bg-black/25 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#4f8cff]/50"
              />
            </div>

            <FilterSelect
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter(value as CustomerStatus | "todos")
              }
              options={[
                ["todos", "Todos os status"],
                ["ativo", "Ativos"],
                ["prospecto", "Prospectos"],
                ["inativo", "Inativos"],
              ]}
            />

            <FilterSelect
              value={typeFilter}
              onChange={(value) =>
                setTypeFilter(value as CustomerPersonType | "todos")
              }
              options={[
                ["todos", "Todos os tipos"],
                ["PF", "Pessoa física"],
                ["PJ", "Pessoa jurídica"],
              ]}
            />

            <button
              type="button"
              onClick={() => void reload()}
              disabled={isLoading}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/[0.07] px-4 text-xs text-white/50 disabled:opacity-40"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              Atualizar
            </button>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {isLoading ? (
              <LoadingState />
            ) : filteredCustomers.length ? (
              filteredCustomers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  deleting={deletingId === customer.id}
                  onEdit={() => openEditForm(customer)}
                  onDelete={() => setDeleteTarget(customer)}
                />
              ))
            ) : (
              <EmptyState hasFilters={Boolean(search) || statusFilter !== "todos" || typeFilter !== "todos"} />
            )}
          </div>

          {!isLoading && filteredCustomers.length > 0 && (
            <div className="border-t border-white/[0.06] px-5 py-3 text-[11px] text-white/25">
              Exibindo {filteredCustomers.length} de {customers.length} clientes
            </div>
          )}
        </div>
      </section>

      {isFormOpen && (
        <CustomerFormModal
          customer={editingCustomer}
          isSaving={isSaving}
          error={formError}
          onClose={() => !isSaving && setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          customer={deleteTarget}
          isDeleting={deletingId === deleteTarget.id}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => void handleDelete()}
        />
      )}
    </ModuleShell>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
}) {
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

function CustomerRow({
  customer,
  deleting,
  onEdit,
  onDelete,
}: {
  customer: Customer;
  deleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const location = [customer.city, customer.state].filter(Boolean).join(" - ");

  return (
    <article className="grid gap-4 p-4 transition-colors hover:bg-white/[0.025] sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto] sm:items-center sm:p-5">
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#4f8cff]/20 bg-[#4f8cff]/10 text-[#4f8cff]">
          {customer.type === "PJ" ? <Building2 size={19} /> : <UserRound size={19} />}
        </span>
        <div className="min-w-0">
          <strong className="block truncate text-sm font-medium text-white/85">
            {customer.name}
          </strong>
          <span className="mt-1 block text-[10px] text-white/25">
            {customer.type} · {customer.document || "Sem documento"}
          </span>
          <span
            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${
              customer.status === "ativo"
                ? "bg-emerald-400/10 text-emerald-300"
                : customer.status === "prospecto"
                  ? "bg-amber-400/10 text-amber-300"
                  : "bg-white/[0.05] text-white/30"
            }`}
          >
            {statusLabels[customer.status]}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 text-[11px] text-white/35">
        <span className="flex items-center gap-2">
          <Phone size={12} /> {customer.phone || "Telefone não informado"}
        </span>
        <span className="flex items-center gap-2 truncate">
          <Mail size={12} /> {customer.email || "E-mail não informado"}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={12} /> {location || "Cidade não informada"}
        </span>
      </div>

      <div className="flex justify-end gap-2">
        <IconButton label="Editar cliente" onClick={onEdit} icon={Pencil} />
        <IconButton
          label="Excluir cliente"
          onClick={onDelete}
          icon={deleting ? LoaderCircle : Trash2}
          danger
          spinning={deleting}
        />
      </div>
    </article>
  );
}

function CustomerFormModal({
  customer,
  isSaving,
  error,
  onClose,
  onSubmit,
}: {
  customer: Customer | null;
  isSaving: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const initial = customer
    ? {
        name: customer.name,
        document: customer.document,
        type: customer.type,
        phone: customer.phone,
        email: customer.email,
        city: customer.city,
        state: customer.state,
        status: customer.status,
      }
    : emptyForm;

  return (
    <ModalFrame onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#4f8cff]">
            {customer ? "Editar cadastro" : "Novo cadastro"}
          </span>
          <h3 className="mt-2 text-xl font-medium text-white">
            {customer ? customer.name : "Adicionar cliente"}
          </h3>
          <p className="mt-1 text-xs text-white/30">
            Os dados serão salvos diretamente no Supabase.
          </p>
        </div>
        <button
          type="button"
          disabled={isSaving}
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-white/45 disabled:opacity-40"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          label="Nome ou razão social"
          defaultValue={initial.name}
          placeholder="Digite o nome completo"
          required
          disabled={isSaving}
          className="sm:col-span-2"
        />

        <SelectField
          name="type"
          label="Tipo de pessoa"
          defaultValue={initial.type}
          disabled={isSaving}
          options={[
            ["PF", "Pessoa física"],
            ["PJ", "Pessoa jurídica"],
          ]}
        />

        <FormField
          name="document"
          label="CPF ou CNPJ"
          defaultValue={initial.document}
          placeholder="Documento"
          required
          disabled={isSaving}
        />

        <FormField
          name="phone"
          label="Telefone / WhatsApp"
          defaultValue={initial.phone}
          placeholder="(00) 00000-0000"
          required
          disabled={isSaving}
        />

        <FormField
          name="email"
          label="E-mail"
          defaultValue={initial.email}
          placeholder="cliente@exemplo.com"
          type="email"
          disabled={isSaving}
        />

        <FormField
          name="city"
          label="Cidade"
          defaultValue={initial.city}
          placeholder="Rio Verde"
          disabled={isSaving}
        />

        <FormField
          name="state"
          label="UF"
          defaultValue={initial.state}
          placeholder="GO"
          maxLength={2}
          disabled={isSaving}
        />

        <SelectField
          name="status"
          label="Status"
          defaultValue={initial.status}
          disabled={isSaving}
          options={[
            ["prospecto", "Prospecto"],
            ["ativo", "Ativo"],
            ["inativo", "Inativo"],
          ]}
          className="sm:col-span-2"
        />

        {error && (
          <div className="flex items-start gap-2 rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-3 text-xs text-red-200 sm:col-span-2">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-3 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={isSaving}
            onClick={onClose}
            className="h-11 rounded-2xl border border-white/[0.08] px-5 text-sm text-white/45 disabled:opacity-40"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#4f8cff] px-6 text-sm font-medium text-white disabled:cursor-wait disabled:opacity-65"
          >
            {isSaving && <LoaderCircle size={16} className="animate-spin" />}
            {isSaving ? "Salvando..." : customer ? "Salvar alterações" : "Salvar cliente"}
          </button>
        </div>
      </form>
    </ModalFrame>
  );
}

function DeleteModal({
  customer,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  customer: Customer;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalFrame onClose={() => !isDeleting && onCancel()} compact>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
        <Trash2 size={20} />
      </span>
      <h3 className="mt-5 text-xl font-medium text-white">Excluir cliente?</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/40">
        O cadastro de <strong className="text-white/75">{customer.name}</strong>{" "}
        será removido. Esta ação não pode ser desfeita.
      </p>
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={isDeleting}
          onClick={onCancel}
          className="h-11 rounded-2xl border border-white/[0.08] px-5 text-sm text-white/45 disabled:opacity-40"
        >
          Cancelar
        </button>
        <button
          type="button"
          disabled={isDeleting}
          onClick={onConfirm}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 text-sm font-medium text-white disabled:opacity-60"
        >
          {isDeleting && <LoaderCircle size={16} className="animate-spin" />}
          {isDeleting ? "Excluindo..." : "Excluir cliente"}
        </button>
      </div>
    </ModalFrame>
  );
}

function ModalFrame({
  children,
  onClose,
  compact = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  compact?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-5">
      <button type="button" aria-label="Fechar janela" onClick={onClose} className="absolute inset-0" />
      <div
        className={`relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-[30px] border border-white/[0.08] bg-[#0b0b0b] p-5 shadow-2xl sm:rounded-[30px] sm:p-7 ${
          compact ? "sm:max-w-md" : "sm:max-w-2xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FormField({
  name,
  label,
  placeholder,
  defaultValue,
  type = "text",
  required = false,
  disabled = false,
  className = "",
  maxLength,
}: {
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}) {
  return (
    <label className={`space-y-2 ${className}`}>
      <span className="text-xs text-white/45">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        className="h-12 w-full rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#4f8cff]/50 disabled:opacity-50"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  defaultValue,
  options,
  disabled,
  className = "",
}: {
  name: string;
  label: string;
  defaultValue: string;
  options: Array<[string, string]>;
  disabled: boolean;
  className?: string;
}) {
  return (
    <label className={`space-y-2 ${className}`}>
      <span className="text-xs text-white/45">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="h-12 w-full rounded-2xl border border-white/[0.07] bg-[#101010] px-4 text-sm text-white outline-none focus:border-[#4f8cff]/50 disabled:opacity-50"
      >
        {options.map(([value, optionLabel]) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 rounded-2xl border border-white/[0.07] bg-[#0c0c0c] px-4 text-sm text-white/60 outline-none"
    >
      {options.map(([optionValue, optionLabel]) => (
        <option key={optionValue} value={optionValue}>
          {optionLabel}
        </option>
      ))}
    </select>
  );
}

function IconButton({
  label,
  onClick,
  icon: Icon,
  danger = false,
  spinning = false,
}: {
  label: string;
  onClick: () => void;
  icon: typeof Pencil;
  danger?: boolean;
  spinning?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
        danger
          ? "border-red-400/10 bg-red-400/[0.05] text-red-300 hover:bg-red-400/10"
          : "border-white/[0.07] bg-white/[0.03] text-white/40 hover:text-white/70"
      }`}
    >
      <Icon size={15} className={spinning ? "animate-spin" : ""} />
    </button>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center">
      <LoaderCircle size={30} className="animate-spin text-[#4f8cff]" />
      <strong className="mt-4 text-sm font-medium text-white/60">Carregando clientes</strong>
      <span className="mt-1 text-xs text-white/25">Buscando os dados no Supabase.</span>
    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center px-4 text-center">
      <Users size={30} className="text-white/15" />
      <strong className="mt-4 text-sm font-medium text-white/60">
        {hasFilters ? "Nenhum resultado encontrado" : "Nenhum cliente cadastrado"}
      </strong>
      <span className="mt-1 text-xs text-white/25">
        {hasFilters ? "Altere os filtros para ampliar a busca." : "Use o botão Novo cliente para começar."}
      </span>
    </div>
  );
}
