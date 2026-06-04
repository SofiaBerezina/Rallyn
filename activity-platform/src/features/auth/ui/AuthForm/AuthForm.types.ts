export interface IFormData {
  email: string;
  password: string;
}

export type TAuthMode = "login" | "register";

export type TErrorType = string | null;

export interface IAuthFormProps {
  mode: TAuthMode;
  onSubmit: (data: IFormData) => Promise<void>;
  error: TErrorType | null;
  isLoading: boolean;
}
