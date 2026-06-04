import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { IUserProfile } from "../entities/user/model/types.ts";

export const getUser = async (id: string): Promise<IUserProfile> => {
  const ref = doc(db, "users", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("User not found");
  }

  return { id: snap.id, ...(snap.data() as Omit<IUserProfile, "id">) };
};

export const updateUser = async (
  id: string,
  data: Partial<IUserProfile>,
): Promise<void> => {
  const ref = doc(db, "users", id);
  const updatedData = {
    ...data,
  };

  if (data.name && !data.avatar) {
    updatedData.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`;
  }

  await updateDoc(ref, updatedData);
};
