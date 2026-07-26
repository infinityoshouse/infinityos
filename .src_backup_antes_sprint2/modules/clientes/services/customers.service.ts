import { supabase } from "@/lib/supabase/client";

import type {
  CreateCustomerInput,
  Customer,
  CustomerPersonType,
  CustomerRow,
  CustomerStatus,
} from "@/modules/clientes/types/customer.types";

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

  if (normalized === "PJ") return "PJ";
  if (normalized === "PF") return "PF";

  const digits = document?.replace(/\D/g, "") ?? "";
  return digits.length === 14 ? "PJ" : "PF";
}

function formatCity(city: string | null, state: string | null) {
  if (!city) return "";
  return state ? `${city} - ${state}` : city;
}

function splitCityAndState(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^(.*?)(?:\s*-\s*([A-Za-z]{2}))$/);

  if (!match) {
    return { city: trimmed || null, state: null };
  }

  return {
    city: match[1].trim() || null,
    state: match[2].toUpperCase(),
  };
}

function mapCustomer(row: CustomerRow): Customer {
  return {
    id: row.id,
    name: row.name,
    document: row.cpf_cnpj ?? "",
    type: normalizePersonType(row.person_type, row.cpf_cnpj),
    phone: row.whatsapp || row.phone || "",
    email: row.email ?? "",
    city: formatCity(row.city, row.state),
    status: normalizeStatus(row.status),
    projects: 0,
  };
}

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as CustomerRow[]).map(mapCustomer);
}

export async function createCustomer(
  input: CreateCustomerInput,
): Promise<Customer> {
  const location = splitCityAndState(input.city);

  const payload = {
    name: input.name.trim(),
    cpf_cnpj: input.document.trim() || null,
    person_type: input.type,
    document_type: input.type === "PJ" ? "CNPJ" : "CPF",
    phone: input.phone.trim() || null,
    whatsapp: input.phone.trim() || null,
    email: input.email.trim() || null,
    city: location.city,
    state: location.state,
    status: "PROSPECTO",
  };

  const { data, error } = await supabase
    .from("customers")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCustomer(data as CustomerRow);
}
