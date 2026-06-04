import { Link } from "react-router-dom";
import { ROUTES } from "../../shared/config/routes";
import type { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>

      <p className="text-primary/70 text-lg">Такой страницы не существует</p>

      <Link
        to={ROUTES.FEED}
        className="
          rounded-2xl
          bg-primary
          px-5 py-3
          text-white
          shadow-md
        "
      >
        На главную
      </Link>
    </section>
  );
};

export default NotFoundPage;
