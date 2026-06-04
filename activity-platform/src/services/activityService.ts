import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  where,
  Timestamp,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import type {
  IActivitiesFilters,
  IActivity,
} from "../entities/activity/model/types.ts";

export const getActivities = async (filters?: IActivitiesFilters) => {
  const baseRef = collection(db, "activities");

  const constraints = [];

  if (filters?.category) {
    constraints.push(where("category", "==", filters.category));
  }

  if (filters?.date) {
    const start = new Date(filters.date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(filters.date);
    end.setHours(23, 59, 59, 999);

    constraints.push(
      where("date", ">=", Timestamp.fromDate(start)),
      where("date", "<=", Timestamp.fromDate(end)),
    );
  }

  const q = constraints.length ? query(baseRef, ...constraints) : baseRef;

  const snap = await getDocs(q);

  return snap.docs.map((doc) => {
    const data = doc.data() as Omit<IActivity, "id">;

    return {
      id: doc.id,
      ...data,
      date: data.date instanceof Timestamp ? data.date.toDate() : data.date,
    };
  });
};

export const createActivity = async (data: Omit<IActivity, "id">) => {
  await addDoc(collection(db, "activities"), data);
};

export const deleteActivity = async (id: string) => {
  const ref = doc(db, "activities", id);
  await deleteDoc(ref);
};

export const updateActivity = async (
  id: string,
  data: Partial<Omit<IActivity, "id">>,
) => {
  const ref = doc(db, "activities", id);
  await updateDoc(ref, data);
};
