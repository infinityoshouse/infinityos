import { create } from "zustand";

export type ModuleId =
  | "financeiro"
  | "producao"
  | "clientes"
  | "estoque"
  | "compras"
  | "pcp"
  | "projetos"
  | "medidas"
  | "manutencao"
  | "agenda"
  | "qualidade"
  | "expedicao"
  | null;

type UIState = {
  selectedModule: ModuleId;

  isNavigating: boolean;

  isInfinityAIActive: boolean;

  orbitSpeed: number;

  coreGlow: number;

  backgroundBlur: boolean;

  selectModule: (module: ModuleId) => void;

  startNavigation: () => void;

  finishNavigation: () => void;

  activateAI: () => void;

  deactivateAI: () => void;

  resetUI: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedModule: null,

  isNavigating: false,

  isInfinityAIActive: false,

  orbitSpeed: 1,

  coreGlow: 1,

  backgroundBlur: false,

  selectModule: (module) =>
    set({
      selectedModule: module,
    }),

  startNavigation: () =>
    set({
      isNavigating: true,
      orbitSpeed: 0.18,
      coreGlow: 1.8,
      backgroundBlur: true,
    }),

  finishNavigation: () =>
    set({
      isNavigating: false,
      orbitSpeed: 1,
      coreGlow: 1,
      backgroundBlur: false,
    }),

  activateAI: () =>
    set({
      isInfinityAIActive: true,
      coreGlow: 2,
    }),

  deactivateAI: () =>
    set({
      isInfinityAIActive: false,
      coreGlow: 1,
    }),

  resetUI: () =>
    set({
      selectedModule: null,
      isNavigating: false,
      isInfinityAIActive: false,
      orbitSpeed: 1,
      coreGlow: 1,
      backgroundBlur: false,
    }),
}));