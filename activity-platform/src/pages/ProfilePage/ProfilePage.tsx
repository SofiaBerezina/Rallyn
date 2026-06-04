import { useParams } from "react-router-dom";
import { updateUser } from "../../services/userService";
import ProfileCard from "../../features/profile/ui/ProfileCard/ProfileCard";
import { useAuth } from "../../shared/hooks/useAuth";
import * as React from "react";
import Loader from "../../shared/ui/Loader/Loader.tsx";
import { useState } from "react";
import EditProfileModal from "../../features/profile/ui/EditProfileModal/EditProfileModal.tsx";
import type { IUserProfile } from "../../features/profile/model/types.ts";
import { EmptyState } from "../../shared/ui";
import { useUser } from "../../shared/hooks/useUser.ts";
import { ActivityList } from "../../features/activities/ui";
import { notify } from "../../shared/lib/notifications/notify.ts";
import { trackEvent } from "../../shared/lib/analytics/metrica.ts";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const userId = id || user?.uid;

  const { data, isLoading, refetch } = useUser(userId);

  if (isLoading) return <Loader />;
  if (!data || !user)
    return (
      <EmptyState
        title="Пользователь не найден"
        description="Возможно, профиль был удалён или ссылка неверна"
      />
    );

  const handleSave = async (updated: Partial<IUserProfile>) => {
    try {
      await updateUser(userId!, updated);
      setIsEditOpen(false);
      await refetch();
      trackEvent("profile_updated");
      notify.profileUpdated();
    } catch {
      notify.error("Ошибка обновления");
    }
  };

  const isOwner = user?.uid === userId;

  return (
    <>
      <ProfileCard
        user={data}
        isOwner={isOwner}
        onEdit={() => setIsEditOpen(true)}
      />

      <h1 className="w-4/5 m-auto min-w-96 mt-12 mb-6 text-2xl font-semibold text-primary-dark tracking-wide text-center">
        {isOwner ? "Мои активности" : "Опубликованные активности"}
      </h1>
      <ActivityList filterByUserId={isOwner ? user.uid : userId} />

      {isEditOpen && (
        <EditProfileModal
          user={data}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProfilePage;
