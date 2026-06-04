import { useForm } from "react-hook-form";
import {
  FormError,
  FormInput,
  FormRoot,
  SubmitButton,
} from "../../../../shared/ui";
import type { IAuthFormProps, IFormData } from "./AuthForm.types.ts";
import "./authForm.scss";

const AuthForm = ({ mode, onSubmit, error, isLoading }: IAuthFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    mode: "onChange",
  });

  const submitHandler = async (data: IFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <FormRoot onSubmit={handleSubmit(submitHandler)} className="auth-form">
      <FormInput
        id="email"
        label="Email"
        placeholder="Введите email"
        {...register("email", { required: "Email обязателен" })}
        error={errors.email?.message}
      />

      <FormInput
        id="password"
        label="Пароль"
        placeholder="Пароль"
        type="password"
        {...register("password", { required: "Пароль обязателен" })}
        error={errors.password?.message}
      />

      <FormError message={error ?? undefined} />
      <SubmitButton isSubmitting={isLoading} submittingText="Выполняем вход...">
        {mode === "login" ? "Войти" : "Зарегистрироваться"}
      </SubmitButton>
    </FormRoot>
  );
};

export default AuthForm;
