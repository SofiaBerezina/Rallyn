import { useContext, useState } from "react";
import AuthContext from "../../app/providers/AuthProvider";
import { loginUser, registerUser } from "../../services/authService.ts";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

type AuthCallbacks = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  const { user, loading } = context;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const logout = async () => {
    await signOut(auth);
  };

  const login = async (
    email: string,
    password: string,
    { onSuccess, onError }: AuthCallbacks = {},
  ) => {
    setIsSubmitting(true);

    try {
      await loginUser(email, password);
      onSuccess?.();
    } catch (e) {
      onError?.(e instanceof Error ? e.message : String(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    { onSuccess, onError }: AuthCallbacks = {},
  ) => {
    setIsSubmitting(true);

    try {
      await registerUser(email, password);
      onSuccess?.();
    } catch (e) {
      onError?.(e instanceof Error ? e.message : String(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    login,
    register,
    logout,
    isAuthInitializing: loading,
    isSubmitting,
  };
};
