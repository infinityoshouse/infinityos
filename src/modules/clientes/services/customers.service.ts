import { supabase } from "@/lib/supabase/client";

import type {
  CreateCustomerInput,
  Customer,
  CustomerPersonType,
  CustomerRow,
  CustomerStatus,
  UpdateCustomerInput,
} from "@/modules/clientes/types/customer.types";

const CUSTOMER_SELECT =
  "id,name,cpf_cnpj,person_type,document_type,phone,whatsapp,email,city,state,status,created_at,updated_at";

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeStatus(status: string | null): CustomerStatus {
  const normalized = status?.trim().toLowerCase();

  if (normalized === "ativo") return "ativo";
  if (normalized === "inativo") return "inativo";
  return "prospecto";
}

function normalizePersonType(
  personType: string | null,
  document: string | null,
): CustomerPersonType {
  const normalized = personType?.trim().toUpperCase();

  if (normalized === "PJ" || normalized === "JURIDICA") return "PJ";
  if (normalized === "PF" || normalized === "FISICA") return "PF";

  return onlyDigits(document ?? "").length === 14 ? "PJ" : "PF";
}

function splitCityAndState(cityValue: string, explicitState?: string) {
  const state = explicitState?.trim().toUpperCase() || "";
  const city = cityValue.trim();

  if (state) {
    return { city: city || null, state };
  }

  const match = city.match(/^(.*?)(?:\s*-\s*([A-Za-z]{2}))$/);

  if (!match) {
    return { city: city || null, state: null };
  }

  return {
    city: match[1].trim() || null,
    state: match[2].toUpperCase(),
  };
}

function validateCustomerInput(input: CreateCustomerInput) {
  const name = input.name.trim();
  const documentDigits = onlyDigits(input.document);
  const phoneDigits = onlyDigits(input.phone);

  if (name.length < 2) {
    throw new Error("Informe um nome válido para o cliente.");
  }

  if (input.type === "PF" && documentDigits.length !== 11) {
    throw new Error("O CPF deve conter 11 números.");
  }

  if (input.type === "PJ" && documentDigits.length !== 14) {
    throw new Error("O CNPJ deve conter 14 números.");
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    throw new Error("Informe um telefone válido com DDD.");
  }

  if (input.email.trim() && !/^\S+@\S+\.\S+$/.test(input.email.trim())) {
    throw new Error("Informe um e-mail válido.");
  }

  if (input.state?.trim() && input.state.trim().length !== 2) {
    throw new Error("A UF deve conter exatamente 2 letras.");
  }
}

function mapCustomer(row: CustomerRow): Customer {
  return {
    id: row.id,
    name: row.name,
    document: row.cpf_cnpj ?? "",
    type: normalizePersonType(row.person_type, row.cpf_cnpj),
    phone: row.whatsapp || row.phone || "",
    email: row.email ?? "",
    city: row.city ?? "",
    state: row.state ?? "",
    status: normalizeStatus(row.status),
    projects: 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toCreatePayload(input: CreateCustomerInput) {
  validateCustomerInput(input);

  const location = splitCityAndState(input.city, input.state);
  const phone = input.phone.trim();

  return {
    name: input.name.trim(),
    cpf_cnpj: input.document.trim(),
    person_type: input.type,
    document_type: input.type === "PJ" ? "CNPJ" : "CPF",
    phone,
    whatsapp: phone,
    email: input.email.trim() || null,
    city: location.city,
    state: location.state,
    status: (input.status ?? "prospecto").toUpperCase(),
  };
}

function toUpdatePayload(input: UpdateCustomerInput) {
  const payload: Record<string, string | null> = {};

  if (input.name !== undefined) payload.name = input.name.trim();

  if (input.document !== undefined) {
    payload.cpf_cnpj = input.document.trim();
  }

  if (input.type !== undefined) {
    payload.person_type = input.type;
    payload.document_type = input.type === "PJ" ? "CNPJ" : "CPF";
  }

  if (input.phone !== undefined) {
    const phone = input.phone.trim();
    payload.phone = phone;
    payload.whatsapp = phone;
  }

  if (input.email !== undefined) {
    payload.email = input.email.trim() || null;
  }

  if (input.city !== undefined || input.state !== undefined) {
    const location = splitCityAndState(input.city ?? "", input.state);
    payload.city = location.city;
    payload.state = location.state;
  }

  if (input.status !== undefined) {
    payload.status = input.status.toUpperCase();
  }

  return payload;
}

function parseSupabaseError(error: { message: string; code?: string }) {
  if (error.code === "23505") {
    return new Error("Já existe um cliente cadastrado com este CPF ou CNPJ.");
  }

  if (error.code === "42501") {
    return new Error(
      "O usuário atual não possui permissão para executar esta operação.",
    );
  }

  if (error.code === "PGRST116") {
    return new Error("Cliente não encontrado.");
  }

  return new Error(error.message || "O Supabase não concluiu a operação.");
}

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select(CUSTOMER_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw parseSupabaseError(error);
  return ((data ?? []) as CustomerRow[]).map(mapCustomer);
}

export async function getCustomerById(id: string): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .select(CUSTOMER_SELECT)
    .eq("id", id)
    .single();

  if (error) throw parseSupabaseError(error);
  return mapCustomer(data as CustomerRow);
}

export async function createCustomer(
  input: CreateCustomerInput,
): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .insert(toCreatePayload(input))
    .select(CUSTOMER_SELECT)
    .single();

  if (error) throw parseSupabaseError(error);
  return mapCustomer(data as CustomerRow);
}

export async function updateCustomer(
  input: UpdateCustomerInput,
): Promise<Customer> {
  const current = await getCustomerById(input.id);
  const merged: CreateCustomerInput = {
    name: input.name ?? current.name,
    document: input.document ?? current.document,
    type: input.type ?? current.type,
    phone: input.phone ?? current.phone,
    email: input.email ?? current.email,
    city: input.city ?? current.city,
    state: input.state ?? current.state,
    status: input.status ?? current.status,
  };

  validateCustomerInput(merged);

  const { id, ...changes } = input;
  const payload = toUpdatePayload({ id, ...changes });

  const { data, error } = await supabase
    .from("customers")
    .update(payload)
    .eq("id", id)
    .select(CUSTOMER_SELECT)
    .single();

  if (error) throw parseSupabaseError(error);
  return mapCustomer(data as CustomerRow);
}

export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) throw parseSupabaseError(error);
}
