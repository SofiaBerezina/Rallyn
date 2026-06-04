import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createActivity,
  deleteActivity,
  getActivities,
  updateActivity,
} from "../../../services/activityService.ts";
import { notify } from "../../../shared/lib/notifications/notify.ts";
import type {
  IActivitiesFilters,
  IActivity,
} from "../../../entities/activity/model/types.ts";
import { trackEvent } from "../../../shared/lib/analytics/metrica.ts";

const activitiesQueryKey = (filters?: IActivitiesFilters) => [
  "activities",
  filters?.category,
  filters?.location,
  filters?.date,
];

export const useActivities = (filters?: IActivitiesFilters) => {
  return useQuery({
    queryKey: activitiesQueryKey(filters),
    queryFn: () => getActivities(filters),
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<IActivity, "id">) => createActivity(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
      trackEvent("create_activity");
      notify.activityCreated();
    },
    onError: () => {
      notify.error("Не удалось создать активность");
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
      notify.activityDeleted();
    },
    onError: () => {
      notify.error("Не удалось удалить активность");
    },
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<IActivity, "id">>;
    }) => updateActivity(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
      notify.activityUpdated();
    },
    onError: () => {
      notify.error("Не удалось обновить активность");
    },
  });
};
