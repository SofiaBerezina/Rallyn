import { ActivityCard } from "../ActivityCard";
import { Loader } from "../../../../shared/ui/Loader";
import EmptyState from "../../../../shared/ui/EmptyState/EmptyState";

import { useUsersByIds } from "../../../../shared/hooks/useUser";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { enrichActivitiesWithUsers } from "../../lib/enrichActivities.ts";
import { useCallback, useMemo, useState } from "react";
import type {
  IActivitiesFilters,
  IActivity,
  IActivityFormValues,
} from "../../model/types.ts";
import { EditActivityModal } from "../EditActivityModal";
import { ResponsesModal } from "../../../responses/ui";
import { mapActivityFormToPayload } from "../../lib/activityFormMappers.ts";
import { useUserResponses } from "../../../../shared/hooks/useUserResponses.ts";
import {
  useActivities,
  useDeleteActivity,
  useUpdateActivity,
} from "../../model/useActivities.ts";

interface IActivityListProps {
  filterByUserId?: string;
  hideOwn?: boolean;
  filters?: IActivitiesFilters;
}

const ActivityList = ({
  filterByUserId,
  hideOwn = false,
  filters,
}: IActivityListProps) => {
  const { user } = useAuth();

  const { data: activities, isLoading: isActivitiesLoading } =
    useActivities(filters);
  const { data: userResponses, isLoading: isUserResponsesLoading } =
    useUserResponses(user?.uid);

  const authorIds = useMemo(
    () => [...new Set(activities?.map((a) => a.authorId) ?? [])],
    [activities],
  );

  const { data: users, isLoading: isUsersLoading } = useUsersByIds(authorIds);
  const deleteActivityMutation = useDeleteActivity();
  const updateActivityMutation = useUpdateActivity();

  const [editing, setEditing] = useState<IActivity | null>(null);

  const [responsesActivityId, setResponsesActivityId] = useState<string | null>(
    null,
  );

  const respondedActivityIds = useMemo(() => {
    return new Set(userResponses?.map((response) => response.activityId));
  }, [userResponses]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteActivityMutation.mutate(id);
    },
    [deleteActivityMutation],
  );

  const handleUpdate = useCallback(
    async (data: IActivityFormValues) => {
      if (!editing) return;

      await updateActivityMutation.mutateAsync({
        id: editing.id,
        data: mapActivityFormToPayload(data),
      });
      setEditing(null);
    },
    [editing, updateActivityMutation],
  );

  if (isActivitiesLoading || isUsersLoading || isUserResponsesLoading) {
    return <Loader />;
  }

  if (!activities || !users) {
    return (
      <EmptyState
        title="Нет данных"
        description="Пока не создано ни одной активности"
      />
    );
  }

  const enriched = enrichActivitiesWithUsers(activities, users);
  const filtered = enriched.filter((a) => {
    if (hideOwn && user?.uid && a.authorId === user.uid) return false;
    if (filterByUserId && a.authorId !== filterByUserId) return false;

    if (filters?.location?.trim()) {
      const search = filters.location.toLowerCase();
      const target = a.location.toLowerCase();
      if (!target.includes(search)) return false;
    }
    return true;
  });

  return (
    <>
      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 m-auto mb-6 z-0">
          {filtered.map((activity) => (
            <li key={activity.id}>
              <ActivityCard
                activity={activity}
                author={activity.author}
                isOwner={activity.authorId === user?.uid}
                onEdit={() => setEditing(activity)}
                onDelete={handleDelete}
                onOpenResponses={() => setResponsesActivityId(activity.id)}
                hasResponded={respondedActivityIds.has(activity.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="Ничего не нашли:("
          description="К сожалению, таких активностей пока нет, создайте свою!"
        />
      )}

      {editing && (
        <EditActivityModal
          activity={editing}
          onClose={() => setEditing(null)}
          onSave={handleUpdate}
        />
      )}

      {responsesActivityId && (
        <ResponsesModal
          activityId={responsesActivityId}
          onClose={() => setResponsesActivityId(null)}
        />
      )}
    </>
  );
};

export default ActivityList;
