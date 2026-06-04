import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ActivityForm from "./ActivityForm";
import { ACTIVITY_CATEGORIES } from "../../../../shared/config/activities/categories.ts";

const fillForm = async () => {
  const title = screen.getByPlaceholderText(/Название активности/i);
  const description = screen.getByPlaceholderText(/Описание активности/i);
  const location = screen.getByPlaceholderText(/Местоположение/i);
  const date = screen.getByLabelText(/Дата и время/i);
  const category = screen.getByLabelText(/Категория/i);

  await userEvent.type(title, "Тест активити");
  await userEvent.type(description, "Описание теста");
  await userEvent.type(location, "Город");
  await userEvent.type(date, "2024-06-01T08:30");
  await userEvent.selectOptions(category, ACTIVITY_CATEGORIES.SPORT);
};

describe("ActivityForm", () => {
  it("shows validation errors for required fields", async () => {
    const onSave = vi.fn();
    render(<ActivityForm onSave={onSave} />);

    const submitBtn = screen.getByRole("button", {
      name: /сохранить/i,
    }) as HTMLButtonElement;
    submitBtn.form?.setAttribute("novalidate", "novalidate");
    await userEvent.click(submitBtn);

    expect(await screen.findByText("Название обязательно")).toBeInTheDocument();
    expect(await screen.findByText("Локация обязательна")).toBeInTheDocument();
    expect(
      await screen.findByText("Дата и время обязательны"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Категория обязательна"),
    ).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave with form values", async () => {
    const onSave = vi.fn();
    render(<ActivityForm onSave={onSave} />);

    await fillForm();

    const submitBtn = screen.getByRole("button", { name: /сохранить/i });
    await userEvent.click(submitBtn);

    expect(onSave).toHaveBeenCalledTimes(1);
    const calledWith = onSave.mock.calls[0][0];
    expect(calledWith.title).toBe("Тест активити");
    expect(calledWith.location).toBe("Город");
    expect(calledWith.category).toBe(ACTIVITY_CATEGORIES.SPORT);
    expect(calledWith.date).toBe("2024-06-01T08:30");
  });

  it("prefills default values when editing", () => {
    const onSave = vi.fn();
    const defaultValues = {
      title: "Default title",
      description: "Default desc",
      category: ACTIVITY_CATEGORIES.SPORT,
      date: "2024-07-01T09:00",
      location: "Home",
    };

    render(<ActivityForm onSave={onSave} defaultValues={defaultValues} />);

    expect(screen.getByDisplayValue("Default title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Default desc")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Home")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2024-07-01T09:00")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Спорт")).toBeInTheDocument();
  });
});
