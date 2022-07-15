import { async } from "@firebase/util";
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};
export const getitem = async () => {
  const item = await getDocs(
    query(collection(firestore, "foodItem", orderBy("id", "desc")))
  );
  return item.docs.map((doc) => doc.data());
};
