import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

vi.mock("../../shared/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    Navigate: vi.fn(() => <div>redirected</div>),
  };
});

import { useAuth } from "../../shared/hooks/useAuth";

describe("ProtectedRoute", () => {
  it("shows loader while auth is loading", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthInitializing: true,
    } as never);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>secret</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("redirects to login when user is missing", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthInitializing: false,
    } as never);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>secret</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(Navigate).toHaveBeenCalled();
  });

  it("renders children when user exists", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: "1" },
      isAuthInitializing: false,
    } as never);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>secret</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText("secret")).toBeInTheDocument();
  });
});
