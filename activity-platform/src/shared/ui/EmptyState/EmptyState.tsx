import type { ReactNode } from "react";

interface IEmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: IEmptyStateProps) => {
  return (
    <section className="flex items-center justify-center min-h-[20vh] px-4">
      <div
        className="
          relative max-w-md w-full text-center p-8
          rounded-[32px]
          bg-primary-light/60 backdrop-blur-xl
          border border-white/40
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          overflow-hidden
        "
      >
        <article className="relative z-10">
          <h2 className="text-xl font-semibold text-primary-dark">{title}</h2>

          {description && (
            <p className="mt-3 text-sm text-primary/80 leading-relaxed">
              {description}
            </p>
          )}

          {action && <div className="mt-5">{action}</div>}
        </article>
      </div>
    </section>
  );
};

export default EmptyState;
