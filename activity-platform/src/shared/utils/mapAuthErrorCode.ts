const AUTH_ERRORS = {
  EMAIL_IN_USE: "Пользователь с таким email уже существует",
  INVALID_EMAIL: "Неверный email",
  INVALID_CREDENTIAL: "Неверный логин или пароль",
  WEAK_PASSWORD: "Пароль слишком слабый",
  UNDEFINED_USER: "Пользователь не найден",
  AUTH_ERROR: "Ошибка авторизации",
};

export const mapAuthErrorCode = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return AUTH_ERRORS.EMAIL_IN_USE;

    case "auth/invalid-email":
      return AUTH_ERRORS.INVALID_EMAIL;

    case "auth/weak-password":
      return AUTH_ERRORS.WEAK_PASSWORD;

    case "auth/user-not-found":
      return AUTH_ERRORS.UNDEFINED_USER;

    case "auth/invalid-credential":
      return AUTH_ERRORS.INVALID_CREDENTIAL;

    default:
      return AUTH_ERRORS.AUTH_ERROR;
  }
};
