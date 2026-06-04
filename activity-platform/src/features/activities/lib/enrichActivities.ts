import type { IActivity } from "../../../entities/activity/model/types";
import type { IUserProfile } from "../../../entities/user/model/types";

export const enrichActivitiesWithUsers = (
  activities: IActivity[],
  users: IUserProfile[],
) => {
  const usersMap = Object.fromEntries(users.map((u) => [u.id, u]));

  return activities.map((activity) => ({
    ...activity,
    author: usersMap[activity.authorId],
  }));
};
