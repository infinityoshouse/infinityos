export type CustomerStatus = "ativo" | "prospecto" | "inativo";
export type CustomerPersonType = "PF" | "PJ";

/**
 * Estrutura retornada pela tabela `customers` no Supabase.
 * Esta interface não deve ser usada diretamente pela interface visual.
 */
export interface CustomerRow {
  id: string;
  name: string;
  cpf_cnpj: string | null;
  person_type: string | null;
  document_type: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
}

/**
 * Modelo oficial de cliente usado pelo Infinity O.S.
 */
export interface Customer {
  id: string;
  name: string;
  document: string;
  type: CustomerPersonType;
  phone: string;
  email: string;
  city: string;
  state: string;
  status: CustomerStatus;
  projects: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateCustomerInput {
  name: string;
  document: string;
  type: CustomerPersonType;
  phone: string;
  email: string;
  city: string;
  state?: string;
  status?: CustomerStatus;
}

export interface UpdateCustomerInput extends Partial<CreateCustomerInput> {
  id: string;
}

export interface CustomerFilters {
  search: string;
  status: CustomerStatus | "todos";
  type: CustomerPersonType | "todos";
}

export interface CustomerDashboard {
  total: number;
  active: number;
  prospects: number;
  inactive: number;
  newThisMonth: number;
}
