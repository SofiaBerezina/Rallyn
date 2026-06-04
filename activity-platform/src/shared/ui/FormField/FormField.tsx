import clsx from "clsx";
import type { ReactNode } from "react";

interface IFormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  helperText?: string;
}

export const FormField = ({
  label,
  htmlFor,
  children,
  className,
  labelClassName,
  helperText,
}: IFormFieldProps) => {
  return (
    <div className={clsx("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className={clsx(
          "block text-sm font-semibold text-primary/70",
          labelClassName,
        )}
      >
        {label}
      </label>

      {children}

      {helperText ? (
        <p className="text-xs text-primary/50">{helperText}</p>
      ) : null}
    </div>
  );
};
