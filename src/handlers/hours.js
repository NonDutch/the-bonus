import firebase from "firebase/app";
import "firebase/firestore";
import { initialState } from "../utils/months";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID
} from "../config";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID
  });
}

const db = firebase.firestore();

export async function addInitialHours(email) {
  const doc = db.collection("worked-hours").doc(email);
  const document = await doc.get();

  if (!document.exists) {
    doc.set(initialState);
  }
}

export function addHours(email, month, hours) {
  db.collection("worked-hours")
    .doc(email)
    .set({ [month]: hours }, { merge: true });
}

export async function getInitialHours(email) {
  const response = await db
    .collection("worked-hours")
    .doc(email)
    .get();

  return response.exists ? response.data() : initialState;
}
