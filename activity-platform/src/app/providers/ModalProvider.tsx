import { useCallback, useState } from "react";
import * as React from "react";
import { ModalContext } from "./modalContext";
import type { IActivitiesFilters } from "../../features/activities/model/types";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<IActivitiesFilters>({});
  const resetFilters = useCallback(() => {
    setCurrentFilters({});
    setIsFilterOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isCreateOpen,
        openCreateActivity: () => setIsCreateOpen(true),
        closeModal: () => setIsCreateOpen(false),
        isFilterOpen,
        openFilterModal: () => setIsFilterOpen(true),
        closeFilterModal: () => setIsFilterOpen(false),
        applyFilters: (filters) => {
          setCurrentFilters(filters);
          setIsFilterOpen(false);
        },
        resetFilters,
        currentFilters,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
