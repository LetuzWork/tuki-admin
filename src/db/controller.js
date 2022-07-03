import { db } from "../db/firebase";
import {
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";

const getStudents = async () => {
  const content = [];
  //use type == student
  const q = query(collection(db, "users"), where("name", "!=", "student"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((snap) => {
    content.push({ id: snap.id, ...snap.data() });
  });
  return content;
};

const getAssistancesOfTheDay = async (day) => {
  const snap = await getDoc(doc(db, "assistances", day));

  return snap.exists() && snap.data().content.length
    ? snap.data().content
    : { error: true };
};

// Function just added with demo-purposes
const deleteRegister = async (day, user) => {
  console.log(day, user);
  const assistancesOfTheDay = await getAssistancesOfTheDay(day);
  if (assistancesOfTheDay.error) return { succeed: false };

  const assistancesFiltered = assistancesOfTheDay.filter(
    (register) => register.user !== user
  );
  await updateDoc(doc(db, "assistances", day), {
    content: assistancesFiltered,
  });
  return { succeed: true, result: assistancesFiltered };
};

export { getStudents, getAssistancesOfTheDay, deleteRegister };
