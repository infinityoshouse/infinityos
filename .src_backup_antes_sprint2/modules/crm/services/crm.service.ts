import { customers } from "../data/customers";
import { Customer } from "../types/crm.types";

class CRMService {
  getAll(): Customer[] {
    return customers;
  }

  getById(id: string): Customer | undefined {
    return customers.find((customer) => customer.id === id);
  }

  add(customer: Customer): void {
    customers.push(customer);
  }

  update(customer: Customer): void {
    const index = customers.findIndex((c) => c.id === customer.id);

    if (index !== -1) {
      customers[index] = customer;
    }
  }

  remove(id: string): void {
    const index = customers.findIndex((c) => c.id === id);

    if (index !== -1) {
      customers.splice(index, 1);
    }
  }
}

export const crmService = new CRMService();
