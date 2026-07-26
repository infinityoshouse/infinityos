export type CustomerType = "PF" | "PJ";

export type CustomerStatus =
  | "LEAD"
  | "CLIENTE"
  | "INATIVO";

export interface Address {
  zipCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement?: string;
}

export interface Customer {
  id: string;

  type: CustomerType;

  status: CustomerStatus;

  name: string;

  companyName?: string;

  cpf?: string;

  cnpj?: string;

  ie?: string;

  email: string;

  phone: string;

  whatsapp: string;

  address: Address;

  notes?: string;

  createdAt: Date;

  updatedAt: Date;
}

