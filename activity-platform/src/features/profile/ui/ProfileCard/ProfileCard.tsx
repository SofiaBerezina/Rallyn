import type { IUserProfile } from "../../model/types.ts";
import Button from "../../../../shared/ui/Button/Button.tsx";

interface IProfileCardProps {
  user: Omit<IUserProfile, "email">;
  isOwner: boolean;
  onEdit: () => void;
}

const ProfileCard = ({ user, isOwner, onEdit }: IProfileCardProps) => {
  return (
    <article className="relative max-w-sm w-fit mx-auto mt-10 overflow-hidden flex flex-col items-center">
      <div className="flex justify-center relative p-1 rounded-full bg-white/40 backdrop-blur-md">
        <img
          className="
              w-28 h-28 rounded-full
              object-cover
              ring-2 ring-white/60
              shadow-md
              transition-transform duration-300
              hover:scale-[1.03]
            "
          src={
            user.avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
          }
          alt="avatar"
        />
      </div>

      <h2
        className="
          text-2xl font-semibold text-center mt-2
          text-primary-dark
          tracking-wide
          relative
        "
      >
        {user.name}
      </h2>

      <p
        className="
          text-center text-sm leading-relaxed
          text-primary/80
          px-4
          relative
        "
      >
        {user.bio || "Пока нет описания — добавь что-нибудь о себе ✨"}
      </p>

      {isOwner && (
        <Button
          onClick={onEdit}
          variant="bordered"
          className="
              w-fit
              active:scale-[0.99]
              mt-5
            "
        >
          Редактировать профиль
        </Button>
      )}
    </article>
  );
};

export default ProfileCard;
