import { useQuery, useQueries } from "@tanstack/react-query";
import { getUser } from "../../services/userService";
import type { IUserProfile } from "../../entities/user/model/types";
import { useMemo } from "react";

export const useUser = (userId?: string) => {
  return useQuery<IUserProfile>({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId!),
    enabled: !!userId,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useUsersByIds = (userIds: string[]) => {
  const queries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => getUser(id),
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const data = useMemo(
    () => queries.map((q) => q.data).filter(Boolean) as IUserProfile[],
    [queries],
  );

  return { data, isLoading };
};
