import { useForm } from "react-hook-form";
import type { IUserProfile } from "../../model/types";
import { FormInput, FormRoot, SubmitButton } from "../../../../shared/ui";

interface IEditProfileFormProps {
  user: IUserProfile;
  onSave: (data: Partial<IUserProfile>) => void;
}

const EditProfileForm = ({ user, onSave }: IEditProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserProfile>({
    defaultValues: {
      name: user.name,
      bio: user.bio,
      telegram: user.telegram,
    },
  });

  return (
    <FormRoot onSubmit={handleSubmit(onSave)} className="gap-3">
      <FormInput
        {...register("name", { required: "Имя обязательно" })}
        id="name"
        label="Имя"
        placeholder="Имя"
        required={true}
        error={errors.name?.message}
      />

      <FormInput
        {...register("bio")}
        id="bio"
        label="О себе"
        placeholder="О себе"
      />

      <FormInput
        {...register("telegram")}
        placeholder="Telegram"
        id="tg"
        label="Ник в Telegram"
      />

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

export default EditProfileForm;
