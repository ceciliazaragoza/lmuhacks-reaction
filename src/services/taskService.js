import { collection, addDoc, query, orderBy, Timestamp, deleteDoc, doc, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const createTask = async ({ task, author, completed }) => {
  const data = { 
    task, 
    author, 
    completed, 
    createdAt: Timestamp.now() 
  };
  const docRef = await addDoc(collection(db, "tasks"), data);
  return { id: docRef.id, ...data };
};

export const fetchTasks = async (userId) => {
  const snapshot = await getDocs(
    query(
      collection(db, "tasks"),
      where("author", "==", userId),
      orderBy("createdAt", "desc")
    )
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId));
};

export async function updateTaskCompleteness(taskId, completed) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      completed: completed
    });
    console.log('Task completeness updated successfully!');
  } catch (error) {
    console.error('Error updating task completeness:', error);
  }
}

export async function updateTaskDetail(taskId, newTaskDetail) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      task: newTaskDetail
    });
    console.log('Task detail updated successfully!');
  } catch (error) {
    console.error('Error updating task detail:', error);
  }
}