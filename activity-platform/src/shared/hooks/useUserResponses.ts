import { useQuery } from "@tanstack/react-query";
import { getResponsesByResponder } from "../../services/responseService.ts";

export const useUserResponses = (userId?: string) => {
  return useQuery({
    queryKey: ["my-responses", userId],
    queryFn: () => getResponsesByResponder(userId!),
    enabled: !!userId,
  });
};
