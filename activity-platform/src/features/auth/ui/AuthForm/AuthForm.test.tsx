import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AuthForm from "./AuthForm";

describe("AuthForm", () => {
  it("shows required field errors for empty submit", async () => {
    const onSubmit = vi.fn(async () => {});
    render(
      <AuthForm
        mode="login"
        onSubmit={onSubmit}
        error={null}
        isLoading={false}
      />,
    );

    const submitBtn = screen.getByRole("button", { name: /войти/i });
    await userEvent.click(submitBtn);

    expect(await screen.findByText("Email обязателен")).toBeInTheDocument();
    expect(await screen.findByText("Пароль обязателен")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with email and password", async () => {
    const onSubmit = vi.fn(async () => {});
    render(
      <AuthForm
        mode="login"
        onSubmit={onSubmit}
        error={null}
        isLoading={false}
      />,
    );

    const email = screen.getByPlaceholderText(/введите email/i);
    const password = screen.getByPlaceholderText(/пароль/i);
    const submitBtn = screen.getByRole("button", { name: /войти/i });

    await userEvent.type(email, "test@example.com");
    await userEvent.type(password, "password123");
    await userEvent.click(submitBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("shows external error message when provided", () => {
    const onSubmit = vi.fn();
    render(
      <AuthForm
        mode="login"
        onSubmit={onSubmit}
        error={"Some external error"}
        isLoading={false}
      />,
    );

    expect(screen.getByText("Some external error")).toBeInTheDocument();
  });

  it("disables submit and shows submitting text when isLoading", async () => {
    const onSubmit = vi.fn();
    render(
      <AuthForm
        mode="login"
        onSubmit={onSubmit}
        error={null}
        isLoading={true}
      />,
    );

    expect(
      screen.getByRole("button", { name: /выполняем вход/i }),
    ).toBeDisabled();
  });
});
