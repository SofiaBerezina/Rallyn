import { createContext } from "react";
import type { IActivitiesFilters } from "../../features/activities/model/types";

export type ModalContextType = {
  openCreateActivity: () => void;
  closeModal: () => void;
  isCreateOpen: boolean;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  isFilterOpen: boolean;
  applyFilters: (filters: IActivitiesFilters) => void;
  resetFilters: () => void;
  currentFilters: IActivitiesFilters;
};

export const ModalContext = createContext<ModalContextType | null>(null);
