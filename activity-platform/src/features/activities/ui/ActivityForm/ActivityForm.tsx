import { useForm } from "react-hook-form";
import type { IActivityFormValues } from "../../model/types";
import {
  FormInput,
  FormRoot,
  FormSelect,
  FormTextarea,
  SubmitButton,
} from "../../../../shared/ui";
import { categoryOptions } from "../../../../shared/config/activities/categories.ts";

interface IActivityFormProps {
  onSave: (data: IActivityFormValues) => void;
  defaultValues?: IActivityFormValues;
}

const ActivityForm = ({ onSave, defaultValues }: IActivityFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IActivityFormValues>({
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormRoot onSubmit={handleSubmit(onSave)}>
      <FormInput
        {...register("title", { required: "Название обязательно" })}
        id="title"
        label="Название"
        placeholder="Название активности"
        required={true}
        error={errors.title?.message}
      />

      <FormTextarea
        {...register("description")}
        id="description"
        label="Описание"
        placeholder="Описание активности"
        rows={4}
      />

      <FormInput
        {...register("location", { required: "Локация обязательна" })}
        id="location"
        label="Локация"
        placeholder="Местоположение"
        required={true}
        error={errors.location?.message}
      />

      <FormInput
        type="datetime-local"
        {...register("date", { required: "Дата и время обязательны" })}
        id="date"
        label="Дата и время"
        required={true}
        error={errors.date?.message}
      />

      <FormSelect
        {...register("category", { required: "Категория обязательна" })}
        id="category"
        label="Категория"
        required={true}
        error={errors.category?.message}
      >
        <option value="">Выберите категорию</option>
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </FormSelect>

      <SubmitButton
        className="mt-5"
        isSubmitting={isSubmitting}
        submittingText="Сохраняем..."
      >
        Сохранить
      </SubmitButton>
    </FormRoot>
  );
};

export default ActivityForm;
