import type { InputHTMLAttributes } from "react";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { FormError } from "./FormError";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormInput = ({
  label,
  id,
  error,
  helperText,
  ...props
}: IFormInputProps) => {
  return (
    <FormField htmlFor={id ?? ""} label={label} helperText={helperText}>
      <Input id={id} {...props} />
      <FormError message={error} />
    </FormField>
  );
};
