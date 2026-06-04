import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  increment,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase.ts";
import type { IActivityResponse } from "../entities/response/model/types.ts";

export const createResponse = async (data: Omit<IActivityResponse, "id">) => {
  await addDoc(collection(db, "responses"), data);

  const activityRef = doc(db, "activities", data.activityId);

  await updateDoc(activityRef, {
    responsesCount: increment(1),
  });
};

export const getResponsesByActivity = async (
  activityId: string,
): Promise<IActivityResponse[]> => {
  const snap = await getDocs(
    query(collection(db, "responses"), where("activityId", "==", activityId)),
  );

  return snap.docs.map((doc) => {
    const data = doc.data() as Omit<IActivityResponse, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });
};

export const getResponsesByResponder = async (
  responderId: string,
): Promise<IActivityResponse[]> => {
  const snap = await getDocs(
    query(collection(db, "responses"), where("responderId", "==", responderId)),
  );

  return snap.docs.map((doc) => {
    const data = doc.data() as Omit<IActivityResponse, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });
};

export const updateResponseStatus = async (
  id: string,
  status: IActivityResponse["status"],
) => {
  const ref = doc(db, "responses", id);

  await updateDoc(ref, {
    status,
  });
};
