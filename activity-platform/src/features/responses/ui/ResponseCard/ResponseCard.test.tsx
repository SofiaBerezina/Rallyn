import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResponseCard from "./ResponseCard";
import { MemoryRouter } from "react-router-dom";
import { RESPONSE_STATUS } from "../../model/types";

const mockUser = {
  id: "u1",
  name: "Тест",
  email: "test@example.com",
  avatar: "",
  telegram: "@testtg",
};

const baseResponse = {
  id: "r1",
  activityId: "a1",
  authorId: "au1",
  responderId: "u1",
  status: RESPONSE_STATUS.PENDING,
  createdAt: Date.now(),
};

describe("ResponseCard", () => {
  it("shows accept/reject buttons for pending response", () => {
    const onUpdate = vi.fn();
    render(
      <MemoryRouter>
        <ResponseCard
          response={baseResponse}
          user={mockUser}
          onUpdateStatus={onUpdate}
          isUpdating={false}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "✓" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "✕" })).toBeInTheDocument();
  });

  it("disables buttons and shows ... when isUpdating", () => {
    const onUpdate = vi.fn();
    render(
      <MemoryRouter>
        <ResponseCard
          response={baseResponse}
          user={mockUser}
          onUpdateStatus={onUpdate}
          isUpdating={true}
        />
      </MemoryRouter>,
    );

    const buttons = screen.getAllByRole("button", { name: "..." });
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it("shows telegram link when accepted and telegram available", () => {
    const onUpdate = vi.fn();
    const accepted = { ...baseResponse, status: RESPONSE_STATUS.ACCEPTED };
    render(
      <MemoryRouter>
        <ResponseCard
          response={accepted}
          user={mockUser}
          onUpdateStatus={onUpdate}
        />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole("link");
    const contactLink = links[1];
    expect(contactLink).toHaveAttribute(
      "href",
      expect.stringContaining("t.me"),
    );
  });

  it("shows mailto when accepted and no telegram", () => {
    const onUpdate = vi.fn();
    const accepted = { ...baseResponse, status: RESPONSE_STATUS.ACCEPTED };
    const userNoTelegram = { ...mockUser, telegram: "" };
    render(
      <MemoryRouter>
        <ResponseCard
          response={accepted}
          user={userNoTelegram}
          onUpdateStatus={onUpdate}
        />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole("link");
    const contactLink = links[1];
    expect(contactLink).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:"),
    );
  });

  it("shows Rejected label when rejected", () => {
    const onUpdate = vi.fn();
    const rejected = { ...baseResponse, status: RESPONSE_STATUS.REJECTED };
    render(
      <MemoryRouter>
        <ResponseCard
          response={rejected}
          user={mockUser}
          onUpdateStatus={onUpdate}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Отклонено")).toBeInTheDocument();
  });
});
