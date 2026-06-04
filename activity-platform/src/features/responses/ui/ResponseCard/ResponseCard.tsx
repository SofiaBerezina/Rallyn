import { Button } from "../../../../shared/ui";
import { type IActivityResponse, RESPONSE_STATUS } from "../../model/types.ts";
import type { IUserProfile } from "../../../profile/model/types.ts";
import type { ResponseStatus } from "../../model/types.ts";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../shared/config/routes.ts";
import { Mail, Send } from "lucide-react";

interface IResponseCardProps {
  response: IActivityResponse;
  user: IUserProfile;
  onUpdateStatus: (id: string, status: ResponseStatus) => void;
  isUpdating?: boolean;
}

const ResponseCard = ({
  response,
  user,
  onUpdateStatus,
  isUpdating = false,
}: IResponseCardProps) => {
  return (
    <article
      key={response.id}
      className="
                  flex items-center justify-between
                  rounded-2xl border border-primary/10
                  p-3
                "
    >
      <Link
        className="flex items-center gap-3"
        to={ROUTES.getProfile(response.responderId)}
      >
        <img
          src={
            user.avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
          }
          alt={user.name}
          className="h-11 w-11 rounded-full"
        />
        <p className="font-semibold">{user.name}</p>
      </Link>

      <div>
        {response.status === RESPONSE_STATUS.PENDING && (
          <div className="flex gap-2">
            <Button
              variant="accept"
              disabled={isUpdating}
              onClick={() =>
                onUpdateStatus(response.id, RESPONSE_STATUS.ACCEPTED)
              }
            >
              {isUpdating ? "..." : "✓"}
            </Button>

            <Button
              variant="warn"
              disabled={isUpdating}
              onClick={() =>
                onUpdateStatus(response.id, RESPONSE_STATUS.REJECTED)
              }
            >
              {isUpdating ? "..." : "✕"}
            </Button>
          </div>
        )}

        {response.status === RESPONSE_STATUS.ACCEPTED && (
          <a
            href={
              user.telegram
                ? `https://t.me/${user.telegram.replace("@", "")}`
                : `mailto:${user.email}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-icon"
          >
            {user.telegram ? <Send /> : <Mail />}
          </a>
        )}

        {response.status === RESPONSE_STATUS.REJECTED && (
          <div
            className="
              rounded-full
              bg-red-100
              px-3 py-1
              text-xs font-semibold
              text-red-500
            "
          >
            Отклонено
          </div>
        )}
      </div>
    </article>
  );
};

export default ResponseCard;
