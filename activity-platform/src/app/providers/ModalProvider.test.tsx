import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ModalProvider } from "./ModalProvider";
import { useModal } from "./useModal";

const TestConsumer = () => {
  const {
    isFilterOpen,
    openFilterModal,
    closeFilterModal,
    applyFilters,
    currentFilters,
  } = useModal();

  return (
    <div>
      <div>filter:{isFilterOpen ? "open" : "closed"}</div>
      <div>count:{Object.keys(currentFilters).length}</div>
      <button onClick={openFilterModal}>open</button>
      <button onClick={closeFilterModal}>close</button>
      <button onClick={() => applyFilters({ category: "sport" as never })}>
        apply
      </button>
    </div>
  );
};

describe("ModalProvider", () => {
  it("opens, closes and applies filters", async () => {
    const user = userEvent.setup();

    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    expect(screen.getByText("filter:closed")).toBeInTheDocument();
    expect(screen.getByText("count:0")).toBeInTheDocument();

    await user.click(screen.getByText("open"));
    expect(screen.getByText("filter:open")).toBeInTheDocument();

    await user.click(screen.getByText("apply"));
    expect(screen.getByText("filter:closed")).toBeInTheDocument();
    expect(screen.getByText("count:1")).toBeInTheDocument();
  });
});
