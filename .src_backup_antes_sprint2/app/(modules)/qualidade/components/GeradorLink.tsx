"use client";

import { useMemo, useState } from "react";
import { Copy, Link2 } from "lucide-react";

interface Props {
  token: string;
  baseUrl?: string;
}

export default function GeradorLink({
  token,
  baseUrl = "http://localhost:3000/qualidade/cliente",
}: Props) {
  const [copiado, setCopiado] = useState(false);

  const link = useMemo(() => `${baseUrl}/${token}`, [baseUrl, token]);

  async function copiar() {
    await navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <section className="rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="text-yellow-500" />
        <h2 className="text-xl font-semibold">Gerador de Link</h2>
      </div>

      <input
        readOnly
        value={link}
        className="w-full rounded-lg border p-3 text-sm"
      />

      <button
        onClick={copiar}
        className="mt-4 flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black"
      >
        <Copy size={18} />
        {copiado ? "Copiado!" : "Copiar Link"}
      </button>
    </section>
  );
}
