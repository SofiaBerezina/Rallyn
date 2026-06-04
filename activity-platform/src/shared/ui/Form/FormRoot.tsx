import clsx from "clsx";
import type { FormHTMLAttributes } from "react";

export const FormRoot = ({
  className,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form className={clsx("flex flex-col gap-4 mt-5", className)} {...props} />
  );
};
