import { ACTIVITY_CATEGORIES, type ActivityCategory } from "./categories";

export const categoryColors: Record<ActivityCategory, string> = {
  [ACTIVITY_CATEGORIES.SPORT]:
    "bg-category-sport/15 text-category-sport ring-1 ring-category-sport/20",
  [ACTIVITY_CATEGORIES.STUDY]:
    "bg-category-study/15 text-category-study ring-1 ring-category-study/20",
  [ACTIVITY_CATEGORIES.MUSIC]:
    "bg-category-music/15 text-category-music ring-1 ring-category-music/20",
  [ACTIVITY_CATEGORIES.TRAVEL]:
    "bg-category-travel/15 text-category-travel ring-1 ring-category-travel/20",
  [ACTIVITY_CATEGORIES.SOCIAL]:
    "bg-category-social/15 text-category-social ring-1 ring-category-social/20",
};
