import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { mapAuthErrorCode } from "../shared/utils/mapAuthErrorCode.ts";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      name: "User",
      bio: "Hello, I am User!",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=User`,
      email: cred.user.email,
      telegram: "",
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw mapAuthErrorCode(error.code);
    }
    throw new Error("Неизвестная ошибка", { cause: error });
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw mapAuthErrorCode(error.code);
    }
    throw new Error("Неизвестная ошибка", { cause: error });
  }
};
