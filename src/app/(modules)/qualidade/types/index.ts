/**
 * Tipos de domínio do módulo de Qualidade.
 *
 * Estes contratos representam a estrutura atualmente utilizada pelo módulo.
 * Alterações futuras devem ser feitas aqui, evitando declarações duplicadas
 * em páginas, componentes, hooks ou serviços.
 */

export type TipoChecklist =
  | "Produção"
  | "Instalação"
  | "Fim de obra";

export type ResultadoItem =
  | "Pendente"
  | "Aprovado"
  | "Reprovado"
  | "Não se aplica";

export type StatusQualidade =
  | "Pendente"
  | "Em andamento"
  | "Com pendências"
  | "Aprovado"
  | "Entregue";

export interface ItemChecklist {
  id: number;
  descricao: string;
  resultado: ResultadoItem;
  observacao: string;
}

export interface FotoQualidade {
  id: number;
  nome: string;
  url: string;
}

export interface RegistroQualidade {
  id: number;
  codigo: string;

  cliente: string;
  projeto: string;
  endereco: string;
  ambiente: string;
  responsavel: string;

  tipo: TipoChecklist;
  data: string;
  status: StatusQualidade;

  observacoesGerais: string;
  itens: ItemChecklist[];
  fotos: FotoQualidade[];

  assinaturaCliente: string | null;
  nomeAssinante: string;
  dataAssinatura: string;
}
