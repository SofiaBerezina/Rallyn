import { type FC } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  FormInput,
  FormRoot,
  FormSelect,
  SubmitButton,
} from "../../../../shared/ui";

import { categoryOptions } from "../../../../shared/config/activities/categories";
import type { IActivitiesFilters } from "../../model/types.ts";

interface IActivitiesFilterFormProps {
  defaultValues: IActivitiesFilters;
  onApply: (filters: IActivitiesFilters) => void;
  onReset: () => void;
}

const ActivitiesFilterForm: FC<IActivitiesFilterFormProps> = ({
  defaultValues,
  onApply,
  onReset,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IActivitiesFilters>({
    defaultValues,
  });

  const handleReset = () => {
    reset({
      category: undefined,
      location: "",
      date: "",
    });

    onReset();
  };

  return (
    <FormRoot onSubmit={handleSubmit(onApply)} className="mt-4">
      <FormSelect {...register("category")} id="category" label="Категория">
        <option value="">Все категории</option>

        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </FormSelect>

      <FormInput
        placeholder="Введите город"
        {...register("location")}
        id="location"
        label="Локация"
      />

      <FormInput type="date" {...register("date")} id="date" label="Дата" />

      <div className="mt-2 flex gap-2">
        <Button
          type="button"
          variant="warn"
          className="flex-1"
          onClick={handleReset}
        >
          Сбросить
        </Button>

        <SubmitButton
          variant="primary"
          className="flex-1"
          isSubmitting={isSubmitting}
          submittingText="Применяем..."
        >
          Применить
        </SubmitButton>
      </div>
    </FormRoot>
  );
};

export default ActivitiesFilterForm;
