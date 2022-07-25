// Run effects in response to events in response to events in firebase services
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { USERS, ENTRIES } from "./constants";

// if a user is deleted, delete from firestore user data associated with that user
export const deleteUserData = functions.auth.user().onDelete(async (user) => {
  const uid = user.uid;
  admin.firestore().collection(USERS).doc(uid).delete();
});

// If a user is deleted, delete from firestore all data entries associated with that user.
export const deleteUserDataEntries = functions.auth
  .user()
  .onDelete(async (user) => {
    const uid = user.uid;
    admin
      .firestore()
      .collection(ENTRIES)
      .where("userUid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  });
