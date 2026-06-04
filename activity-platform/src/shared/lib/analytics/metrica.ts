import { ENV } from "../../config/env.ts";

const METRICA_SCRIPT_ID = "yandex-metrika-script";
const metricaId = Number(ENV.VITE_METRICA_ID);

const isMetricaIdValid = Number.isFinite(metricaId);

type YmFunction = ((...args: unknown[]) => void) & { a?: unknown[][] };

const ensureYm = () => {
  const existingYm = window.ym as YmFunction | undefined;
  if (existingYm) return existingYm;

  const queuedYm: YmFunction = (...args: unknown[]) => {
    queuedYm.a = queuedYm.a || [];
    queuedYm.a.push(args);
  };

  window.ym = queuedYm;
  return queuedYm;
};

export const initMetrika = () => {
  if (!isMetricaIdValid) return;

  if (document.getElementById(METRICA_SCRIPT_ID)) return;

  ensureYm();

  const script = document.createElement("script");
  script.id = METRICA_SCRIPT_ID;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  script.async = true;

  script.onload = () => {
    window.ym?.(metricaId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false,
    });
  };

  document.head.appendChild(script);
};

export const trackEvent = (event: string) => {
  if (!isMetricaIdValid) return;
  window.ym?.(metricaId, "reachGoal", event);
};

export const trackPage = (url: string) => {
  if (!isMetricaIdValid) return;
  window.ym?.(metricaId, "hit", url);
};
