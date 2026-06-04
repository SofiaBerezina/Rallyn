import type {
  ActivityFormPayload,
  IActivity,
  IActivityFormValues,
} from "../model/types";

const toDatetimeLocalValue = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join(
      "-",
    ) + `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
};

export const mapActivityToFormValues = (
  activity: IActivity,
): IActivityFormValues => ({
  title: activity.title,
  description: activity.description,
  category: activity.category,
  date: toDatetimeLocalValue(activity.date),
  location: activity.location,
});

export const mapActivityFormToPayload = (
  data: IActivityFormValues,
): ActivityFormPayload => ({
  ...data,
  date: new Date(data.date),
});
