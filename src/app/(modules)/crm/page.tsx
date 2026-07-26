"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  city: string | null;
  created_at: string;
}

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCustomers() {
    setLoading(true);

    const response = await fetch("/api/customers");
    const data = await response.json();

    setCustomers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            CRM
          </h1>

          <p className="text-gray-500">
            Gestão de Clientes
          </p>
        </div>

        <button className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400">
          Novo Cliente
        </button>
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Nome</th>
              <th className="text-left p-4">Empresa</th>
              <th className="text-left p-4">Telefone</th>
              <th className="text-left p-4">Cidade</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center"
                >
                  Carregando...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-500"
                >
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {customer.name}
                  </td>

                  <td className="p-4">
                    {customer.company || "-"}
                  </td>

                  <td className="p-4">
                    {customer.phone || "-"}
                  </td>

                  <td className="p-4">
                    {customer.city || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
