"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "@/modules/clientes/services/customers.service";
import type {
  CreateCustomerInput,
  Customer,
  CustomerDashboard,
  UpdateCustomerInput,
} from "@/modules/clientes/types/customer.types";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function useCustomers() {
  const mountedRef = useRef(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCustomers();
      if (mountedRef.current) setCustomers(data);
    } catch (loadError) {
      if (mountedRef.current) {
        setError(
          getErrorMessage(loadError, "Não foi possível carregar os clientes."),
        );
      }
    } finally {
      if (mountedRef.current) setIsLoading(false);
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
      if (mountedRef.current) {
        setCustomers((current) => [customer, ...current]);
      }
      return customer;
    } catch (saveError) {
      const message = getErrorMessage(
        saveError,
        "Não foi possível salvar o cliente.",
      );
      if (mountedRef.current) setError(message);
      throw new Error(message);
    } finally {
      if (mountedRef.current) setIsSaving(false);
    }
  }, []);

  const editCustomer = useCallback(async (input: UpdateCustomerInput) => {
    setIsSaving(true);
    setError(null);

    try {
      const customer = await updateCustomer(input);
      if (mountedRef.current) {
        setCustomers((current) =>
          current.map((item) => (item.id === customer.id ? customer : item)),
        );
      }
      return customer;
    } catch (saveError) {
      const message = getErrorMessage(
        saveError,
        "Não foi possível atualizar o cliente.",
      );
      if (mountedRef.current) setError(message);
      throw new Error(message);
    } finally {
      if (mountedRef.current) setIsSaving(false);
    }
  }, []);

  const removeCustomer = useCallback(async (id: string) => {
    setDeletingId(id);
    setError(null);

    try {
      await deleteCustomer(id);
      if (mountedRef.current) {
        setCustomers((current) => current.filter((item) => item.id !== id));
      }
    } catch (deleteError) {
      const message = getErrorMessage(
        deleteError,
        "Não foi possível excluir o cliente.",
      );
      if (mountedRef.current) setError(message);
      throw new Error(message);
    } finally {
      if (mountedRef.current) setDeletingId(null);
    }
  }, []);

  const dashboard = useMemo<CustomerDashboard>(() => {
    const now = new Date();

    return customers.reduce<CustomerDashboard>(
      (summary, customer) => {
        summary.total += 1;

        if (customer.status === "ativo") summary.active += 1;
        if (customer.status === "prospecto") summary.prospects += 1;
        if (customer.status === "inativo") summary.inactive += 1;

        const createdAt = new Date(customer.createdAt);

        if (
          !Number.isNaN(createdAt.getTime()) &&
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        ) {
          summary.newThisMonth += 1;
        }

        return summary;
      },
      { total: 0, active: 0, prospects: 0, inactive: 0, newThisMonth: 0 },
    );
  }, [customers]);

  return {
    customers,
    dashboard,
    isLoading,
    isSaving,
    deletingId,
    error,
    clearError,
    addCustomer,
    editCustomer,
    removeCustomer,
    reload: loadCustomers,
  };
}
