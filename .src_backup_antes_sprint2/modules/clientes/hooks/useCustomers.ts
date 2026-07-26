"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createCustomer,
  getCustomers,
} from "@/modules/clientes/services/customers.service";
import type {
  CreateCustomerInput,
  Customer,
} from "@/modules/clientes/types/customer.types";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Não foi possível carregar os clientes.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCustomers();
  }, [loadCustomers]);

  const addCustomer = useCallback(async (input: CreateCustomerInput) => {
    setIsSaving(true);
    setError(null);

    try {
      const customer = await createCustomer(input);
      setCustomers((current) => [customer, ...current]);
      return customer;
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Não foi possível salvar o cliente.";

      setError(message);
      throw new Error(message);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    customers,
    isLoading,
    isSaving,
    error,
    addCustomer,
    reload: loadCustomers,
  };
}
