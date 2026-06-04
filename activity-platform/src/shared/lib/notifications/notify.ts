import { toast } from "sonner";

export const notify = {
  userLoggedIn: () => toast.success("Вы вошли в аккаунт"),
  userSignedUp: () => toast.success("Вы зарегистрировались"),
  activityCreated: () => toast.success("Активность опубликована"),
  activityUpdated: () => toast.success("Активность обновлена"),
  activityDeleted: () => toast.success("Активность удалена"),
  profileUpdated: () => toast.success("Профиль обновлён"),
  responseSent: () => toast.success("Отклик отправлен"),
  responseAccepted: () =>
    toast.success("Отклик принят. Можете связаться с пользователем!"),
  responseRejected: () => toast.error("Отклик отклонён"),
  error: (message: string) => toast.error(message),
};
