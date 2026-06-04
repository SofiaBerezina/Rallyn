import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { initMetrika } from "./shared/lib/analytics/metrica.ts";

export function Metrika() {
  useEffect(() => {
    initMetrika();
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Metrika />
    <App />
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "rounded-4xl border border-primary/10 shadow-xl",
        },
      }}
    />
  </StrictMode>,
);
