import ActivityForm from "../ActivityForm/ActivityForm";
import type { IActivityFormValues } from "../../model/types";
import ModalShell from "../../../../shared/ui/ModalShell/ModalShell";

interface ICreateActivityModalProps {
  onClose: () => void;
  onCreate: (data: IActivityFormValues) => void;
}

const CreateActivityModal = ({
  onClose,
  onCreate,
}: ICreateActivityModalProps) => {
  return (
    <ModalShell title="Новая активность" onClose={onClose}>
      <ActivityForm onSave={onCreate} />
    </ModalShell>
  );
};

export default CreateActivityModal;
