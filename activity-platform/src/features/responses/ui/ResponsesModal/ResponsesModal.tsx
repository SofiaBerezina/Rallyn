import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";

import ModalShell from "../../../../shared/ui/ModalShell/ModalShell";
import { Loader } from "../../../../shared/ui/Loader";
import EmptyState from "../../../../shared/ui/EmptyState/EmptyState";

import {
  updateResponseStatus,
  getResponsesByActivity,
} from "../../../../services/responseService";

import { useUsersByIds } from "../../../../shared/hooks/useUser";

import {
  RESPONSE_STATUS,
  type IActivityResponse,
  type ResponseStatus,
} from "../../model/types.ts";
import ResponseCard from "../ResponseCard/ResponseCard.tsx";
import { notify } from "../../../../shared/lib/notifications/notify.ts";

interface IResponsesModalProps {
  activityId: string;
  onClose: () => void;
}

const ResponsesModal = ({ activityId, onClose }: IResponsesModalProps) => {
  const queryClient = useQueryClient();
  const responsesQueryKey = ["responses", activityId];
  const [updatingResponseId, setUpdatingResponseId] = useState<string | null>(
    null,
  );

  const { data: responses, isLoading: isResponsesLoading } = useQuery({
    queryKey: responsesQueryKey,
    queryFn: () => getResponsesByActivity(activityId),
  });

  const responderIds = useMemo(
    () => [...new Set(responses?.map((r) => r.responderId) ?? [])],
    [responses],
  );

  const { data: users, isLoading: isUsersLoading } =
    useUsersByIds(responderIds);

  const handleUpdateStatus = async (id: string, status: ResponseStatus) => {
    const previousResponses =
      queryClient.getQueryData<IActivityResponse[]>(responsesQueryKey);

    setUpdatingResponseId(id);
    queryClient.setQueryData<IActivityResponse[]>(
      responsesQueryKey,
      (current) =>
        current?.map((response) =>
          response.id === id ? { ...response, status } : response,
        ),
    );

    try {
      await updateResponseStatus(id, status);

      if (status === RESPONSE_STATUS.ACCEPTED) {
        notify.responseAccepted();
      } else {
        notify.responseRejected();
      }
    } catch {
      queryClient.setQueryData(responsesQueryKey, previousResponses);
      notify.error("Ответ не отправлен. Попробуйте снова");
    } finally {
      setUpdatingResponseId(null);
      void queryClient.invalidateQueries({
        queryKey: responsesQueryKey,
      });
    }
  };

  return (
    <ModalShell title="Отклики" onClose={onClose}>
      {isResponsesLoading || isUsersLoading ? (
        <Loader />
      ) : !responses?.length ? (
        <EmptyState
          title="Откликов пока нет"
          description="Когда кто-то откликнется, здесь появится список участников"
        />
      ) : (
        responses.map((response) => {
          const user = users?.find((u) => u.id === response.responderId);
          if (!user) return null;
          return (
            <ResponseCard
              key={response.id}
              response={response}
              user={user}
              onUpdateStatus={handleUpdateStatus}
              isUpdating={updatingResponseId === response.id}
            />
          );
        })
      )}
    </ModalShell>
  );
};

export default ResponsesModal;
