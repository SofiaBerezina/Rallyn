import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResponsesModal from "./ResponsesModal";

const mocks = vi.hoisted(() => ({
  useQuery: vi.fn(),
  useUsersByIds: vi.fn(),
  Loader: () => <div>loading</div>,
}));

vi.mock("../../../../services/responseService", () => ({
  getResponsesByActivity: vi.fn(),
  updateResponseStatus: vi.fn(),
}));

vi.mock("../../../../shared/hooks/useUser", () => ({
  useUsersByIds: mocks.useUsersByIds,
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: mocks.useQuery,
  useQueryClient: vi.fn(() => ({
    getQueryData: vi.fn(),
    setQueryData: vi.fn(),
    invalidateQueries: vi.fn(),
  })),
}));

vi.mock("../../../../shared/ui/ModalShell/ModalShell", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("../../../../shared/ui/Loader", () => ({
  Loader: mocks.Loader,
}));

vi.mock("../../../../shared/ui/EmptyState/EmptyState", () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock("../ResponseCard/ResponseCard", () => ({
  default: () => <div>response-card</div>,
}));

describe("ResponsesModal", () => {
  it("shows loader and empty state", () => {
    mocks.useQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as never);
    mocks.useUsersByIds.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as never);

    const { rerender } = render(
      <ResponsesModal activityId="1" onClose={vi.fn()} />,
    );
    expect(screen.getByText("loading")).toBeInTheDocument();

    mocks.useQuery.mockReturnValue({ data: [], isLoading: false } as never);
    mocks.useUsersByIds.mockReturnValue({
      data: [],
      isLoading: false,
    } as never);
    rerender(<ResponsesModal activityId="1" onClose={vi.fn()} />);

    expect(screen.getByText("Откликов пока нет")).toBeInTheDocument();
  });
});
