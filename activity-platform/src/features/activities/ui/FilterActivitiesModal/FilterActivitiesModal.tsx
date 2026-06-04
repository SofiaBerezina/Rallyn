import ModalShell from "../../../../shared/ui/ModalShell/ModalShell";

import { ActivitiesFilterForm } from "../ActivitiesFilterForm";
import type { IActivitiesFilters } from "../../model/types.ts";

interface IFilterActivitiesModalProps {
  filters: IActivitiesFilters;
  onApply: (filters: IActivitiesFilters) => void;
  onClose: () => void;
}

const FilterActivitiesModal = ({
  filters,
  onApply,
  onClose,
}: IFilterActivitiesModalProps) => {
  return (
    <ModalShell
      title="Фильтры"
      onClose={onClose}
      className="items-start justify-end bg-black/5"
      panelClassName="
        w-[340px]
        rounded-[32px]
        bg-white/90
        backdrop-blur-xl
      "
    >
      <ActivitiesFilterForm
        defaultValues={filters}
        onApply={onApply}
        onReset={() => onApply({})}
      />
    </ModalShell>
  );
};

export default FilterActivitiesModal;
