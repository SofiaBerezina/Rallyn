import type { ReactNode, SelectHTMLAttributes } from "react";
import { FormField } from "../FormField";
import { FormError } from "./FormError";
import { Select } from "./Select";

interface IFormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  children: ReactNode;
}

export const FormSelect = ({
  label,
  id,
  error,
  helperText,
  children,
  ...props
}: IFormSelectProps) => {
  return (
    <FormField htmlFor={id ?? ""} label={label} helperText={helperText}>
      <Select id={id} {...props}>
        {children}
      </Select>
      <FormError message={error} />
    </FormField>
  );
};
