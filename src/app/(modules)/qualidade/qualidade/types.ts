export type TipoChecklist =
  | "Produção"
  | "Instalação"
  | "Fim de obra";

export type StatusChecklist =
  | "Pendente"
  | "Em andamento"
  | "Concluído"
  | "Cancelado";

export type ResultadoItem =
  | "Pendente"
  | "Aprovado"
  | "Reprovado"
  | "Não se aplica";

export type PrioridadePendencia =
  | "Baixa"
  | "Média"
  | "Alta"
  | "Crítica";

export interface FotoChecklist {
  id: string;
  nome: string;
  url: string;
  descricao?: string;
  createdAt: string;
}

export interface ItemChecklist {
  id: string;
  titulo: string;
  descricao?: string;
  obrigatorio: boolean;

  resultado: ResultadoItem;

  observacao: string;

  fotos: FotoChecklist[];
}

export interface PendenciaChecklist {
  id: string;

  titulo: string;

  descricao: string;

  prioridade: PrioridadePendencia;

  resolvida: boolean;

  responsavel: string;

  prazo?: string;

  fotos: FotoChecklist[];
}

export interface AssinaturaCliente {
  nome: string;

  documento?: string;

  data: string;

  imagem: string;
}

export interface DadosCliente {
  cliente: string;

  projeto: string;

  ambiente: string;

  endereco: string;

  responsavel: string;

  data: string;
}

export interface Checklist {
  id: string;

  tipo: TipoChecklist;

  status: StatusChecklist;

  dados: DadosCliente;

  itens: ItemChecklist[];

  pendencias: PendenciaChecklist[];

  observacoesGerais: string;

  assinatura?: AssinaturaCliente;

  criadoEm: string;

  atualizadoEm: string;
}