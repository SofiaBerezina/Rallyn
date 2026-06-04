import { Button } from "../Button";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonTypes } from "../Button/Button.types";

interface ISubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  submittingText?: ReactNode;
  children: ReactNode;
  variant?: ButtonTypes;
}

export const SubmitButton = ({
  isSubmitting = false,
  submittingText,
  children,
  disabled,
  variant = "primary",
  ...props
}: ISubmitButtonProps) => {
  return (
    <Button
      type="submit"
      variant={variant}
      disabled={disabled || isSubmitting}
      {...props}
    >
      {isSubmitting && submittingText ? submittingText : children}
    </Button>
  );
};
