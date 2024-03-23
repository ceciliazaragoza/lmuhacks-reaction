import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";

export async function createTask({ title, body }) {
  const data = { title, body, date: Timestamp.now() };
  const docRef = await addDoc(collection(db, "articles"), data);
  return { id: docRef.id, ...data };
}

const PAGE_SIZE = 20;

export async function fetchTasks(category) {
  const snapshot = category
    ? await getDocs(
        query(
          collection(db, "articles"),
          where("category", "==", category),
          limit(PAGE_SIZE)
        )
      )
    : await getDocs(
        query(
          collection(db, "articles"),
          orderBy("date", "desc"),
          limit(PAGE_SIZE)
        )
      );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteTasks(docID) {
  await deleteDoc(doc(db, "articles", docID));
}

