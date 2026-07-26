"use client";

import { FileCheck2 } from "lucide-react";

export interface HistoricoItem {
  id:string;
  checklist:"Produção"|"Instalação"|"Fim de Obra";
  responsavel:string;
  data:string;
  status:"Aprovado"|"Reprovado"|"N/A";
  observacao?:string;
}

interface Props{
  itens:HistoricoItem[];
}

export default function HistoricoChecklist({itens}:Props){
  return(
    <section className="rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FileCheck2 className="text-yellow-500"/>
        <h2 className="text-xl font-semibold">Histórico de Checklists</h2>
      </div>

      <div className="space-y-4">
        {itens.map((item)=>(
          <div key={item.id} className="rounded-xl border p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <strong>{item.checklist}</strong>
              <span className="text-sm">{item.status}</span>
            </div>

            <p className="mt-2 text-sm">
              <strong>Responsável:</strong> {item.responsavel}
            </p>

            <p className="text-sm">
              <strong>Data:</strong> {item.data}
            </p>

            {item.observacao && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {item.observacao}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
