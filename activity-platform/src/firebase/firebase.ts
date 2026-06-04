import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { ENV } from "../shared/config/env.ts";

const firebaseConfig = {
  apiKey: ENV.VITE_FIREBASE_API_KEY,
  authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.VITE_FIREBASE_PROJECT_ID,
  storageBucket: ENV.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.VITE_FIREBASE_APP_ID,
};

interface ImportMetaEnv {
  VITEST?: boolean;
}

const isVitest = !!(import.meta.env as ImportMetaEnv).VITEST;
const hasApiKey = Boolean(ENV.VITE_FIREBASE_API_KEY);

const app = isVitest || !hasApiKey ? null : initializeApp(firebaseConfig);

export const auth: Auth = app ? getAuth(app) : ({} as Auth);
export const db: Firestore = app ? getFirestore(app) : ({} as Firestore);
