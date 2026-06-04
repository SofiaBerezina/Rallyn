import clsx from "clsx";
import * as React from "react";
import "./button.scss";
import type { ButtonTypes } from "./Button.types.ts";

interface IButtonProps {
  children: React.ReactNode;
  variant?: ButtonTypes;
}

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={clsx("btn", `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
