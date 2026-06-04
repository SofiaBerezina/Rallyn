import { Button } from "../../../../shared/ui";
import type { IActivity } from "../../model/types.ts";
import type { IUserProfile } from "../../../profile/model/types.ts";
import { CalendarDays, Clock3, MapPin, Pencil } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { categoryColors } from "../../../../shared/config/activities/categoryColors";
import { createResponse } from "../../../../services/responseService.ts";
import { useAuth } from "../../../../shared/hooks/useAuth.ts";
import { RESPONSE_STATUS } from "../../../responses/model/types.ts";
import { notify } from "../../../../shared/lib/notifications/notify.ts";
import { useQueryClient } from "@tanstack/react-query";
import { trackEvent } from "../../../../shared/lib/analytics/metrica.ts";

interface IActivityCardProps {
  activity: IActivity;
  author: IUserProfile;
  isOwner: boolean;
  onEdit: () => void;
  onDelete?: (id: string) => void;
  onOpenResponses?: () => void;
  hasResponded?: boolean;
}

const ActivityCard = memo(
  ({
    activity,
    author,
    isOwner,
    onEdit,
    onDelete,
    onOpenResponses,
    hasResponded = false,
  }: IActivityCardProps) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isJoining, setIsJoining] = useState(false);

    const formattedDate = useMemo(() => {
      return activity.date?.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }, [activity.date]);

    const formattedTime = useMemo(() => {
      return activity.date?.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, [activity.date]);

    const handleJoin = useCallback(async () => {
      if (!user || hasResponded || isJoining) return;

      try {
        setIsJoining(true);

        await createResponse({
          activityId: activity.id,
          authorId: activity.authorId,
          responderId: user.uid,
          status: RESPONSE_STATUS.PENDING,
          createdAt: Date.now(),
        });

        await queryClient.invalidateQueries({
          queryKey: ["my-responses", user.uid],
        });
        trackEvent("response_sent");
        notify.responseSent();
      } catch {
        notify.error("Не получилось откликнуться, попробуйте снова");
      } finally {
        setIsJoining(false);
      }
    }, [
      user,
      hasResponded,
      isJoining,
      activity.id,
      activity.authorId,
      queryClient,
    ]);

    return (
      <article
        className="
        w-full max-w-sm mx-auto
        overflow-hidden
        rounded-[28px]
        border border-primary/10
        bg-white/90
        p-4
        shadow-[0_18px_40px_rgba(107,95,100,0.10)]
        backdrop-blur-sm
        flex flex-col
        gap-3.5
      "
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <img
              alt={author.name}
              src={
                author.avatar ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${author.name}`
              }
              className="
              h-11 w-11 rounded-full
              object-cover
              ring-2 ring-white/90
              shadow-sm
            "
            />

            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.18em] text-primary/45">
                Автор
              </p>
              <span className="block truncate text-sm font-semibold text-primary-dark">
                {isOwner ? "Я" : author.name}
              </span>
            </div>
          </div>

          <span
            className={`
            shrink-0 rounded-full
            px-3 py-1
            text-xs font-semibold
            shadow-sm
            ${categoryColors[activity.category] ?? "bg-primary-light text-primary"}
          `}
          >
            {activity.category}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-[17px] font-semibold leading-tight text-primary-dark">
            {activity.title}
          </h3>
          <p className="text-sm leading-relaxed text-primary/80 line-clamp-1">
            {activity.description
              ? activity.description
              : "Присоединяйтесь ко мне!"}
          </p>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-primary-light/55 p-2.5">
          <div className="flex items-center gap-2 text-primary-dark">
            <MapPin size={16} className="shrink-0 text-primary" />
            <p className="truncate text-sm font-semibold">
              {activity.location}
            </p>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1.5 shadow-sm">
              <CalendarDays size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary-dark">
                {formattedDate}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1.5 shadow-sm">
              <Clock3 size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary-dark">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          {isOwner ? (
            <>
              <Button variant="icon" onClick={onEdit}>
                <Pencil />
              </Button>
              <Button variant="warn" onClick={() => onDelete?.(activity.id)}>
                Удалить
              </Button>
              <Button variant="bordered" onClick={onOpenResponses}>
                Отклики · {activity.responsesCount ?? 0}
              </Button>
            </>
          ) : (
            <Button
              variant={hasResponded ? "bordered" : "primary"}
              className="w-full"
              onClick={handleJoin}
              disabled={hasResponded || isJoining}
            >
              {hasResponded
                ? "Вы откликнулись"
                : isJoining
                  ? "Отправляем..."
                  : "Присоединиться"}
            </Button>
          )}
        </div>
      </article>
    );
  },
);

export default ActivityCard;
