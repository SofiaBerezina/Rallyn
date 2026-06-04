import type { TextareaHTMLAttributes } from "react";
import { FormField } from "../FormField";
import { FormError } from "./FormError";
import { Textarea } from "./Textarea";

interface IFormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea = ({
  label,
  id,
  error,
  helperText,
  ...props
}: IFormTextareaProps) => {
  return (
    <FormField htmlFor={id ?? ""} label={label} helperText={helperText}>
      <Textarea id={id} {...props} />
      <FormError message={error} />
    </FormField>
  );
};
