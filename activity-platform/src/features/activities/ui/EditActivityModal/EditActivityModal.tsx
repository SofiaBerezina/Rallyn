import { ActivityForm } from "../ActivityForm";
import type { IActivity, IActivityFormValues } from "../../model/types.ts";
import ModalShell from "../../../../shared/ui/ModalShell/ModalShell";
import { mapActivityToFormValues } from "../../lib/activityFormMappers.ts";

interface IEditActivityModalProps {
  activity: IActivity;
  onClose: () => void;
  onSave: (data: IActivityFormValues) => void;
}

const EditActivityModal = ({
  activity,
  onClose,
  onSave,
}: IEditActivityModalProps) => {
  return (
    <ModalShell title="Редактировать активность" onClose={onClose}>
      <ActivityForm
        defaultValues={mapActivityToFormValues(activity)}
        onSave={onSave}
      />
    </ModalShell>
  );
};

export default EditActivityModal;
