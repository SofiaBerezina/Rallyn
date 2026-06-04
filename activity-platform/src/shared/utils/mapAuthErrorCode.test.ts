import { describe, it, expect } from "vitest";
import { mapAuthErrorCode } from "./mapAuthErrorCode";

describe("mapAuthErrorCode", () => {
  it("should map email-already-in-use error", () => {
    const result = mapAuthErrorCode("auth/email-already-in-use");
    expect(result).toBe("Пользователь с таким email уже существует");
  });

  it("should map invalid-email error", () => {
    const result = mapAuthErrorCode("auth/invalid-email");
    expect(result).toBe("Неверный email");
  });

  it("should map weak-password error", () => {
    const result = mapAuthErrorCode("auth/weak-password");
    expect(result).toBe("Пароль слишком слабый");
  });

  it("should map user-not-found error", () => {
    const result = mapAuthErrorCode("auth/user-not-found");
    expect(result).toBe("Пользователь не найден");
  });

  it("should map invalid-credential error", () => {
    const result = mapAuthErrorCode("auth/invalid-credential");
    expect(result).toBe("Неверный логин или пароль");
  });

  it("should return default error message for unknown error code", () => {
    const result = mapAuthErrorCode("auth/unknown-error");
    expect(result).toBe("Ошибка авторизации");
  });

  it("should return default error message for empty string", () => {
    const result = mapAuthErrorCode("");
    expect(result).toBe("Ошибка авторизации");
  });
});
