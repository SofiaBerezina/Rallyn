import type { ActivityCategory } from "../../../shared/config/activities/categories.ts";

export interface IActivity {
  id: string;
  title: string;
  description?: string;
  category: ActivityCategory;
  date: Date;
  location: string;
  authorId: string;
  createdAt: number;
  responsesCount?: number;
}

export interface IActivitiesFilters {
  category?: ActivityCategory;
  location?: string;
  date?: string;
}
