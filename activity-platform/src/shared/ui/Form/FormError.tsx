interface IFormErrorProps {
  message?: string;
}

export const FormError = ({ message }: IFormErrorProps) => {
  if (!message) return null;

  return <p className="text-red-500 text-sm">{message}</p>;
};
