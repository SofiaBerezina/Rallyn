export const ACTIVITY_CATEGORIES = {
  SPORT: "Спорт",
  STUDY: "Образование",
  MUSIC: "Музыка",
  TRAVEL: "Путешествия",
  SOCIAL: "Общение",
} as const;

export type ActivityCategory =
  (typeof ACTIVITY_CATEGORIES)[keyof typeof ACTIVITY_CATEGORIES];

export const categoryOptions = Object.values(ACTIVITY_CATEGORIES);
