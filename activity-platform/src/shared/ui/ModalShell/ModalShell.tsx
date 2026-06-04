import clsx from "clsx";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import Button from "../Button/Button";

interface IModalShellProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  titleClassName?: string;
}

const ModalShell = ({
  title,
  onClose,
  children,
  className,
  panelClassName,
  titleClassName,
}: IModalShellProps) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm",
        className,
      )}
    >
      <article
        className={clsx(
          "relative w-[420px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[28px] border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl",
          panelClassName,
        )}
      >
        <Button
          onClick={onClose}
          variant="icon"
          className="absolute right-2 top-2 text-gray-500 transition hover:text-gray-700"
          aria-label="Закрыть модальное окно"
        >
          <XIcon />
        </Button>

        <h1
          className={clsx(
            "text-lg font-semibold text-gray-800",
            titleClassName,
          )}
        >
          {title}
        </h1>

        {children}
      </article>
    </div>
  );
};

export default ModalShell;
