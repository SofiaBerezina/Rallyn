import type { ActivityCategory } from "../../../shared/config/activities/categories.ts";
export type {
  IActivitiesFilters,
  IActivity,
} from "../../../entities/activity/model/types.ts";

export interface IActivityFormValues {
  title: string;
  description?: string;
  category: ActivityCategory;
  date: string;
  location: string;
}

export type ActivityFormPayload = Omit<IActivityFormValues, "date"> & {
  date: Date;
};
