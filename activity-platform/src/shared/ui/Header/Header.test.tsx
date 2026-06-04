import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";
import {
  ModalContext,
  type ModalContextType,
} from "../../../app/providers/modalContext";
import type { IActivitiesFilters } from "../../../features/activities/model/types";
import { ACTIVITY_CATEGORIES } from "../../config/activities/categories.ts";

vi.mock("../../../shared/hooks/useAuth", () => ({
  useAuth: () => ({
    user: null,
    logout: vi.fn(),
    isAuthInitializing: false,
    isSubmitting: false,
  }),
}));

const renderWithFilters = (filters: IActivitiesFilters) => {
  const ctx: ModalContextType = {
    openCreateActivity: () => {},
    closeModal: () => {},
    isCreateOpen: false,
    openFilterModal: () => {},
    closeFilterModal: () => {},
    isFilterOpen: false,
    applyFilters: () => {},
    resetFilters: () => {},
    currentFilters: filters,
  };

  return render(
    <ModalContext.Provider value={ctx}>
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    </ModalContext.Provider>,
  );
};

describe("Header filter badge", () => {
  it("does not show badge when no filters", () => {
    renderWithFilters({});
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("shows 1 when one filter active", () => {
    renderWithFilters({ category: ACTIVITY_CATEGORIES.SPORT });
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("shows correct count for multiple filters", () => {
    renderWithFilters({
      category: ACTIVITY_CATEGORIES.SPORT,
      location: "Город",
    });
    expect(screen.getByText("2")).toBeInTheDocument();

    renderWithFilters({
      category: ACTIVITY_CATEGORIES.SPORT,
      location: "Город",
      date: "2024-06-01",
    });
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
