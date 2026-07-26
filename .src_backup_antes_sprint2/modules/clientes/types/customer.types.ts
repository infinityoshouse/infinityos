export type CustomerStatus =
  | "ATIVO"
  | "PROSPECTO"
  | "INATIVO";

export interface Customer {
  id: string;

  nome: string;
  fantasia?: string;

  tipoPessoa: "FISICA" | "JURIDICA";

  cpfCnpj: string;
  rgIe?: string;

  email?: string;
  telefone?: string;
  celular?: string;

  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;

  observacoes?: string;

  status: CustomerStatus;

  created_at: string;
  updated_at: string;
}

export interface CreateCustomerDTO {
  nome: string;
  fantasia?: string;

  tipoPessoa: "FISICA" | "JURIDICA";

  cpfCnpj: string;

  rgIe?: string;

  email?: string;
  telefone?: string;
  celular?: string;

  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;

  observacoes?: string;

  status?: CustomerStatus;
}

export interface UpdateCustomerDTO
  extends Partial<CreateCustomerDTO> {}

export interface CustomerFilters {
  search: string;

  status?: CustomerStatus;

  cidade?: string;

  estado?: string;
}

export interface CustomerDashboard {
  total: number;

  ativos: number;

  prospectos: number;

  inativos: number;

  novosMes: number;
}
