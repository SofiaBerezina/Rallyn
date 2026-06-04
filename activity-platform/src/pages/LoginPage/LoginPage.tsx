import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../features/auth/ui/AuthForm";
import type {
  TAuthMode,
  TErrorType,
  IFormData,
} from "../../features/auth/ui/AuthForm/AuthForm.types.ts";
import { useState } from "react";
import { Button } from "../../shared/ui";
import "./loginPage.scss";
import { ROUTES } from "../../shared/config/routes.ts";
import * as React from "react";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { notify } from "../../shared/lib/notifications/notify.ts";
import { trackEvent } from "../../shared/lib/analytics/metrica.ts";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<TAuthMode>("login");
  const [error, setError] = useState<TErrorType>(null);

  const { login, register, isSubmitting } = useAuth();

  const handleLogin = (data: IFormData) => {
    setError(null);
    return login(data.email, data.password, {
      onSuccess: () => {
        notify.userLoggedIn();
        trackEvent("login");
        navigate(ROUTES.FEED);
      },
      onError: (err) => {
        setError(err);
        notify.error("Ошибка входа");
      },
    });
  };

  const handleRegister = (data: IFormData) => {
    setError(null);
    return register(data.email, data.password, {
      onSuccess: () => {
        notify.userSignedUp();
        setMode("login");
        trackEvent("register");
        navigate(ROUTES.LOGIN);
      },
      onError: (err) => {
        setError(err);
        notify.error("Ошибка регистрации");
      },
    });
  };

  return (
    <section className="auth-page">
      <img src="/logo.png " alt="logo" className="auth-page__logo" />

      <AuthForm
        mode={mode}
        onSubmit={mode === "login" ? handleLogin : handleRegister}
        error={error}
        isLoading={isSubmitting}
      />

      <Button
        type="button"
        variant="ghost"
        onClick={() => {
          setMode(mode === "register" ? "login" : "register");
          setError(null);
        }}
      >
        {mode === "login"
          ? "Нет аккаунта? Зарегистрироваться"
          : "Уже есть аккаунт? Войти"}
      </Button>
    </section>
  );
};

export default LoginPage;
