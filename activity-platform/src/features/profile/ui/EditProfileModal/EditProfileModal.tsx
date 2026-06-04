import EditProfileForm from "../EditProfileForm/EditProfileForm";
import type { IUserProfile } from "../../model/types";
import ModalShell from "../../../../shared/ui/ModalShell/ModalShell";

interface IEditProfileModalProps {
  user: IUserProfile;
  onClose: () => void;
  onSave: (data: Partial<IUserProfile>) => void;
}

const EditProfileModal = ({
  user,
  onClose,
  onSave,
}: IEditProfileModalProps) => {
  return (
    <ModalShell title="Редактировать профиль" onClose={onClose}>
      <EditProfileForm user={user} onSave={onSave} />
    </ModalShell>
  );
};

export default EditProfileModal;
